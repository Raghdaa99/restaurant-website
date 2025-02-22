
<script lang="ts" setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/useUserStore"; 
import Button from "@/components/UI/Button.vue";

const router = useRouter();
const userStore = useUserStore();
const loginData = ref({
 phone: "",
 password: "",
});

const touched = ref<{ [key: string]: boolean }>({});

const errors = computed(() => ({
 phone: touched.value.phone &&
   (isNaN(parseInt(loginData.value.phone)) || loginData.value.phone.length < 8),
 password: touched.value.password && loginData.value.password.length < 6,
}));

function markTouched(field: string) {
 touched.value[field] = true;
}

function handleLogin() {
 const users = JSON.parse(localStorage.getItem("users") || "[]");
 const user = users.find(u => u.phone === loginData.value.phone);

 if (user) {
   if (user.password === loginData.value.password) {
     alert("Login Successful!");
     router.push("/");
   } else {
     alert("Invalid password");
     window.scrollTo(0, 0);
   }
 } else {
   alert("No user found. Please sign up first.");
 }
}
</script>

<template>
 <div class="main-section flex justify-center items-center min-h-screen font-space-grotesk pt-48 pb-24">
   <div class="w-full max-w-lg p-8 bg-white rounded-lg shadow-md animate-fade-in">
     <img
       class="block mx-auto w-32 my-0 p-0"
       src="../../assets/images/LazeezLogo-2.png"
       alt=""
     />
     <h1 class="text-2xl font-bold text-center text-black mb-4">Sign In to Your Account</h1>

     <form @submit.prevent="handleLogin">
       <div class="mb-4">
         <label for="phone" class="block text-black mb-2 font-medium">Phone Number</label>
         <input
           type="tel"
           id="phone"
           v-model="loginData.phone"
           placeholder="Phone Number"
           @blur="markTouched('phone')"
           class="w-full px-3 py-2 border border-gray-300 rounded-md text-gray"
         />
         <p v-if="errors.phone" class="text-danger text-sm">Invalid phone number</p>
       </div>

       <div class="mb-6">
         <label for="password" class="block text-black mb-2 font-medium">Password</label>
         <input
           type="password"
           id="password"
           v-model="loginData.password"
           placeholder="Password"
           @blur="markTouched('password')"
           class="w-full px-3 py-2 border border-gray-300 rounded-md text-gray"
         />
         <p v-if="errors.password" class="text-danger text-sm">Password must be at least 6 characters</p>
       </div>

       <Button title="Sign In" class="w-full justify-center items-center button-hover-effect" />
     </form>

     <p class="mt-4 text-center text-gray text-sm">
       Don't have an account? 
       <a href="/signup" class="text-primary hover:text-primary font-semibold">Sign up</a>
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