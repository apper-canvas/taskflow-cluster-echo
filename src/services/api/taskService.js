import tasksData from "@/services/mockData/tasks.json";

let tasks = [...tasksData];

// Helper function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const taskService = {
  // Get all tasks
  async getAll() {
    await delay(200);
    return [...tasks];
  },

  // Get task by ID
  async getById(id) {
    await delay(150);
    const task = tasks.find(t => t.Id === parseInt(id));
    if (!task) {
      throw new Error(`Task with ID ${id} not found`);
    }
    return { ...task };
  },

  // Create new task
  async create(taskData) {
    await delay(300);
    const newTask = {
      ...taskData,
      Id: Math.max(...tasks.map(t => t.Id), 0) + 1,
      createdAt: new Date().toISOString(),
      completedAt: null
    };
    tasks.push(newTask);
    return { ...newTask };
  },

  // Update task
  async update(id, updates) {
    await delay(250);
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Task with ID ${id} not found`);
    }
    
    const updatedTask = {
      ...tasks[index],
      ...updates,
      Id: parseInt(id) // Ensure ID remains integer
    };
    
    // Set completedAt timestamp if task is being completed
    if (updates.completed === true && !tasks[index].completed) {
      updatedTask.completedAt = new Date().toISOString();
    } else if (updates.completed === false) {
      updatedTask.completedAt = null;
    }
    
    tasks[index] = updatedTask;
    return { ...updatedTask };
  },

  // Delete task
  async delete(id) {
    await delay(200);
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Task with ID ${id} not found`);
    }
    const deletedTask = tasks.splice(index, 1)[0];
    return { ...deletedTask };
  },

  // Get tasks by category
  async getByCategory(categoryId) {
    await delay(200);
    return tasks.filter(t => t.categoryId === categoryId.toString()).map(t => ({ ...t }));
  },

  // Get tasks by status
  async getByStatus(completed = false) {
    await delay(200);
    return tasks.filter(t => t.completed === completed).map(t => ({ ...t }));
  },

  // Get tasks by priority
  async getByPriority(priority) {
    await delay(200);
    return tasks.filter(t => t.priority === priority).map(t => ({ ...t }));
  },

  // Toggle task completion
  async toggleCompletion(id) {
    await delay(200);
    const task = tasks.find(t => t.Id === parseInt(id));
    if (!task) {
      throw new Error(`Task with ID ${id} not found`);
    }
    
    const updatedTask = {
      ...task,
      completed: !task.completed,
      completedAt: !task.completed ? new Date().toISOString() : null
    };
    
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    tasks[index] = updatedTask;
    return { ...updatedTask };
  }
};