import React, { useState, useEffect, useMemo, useContext } from "react";
import { motion } from "framer-motion";
import CategorySidebar from "@/components/organisms/CategorySidebar";
import TaskList from "@/components/organisms/TaskList";
import TaskModal from "@/components/organisms/TaskModal";
import QuickAddBar from "@/components/molecules/QuickAddBar";
import FilterBar from "@/components/molecules/FilterBar";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { useTasks } from "@/hooks/useTasks";
import { useCategories } from "@/hooks/useCategories";
import { toast } from "react-toastify";
import { AuthContext } from "@/App";
const TaskDashboard = () => {
  const { 
    tasks, 
    loading: tasksLoading, 
    error: tasksError, 
    createTask, 
    updateTask, 
    deleteTask, 
    toggleTaskCompletion,
    refetch: refetchTasks 
  } = useTasks();

  const { 
    categories, 
    loading: categoriesLoading, 
    error: categoriesError,
    updateTaskCount,
    refetch: refetchCategories 
  } = useCategories();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [editingTask, setEditingTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: "all",
    category: "all",
    priority: "all",
    sortBy: "created",
    sortOrder: "desc"
  });

  // Update category task counts when tasks change
  useEffect(() => {
    if (tasks.length > 0 && categories.length > 0) {
categories.forEach(category => {
        const count = tasks.filter(task => task.categoryId === category.Id.toString()).length;
        if (count !== category.taskCount) {
          updateTaskCount(category.Id, count);
        }
      });
    }
  }, [tasks, categories, updateTaskCount]);

  // Filter and sort tasks
  const filteredTasks = useMemo(() => {
    let filtered = [...tasks];

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(task => task.categoryId === selectedCategory);
    }

    // Filter by status
    if (filters.status !== "all") {
      filtered = filtered.filter(task => 
        filters.status === "completed" ? task.completed : !task.completed
      );
    }

    // Filter by priority
    if (filters.priority !== "all") {
      filtered = filtered.filter(task => task.priority === parseInt(filters.priority));
    }

    // Sort tasks
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (filters.sortBy) {
        case "title":
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case "dueDate":
          aValue = new Date(a.dueDate || "9999-12-31");
          bValue = new Date(b.dueDate || "9999-12-31");
          break;
        case "priority":
          aValue = a.priority;
          bValue = b.priority;
          break;
        case "created":
        default:
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
          break;
      }

      if (filters.sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [tasks, selectedCategory, filters]);

  // Calculate task counts
  const taskCounts = useMemo(() => {
    const all = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const active = all - completed;
    
    return { all, completed, active };
  }, [tasks]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setFilters(prev => ({ ...prev, category: categoryId }));
  };

  const handleFilterChange = (key, value) => {
    if (key === "reset") {
      setFilters({
        status: "all",
        category: "all",
        priority: "all",
        sortBy: "created",
        sortOrder: "desc"
      });
      setSelectedCategory("all");
    } else {
      setFilters(prev => ({ ...prev, [key]: value }));
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      await createTask(taskData);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = async (taskData) => {
    try {
      if (editingTask) {
        await updateTask(editingTask.Id, taskData);
      } else {
        await createTask(taskData);
      }
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(taskId);
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

const handleToggleComplete = async (taskId) => {
    try {
      await toggleTaskCompletion(taskId);
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleRetry = () => {
    refetchTasks();
    refetchCategories();
  };

  const loading = tasksLoading || categoriesLoading;
  const error = tasksError || categoriesError;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <CategorySidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
        taskCounts={taskCounts}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-b border-gray-200 p-6"
        >
<div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {selectedCategory === "all" 
                  ? "All Tasks" 
                  : categories.find(c => c.Id.toString() === selectedCategory)?.name || "Tasks"
                }
              </h1>
              <p className="text-gray-500">
                {filteredTasks.length} {filteredTasks.length === 1 ? "task" : "tasks"}
              </p>
            </div>
            <LogoutButton />
          </div>

          {/* Quick Add Bar */}
          <QuickAddBar
            onAddTask={handleAddTask}
            categories={categories}
            className="mb-4"
          />

          {/* Filter Bar */}
          <FilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            categories={categories}
            taskCounts={taskCounts}
          />
        </motion.div>

        {/* Task List */}
        <div className="flex-1 overflow-y-auto p-6">
          <TaskList
            tasks={filteredTasks}
            categories={categories}
            loading={loading}
            error={error}
            onToggleComplete={handleToggleComplete}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onRetry={handleRetry}
          />
        </div>
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        task={editingTask}
        categories={categories}
        onSave={handleSaveTask}
        title={editingTask ? "Edit Task" : "Create Task"}
      />
    </div>
);
};

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);
  
  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={logout}
      className="flex items-center gap-2"
    >
      <ApperIcon name="LogOut" size={16} />
      Logout
    </Button>
  );
};

export default TaskDashboard;