import categoriesData from "@/services/mockData/categories.json";

let categories = [...categoriesData];

// Helper function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const categoryService = {
  // Get all categories
  async getAll() {
    await delay(200);
    return [...categories];
  },

  // Get category by ID
  async getById(id) {
    await delay(150);
    const category = categories.find(c => c.Id === parseInt(id));
    if (!category) {
      throw new Error(`Category with ID ${id} not found`);
    }
    return { ...category };
  },

  // Create new category
  async create(categoryData) {
    await delay(300);
    const newCategory = {
      ...categoryData,
      Id: Math.max(...categories.map(c => c.Id), 0) + 1,
      taskCount: 0
    };
    categories.push(newCategory);
    return { ...newCategory };
  },

  // Update category
  async update(id, updates) {
    await delay(250);
    const index = categories.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Category with ID ${id} not found`);
    }
    
    const updatedCategory = {
      ...categories[index],
      ...updates,
      Id: parseInt(id) // Ensure ID remains integer
    };
    
    categories[index] = updatedCategory;
    return { ...updatedCategory };
  },

  // Delete category
  async delete(id) {
    await delay(200);
    const index = categories.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Category with ID ${id} not found`);
    }
    const deletedCategory = categories.splice(index, 1)[0];
    return { ...deletedCategory };
  },

  // Update task count for category
  async updateTaskCount(categoryId, count) {
    await delay(150);
    const index = categories.findIndex(c => c.Id === parseInt(categoryId));
    if (index !== -1) {
      categories[index].taskCount = count;
      return { ...categories[index] };
    }
    throw new Error(`Category with ID ${categoryId} not found`);
  }
};