<script setup lang="ts">
import { useRouter } from 'vue-router';
import InputField from '../components/UI/InputField.vue';
import TextArea from '../components/UI/TextArea.vue';
import { useReservation } from '@/composables/useReservation';
import { useI18n } from 'vue-i18n';
const router = useRouter();
const { formData, errors, touched, markTouched, saveReservation } = useReservation();

const $t = useI18n().t;

const handleSubmit = async () => {
  ['firstName', 'lastName', 'phoneNumber', 'reservationDateTime', 'peopleCount'].forEach(field => {
    markTouched(field);
  });

  if (Object.values(errors.value).some(error => error)) {
    alert($t('required_fields'));
    return;
  }

  try {
    await saveReservation();
    alert($t('reservation_success'));
    router.push({ name: 'Home' });
    window.scrollTo(0, 0);

  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    } else {
      alert($t('error_occurred'));
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
            {{ $t("make_a_reservation") }}
        </h2>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div class="mb-2">
            <label class="font-medium text-lg text-gray-700 block mb-1">
              {{ $t("first_name") }} <span class="text-red-500">*</span>
            </label>
            <InputField
              v-model="formData.firstName"
              :placeholder="$t('enter_your_first_name')"
              @blur="markTouched('firstName')"
            />
            <div class="h-2">
              <p v-if="errors.firstName" class="text-red-500 text-sm">
                {{ $t("first_name_required") }}
              </p>
            </div>
          </div>

          <div class="mb-2">
            <label class="font-medium text-lg text-gray-700 block mb-1">
              {{ $t("last_name") }} <span class="text-red-500">*</span>
            </label>
            <InputField
              v-model="formData.lastName"
              :placeholder="$t('enter_your_last_name')"
              @blur="markTouched('lastName')"
            />
            <div class="h-2">
              <p v-if="errors.lastName" class="text-red-500 text-sm">
                {{ $t("last_name_required") }}
              </p>
            </div>
          </div>

          <div class="mb-2">
            <label class="font-medium text-lg text-gray-700 block mb-1">
              {{ $t("phone_number") }} <span class="text-red-500">*</span>
            </label>
            <InputField
              type="number"
              v-model="formData.phoneNumber"
              :placeholder="$t('enter_your_phone_number')"
              @blur="markTouched('phoneNumber')"
            />
            <div class="h-2">
              <p v-if="errors.phoneNumber" class="text-red-500 text-sm">
                {{ $t("phone_number_required") }}
              </p>
            </div>
          </div>

          <div class="mb-2">
            <label class="font-medium text-lg text-gray-700 block mb-1">
              {{ $t("reservation_date_time") }} <span class="text-red-500">*</span>
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
              {{ $t("number_of_guests") }} <span class="text-red-500">*</span>
            </label>
            <InputField
              type="number"
              v-model="formData.peopleCount"
              :placeholder="$t('enter_number_of_guests')"
              required
              @blur="markTouched('peopleCount')"
            />
          </div>

          <div class="mb-2">
            <TextArea
              :label="$t('message')"
              v-model="formData.message"
              :placeholder="$t('type_your_message_here')"
              :rows="3"
            />
          </div>

          <button 
            type="submit" 
            class="w-full flex justify-center items-center button-hover-effect bg-primary text-white py-2 px-4 rounded-lg font-semibold hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          >
            {{ $t("send") }}
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
