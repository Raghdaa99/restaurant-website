import { defineStore } from "pinia";
import { ref } from "vue";
import { authApi } from "@/services/apiService";

interface UserState {
  id: string;
  firstname: string;
  lastname: string;
  phone: string;
}

export const useUserStore = defineStore(
  "user",
  () => {
    const isAuthenticated = ref(false);
    const userData = ref<UserState | null>(null);
    const token = ref<string | null>(null);

    // التحقق من حالة المصادقة عند بدء التطبيق
    const initAuth = async () => {
      const savedUserId = localStorage.getItem("userId");
      const savedToken = localStorage.getItem("token");

      if (savedUserId && savedToken) {
        const isValid = await authApi.verifyToken(savedUserId, savedToken);
        if (isValid) {
          isAuthenticated.value = true;
          token.value = savedToken;
          // استرجاع بيانات المستخدم
          const response = await authApi.getUser(savedUserId);
          userData.value = response;
        } else {
          // مسح البيانات غير الصالحة
          localStorage.removeItem("userId");
          localStorage.removeItem("token");
        }
      }
    };

    const login = async (phone: string, password: string): Promise<boolean> => {
      try {
        const response = await authApi.login(phone, password);

        if (response) {
          userData.value = response.user;
          token.value = response.token;
          isAuthenticated.value = true;

          // حفظ البيانات في localStorage
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
        const response = await authApi.register(newUser);

        if (response) {
          // لا نقوم بتخزين أي بيانات في localStorage
          // ولا نقوم بتعيين حالة المصادقة
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
        if (userData.value?.id) {
          await authApi.logout(userData.value.id);
        }

        // مسح البيانات المحلية
        userData.value = null;
        token.value = null;
        isAuthenticated.value = false;
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
      } catch (error) {
        console.error("Logout error:", error);
      }
    };

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
