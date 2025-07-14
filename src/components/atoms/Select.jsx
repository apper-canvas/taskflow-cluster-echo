import React from "react";
import { cn } from "@/utils/cn";

const Select = React.forwardRef(({ 
  className, 
  children,
  error = false,
  ...props 
}, ref) => {
  const baseClasses = "w-full px-3 py-2 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white";
  
  const stateClasses = error 
    ? "border-red-300 bg-red-50 text-red-900 focus:ring-red-500"
    : "border-gray-300 text-gray-900 hover:border-gray-400";

  return (
    <select
      ref={ref}
      className={cn(baseClasses, stateClasses, className)}
      {...props}
    >
      {children}
    </select>
  );
});

Select.displayName = "Select";

export default Select;