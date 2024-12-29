import { useEffect } from "react";
// import { X } from "lucide-react";

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
      <span className="mr-8">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 hover:bg-red-600 p-1 rounded-full"
        aria-label="Close"
      >
        X
      </button>
    </div>
  );
}
