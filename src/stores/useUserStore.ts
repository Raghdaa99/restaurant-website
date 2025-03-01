import { defineStore } from "pinia";
import { ref } from "vue";
import { authApi } from "@/services/apiService";

interface UserState {
  id: string;
  firstname: string;
  lastname: string;
  phone: string;
}

// Retrieve userId and token from localStorage, verify token validity,
// update authentication status if valid, and remove data if the token is invalid.
export const useUserStore = defineStore(
  "user",
  () => {
    const isAuthenticated = ref(false);
    const userData = ref<UserState | null>(null);
    const token = ref<string | null>(null);

    // Retrieve userId and token from localStorage, verify token validity,
    // update authentication status if valid, and remove data if the token is invalid.
    const initAuth = async () => {
      const savedUserId = localStorage.getItem("userId");
      const savedToken = localStorage.getItem("token");

      if (savedUserId && savedToken) {
        const isValid = await authApi.verifyToken(savedUserId, savedToken);
        if (isValid) {
          isAuthenticated.value = true;
          token.value = savedToken;
          const response = await authApi.getUser(savedUserId);
          userData.value = response;
        } else {
          localStorage.removeItem("userId");
          localStorage.removeItem("token");
        }
      }
    };

    const login = async (phone: string, password: string): Promise<boolean> => {
      try {
        //authApi.login()  from apiServices.ts
        // Function to handle user login by verifying phone and password,
        // generating a new authentication token, and returning user data.
        const response = await authApi.login(phone, password);
        if (response) {
          userData.value = response.user;
          // Store the token in the token variable in the store
          token.value = response.token;
          // Set the authentication status to "authenticated" after successful login
          isAuthenticated.value = true;

          // even after closing the browser or refreshing the page
          localStorage.setItem("userId", response.user.id);
          localStorage.setItem("token", response.token);
          return true;
        }

        return false;
      } catch (error) {
        console.error("Login error:", error);
        return false;
      }
    };

    const register = async (newUser: {
      firstname: string;
      lastname: string;
      phone: string;
      password: string;
    }): Promise<{ success: boolean; error?: string }> => {
      try {
        //authApi.register()
        // The function first checks if a user with the same phone number already exists.
        // If not, it creates a new user and returns the user's data along with the authentication token.

        const response = await authApi.register(newUser);

        if (response) {
          return { success: true };
        }
        return { success: false, error: "Failed to create account" };
      } catch (error) {
        console.error("Registration error:", error);
        return {
          success: false,
          error:
            error instanceof Error
              ? error.message
              : "An error occurred during registration",
        };
      }
    };

    const logout = async () => {
      try {
        // Check if the user ID exists; if so, log the user out via the API
        if (userData.value?.id) {
          await authApi.logout(userData.value.id); // Call the logout API using the user ID
        }

        // After logout, reset the store values to their default state
        userData.value = null;
        token.value = null;
        isAuthenticated.value = false;

        // Remove the stored data from localStorage to ensure the user is logged out
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
      } catch (error) {
        // If an error occurs during logout, log the error to the console
        console.error("Logout error:", error);
      }
    };

    /*This function interacts with the isAuthenticated variable,
    which is part of the isAuthenticated state.
    Its value becomes true when the login is successful.
    */
    const checkAuth = (): boolean => {
      return isAuthenticated.value && token.value !== null;
    };

    return {
      userData,
      isAuthenticated,
      token,
      login,
      register,
      logout,
      checkAuth,
      initAuth,
    };
  },
  {
    persist: true,
  }
);
