import React, { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const QuickAddBar = ({ onAddTask, categories, className }) => {
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [priority, setPriority] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      title: title.trim(),
      description: "",
      categoryId: categoryId || categories[0]?.Id.toString() || "1",
      priority: parseInt(priority),
      dueDate: new Date().toISOString().split("T")[0],
      completed: false
    };

    onAddTask(newTask);
    setTitle("");
    setCategoryId("");
    setPriority(1);
    setIsExpanded(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
    if (e.key === "Escape") {
      setIsExpanded(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden",
        className
      )}
    >
      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsExpanded(true)}
              className="border-none bg-gray-50 focus:bg-white focus:ring-0 text-base placeholder-gray-500 py-3"
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-gray-600"
          >
            <ApperIcon name="Settings" className="w-4 h-4" />
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            disabled={!title.trim()}
            className="px-6"
          >
            <ApperIcon name="Plus" className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>

        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-4 pt-4 border-t border-gray-100"
          >
            <div className="flex items-center space-x-3">
              <div className="flex-1">
                <Select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="bg-gray-50 border-none focus:bg-white"
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category.Id} value={category.Id}>
                      {category.name}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="flex-1">
                <Select
                  value={priority}
                  onChange={(e) => setPriority(parseInt(e.target.value))}
                  className="bg-gray-50 border-none focus:bg-white"
                >
                  <option value={1}>Low Priority</option>
                  <option value={2}>Medium Priority</option>
                  <option value={3}>High Priority</option>
                </Select>
              </div>
            </div>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
};

export default QuickAddBar;