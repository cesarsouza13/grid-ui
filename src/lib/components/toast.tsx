import React from "react";
import '../css/alert.css';

interface AlertToastProps {
  message: string;
  variant: "success" | "error" | "warning" | "info";
}

const colors = {
  success: "bg-green-500 text-white",
  error: "bg-red-500 text-white",
  warning: "bg-yellow-500 text-black",
  info: "bg-blue-500 text-white",
};

const AlertToast: React.FC<AlertToastProps> = ({ message, variant }) => {
  return (
    <div
      className={`fixed bottom-4 right-4 px-4 py-2 rounded shadow-md ${colors[variant]} animate-slide-in`}
      style={{ minWidth: 200 }}
    >
      {message}
    </div>
  );
};

export default AlertToast;