import React, { createContext, useContext, useState, useEffect } from "react";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  isGuest: boolean;
}

export interface SavedUser {
  name: string;
  email: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  savedUser: SavedUser | null;
  login: (
    email: string,
    password: string,
    rememberMe?: boolean,
  ) => Promise<{ success: boolean; error?: string }>;
  signUp: (data: {
    name: string;
    email: string;
    phone?: string;
    password: string;
  }) => Promise<{ success: boolean; error?: string }>;
  continueAsGuest: () => void;
  logout: () => void;
  clearSavedUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: "alnur_auth_user",
  SAVED_NAME: "alnur_saved_user_name",
  SAVED_EMAIL: "alnur_saved_user_email",
  SAVED_PHONE: "alnur_saved_user_phone",
  IS_GUEST: "alnur_is_guest",
  REMEMBER_ME: "alnur_remember_me",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      if (saved) return JSON.parse(saved);
      const isGuest = localStorage.getItem(STORAGE_KEYS.IS_GUEST) === "true";
      if (isGuest) {
        return { id: "guest_user", name: "Guest Shopper", email: "", isGuest: true };
      }
    } catch {
      // Fallback
    }
    return null;
  });

  const [savedUser, setSavedUser] = useState<SavedUser | null>(() => {
    try {
      const name = localStorage.getItem(STORAGE_KEYS.SAVED_NAME);
      const email = localStorage.getItem(STORAGE_KEYS.SAVED_EMAIL);
      if (name && email) {
        return { name, email };
      }
    } catch {
      // Fallback
    }
    return null;
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
        if (!user.isGuest) {
          localStorage.setItem(STORAGE_KEYS.IS_GUEST, "false");
          if (user.name) localStorage.setItem(STORAGE_KEYS.SAVED_NAME, user.name);
          if (user.email) localStorage.setItem(STORAGE_KEYS.SAVED_EMAIL, user.email);
          if (user.phone) localStorage.setItem(STORAGE_KEYS.SAVED_PHONE, user.phone);
          setSavedUser({ name: user.name, email: user.email });
        } else {
          localStorage.setItem(STORAGE_KEYS.IS_GUEST, "true");
        }
      } else {
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    } catch (e) {
      console.error("Auth storage error:", e);
    }
  }, [user]);

  const login = async (
    email: string,
    password: string,
    rememberMe: boolean = true,
  ): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      return { success: false, error: "Please enter both your email address and password." };
    }

    if (cleanPassword.length < 6) {
      return { success: false, error: "Password must be at least 6 characters long." };
    }

    // Determine user display name
    let displayName = "Al-Nur Member";
    if (cleanEmail.toLowerCase().includes("amina")) {
      displayName = "Amina Lawal";
    } else if (cleanEmail.toLowerCase().includes("fatima")) {
      displayName = "Fatima Zahra";
    } else if (cleanEmail.toLowerCase().includes("aisha")) {
      displayName = "Aisha Bello";
    } else if (cleanEmail.includes("@")) {
      const prefix = cleanEmail.split("@")[0];
      displayName = prefix.charAt(0).toUpperCase() + prefix.slice(1);
    }

    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name: displayName,
      email: cleanEmail,
      isGuest: false,
    };

    setUser(newUser);

    if (rememberMe) {
      try {
        localStorage.setItem(STORAGE_KEYS.SAVED_NAME, displayName);
        localStorage.setItem(STORAGE_KEYS.SAVED_EMAIL, cleanEmail);
        localStorage.setItem(STORAGE_KEYS.REMEMBER_ME, "true");
        setSavedUser({ name: displayName, email: cleanEmail });
      } catch (e) {
        console.error(e);
      }
    }

    return { success: true };
  };

  const signUp = async (data: {
    name: string;
    email: string;
    phone?: string;
    password: string;
  }): Promise<{ success: boolean; error?: string }> => {
    const cleanName = data.name.trim();
    const cleanEmail = data.email.trim();
    const cleanPhone = data.phone?.trim();
    const cleanPassword = data.password.trim();

    if (!cleanName) {
      return { success: false, error: "Please enter your full name." };
    }
    if (!cleanEmail || !cleanEmail.includes("@")) {
      return { success: false, error: "Please enter a valid email address." };
    }
    if (!cleanPassword || cleanPassword.length < 6) {
      return { success: false, error: "Password must be at least 6 characters." };
    }

    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      isGuest: false,
    };

    setUser(newUser);
    try {
      localStorage.setItem(STORAGE_KEYS.SAVED_NAME, cleanName);
      localStorage.setItem(STORAGE_KEYS.SAVED_EMAIL, cleanEmail);
      if (cleanPhone) localStorage.setItem(STORAGE_KEYS.SAVED_PHONE, cleanPhone);
      setSavedUser({ name: cleanName, email: cleanEmail });
    } catch (e) {
      console.error(e);
    }

    return { success: true };
  };

  const continueAsGuest = () => {
    const guestUser: UserProfile = {
      id: "guest_user",
      name: "Guest Shopper",
      email: "",
      isGuest: true,
    };
    setUser(guestUser);
    try {
      localStorage.setItem(STORAGE_KEYS.IS_GUEST, "true");
    } catch (e) {
      console.error(e);
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.setItem(STORAGE_KEYS.IS_GUEST, "true");
    } catch (e) {
      console.error(e);
    }
  };

  const clearSavedUser = () => {
    setSavedUser(null);
    try {
      localStorage.removeItem(STORAGE_KEYS.SAVED_NAME);
      localStorage.removeItem(STORAGE_KEYS.SAVED_EMAIL);
      localStorage.removeItem(STORAGE_KEYS.SAVED_PHONE);
    } catch (e) {
      console.error(e);
    }
  };

  const isAuthenticated = user !== null && !user.isGuest;
  const isGuest = user === null || user.isGuest;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isGuest,
        savedUser,
        login,
        signUp,
        continueAsGuest,
        logout,
        clearSavedUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
