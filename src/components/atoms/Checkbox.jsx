import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = React.forwardRef(({ 
  className, 
  checked = false,
  onChange,
  disabled = false,
  ...props 
}, ref) => {
  const baseClasses = "relative w-5 h-5 border-2 rounded transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2";
  
  const stateClasses = checked 
    ? "bg-primary-600 border-primary-600" 
    : "bg-white border-gray-300 hover:border-gray-400";

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className="inline-flex items-center"
    >
      <input
        ref={ref}
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
      <div
        className={cn(baseClasses, stateClasses, disabledClasses, className)}
        onClick={() => !disabled && onChange && onChange({ target: { checked: !checked } })}
      >
        {checked && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <ApperIcon 
              name="Check" 
              className="w-3 h-3 text-white" 
              strokeWidth={3}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;