import { toast } from 'react-toastify';

export const taskService = {
  // Get all tasks
  async getAll() {
    try {
      const tableName = 'task';
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "priority" } },
          { field: { Name: "due_date" } },
          { field: { Name: "completed" } },
          { field: { Name: "created_at" } },
          { field: { Name: "completed_at" } },
          { field: { Name: "category_id" } }
        ]
      };
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const response = await apperClient.fetchRecords(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      
      if (!response.data || response.data.length === 0) {
        return [];
      }
      
      return response.data.map(item => ({
        Id: item.Id,
        title: item.title,
        description: item.description,
        categoryId: item.category_id ? item.category_id.toString() : '',
        priority: item.priority,
        dueDate: item.due_date,
        completed: item.completed === 'true' || item.completed === true,
        createdAt: item.created_at,
        completedAt: item.completed_at
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  // Get task by ID
  async getById(id) {
    try {
      const tableName = 'task';
      const recordId = parseInt(id);
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "priority" } },
          { field: { Name: "due_date" } },
          { field: { Name: "completed" } },
          { field: { Name: "created_at" } },
          { field: { Name: "completed_at" } },
          { field: { Name: "category_id" } }
        ]
      };
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const response = await apperClient.getRecordById(tableName, recordId, params);
      
      if (!response || !response.data) {
        throw new Error(`Task with ID ${id} not found`);
      }
      
      return {
        Id: response.data.Id,
        title: response.data.title,
        description: response.data.description,
        categoryId: response.data.category_id ? response.data.category_id.toString() : '',
        priority: response.data.priority,
        dueDate: response.data.due_date,
        completed: response.data.completed === 'true' || response.data.completed === true,
        createdAt: response.data.created_at,
        completedAt: response.data.completed_at
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching task with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  // Create new task
  async create(taskData) {
    try {
      const tableName = 'task';
      
      const params = {
        records: [
          {
            Name: taskData.title,
            title: taskData.title,
            description: taskData.description,
            priority: taskData.priority === 1 ? 'Low Priority' : taskData.priority === 2 ? 'Medium Priority' : 'High Priority',
            due_date: taskData.dueDate,
            completed: 'false',
            created_at: new Date().toISOString(),
            completed_at: null,
            category_id: parseInt(taskData.categoryId)
          }
        ]
      };
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const response = await apperClient.createRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulRecords.length > 0) {
          const newTask = successfulRecords[0].data;
          return {
            Id: newTask.Id,
            title: newTask.title,
            description: newTask.description,
            categoryId: newTask.category_id ? newTask.category_id.toString() : '',
            priority: newTask.priority === 'Low Priority' ? 1 : newTask.priority === 'Medium Priority' ? 2 : 3,
            dueDate: newTask.due_date,
            completed: newTask.completed === 'true' || newTask.completed === true,
            createdAt: newTask.created_at,
            completedAt: newTask.completed_at
          };
        }
      }
      
      throw new Error('Failed to create task');
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating task:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  // Update task
  async update(id, updates) {
    try {
      const tableName = 'task';
      
      const updateData = {
        Id: parseInt(id)
      };
      
      if (updates.title !== undefined) {
        updateData.Name = updates.title;
        updateData.title = updates.title;
      }
      if (updates.description !== undefined) updateData.description = updates.description;
      if (updates.priority !== undefined) {
        updateData.priority = updates.priority === 1 ? 'Low Priority' : updates.priority === 2 ? 'Medium Priority' : 'High Priority';
      }
      if (updates.dueDate !== undefined) updateData.due_date = updates.dueDate;
      if (updates.completed !== undefined) {
        updateData.completed = updates.completed.toString();
        updateData.completed_at = updates.completed ? new Date().toISOString() : null;
      }
      if (updates.categoryId !== undefined) updateData.category_id = parseInt(updates.categoryId);
      
      const params = {
        records: [updateData]
      };
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const response = await apperClient.updateRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulUpdates.length > 0) {
          const updatedTask = successfulUpdates[0].data;
          return {
            Id: updatedTask.Id,
            title: updatedTask.title,
            description: updatedTask.description,
            categoryId: updatedTask.category_id ? updatedTask.category_id.toString() : '',
            priority: updatedTask.priority === 'Low Priority' ? 1 : updatedTask.priority === 'Medium Priority' ? 2 : 3,
            dueDate: updatedTask.due_date,
            completed: updatedTask.completed === 'true' || updatedTask.completed === true,
            createdAt: updatedTask.created_at,
            completedAt: updatedTask.completed_at
          };
        }
      }
      
      throw new Error('Failed to update task');
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating task:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  // Delete task
  async delete(id) {
    try {
      const tableName = 'task';
      
      const params = {
        RecordIds: [parseInt(id)]
      };
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const response = await apperClient.deleteRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        return successfulDeletions.length > 0;
      }
      
      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting task:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  // Toggle task completion
  async toggleCompletion(id) {
    try {
      // First get the current task
      const currentTask = await this.getById(id);
      
      // Update with toggled completion status
      const updatedTask = await this.update(id, {
        completed: !currentTask.completed
      });
      
      return updatedTask;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error toggling task completion:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  }
};