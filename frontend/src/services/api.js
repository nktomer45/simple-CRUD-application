const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Mock data for development/demo purposes
const MOCK_USERS = [
  {
    id: '1',
    user: 'John Doe',
    email: 'john@example.com',
    age: 28,
    mobile: 1234567890,
    interest: ['Programming', 'Reading']
  },
  {
    id: '2',
    user: 'Jane Smith',
    email: 'jane@example.com',
    age: 32,
    mobile: 9876543210,
    interest: ['Design', 'Photography']
  },
  {
    id: '3',
    user: 'Mike Johnson',
    email: 'mike@example.com',
    age: 35,
    mobile: 5554443333,
    interest: ['Sports', 'Music', 'Travel']
  }
];

export const api = {
  // Get all users
  getUsers: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      return data.data || [];
    
    } catch (error) {
      console.error('Failed to fetch users:', error);
      throw error;
    }
  },
  
  // Get a user by ID
  getUserById: async (id) => {
    try {
  
      const response = await fetch(`${API_BASE_URL}/api/users/${id}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      return data.data;
      
    } catch (error) {
      console.error(`Failed to fetch user with ID ${id}:`, error);
      throw error;
    }
  },
  
  // Create a new user
  createUser: async (userData) => {
    try {
      
      const response = await fetch(`${API_BASE_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error: ${response.status}`);
      }
      
      const data = await response.json();
      return data.data;

    } catch (error) {
      console.error('Failed to create user:', error);
      throw error;
    }
  },
  
  // Update an existing user
  updateUser: async (id, userData) => {
    try {
     
      const response = await fetch(`${API_BASE_URL}/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error: ${response.status}`);
      }
      
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error(`Failed to update user with ID ${id}:`, error);
      throw error;
    }
  },
  
  // Delete a user
  deleteUser: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      return { success: true };
      
    } catch (error) {
      console.error(`Failed to delete user with ID ${id}:`, error);
      throw error;
    }
  }
};