import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const FilterBar = ({ 
  filters, 
  onFilterChange, 
  categories, 
  taskCounts,
  className 
}) => {
  const statusOptions = [
    { value: "all", label: "All Tasks", count: taskCounts.all },
    { value: "active", label: "Active", count: taskCounts.active },
    { value: "completed", label: "Completed", count: taskCounts.completed }
  ];

  const priorityOptions = [
    { value: "all", label: "All Priorities" },
    { value: "3", label: "High Priority" },
    { value: "2", label: "Medium Priority" },
    { value: "1", label: "Low Priority" }
  ];

  const sortOptions = [
    { value: "created", label: "Created Date" },
    { value: "dueDate", label: "Due Date" },
    { value: "priority", label: "Priority" },
    { value: "title", label: "Title" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "bg-white rounded-lg shadow-sm border border-gray-200 p-4",
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-4">
        {/* Status Filter */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600 font-medium">Status:</span>
          <div className="flex space-x-1">
            {statusOptions.map((option) => (
              <Button
                key={option.value}
                variant={filters.status === option.value ? "primary" : "ghost"}
                size="sm"
                onClick={() => onFilterChange("status", option.value)}
                className="relative"
              >
                {option.label}
                {option.count !== undefined && (
                  <span className={cn(
                    "ml-1 px-1.5 py-0.5 text-xs rounded-full",
                    filters.status === option.value 
                      ? "bg-white/20 text-white" 
                      : "bg-gray-100 text-gray-600"
                  )}>
                    {option.count}
                  </span>
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600 font-medium">Category:</span>
          <Select
            value={filters.category}
            onChange={(e) => onFilterChange("category", e.target.value)}
            className="min-w-[120px]"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category.Id} value={category.Id}>
                {category.name} ({category.taskCount})
              </option>
            ))}
          </Select>
        </div>

        {/* Priority Filter */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600 font-medium">Priority:</span>
          <Select
            value={filters.priority}
            onChange={(e) => onFilterChange("priority", e.target.value)}
            className="min-w-[120px]"
          >
            {priorityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>

        {/* Sort Options */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600 font-medium">Sort:</span>
          <Select
            value={filters.sortBy}
            onChange={(e) => onFilterChange("sortBy", e.target.value)}
            className="min-w-[120px]"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onFilterChange("sortOrder", filters.sortOrder === "asc" ? "desc" : "asc")}
            className="px-2"
          >
            <ApperIcon 
              name={filters.sortOrder === "asc" ? "ArrowUp" : "ArrowDown"} 
              className="w-4 h-4" 
            />
          </Button>
        </div>

        {/* Clear Filters */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onFilterChange("reset")}
          className="text-gray-500 hover:text-gray-700 ml-auto"
        >
          <ApperIcon name="X" className="w-4 h-4 mr-1" />
          Clear
        </Button>
      </div>
    </motion.div>
  );
};

export default FilterBar;