import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Textarea from "@/components/atoms/Textarea";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const TaskModal = ({ 
  isOpen, 
  onClose, 
  task, 
  categories, 
  onSave,
  title = "Edit Task"
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryId: "",
    priority: 1,
    dueDate: ""
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        categoryId: task.categoryId || "",
        priority: task.priority || 1,
        dueDate: task.dueDate || ""
      });
    } else {
      setFormData({
        title: "",
        description: "",
categoryId: categories[0]?.Id || "",
        priority: 1,
        dueDate: new Date().toISOString().split("T")[0]
      });
    }
    setErrors({});
  }, [task, categories, isOpen]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    
    if (!formData.categoryId) {
      newErrors.categoryId = "Category is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error("Error saving task:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={handleKeyDown}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <ApperIcon name="X" className="w-5 h-5" />
            </Button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <FormField
              label="Task Title"
              required
              error={errors.title}
            >
              <Input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Enter task title"
                error={!!errors.title}
              />
            </FormField>

            <FormField
              label="Description"
              error={errors.description}
            >
              <Textarea
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Enter task description (optional)"
                rows={3}
              />
            </FormField>

            <FormField
              label="Category"
              required
              error={errors.categoryId}
            >
              <Select
                value={formData.categoryId}
                onChange={(e) => handleChange("categoryId", e.target.value)}
                error={!!errors.categoryId}
              >
                <option value="">Select a category</option>
{categories.map((category) => (
                  <option key={category.Id} value={category.Id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </FormField>

            <FormField
              label="Priority"
              error={errors.priority}
            >
              <Select
                value={formData.priority}
                onChange={(e) => handleChange("priority", parseInt(e.target.value))}
              >
                <option value={1}>Low Priority</option>
                <option value={2}>Medium Priority</option>
                <option value={3}>High Priority</option>
              </Select>
            </FormField>

            <FormField
              label="Due Date"
              error={errors.dueDate}
            >
              <Input
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleChange("dueDate", e.target.value)}
              />
            </FormField>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                loading={loading}
                disabled={loading}
              >
                {task ? "Update Task" : "Create Task"}
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TaskModal;