<script setup lang="ts">
import { useRouter } from "vue-router";
import InputField from "../components/UI/InputField.vue";
import TextArea from "../components/UI/TextArea.vue";
import { useReservation } from "@/composables/useReservation";
import Swal from "sweetalert2";

const router = useRouter();

// Call the composable and extract variables from it
const { formData, errors, touched, markTouched, saveReservation } =
  useReservation();

const handleSubmit = async () => {
  // Mark all fields as touched to show errors if they exist
  Object.keys(formData.value).forEach(markTouched);

  if (Object.values(errors.value).some((error) => error)) {
    Swal.fire({
      title: 'Error!',
      text: 'Please fill in all required fields correctly',
      icon: 'error',
      confirmButtonText: 'OK'
    });
    return;
  }

  try {
    /** 
     * saveReservation 
     * Creates a reservation object and updates the stored reservations.
     * Saves reservation data to localStorage using the phone number as the key.
     * Returns `true` on success and throws an error if it fails.
     */
    await saveReservation();
    Swal.fire({
      title: 'Reservation Confirmed!',
      text: 'Your reservation has been confirmed successfully.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
    router.push({ name: "Home" });
    window.scrollTo(0, 0);
  } catch (error) {
    if (error instanceof Error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while saving the reservation. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }
};
</script>


<template>
  <section
    class="flex items-center justify-center min-h-screen w-full bg-cover bg-center bg-no-repeat main-section font-salsa pt-48 pb-24"
  >
    <div
      class="flex flex-col mb-4 md:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-full md:w-3/4 max-w-4xl mx-4 md:mx-0"
    >
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
              type="number"
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
              Reservation Date & Time <span class="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              v-model="formData.reservationDateTime"
              class="w-full px-4 py-2 border border-primary rounded-md focus:border-primary focus:ring-primary focus:ring-1 transition-all"
              required
            />
          </div>

          <div class="mb-2">
            <label class="font-medium text-lg text-gray-700 block mb-1">
              Number of Guests <span class="text-red-500">*</span>
            </label>
            <InputField
              type="number"
              v-model="formData.peopleCount"
              placeholder="Enter number of guests"
              required
              @blur="markTouched('peopleCount')"
            />
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
  background-image: url("../assets/images/reservation/background2.jpg");
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
