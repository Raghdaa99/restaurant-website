<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import Button from '@/components/UI/Button.vue';

const useReservationValidation = () => {
  const formData = ref({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    message: ''
  });

  const touched = ref<{ [key: string]: boolean }>({});

  const errors = computed(() => ({
    firstName: touched.value.firstName && formData.value.firstName.trim().length === 0,
    lastName: touched.value.lastName && formData.value.lastName.trim().length === 0,
    phoneNumber: touched.value.phoneNumber && (isNaN(parseInt(formData.value.phoneNumber)) || formData.value.phoneNumber.length < 8),
    message: touched.value.message && formData.value.message.trim().length === 0
  }));

  const markTouched = (field: string) => {
    touched.value[field] = true;
  };

  return {
    formData,
    touched,
    errors,
    markTouched
  };
};

const { formData, touched, errors, markTouched } = useReservationValidation();
const router = useRouter();

const handleSubmit = () => {
  Object.keys(formData.value).forEach(field => {
    markTouched(field);
  });

  const hasEmptyFields = Object.values(formData.value).some(value => !value.trim());
  const isValidPhone = !isNaN(parseInt(formData.value.phoneNumber)) && 
                      formData.value.phoneNumber.length >= 8;
  const hasErrors = Object.values(errors.value).some(error => error);

  if (hasEmptyFields || !isValidPhone || hasErrors) {
    alert('Please fill in all required fields correctly');
    return;
  }

  try {
    const userPhoneNumber = formData.value.phoneNumber;
    const storedReservations = JSON.parse(localStorage.getItem('reservations') || '{}');
    
    if (!storedReservations[userPhoneNumber]) {
      storedReservations[userPhoneNumber] = [];
    }
    
    storedReservations[userPhoneNumber].push({
      ...formData.value,
      timestamp: new Date().toISOString()
    });
    
    localStorage.setItem('reservations', JSON.stringify(storedReservations));
    
    alert('Reservation submitted successfully!');
    
    router.push({ name: 'Home' });
    window.scrollTo(0, 0);
  } catch (error) {
    alert('Error saving data. Please try again.');
    console.error('Error saving reservation:', error);
  }
};
</script>

<template>
  <section class="flex items-center justify-center min-h-screen w-full bg-cover bg-center bg-no-repeat main-section font-space-grotesk pt-48 pb-24">
    <div class="flex flex-col mb-4 md:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-full md:w-3/4 max-w-4xl mx-4 md:mx-0">
      <div class="w-full md:w-1/2 bg-gray-100 flex">
        <img 
          src="../assets/images/reservation/left-section.jpeg" 
          alt="Booking Illustration" 
          class="w-full h-48 md:h-full object-cover object-center animate-left-img" 
        />
      </div>

      <div class="w-full md:w-1/2 p-6 md:p-8 animate-right-section">
        <h2 class="text-2xl font-bold text-gray-900 text-center mb-6">
          Make a reservation
        </h2>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="mb-6">
            <label class="block text-black mb-1 text-sm" for="first-name">
              First Name
            </label>
            <input 
              type="text" 
              id="first-name" 
              v-model="formData.firstName"
              placeholder="Enter your first name"
              @blur="markTouched('firstName')"
              class="w-full px-4 py-2 border rounded-md bg-gray-200 focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <p v-if="errors.firstName" class="text-danger text-sm">
              First name is required
            </p>
          </div>

          <div class="mb-6">
            <label class="block text-black mb-1 text-sm" for="last-name">
              Last Name
            </label>
            <input 
              type="text" 
              id="last-name"
              v-model="formData.lastName"
              placeholder="Enter your last name"
              @blur="markTouched('lastName')"
              class="w-full px-4 py-2 border rounded-md bg-gray-200 focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <p v-if="errors.lastName" class="text-danger text-sm">
              Last name is required
            </p>
          </div>

          <div class="mb-6">
            <label class="block text-black mb-1 text-sm" for="phone-number">
              Phone Number
            </label>
            <input 
              type="tel"
              id="phone-number"
              v-model="formData.phoneNumber"
              placeholder="Enter your phone number"
              @blur="markTouched('phoneNumber')"
              class="w-full px-4 py-2 border rounded-md bg-gray-200 focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <p v-if="errors.phoneNumber" class="text-danger text-sm">
              Invalid phone number
            </p>
          </div>

          <div class="mb-6">
            <label class="block text-black mb-1 text-sm" for="message">
              Message
            </label>
            <textarea 
              id="message"
              v-model="formData.message"
              placeholder="Type your message here"
              @blur="markTouched('message')"
              class="w-full px-4 py-2 border rounded-md h-24 bg-gray-200 focus:ring-2 focus:ring-blue-500 text-sm"
            ></textarea>
            <p v-if="errors.message" class="text-danger text-sm">
              Message is required
            </p>
          </div>

          <Button title="Send" class="w-full justify-center items-center" />
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.main-section {
  background-image: url('../assets/images/reservation/background2.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-color: white;
}

@keyframes leftImage {
  0% {
    transform: translateX(-100%) scale(0.8);
    opacity: 0;
  }
  100% {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
}

@keyframes rightSection {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-left-img {
  animation: leftImage 1s ease-out forwards;
}

.animate-right-section {
  opacity: 0;
  animation: rightSection 1s ease-out forwards;
}

input, textarea {
  color: gray;
}
</style>