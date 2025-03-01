
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
    (isNaN(parseInt(userData.value.phone)) || userData.value.phone.length < 8),
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
      ? "First name must be letters only. "
      : "",
  lastname:
    touched.value.lastname && userData.value.lastname.trim().length === 0
      ? "Last name is required"
      : !containsOnlyLetters(userData.value.lastname)
      ? "Last name must be letters only."
      : "",
  phone: "Invalid phone number",
  password: "Password must be at least 6 characters",
  confirmPassword: "Passwords do not match",
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
        {{ $t('auth.signUp') }}
      </h1>

      <form @submit.prevent="handleSubmit">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <InputField
              :label="$t('auth.firstName')"
              v-model="userData.firstname"
              @blur="markTouched('firstname')"
              :placeholder="$t('auth.enterFirstName')"
            />
            <p v-if="errors.firstname" class="text-danger text-sm">
              {{ errorMessages.firstname }}
            </p>
          </div>
          <div>
            <InputField
              :label="$t('auth.lastName')"
              v-model="userData.lastname"
              @blur="markTouched('lastname')"
              :placeholder="$t('auth.enterLastName')"
            />
            <p v-if="errors.lastname" class="text-danger text-sm">
              {{ errorMessages.lastname }}
            </p>
          </div>
        </div>

        <div class="mb-4">
          <InputField
            :label="$t('auth.phoneNumber')"
            type="tel"
            v-model="userData.phone"
            @blur="markTouched('phone')"
            :placeholder="$t('auth.enterPhoneNumber')"
          />
          <p v-if="errors.phone" class="text-danger text-sm">
            {{ errorMessages.phone }}
          </p>
        </div>

        <div class="mb-4">
          <InputField
            :label="$t('auth.password')"
            type="password"
            v-model="userData.password"
            @blur="markTouched('password')"
            :placeholder="$t('auth.enterPassword')"
          />
          <p v-if="errors.password" class="text-danger text-sm">
            {{ errorMessages.password }}
          </p>
        </div>

        <div class="mb-6">
          <InputField
            :label="$t('auth.confirmPassword')"
            type="password"
            v-model="userData.confirmPassword"
            @blur="markTouched('confirmPassword')"
            :placeholder="$t('auth.confirmPassword')"
          />
          <p v-if="errors.confirmPassword" class="text-danger text-sm">
            {{ errorMessages.confirmPassword }}
          </p>
        </div>
        <button 
  type="submit"
  class="w-full flex justify-center items-center button-hover-effect bg-primary text-white py-2 px-4 rounded-lg font-semibold hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
>
  <span>{{ $t('auth.createAccount') }}</span>
</button>

      </form>

      <p class="mt-4 text-center text-gray text-sm">
        {{ $t('auth.alreadyHaveAccount') }}
        <a href="/signin" class="text-primary hover:text-primary font-semibold"
          >{{ $t('auth.signIn') }}</a
        >
      </p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "vue-router";
import InputField from "@/components/UI/InputField.vue";
import Swal from "sweetalert2";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const userStore = useUserStore();
const router = useRouter();

const userData = ref({
  firstname: "",
  lastname: "",
  phone: "",
  password: "",
  confirmPassword: ""
});

const touched = ref<{ [key: string]: boolean }>({});

const containsOnlyLetters = (text: string) => /^[\u0600-\u06FFa-zA-Z\s]+$/.test(text);

const errors = computed(() => ({
  firstname: touched.value.firstname && 
    (userData.value.firstname.trim().length === 0 || !containsOnlyLetters(userData.value.firstname)),
  lastname: touched.value.lastname && 
    (userData.value.lastname.trim().length === 0 || !containsOnlyLetters(userData.value.lastname)),
  phone: touched.value.phone && 
    (isNaN(parseInt(userData.value.phone)) || userData.value.phone.length < 8),
  password: touched.value.password && userData.value.password.length < 6,
  confirmPassword: touched.value.confirmPassword && 
    userData.value.confirmPassword !== userData.value.password,
}));

const errorMessages = computed(() => ({
  firstname: touched.value.firstname && userData.value.firstname.trim().length === 0 
    ? t('auth.firstnameRequired') 
    : !containsOnlyLetters(userData.value.firstname) 
    ? t('auth.firstnameMustBeLettersOnly')
    : "",
  lastname: touched.value.lastname && userData.value.lastname.trim().length === 0
    ? t('auth.lastnameRequired')
    : !containsOnlyLetters(userData.value.lastname)
    ? t('auth.lastnameMustBeLettersOnly')
    : "",
  phone: t('auth.invalidPhoneNumber'),
  password: t('auth.passwordValidation'),
  confirmPassword: t('auth.passwordsDoNotMatch')
}));

function markTouched(field: string) {
  touched.value[field] = true;
}

async function handleSubmit() {
  Object.keys(userData.value).forEach(markTouched);

  if (Object.values(errors.value).some((err) => err)) {
    await Swal.fire({
      icon: "error",
      title: t('auth.validationError'),
      text: t('auth.pleaseFixErrorsBeforeSubmitting'),
      confirmButtonColor: "#c70039",
    });
    return;
  }

  try {
    const result = await userStore.register({
      firstname: userData.value.firstname,
      lastname: userData.value.lastname,
      phone: userData.value.phone,
      password: userData.value.password
    });

    if (result.success) {
      await Swal.fire({
        icon: "success",
        title: t('auth.accountCreated'),
        text: t('auth.pleaseSignInToContinue'),
        timer: 2000,
        showConfirmButton: false,
      });
      router.push({ 
        name: "SignIn",
        query: { phone: userData.value.phone }
      });
      window.scrollTo(0, 0);
    } else {
      await Swal.fire({
        icon: "error",
        title: t('auth.registrationFailed'),
        text: result.error || t('auth.failedToCreateAccount'),
        confirmButtonColor: "#c70039",
      });
    }
  } catch (error) {
    await Swal.fire({
      icon: "error",
      title: t('auth.error'),
      text: t('auth.anErrorOccurredWhileCreatingYourAccount'),
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
