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
  // تحقق من وجود حالة مخزنة في localStorage
  const storedAuth = localStorage.getItem("isAuthenticated") === "true";
  const storedUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  const isAuthenticated = ref(storedAuth);
  const userData = ref<UserData>({
    firstname: storedUser.firstname || "",
    lastname: storedUser.lastname || "",
    phone: storedUser.phone || "",
    password: storedUser.password || "",
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

      // تسجيل الدخول تلقائياً بعد التسجيل
      userData.value = newUser;
      isAuthenticated.value = true;

      // حفظ حالة تسجيل الدخول
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("currentUser", JSON.stringify(newUser));

      return true;
    } catch (error) {
      console.error("Error saving user data:", error);
      return false;
    }
  };

  const login = (phone: string, password: string): boolean => {
    const users = getStoredUsers();
    const user = users.find(
      (u) => u.phone === phone && u.password === password
    );

    if (user) {
      userData.value = user;
      isAuthenticated.value = true;

      // حفظ حالة تسجيل الدخول
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("currentUser", JSON.stringify(user));

      return true;
    }
    return false;
  };

  const logout = () => {
    userData.value = {
      firstname: "",
      lastname: "",
      phone: "",
      password: "",
    };
    isAuthenticated.value = false;

    // مسح حالة تسجيل الدخول
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("currentUser");
  };

  return {
    userData,
    isAuthenticated,
    saveUser,
    login,
    logout,
  };
});