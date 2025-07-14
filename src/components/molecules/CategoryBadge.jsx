import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const CategoryBadge = ({ category, className, onClick }) => {
  const getCategoryClasses = (color) => {
    const colorMap = {
      blue: "category-blue",
      green: "category-green",
      purple: "category-purple",
      orange: "category-orange",
      pink: "category-pink",
      indigo: "category-indigo",
      teal: "category-teal",
      red: "category-red"
    };
    return colorMap[color] || "category-blue";
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "inline-flex items-center px-2 py-1 rounded-full border text-xs font-medium cursor-pointer transition-all duration-200",
        getCategoryClasses(category.color),
        className
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          "w-2 h-2 rounded-full mr-1.5",
          category.color === "blue" && "bg-blue-500",
          category.color === "green" && "bg-green-500",
          category.color === "purple" && "bg-purple-500",
          category.color === "orange" && "bg-orange-500",
          category.color === "pink" && "bg-pink-500",
          category.color === "indigo" && "bg-indigo-500",
          category.color === "teal" && "bg-teal-500",
          category.color === "red" && "bg-red-500"
        )}
      />
      <span>{category.name}</span>
    </motion.div>
  );
};

export default CategoryBadge;