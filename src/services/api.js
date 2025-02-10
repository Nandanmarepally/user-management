// src/services/api.js

// A mock list of users with Indian names and emails
const mockUsers = [
    {
      id: 1,
      firstName: "Nandu",
      lastName: "Marepally",
      email: "nandanmarepally@gmail.com",
      department: "Engineering",
    },
    {
      id: 2,
      firstName: "Isha",
      lastName: "Daniel",
      email: "ishadaniel@gmail.com",
      department: "Marketing",
    },
    {
      id: 3,
      firstName: "Vivaan",
      lastName: "Kishan",
      email: "vivaankishan@gmail.com",
      department: "Finance",
    },
    {
      id: 4,
      firstName: "Priya",
      lastName: "Singh",
      email: "priya.singh@gmail.com",
      department: "HR",
    },
    {
      id: 5,
      firstName: "Arjun",
      lastName: "Mallareddy",
      email: "arjunmallareddy@gmail.com",
      department: "Operations",
    },
  ];
  
  // Fetch all users (using mock data in place of API request)
  export const getUsers = async () => {
    try {
      // Instead of making a real API call, we simulate the response with mock users
      return mockUsers;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  };
  
  // Add a new user (simulating post request for new users)
  export const addUser = async (user) => {
    try {
      // Simulate adding the user to the mock list
      const newUser = { ...user, id: mockUsers.length + 1 }; // Assign new ID
      mockUsers.push(newUser); // Add the new user to the mock list
      return newUser;
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }
  };
  
  // Update an existing user (simulating put request to update a user)
  export const updateUser = async (id, user) => {
    try {
      // Find the user in the mock list and update it
      const index = mockUsers.findIndex((u) => u.id === id);
      if (index !== -1) {
        mockUsers[index] = { ...mockUsers[index], ...user }; // Update the user data
        return mockUsers[index];
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };
  
  // Delete a user (simulating delete request to remove a user)
  export const deleteUser = async (id) => {
    try {
      const index = mockUsers.findIndex((u) => u.id === id);
      if (index !== -1) {
        const deletedUser = mockUsers.splice(index, 1); // Remove the user from the mock list
        return deletedUser[0];
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  };
  