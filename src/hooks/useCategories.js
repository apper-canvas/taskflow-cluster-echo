import { useState, useEffect } from "react";
import { categoryService } from "@/services/api/categoryService";
import { toast } from "react-toastify";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (categoryData) => {
    try {
      const newCategory = await categoryService.create(categoryData);
      setCategories(prev => [...prev, newCategory]);
      toast.success("Category created successfully");
      return newCategory;
    } catch (err) {
      toast.error("Failed to create category");
      throw err;
    }
  };

  const updateCategory = async (id, updates) => {
    try {
      const updatedCategory = await categoryService.update(id, updates);
      setCategories(prev => prev.map(c => c.Id === parseInt(id) ? updatedCategory : c));
      toast.success("Category updated successfully");
      return updatedCategory;
    } catch (err) {
      toast.error("Failed to update category");
      throw err;
    }
  };

  const deleteCategory = async (id) => {
    try {
      await categoryService.delete(id);
      setCategories(prev => prev.filter(c => c.Id !== parseInt(id)));
      toast.success("Category deleted successfully");
    } catch (err) {
      toast.error("Failed to delete category");
      throw err;
    }
  };

  const updateTaskCount = async (categoryId, count) => {
    try {
      const updatedCategory = await categoryService.updateTaskCount(categoryId, count);
      setCategories(prev => prev.map(c => c.Id === parseInt(categoryId) ? updatedCategory : c));
      return updatedCategory;
    } catch (err) {
      console.error("Failed to update task count:", err);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
    updateTaskCount,
    refetch: loadCategories
  };
};