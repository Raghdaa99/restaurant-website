
<script lang="ts" setup>
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "vue-router";
import InputField from "@/components/UI/InputField.vue";
import Swal from "sweetalert2";

const userStore = useUserStore();
const router = useRouter();

const userData = ref({
  firstname: "",
  lastname: "",
  phone: "",
  password: "",
  confirmPassword: "",
});

const touched = ref<{ [key: string]: boolean }>({});
const containsOnlyLetters = (text: string) =>
  /^[\u0600-\u06FFa-zA-Z\s]+$/.test(text);

const containsOnlyNumbers = (text: string) => /^[0-9]+$/.test(text);

const errors = computed(() => ({
  firstname:
    touched.value.firstname &&
    (userData.value.firstname.trim().length === 0 ||
      !containsOnlyLetters(userData.value.firstname)),
  lastname:
    touched.value.lastname &&
    (userData.value.lastname.trim().length === 0 ||
      !containsOnlyLetters(userData.value.lastname)),
  phone:
    touched.value.phone &&
    (userData.value.phone.trim().length === 0 ||
      !containsOnlyNumbers(userData.value.phone) ||
      userData.value.phone.length < 8),
  password: touched.value.password && userData.value.password.length < 6,
  confirmPassword:
    touched.value.confirmPassword &&
    userData.value.confirmPassword !== userData.value.password,
}));

const errorMessages = computed(() => ({
  firstname:
    touched.value.firstname && userData.value.firstname.trim().length === 0
      ? "First name is required"
      : !containsOnlyLetters(userData.value.firstname)
      ? "First name must contain only letters."
      : "",
  lastname:
    touched.value.lastname && userData.value.lastname.trim().length === 0
      ? "Last name is required"
      : !containsOnlyLetters(userData.value.lastname)
      ? "Last name must contain only letters."
      : "",
  phone:
    touched.value.phone && userData.value.phone.trim().length === 0
      ? "Phone number is required"
      : !containsOnlyNumbers(userData.value.phone)
      ? "Phone number must contain only digits."
      : userData.value.phone.length < 8
      ? "Phone number must be at least 8 digits."
      : "",
      password:
  touched.value.password && userData.value.password.length < 6
    ? "Password must contain at least 6 characters."
    : "",
  confirmPassword:
    touched.value.confirmPassword &&
    userData.value.confirmPassword !== userData.value.password
      ? "Passwords do not match."
      : "",
}));

function markTouched(field: string) {
  touched.value[field] = true;
}

async function handleSubmit() {
  // Mark all fields as touched to show errors if they exist
  Object.keys(userData.value).forEach(markTouched);

  if (Object.values(errors.value).some((err) => err)) {
    await Swal.fire({
      icon: "error",
      title: "Validation Error",
      text: "Please fix the errors before submitting.",
      confirmButtonColor: "#c70039",
    });
    return;
  }
  
  //useStore.register(firstname,lastname,phone,password);
  // Sending the new user's data to the API.
  // If the user already exists, the process will fail.
  // If the user doesn't exist, the data will be successfully stored in the API.
  try {
    const result = await userStore.register({
      firstname: userData.value.firstname,
      lastname: userData.value.lastname,
      phone: userData.value.phone,
      password: userData.value.password,
    });

    if (result.success) {
      await Swal.fire({
        icon: "success",
        title: "Account Created!",
        text: "Please sign in to continue.",
        timer: 2000,
        showConfirmButton: false,
      });
      router.push({
        name: "SignIn",
        query: { phone: userData.value.phone },
      });
      window.scrollTo(0, 0);
    } else {
      await Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: result.error || "Failed to create account",
        confirmButtonColor: "#c70039",
      });
    }
  } catch (error) {
    await Swal.fire({
      icon: "error",
      title: "Error",
      text: "An error occurred while creating your account",
      confirmButtonColor: "#c70039",
    });
  }
}
</script>

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
              v-model="userData.firstname"
              @blur="markTouched('firstname')"
              placeholder="Enter your first name"
            />
            <p v-if="errors.firstname" class="text-danger text-sm">
              {{ errorMessages.firstname }}
            </p>
          </div>
          <div>
            <InputField
              label="Last Name"
              v-model="userData.lastname"
              @blur="markTouched('lastname')"
              placeholder="Enter your last name"
            />
            <p v-if="errors.lastname" class="text-danger text-sm">
              {{ errorMessages.lastname }}
            </p>
          </div>
        </div>

        <div class="mb-4">
          <InputField
            label="Phone Number"
            type="tel"
            v-model="userData.phone"
            @blur="markTouched('phone')"
            placeholder="Enter your phone number"
          />
          <p v-if="errors.phone" class="text-danger text-sm">
            {{ errorMessages.phone }}
          </p>
        </div>

        <div class="mb-4">
          <InputField
            label="Password"
            type="password"
            v-model="userData.password"
            @blur="markTouched('password')"
            placeholder="Enter your password"
          />
          <p v-if="errors.password" class="text-danger text-sm">
            {{ errorMessages.password }}
          </p>
        </div>

        <div class="mb-6">
          <InputField
            label="Confirm Password"
            type="password"
            v-model="userData.confirmPassword"
            @blur="markTouched('confirmPassword')"
            placeholder="Confirm your password"
          />
          <p v-if="errors.confirmPassword" class="text-danger text-sm">
            {{ errorMessages.confirmPassword }}
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
