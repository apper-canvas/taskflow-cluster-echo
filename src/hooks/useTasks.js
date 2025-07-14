import { useState, useEffect } from "react";
import { taskService } from "@/services/api/taskService";
import { toast } from "react-toastify";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData);
      setTasks(prev => [...prev, newTask]);
      toast.success("Task created successfully");
      return newTask;
    } catch (err) {
      toast.error("Failed to create task");
      throw err;
    }
  };

  const updateTask = async (id, updates) => {
    try {
      const updatedTask = await taskService.update(id, updates);
      setTasks(prev => prev.map(t => t.Id === parseInt(id) ? updatedTask : t));
      toast.success("Task updated successfully");
      return updatedTask;
    } catch (err) {
      toast.error("Failed to update task");
      throw err;
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskService.delete(id);
      setTasks(prev => prev.filter(t => t.Id !== parseInt(id)));
      toast.success("Task deleted successfully");
    } catch (err) {
      toast.error("Failed to delete task");
      throw err;
    }
  };

  const toggleTaskCompletion = async (id) => {
    try {
      const updatedTask = await taskService.toggleCompletion(id);
      setTasks(prev => prev.map(t => t.Id === parseInt(id) ? updatedTask : t));
      
      if (updatedTask.completed) {
        toast.success("Task completed! 🎉");
      } else {
        toast.info("Task marked as incomplete");
      }
      
      return updatedTask;
    } catch (err) {
      toast.error("Failed to update task");
      throw err;
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    refetch: loadTasks
  };
};