import React from "react";
import { X, Sparkles, Bell, Tag, Truck } from "lucide-react";

interface NotificationsModalProps {
  onClose: () => void;
}

export function NotificationsModal({ onClose }: NotificationsModalProps) {
  const notifications = [
    {
      id: 1,
      title: "Jumuah Mubarak Discount! 🕌",
      body: "Enjoy 15% off all Jalabias & Thobes plus free nationwide delivery with code JUMUAH15.",
      time: "Just now",
      icon: "🕌",
      isUnread: true,
    },
    {
      id: 2,
      title: "Welcome Voucher Active 🎁",
      body: "Your 15% new member coupon code ALNUR15 is ready to use at checkout or via WhatsApp.",
      time: "2 hours ago",
      icon: "🎁",
      isUnread: true,
    },
    {
      id: 3,
      title: "Medina Silk Collection Restocked ✨",
      body: "New colors in pure Medina Silk Hijabs and Ivory Khimars have just arrived from Dubai.",
      time: "Yesterday",
      icon: "✨",
      isUnread: false,
    },
    {
      id: 4,
      title: "Free Delivery in Lagos 📦",
      body: "All orders over ₦25,000 qualify for guaranteed next-day delivery across Lagos state.",
      time: "2 days ago",
      icon: "📦",
      isUnread: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl bg-card border border-primary/30 shadow-2xl p-6 overflow-hidden">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Bell className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold">Notifications</h3>
              <p className="text-[11px] text-muted-foreground">Al-Nur announcements & perks</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted/50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 space-y-3 max-h-[380px] overflow-y-auto pr-1">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-3.5 rounded-2xl border transition-all ${
                n.isUnread
                  ? "border-primary/30 bg-primary/5"
                  : "border-border/60 bg-card/50 text-muted-foreground"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl shrink-0">{n.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs sm:text-sm font-bold text-foreground">{n.title}</h4>
                    <span className="text-[10px] text-muted-foreground shrink-0">{n.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{n.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
