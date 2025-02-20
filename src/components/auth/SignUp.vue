<script lang="ts" setup>
import { ref, computed } from "vue";

const userData = ref({
  firstname: "",
  lastname: "",
  phone: "",
  password: "",
  confirmPassword: "",
});

const errors = computed(() => {
  return {
    firstname:
      touched.value.firstname && userData.value.firstname.trim().length === 0,
    lastname:
      touched.value.lastname && userData.value.lastname.trim().length === 0,
    phone:
      touched.value.phone &&
      (isNaN(parseInt(userData.value.phone)) ||
        userData.value.phone.length < 8),
    password: touched.value.password && userData.value.password.length < 6,
    confirmPassword:
      touched.value.confirmPassword &&
      userData.value.confirmPassword !== userData.value.password,
  };
});

const touched = ref<{ [key: string]: boolean }>({});

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
        Create an Account
      </h1>

      <form>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label for="firstname" class="block text-black mb-2 font-medium"
              >First Name</label
            >
            <input
              type="text"
              id="firstname"
              v-model="userData.firstname"
              placeholder="First Name"
              @blur="markTouched('firstname')"
              class="w-full px-3 py-2 border border-gray-300 rounded-md text-gray focus:ring-2 focus:ring-primary outline-none"
            />
            <p v-if="errors.firstname" class="text-danger text-sm">
              First name is required
            </p>
          </div>
          <div>
            <label for="lastname" class="block text-black mb-2 font-medium"
              >Last Name</label
            >
            <input
              type="text"
              id="lastname"
              v-model="userData.lastname"
              placeholder="Last Name"
              @blur="markTouched('lastname')"
              class="w-full px-3 py-2 border border-gray-300 rounded-md text-gray"
            />
            <p v-if="errors.lastname" class="text-danger text-sm">
              Last name is required
            </p>
          </div>
        </div>

        <div class="mb-4">
          <label for="phone" class="block text-black mb-2 font-medium"
            >Phone Number</label
          >
          <input
            type="tel"
            id="phone"
            v-model="userData.phone"
            placeholder="Phone Number"
            @blur="markTouched('phone')"
            class="w-full px-3 py-2 border border-gray-300 rounded-md text-gray"
          />
          <p v-if="errors.phone" class="text-danger text-sm">
            Invalid phone number
          </p>
        </div>

        <div class="mb-4">
          <label for="password" class="block text-black mb-2 font-medium"
            >Password</label
          >
          <input
            type="password"
            id="password"
            v-model="userData.password"
            placeholder="Password"
            @blur="markTouched('password')"
            class="w-full px-3 py-2 border border-gray-300 rounded-md text-gray"
          />
          <p v-if="errors.password" class="text-danger text-sm">
            Password must be at least 6 characters
          </p>
        </div>

        <div class="mb-6">
          <label
            for="confirm-password"
            class="block text-black mb-2 font-medium"
            >Confirm Password</label
          >
          <input
            type="password"
            id="confirm-password"
            v-model="userData.confirmPassword"
            placeholder="Confirm Password"
            @blur="markTouched('confirmPassword')"
            class="w-full px-3 py-2 border border-gray-300 rounded-md text-gray"
          />
          <p v-if="errors.confirmPassword" class="text-danger text-sm">
            Passwords do not match
          </p>
        </div>

        <button
          type="submit"
          class="w-full py-2 px-4 bg-primary hover:bg-primary-dark transition duration-200 text-black rounded-md font-bold text-sm"
        >
          Create Account
        </button>
      </form>

      <p class="mt-4 text-center text-gray text-sm">
        Already have an account?
        <a href="/sign-in" class="text-primary hover:text-primary font-semibold"
          >Sign in</a
        >
      </p>
    </div>
  </div>
</template>
