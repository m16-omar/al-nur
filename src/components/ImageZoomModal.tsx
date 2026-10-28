import React, { useState } from "react";
import { X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface ImageZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  productName: string;
}

export function ImageZoomModal({ isOpen, onClose, imageUrl, productName }: ImageZoomModalProps) {
  const [scale, setScale] = useState(1);

  if (!isOpen) return null;

  const zoomIn = () => setScale((s) => Math.min(s + 0.5, 3));
  const zoomOut = () => setScale((s) => Math.max(s - 0.5, 0.8));
  const resetZoom = () => setScale(1);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Controls */}
      <div
        className="absolute top-4 right-4 flex items-center gap-2 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={zoomOut}
          className="p-2 rounded-full bg-black/60 text-white/90 hover:text-white hover:bg-black/80 transition-colors"
          title="Zoom out"
        >
          <ZoomOut className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={resetZoom}
          className="p-2 rounded-full bg-black/60 text-white/90 hover:text-white hover:bg-black/80 transition-colors"
          title="Reset zoom"
        >
          <RotateCcw className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={zoomIn}
          className="p-2 rounded-full bg-black/60 text-white/90 hover:text-white hover:bg-black/80 transition-colors"
          title="Zoom in"
        >
          <ZoomIn className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-full bg-black/60 text-white/90 hover:text-white hover:bg-black/80 transition-colors ml-2"
          title="Close"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div
        className="max-w-4xl max-h-[85vh] overflow-hidden flex items-center justify-center transition-transform duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imageUrl}
          alt={productName}
          style={{ transform: `scale(${scale})` }}
          className="max-h-[80vh] max-w-full object-contain rounded-2xl shadow-2xl transition-transform duration-150 select-none cursor-zoom-in"
          onClick={() => setScale((s) => (s >= 2 ? 1 : s + 0.5))}
        />
      </div>

      <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
        <p className="text-xs text-white/70 font-medium">
          {productName} • Click image to zoom or use controls
        </p>
      </div>
    </div>
  );
}
