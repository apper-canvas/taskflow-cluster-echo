import React, { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ProgressRing from "@/components/molecules/ProgressRing";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const CategorySidebar = ({ 
  categories, 
  selectedCategory, 
  onCategorySelect, 
  taskCounts,
  className 
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const totalTasks = taskCounts.all || 0;
  const completedTasks = taskCounts.completed || 0;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const getCategoryIcon = (categoryName) => {
    const iconMap = {
      "Work": "Briefcase",
      "Personal": "User",
      "Health": "Heart",
      "Shopping": "ShoppingCart",
      "Finance": "DollarSign",
      "Learning": "BookOpen",
      "Fitness": "Activity",
      "Meetings": "Users"
    };
    return iconMap[categoryName] || "Folder";
  };

  const getCategoryColor = (color) => {
    const colorMap = {
      blue: "text-blue-600 bg-blue-50",
      green: "text-green-600 bg-green-50",
      purple: "text-purple-600 bg-purple-50",
      orange: "text-orange-600 bg-orange-50",
      pink: "text-pink-600 bg-pink-50",
      indigo: "text-indigo-600 bg-indigo-50",
      teal: "text-teal-600 bg-teal-50",
      red: "text-red-600 bg-red-50"
    };
    return colorMap[color] || "text-gray-600 bg-gray-50";
  };

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "bg-white border-r border-gray-200 h-full flex flex-col transition-all duration-300",
        isCollapsed ? "w-16" : "w-80",
        className
      )}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <h2 className="text-xl font-bold text-gray-900">TaskFlow</h2>
              <p className="text-sm text-gray-500">Stay organized & productive</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-500 hover:text-gray-700"
          >
            <ApperIcon 
              name={isCollapsed ? "ChevronRight" : "ChevronLeft"} 
              className="w-4 h-4" 
            />
          </Button>
        </div>
      </div>

      {/* Progress Section */}
      {!isCollapsed && (
        <div className="p-6 border-b border-gray-100">
          <div className="text-center">
            <ProgressRing progress={progress} size={100} strokeWidth={6} />
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-900">Today's Progress</h3>
              <p className="text-sm text-gray-500">
                {completedTasks} of {totalTasks} tasks completed
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          {!isCollapsed && (
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
              Categories
            </h3>
          )}
          
          {/* All Tasks */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onCategorySelect("all")}
            className={cn(
              "w-full flex items-center p-3 rounded-lg transition-all duration-200 mb-2",
              selectedCategory === "all" 
                ? "bg-primary-50 text-primary-700 border border-primary-200" 
                : "hover:bg-gray-50 text-gray-700"
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center mr-3",
              selectedCategory === "all" ? "bg-primary-100" : "bg-gray-100"
            )}>
              <ApperIcon name="List" className="w-4 h-4" />
            </div>
            {!isCollapsed && (
              <>
                <span className="flex-1 text-left font-medium">All Tasks</span>
                <span className="text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {totalTasks}
                </span>
              </>
            )}
          </motion.button>

          {/* Category List */}
          <div className="space-y-1">
            {categories.map((category) => (
              <motion.button
                key={category.Id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onCategorySelect(category.Id)}
                className={cn(
                  "w-full flex items-center p-3 rounded-lg transition-all duration-200",
                  selectedCategory === category.Id.toString() 
                    ? "bg-primary-50 text-primary-700 border border-primary-200" 
                    : "hover:bg-gray-50 text-gray-700"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center mr-3",
                  selectedCategory === category.Id.toString() 
                    ? "bg-primary-100" 
                    : getCategoryColor(category.color)
                )}>
                  <ApperIcon 
                    name={getCategoryIcon(category.name)} 
                    className="w-4 h-4" 
                  />
                </div>
                {!isCollapsed && (
                  <>
                    <span className="flex-1 text-left font-medium">
                      {category.name}
                    </span>
                    <span className="text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {category.taskCount}
                    </span>
                  </>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-100">
          <div className="text-center text-xs text-gray-500">
            <p>TaskFlow v1.0</p>
            <p className="mt-1">Keep it simple, get things done</p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CategorySidebar;