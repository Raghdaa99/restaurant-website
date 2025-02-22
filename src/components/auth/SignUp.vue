<script lang="ts" setup>
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "vue-router";
import Button from "@/components/UI/Button.vue";

const userStore = useUserStore();
const router = useRouter();

const touched = ref<{ [key: string]: boolean }>({});

const errors = computed(() => ({
  firstname: touched.value.firstname && userStore.userData.firstname.trim().length === 0,
  lastname: touched.value.lastname && userStore.userData.lastname.trim().length === 0,
  phone: touched.value.phone && (isNaN(parseInt(userStore.userData.phone)) || userStore.userData.phone.length < 8),
  password: touched.value.password && userStore.userData.password.length < 6,
  confirmPassword: touched.value.confirmPassword && userStore.userData.confirmPassword !== userStore.userData.password,
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
    router.push({ name: "Home" });
    window.scrollTo(0, 0);
  }
}
</script>


<template>
  <div class="main-section flex justify-center items-center min-h-screen font-space-grotesk pt-48 pb-24">
    <div class="w-full max-w-lg p-8 bg-white rounded-lg shadow-md animate-fade-in">
      <img class="block mx-auto w-32 my-0 p-0" src="../../assets/images/LazeezLogo-2.png" alt="" />
      <h1 class="text-2xl font-bold text-center text-black mb-4">Create an Account</h1>

      <form @submit.prevent="handleSubmit">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label for="firstname" class="block text-black mb-2 font-medium">First Name</label>
            <input type="text" id="firstname" v-model="userStore.userData.firstname" @blur="markTouched('firstname')" class="w-full px-3 py-2 border border-gray-300 rounded-md text-gray" />
            <p v-if="errors.firstname" class="text-danger text-sm">First name is required</p>
          </div>
          <div>
            <label for="lastname" class="block text-black mb-2 font-medium">Last Name</label>
            <input type="text" id="lastname" v-model="userStore.userData.lastname" @blur="markTouched('lastname')" class="w-full px-3 py-2 border border-gray-300 rounded-md text-gray" />
            <p v-if="errors.lastname" class="text-danger text-sm">Last name is required</p>
          </div>
        </div>

        <div class="mb-4">
          <label for="phone" class="block text-black mb-2 font-medium">Phone Number</label>
          <input type="tel" id="phone" v-model="userStore.userData.phone" @blur="markTouched('phone')" class="w-full px-3 py-2 border border-gray-300 rounded-md text-gray" />
          <p v-if="errors.phone" class="text-danger text-sm">Invalid phone number</p>
        </div>

        <div class="mb-4">
          <label for="password" class="block text-black mb-2 font-medium">Password</label>
          <input type="password" id="password" v-model="userStore.userData.password" @blur="markTouched('password')" class="w-full px-3 py-2 border border-gray-300 rounded-md text-gray" />
          <p v-if="errors.password" class="text-danger text-sm">Password must be at least 6 characters</p>
        </div>

        <div class="mb-6">
          <label for="confirm-password" class="block text-black mb-2 font-medium">Confirm Password</label>
          <input type="password" id="confirm-password" v-model="userStore.userData.confirmPassword" @blur="markTouched('confirmPassword')" class="w-full px-3 py-2 border border-gray-300 rounded-md text-gray" />
          <p v-if="errors.confirmPassword" class="text-danger text-sm">Passwords do not match</p>
        </div>

        <Button title="Create Account" class="w-full justify-center items-center button-hover-effect" />
      </form>
      
      <p class="mt-4 text-center text-gray text-sm">
        Already have an account?
        <a href="/signin" class="text-primary hover:text-primary font-semibold">Sign in</a>
      </p>
    </div>
  </div>
</template>


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
  animation: fadeIn 2.0s ease-out forwards;
}

.button-hover-effect {
  transition: transform 0.2s ease-in-out;
}

.button-hover-effect:hover {
  transform: scale(1.05);
}

.main-section {
  background-image: url('../../assets/images/signin/background.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed; 
  background-color: white;
  animation: backgroundReveal 2s ease-out forwards;
}
</style>
