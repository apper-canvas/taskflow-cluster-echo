import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const PriorityBadge = ({ priority, className }) => {
  const getPriorityConfig = (priority) => {
    switch (priority) {
      case 3:
        return {
          label: "High",
          color: "bg-red-500",
          textColor: "text-red-700",
          bgColor: "bg-red-100",
          borderColor: "border-red-200",
          pulse: true
        };
      case 2:
        return {
          label: "Medium",
          color: "bg-yellow-500",
          textColor: "text-yellow-700",
          bgColor: "bg-yellow-100",
          borderColor: "border-yellow-200",
          pulse: false
        };
      case 1:
        return {
          label: "Low",
          color: "bg-green-500",
          textColor: "text-green-700",
          bgColor: "bg-green-100",
          borderColor: "border-green-200",
          pulse: false
        };
      default:
        return {
          label: "None",
          color: "bg-gray-500",
          textColor: "text-gray-700",
          bgColor: "bg-gray-100",
          borderColor: "border-gray-200",
          pulse: false
        };
    }
  };

  const config = getPriorityConfig(priority);

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={cn(
        "inline-flex items-center space-x-2 px-2 py-1 rounded-full border text-xs font-medium",
        config.bgColor,
        config.textColor,
        config.borderColor,
        className
      )}
    >
      <div
        className={cn(
          "w-2 h-2 rounded-full",
          config.color,
          config.pulse && "priority-pulse"
        )}
      />
      <span>{config.label}</span>
    </motion.div>
  );
};

export default PriorityBadge;