<template>
  <div
    class="main-section flex justify-center items-center min-h-screen pt-48 pb-24 font-salsa"
  >
    <div
      class="w-full max-w-lg p-8 bg-white rounded-lg shadow-md animate-fade-in"
    >
      <img
        class="block mx-auto w-32 my-0 p-0"
        src="../../assets/images/LazeezLogo.svg"
        alt=""
      />
      <h1 class="text-2xl font-bold text-center text-black mb-4">
        {{ $t('auth.signIn') }}         
      </h1>

      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <InputField
            :label="$t('auth.phoneNumber')"
            type="tel"
            :placeholder="$t('auth.phoneNumber')"
            v-model="loginData.phone"
            @blur="markTouched('phone')"
          />
          <p v-if="errors.phone" class="text-danger text-sm">
            {{ $t('auth.invalidPhoneNumber') }}
          </p>
        </div>

        <div class="mb-6">
          <InputField
            :label="$t('auth.password')"
            type="password"
            :placeholder="$t('auth.password')"
            v-model="loginData.password"
            @blur="markTouched('password')"
          />
          <p v-if="errors.password" class="text-danger text-sm">
            {{ $t('auth.passwordValidation') }}
          </p>
        </div>

        <button 
          type="submit"
          class="w-full flex justify-center items-center button-hover-effect bg-primary text-white py-2 px-4 rounded-lg font-semibold hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
        >
          {{ $t('auth.signIn') }}
        </button>
      </form>

      <p class="mt-4 text-center text-gray text-sm">
        {{ $t('auth.dontHaveAccount') }}
        <a href="/signup" class="text-primary hover:text-primary font-semibold"
          >{{ $t('auth.signUp') }}</a
        >
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/useUserStore";
import InputField from "@/components/ui/InputField.vue";
import Swal from "sweetalert2";

const router = useRouter();
const userStore = useUserStore();
const loginData = ref({
  phone: "",
  password: "",
});

const touched = ref<{ [key: string]: boolean }>({});

const errors = computed(() => ({
  phone:
    touched.value.phone &&
    (isNaN(parseInt(loginData.value.phone)) ||
      loginData.value.phone.length < 8),
  password: touched.value.password && loginData.value.password.length < 6,
}));

function markTouched(field: string) {
  touched.value[field] = true;
}

async function handleLogin() {
  Object.keys(loginData.value).forEach(markTouched);
  if (Object.values(errors.value).some((err) => err)) {
    await Swal.fire({
      icon: "error",
      title: "Validation Error",
      text: "Please fix the errors before submitting.",
      confirmButtonColor: "#c70039",
    });
    return;
  }

  try {
    const success = await userStore.login(loginData.value.phone, loginData.value.password);
    
    if (success) {
      await Swal.fire({
        icon: "success",
        title: "Welcome Back!",
        text: "You have successfully logged in.",
        timer: 1500,
        showConfirmButton: false,
      });
      router.push("/");
      window.scrollTo(0, 0);
    } else {
      await Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid phone number or password.",
        confirmButtonColor: "#c70039",
      });
    }
  } catch (error) {
    await Swal.fire({
      icon: "error",
      title: "Error",
      text: "An error occurred during login. Please try again.",
      confirmButtonColor: "#c70039",
    });
  }
}
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 2s ease-out forwards;
}

.button-hover-effect {
  transition: transform 0.2s ease-in-out;
}

.button-hover-effect:hover {
  transform: scale(1.05);
}

.main-section {
  background-image: url("../../assets/images/signin/background.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-color: white;
  animation: backgroundReveal 2s ease-out forwards;
}
</style>
