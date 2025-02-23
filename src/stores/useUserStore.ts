import { defineStore } from "pinia";
import { ref } from "vue";

interface UserData {
  firstname: string;
  lastname: string;
  phone: string;
  password: string;
  timestamp?: string;
}

export const useUserStore = defineStore("user", () => {
  const userData = ref<UserData>({
    firstname: "",
    lastname: "",
    phone: "",
    password: "",
  });

  const getStoredUsers = (): UserData[] => {
    try {
      return JSON.parse(localStorage.getItem("users") || "[]");
    } catch (error) {
      console.error("Error loading users:", error);
      return [];
    }
  };

  const saveUser = (newUser: UserData): boolean => {
    try {
      const users = getStoredUsers();

      const userExists = users.some((user) => user.phone === newUser.phone);
      if (userExists) {
        alert("This phone number is already registered.");
        return false;
      }

      newUser.timestamp = new Date().toISOString();
      users.push(newUser);

      localStorage.setItem("users", JSON.stringify(users));

      return true;
    } catch (error) {
      console.error("Error saving user data:", error);
      return false;
    }
  };

  return { userData, saveUser };
});
