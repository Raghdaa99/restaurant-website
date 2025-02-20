<script lang="ts" setup>
import { ref, computed } from "vue";

const loginData = ref({
  phone: "",
  password: "",
});

const touched = ref<{ [key: string]: boolean }>({});

const errors = computed(() => {
  return {
    phone:
      touched.value.phone &&
      (isNaN(parseInt(loginData.value.phone)) || loginData.value.phone.length < 8),
    password: touched.value.password && loginData.value.password.length < 6,
  };
});

function markTouched(field: string) {
  touched.value[field] = true;
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen font-space-grotesk">
    <div class="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
      <img
        class="block mx-auto w-32 my-0 p-0"
        src="../../assets/images/LazeezLogo-2.png"
        alt=""
      />
      <h1 class="text-2xl font-bold text-center text-black mb-4">
        Sign In to Your Account
      </h1>

      <form>
        <div class="mb-4">
          <label for="phone" class="block text-black mb-2 font-medium">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            v-model="loginData.phone"
            placeholder="Phone Number"
            @blur="markTouched('phone')"
            class="w-full px-3 py-2 border border-gray-300 rounded-md text-gray"
          />
          <p v-if="errors.phone" class="text-danger text-sm">
            Invalid phone number
          </p>
        </div>

        <div class="mb-6">
          <label for="password" class="block text-black mb-2 font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            v-model="loginData.password"
            placeholder="Password"
            @blur="markTouched('password')"
            class="w-full px-3 py-2 border border-gray-300 rounded-md text-gray"
          />
          <p v-if="errors.password" class="text-danger text-sm">
            Password must be at least 6 characters
          </p>
        </div>

        <button
          type="submit"
          class="w-full py-2 px-4 bg-primary hover:bg-primary-dark transition duration-200 text-black rounded-md font-bold text-sm"
        >
          Sign In
        </button>
      </form>

      <p class="mt-4 text-center text-gray text-sm">
        Don't have an account?
        <a href="/sign-up" class="text-primary hover:text-primary font-semibold">
          Sign up
        </a>
      </p>
    </div>
  </div>
</template>
