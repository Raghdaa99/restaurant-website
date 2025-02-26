import axios from "axios";
import type { Review } from "@/types/food";
import type { User } from "@/types/user";

interface User {
  id: string;
  firstname: string;
  lastname: string;
  phone: string;
  password: string;
  token?: string;
  createdAt?: string;
}

const apiClient = axios.create({
  baseURL: "https://67bcb0f8ed4861e07b3b954b.mockapi.io/",
  headers: {
    "Content-Type": "application/json",
  },
});

const apiClient2 = axios.create({
  baseURL: "https://613f1625e9d92a0017e17421.mockapi.io/",
  headers: {
    "Content-Type": "application/json",
  },
});

// User API Client
const userApiClient = axios.create({
  baseURL: "https://67be018d321b883e790ecb5f.mockapi.io",
  headers: {
    "Content-Type": "application/json",
  },
});

// Food related functions
export const fetchFoods = async () => {
  try {
    const response = await apiClient.get("/foods");
    return response.data;
  } catch (error) {
    console.error("Error fetching foods:", error);
    throw error;
  }
};

export const fetchFoodById = async (id: string) => {
  try {
    const response = await apiClient.get(`/foods/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching food by id:", error);
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await apiClient.get("/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const addReview = async (review: Review) => {
  try {
    const response = await apiClient2.post("/reviews", review);
    return response.data;
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
};

export const fetchReviews = async () => {
  try {
    const response = await apiClient2.get("/reviews");
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

// User Management Functions
export const addUser = async (userData: {
  firstname: string;
  lastname: string;
  phone: string;
  password: string;
}) => {
  try {
    const response = await userApiClient.post("/users", {
      ...userData,
      createdAt: new Date().toISOString(),
      token: Math.random().toString(36).substring(2) + Date.now().toString(36),
    });
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await userApiClient.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const updateUser = async (id: string, userData: Partial<User>) => {
  try {
    const response = await userApiClient.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await userApiClient.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// Authentication Functions
export const authApi = {
  login: async (phone: string, password: string) => {
    try {
      const response = await userApiClient.get(`/users?phone=${phone}`);
      const user = response.data[0];

      if (user && user.password === password) {
        const newToken =
          Math.random().toString(36).substring(2) + Date.now().toString(36);
        await updateUser(user.id, { token: newToken });

        return {
          user: {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            phone: user.phone,
          },
          token: newToken,
        };
      }
      throw new Error("Invalid credentials");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  register: async (userData: {
    firstname: string;
    lastname: string;
    phone: string;
    password: string;
  }) => {
    try {
      console.log("Starting registration process...");

      // Check for existing user
      const allUsers = await userApiClient.get("/users");
      const existingUser = allUsers.data.find(
        (user: User) => user.phone === userData.phone
      );

      if (existingUser) {
        throw new Error("User already exists");
      }

      // Create new user
      const response = await addUser(userData);

      return {
        user: {
          id: response.id,
          firstname: response.firstname,
          lastname: response.lastname,
          phone: response.phone,
        },
        token: response.token,
      };
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  },

  getUser: async (userId: string) => {
    try {
      const response = await userApiClient.get(`/users/${userId}`);
      const user = response.data;
      return {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        phone: user.phone,
      };
    } catch (error) {
      console.error("Get user error:", error);
      throw error;
    }
  },

  logout: async (userId: string) => {
    try {
      await updateUser(userId, { token: "" });
      return true;
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  },

  verifyToken: async (userId: string, token: string) => {
    try {
      const response = await userApiClient.get(`/users/${userId}`);
      const user = response.data;
      return user.token === token;
    } catch (error) {
      console.error("Token verification error:", error);
      return false;
    }
  },
};
