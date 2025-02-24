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
        Create an Account
      </h1>

      <form @submit.prevent="handleSubmit">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <InputField
              label="First Name"
              v-model="userStore.userData.firstname"
              @blur="markTouched('firstname')"
              placeholder="Enter your first name"
            />
            <p v-if="errors.firstname" class="text-danger text-sm">
              First name is required
            </p>
          </div>
          <div>
            <InputField
              label="Last Name"
              v-model="userStore.userData.lastname"
              @blur="markTouched('lastname')"
              placeholder="Enter your last name"
            />
            <p v-if="errors.lastname" class="text-danger text-sm">
              Last name is required
            </p>
          </div>
        </div>

        <div class="mb-4">
          <InputField
            label="Phone Number"
            type="tel"
            v-model="userStore.userData.phone"
            @blur="markTouched('phone')"
            placeholder="Enter your phone number"
          />
          <p v-if="errors.phone" class="text-danger text-sm">
            Invalid phone number
          </p>
        </div>

        <div class="mb-4">
          <InputField
            label="Password"
            type="password"
            v-model="userStore.userData.password"
            @blur="markTouched('password')"
            placeholder="Enter your password"
          />
          <p v-if="errors.password" class="text-danger text-sm">
            Password must be at least 6 characters
          </p>
        </div>

        <div class="mb-6">
          <InputField
            label="Confirm Password"
            type="password"
            v-model="userStore.userData.confirmPassword"
            @blur="markTouched('confirmPassword')"
            placeholder="Confirm your password"
          />
          <p v-if="errors.confirmPassword" class="text-danger text-sm">
            Passwords do not match
          </p>
        </div>

        <button 
  type="submit"
  class="w-full flex justify-center items-center button-hover-effect bg-primary text-white py-2 px-4 rounded-lg font-semibold hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
>
  <span>Create Account</span>
</button>
      </form>

      <p class="mt-4 text-center text-gray text-sm">
        Already have an account?
        <a href="/signin" class="text-primary hover:text-primary font-semibold"
          >Sign in</a
        >
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "vue-router";
import InputField from "@/components/ui/InputField.vue";

const userStore = useUserStore();
const router = useRouter();

const touched = ref<{ [key: string]: boolean }>({});

const errors = computed(() => ({
  firstname:
    touched.value.firstname && userStore.userData.firstname.trim().length === 0,
  lastname:
    touched.value.lastname && userStore.userData.lastname.trim().length === 0,
  phone:
    touched.value.phone &&
    (isNaN(parseInt(userStore.userData.phone)) ||
      userStore.userData.phone.length < 8),
  password: touched.value.password && userStore.userData.password.length < 6,
  confirmPassword:
    touched.value.confirmPassword &&
    userStore.userData.confirmPassword !== userStore.userData.password,
}));

function markTouched(field: string) {
  touched.value[field] = true;
}

function handleSubmit() {
  Object.keys(userStore.userData).forEach(markTouched);

  if (Object.values(errors.value).some((err) => err)) {
    alert("Please fix errors before submitting.");
    return;
  }

  const success = userStore.saveUser(userStore.userData);
  if (success) {
    alert("Account created successfully!");
    router.push({ name: "SignIn" });
    window.scrollTo(0, 0);
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

.button {
  background-color: var(--primary-color);
  transition: transform 0.2s ease-in-out;
}

.button:hover {
  transform: scale(1.05);
  background-color: var(--primary-dark-color);
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
