<script setup lang="ts">
import { useRouter } from 'vue-router';
import InputField from '../components/UI/InputField.vue';
import TextArea from '../components/UI/TextArea.vue';
import { useReservation } from '@/composables/useReservation';

const router = useRouter();
const { formData, errors, touched, markTouched, saveReservation } = useReservation();

const handleSubmit = async () => {
  ['firstName', 'lastName', 'phoneNumber', 'reservationDate', 'hours', 'minutes', 'tableNumber'].forEach(field => {
    markTouched(field);
  });

  if (Object.values(errors.value).some(error => error)) {
    alert('Please fill in all required fields correctly');
    return;
  }

  try {
    await saveReservation();
    alert('Reservation confirmed successfully!');
    router.push({ name: 'Home' });
    window.scrollTo(0, 0);
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    } else {
      alert('An error occurred while saving the reservation. Please try again.');
    }
  }
};
</script>

<template>
  <section class="flex items-center justify-center min-h-screen w-full bg-cover bg-center bg-no-repeat main-section font-salsa pt-48 pb-24">
    <div class="flex flex-col mb-4 md:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-full md:w-3/4 max-w-4xl mx-4 md:mx-0">
      <div class="w-full md:w-1/2 bg-gray-100 flex">
        <img 
          src="../assets/images/reservation/left-section.jpeg" 
          alt="Booking Illustration" 
          class="w-full h-48 md:h-full object-cover object-center animate-left-img" 
        />
      </div>

      <div class="w-full md:w-1/2 p-6 md:p-8 animate-right-section">
        <h2 class="text-2xl font-bold text-gray-900 text-center mb-4">
          Make a reservation
        </h2>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div class="mb-2">
            <label class="font-medium text-lg text-gray-700 block mb-1">
              First Name <span class="text-red-500">*</span>
            </label>
            <InputField
              v-model="formData.firstName"
              placeholder="Enter your first name"
              @blur="markTouched('firstName')"
            />
            <div class="h-2">
              <p v-if="errors.firstName" class="text-red-500 text-sm">
                First name is required
              </p>
            </div>
          </div>

          <div class="mb-2">
            <label class="font-medium text-lg text-gray-700 block mb-1">
              Last Name <span class="text-red-500">*</span>
            </label>
            <InputField
              v-model="formData.lastName"
              placeholder="Enter your last name"
              @blur="markTouched('lastName')"
            />
            <div class="h-2">
              <p v-if="errors.lastName" class="text-red-500 text-sm">
                Last name is required
              </p>
            </div>
          </div>

          <div class="mb-2">
            <label class="font-medium text-lg text-gray-700 block mb-1">
              Phone Number <span class="text-red-500">*</span>
            </label>
            <InputField
              type="tel"
              v-model="formData.phoneNumber"
              placeholder="Enter your phone number"
              @blur="markTouched('phoneNumber')"
            />
            <div class="h-2">
              <p v-if="errors.phoneNumber" class="text-red-500 text-sm">
                Please enter a valid phone number (minimum 8 digits)
              </p>
            </div>
          </div>

          <div class="mb-2">
            <label class="font-medium text-lg text-gray-700 block mb-1">
              Reservation Date <span class="text-red-500">*</span>
            </label>
            <input 
              type="date"
              v-model="formData.reservationDate"
              @blur="markTouched('reservationDate')"
              class="w-full px-4 py-2 border border-primary rounded-md focus:border-primary focus:ring-primary focus:ring-1 transition-all"
              :class="{'border-red-500': errors.reservationDate}"
              :min="new Date().toISOString().split('T')[0]"
            />
            <div class="h-2">
              <p v-if="errors.reservationDate" class="text-red-500 text-sm">
                Please select a valid future date
              </p>
            </div>
          </div>

          <div class="mb-2">
            <label class="font-medium text-lg text-gray-700 block mb-1">
              Reservation Time <span class="text-red-500">*</span>
            </label>
            <div class="flex gap-2">
              <div class="flex-1">
                <InputField
                  v-model="formData.hours"
                  placeholder="Hour (1-12)"
                  @blur="markTouched('hours')"
                />
                <div class="h-2">
                  <p v-if="errors.hours" class="text-red-500 text-sm">
                    Enter valid hour (1-12)
                  </p>
                </div>
              </div>
              
              <div class="flex-1">
                <InputField
                  v-model="formData.minutes"
                  placeholder="Min (0-59)"
                  @blur="markTouched('minutes')"
                />
                <div class="h-2">
                  <p v-if="errors.minutes" class="text-red-500 text-sm">
                    Enter valid minute (0-59)
                  </p>
                </div>
              </div>
              
              <select
                v-model="formData.period"
                class="px-4 py-2 border border-primary rounded-md focus:border-primary focus:ring-primary focus:ring-1 transition-all"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
            <div class="h-2">
              <p v-if="errors.time && !errors.hours && !errors.minutes" class="text-red-500 text-sm">
                Please select a valid future time
              </p>
            </div>
          </div>

          <div class="mb-2">
            <label class="font-medium text-lg text-gray-700 block mb-1">
              Table Number <span class="text-red-500">*</span>
            </label>
            <select
              v-model="formData.tableNumber"
              @blur="markTouched('tableNumber')"
              class="w-full px-4 py-2 border border-primary rounded-md focus:border-primary focus:ring-primary focus:ring-1 transition-all"
              :class="{'border-red-500': errors.tableNumber}"
            >
              <option value="" disabled>Select a table</option>
              <option v-for="number in 29" :key="number" :value="number">{{ number }}</option>
            </select>
            <div class="h-2">
              <p v-if="errors.tableNumber" class="text-red-500 text-sm">
                Please select a table number
              </p>
            </div>
          </div>

          <div class="mb-2">
            <TextArea
              label="Message (Optional)"
              v-model="formData.message"
              placeholder="Type your message here"
              :rows="3"
            />
          </div>

          <button 
            type="submit" 
            class="w-full flex justify-center items-center button-hover-effect bg-primary text-white py-2 px-4 rounded-lg font-semibold hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          >
            Send
          </button>
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
</style>