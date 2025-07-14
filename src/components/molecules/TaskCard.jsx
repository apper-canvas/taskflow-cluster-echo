import React, { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import Button from "@/components/atoms/Button";
import Checkbox from "@/components/atoms/Checkbox";
import PriorityBadge from "@/components/molecules/PriorityBadge";
import CategoryBadge from "@/components/molecules/CategoryBadge";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const TaskCard = ({ 
  task, 
  category, 
  onToggleComplete, 
  onEdit, 
  onDelete, 
  className 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  const handleToggleComplete = () => {
    onToggleComplete(task.Id);
  };

  const handleEdit = () => {
    onEdit(task);
  };

  const handleDelete = () => {
    onDelete(task.Id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.01 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        "bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 p-4",
        task.completed && "opacity-70",
        isOverdue && "border-red-200 bg-red-50",
        className
      )}
    >
      <div className="flex items-start space-x-3">
        {/* Checkbox */}
        <div className="flex-shrink-0 mt-1">
          <Checkbox
            checked={task.completed}
            onChange={handleToggleComplete}
          />
        </div>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className={cn(
                "text-base font-medium text-gray-900 mb-1",
                task.completed && "line-through text-gray-500"
              )}>
                {task.title}
              </h3>
              
              {task.description && (
                <p className={cn(
                  "text-sm text-gray-600 mb-2",
                  task.completed && "line-through text-gray-400"
                )}>
                  {task.description}
                </p>
              )}

              {/* Task Meta */}
              <div className="flex items-center space-x-2 mb-2">
                <PriorityBadge priority={task.priority} />
                {category && <CategoryBadge category={category} />}
              </div>

              {/* Due Date */}
              {task.dueDate && (
                <div className="flex items-center text-sm text-gray-500">
                  <ApperIcon name="Calendar" className="w-4 h-4 mr-1" />
                  <span className={cn(
                    isOverdue && !task.completed && "text-red-600 font-medium"
                  )}>
                    {format(new Date(task.dueDate), "MMM d, yyyy")}
                    {isOverdue && !task.completed && " (Overdue)"}
                  </span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className={cn(
              "flex items-center space-x-1 transition-opacity duration-200",
              isHovered ? "opacity-100" : "opacity-0"
            )}>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEdit}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <ApperIcon name="Edit2" className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                className="text-gray-400 hover:text-red-600 p-1"
              >
                <ApperIcon name="Trash2" className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;