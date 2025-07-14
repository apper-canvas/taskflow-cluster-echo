import React from "react";
import { cn } from "@/utils/cn";

const Input = React.forwardRef(({ 
  className, 
  type = "text", 
  error = false,
  ...props 
}, ref) => {
  const baseClasses = "w-full px-3 py-2 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent";
  
  const stateClasses = error 
    ? "border-red-300 bg-red-50 text-red-900 placeholder-red-400 focus:ring-red-500"
    : "border-gray-300 bg-white text-gray-900 placeholder-gray-400 hover:border-gray-400";

  return (
    <input
      ref={ref}
      type={type}
      className={cn(baseClasses, stateClasses, className)}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;