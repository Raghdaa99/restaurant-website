
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';

const useReservationValidation = () => {
  const formData = ref({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    message: '',
    reservationDate: '',
    hours: '',
    minutes: '',
    period: 'AM',
    tableNumber: '',
  });

  const touched = ref<{ [key: string]: boolean }>({});

  const validatePhoneNumber = (phone: string) => {
    return /^\d{8,}$/.test(phone);
  };

  const validateDate = (date: string) => {
    if (!date) return false;
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  };

  const validateTime = (hours: string, minutes: string, date: string, period: string) => {
    if (!hours || !minutes || !date) return false;
    
    let hour = parseInt(hours);
    const minute = parseInt(minutes);
    
    if (period === 'PM' && hour !== 12) {
      hour += 12;
    } else if (period === 'AM' && hour === 12) {
      hour = 0;
    }
    
    const selectedDateTime = new Date(date);
    selectedDateTime.setHours(hour, minute);
    return selectedDateTime > new Date();
  };

  const errors = computed(() => ({
    firstName: touched.value.firstName && formData.value.firstName.trim().length === 0,
    lastName: touched.value.lastName && formData.value.lastName.trim().length === 0,
    phoneNumber: touched.value.phoneNumber && !validatePhoneNumber(formData.value.phoneNumber),
    reservationDate: touched.value.reservationDate && !validateDate(formData.value.reservationDate),
    time: (touched.value.hours || touched.value.minutes) && 
      !validateTime(formData.value.hours, formData.value.minutes, formData.value.reservationDate, formData.value.period),
    tableNumber: touched.value.tableNumber && !formData.value.tableNumber,
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

const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

const checkTableAvailability = (date: string, hours: string, minutes: string, period: string, tableNumber: string) => {
  try {
    let hour = parseInt(hours);
    if (period === 'PM' && hour !== 12) {
      hour += 12;
    } else if (period === 'AM' && hour === 12) {
      hour = 0;
    }
    
    const formattedTime = `${hour.toString().padStart(2, '0')}:${minutes}`;
    
    const reservationsString = localStorage.getItem('reservations');
    if (!reservationsString) return true;
    
    const reservations = JSON.parse(reservationsString);
    
    for (const phoneNumber in reservations) {
      const userReservations = reservations[phoneNumber];
      const hasConflict = userReservations.some((reservation: any) => 
        reservation.reservationDate === date &&
        reservation.reservationTime === formattedTime &&
        reservation.tableNumber.toString() === tableNumber.toString()
      );
      
      if (hasConflict) return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error checking table availability:', error);
    return false;
  }
};

const handleSubmit = async () => {
  ['firstName', 'lastName', 'phoneNumber', 'reservationDate', 'hours', 'minutes', 'tableNumber'].forEach(field => {
    markTouched(field);
  });

  if (Object.values(errors.value).some(error => error)) {
    alert('Please fill in all required fields correctly');
    return;
  }

  try {
    let hour = parseInt(formData.value.hours);
    if (formData.value.period === 'PM' && hour !== 12) {
      hour += 12;
    } else if (formData.value.period === 'AM' && hour === 12) {
      hour = 0;
    }
    
    const formattedTime = `${hour.toString().padStart(2, '0')}:${formData.value.minutes}`;

    const isTableAvailable = checkTableAvailability(
      formData.value.reservationDate,
      formData.value.hours,
      formData.value.minutes,
      formData.value.period,
      formData.value.tableNumber
    );

    if (!isTableAvailable) {
      alert('Sorry, this table is already reserved at this time. Please choose another time or table.');
      return;
    }

    const reservation = {
      firstName: formData.value.firstName,
      lastName: formData.value.lastName,
      phoneNumber: formData.value.phoneNumber,
      message: formData.value.message,
      reservationDate: formData.value.reservationDate,
      reservationTime: formattedTime,
      tableNumber: formData.value.tableNumber,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };

    let storedReservations = {};
    const existingData = localStorage.getItem('reservations');
    if (existingData) {
      try {
        storedReservations = JSON.parse(existingData);
      } catch (error) {
        console.error('Error parsing existing reservations:', error);
        storedReservations = {};
      }
    }

    const userPhone = formData.value.phoneNumber;
    if (!storedReservations[userPhone]) {
      storedReservations[userPhone] = [];
    }
    storedReservations[userPhone].push(reservation);

    localStorage.setItem('reservations', JSON.stringify(storedReservations));

    alert('Reservation confirmed successfully!');
    router.push({ name: 'Home' });
    window.scrollTo(0, 0);

  } catch (error) {
    console.error('Error saving reservation:', error);
    alert('An error occurred while saving the reservation. Please try again.');
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
        <h2 class="text-2xl font-bold text-gray-900 text-center mb-6">
          Make a reservation
        </h2>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="mb-4">
            <label class="block text-black mb-2 font-medium" for="first-name">
              First Name <span class="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              id="first-name" 
              v-model="formData.firstName"
              placeholder="Enter your first name"
              @blur="markTouched('firstName')"
              class="w-full px-3 py-2 border border-gray-300 rounded-md text-gray"
              :class="{'border-red-500': errors.firstName}"
            />
            <p v-if="errors.firstName" class="text-red-500 text-sm mt-1">
              First name is required
            </p>
          </div>

          <div class="mb-4">
            <label class="block text-black mb-2 font-medium" for="last-name">
              Last Name <span class="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              id="last-name"
              v-model="formData.lastName"
              placeholder="Enter your last name"
              @blur="markTouched('lastName')"
              class="w-full px-3 py-2 border border-gray-300 rounded-md text-gray"
              :class="{'border-red-500': errors.lastName}"
            />
            <p v-if="errors.lastName" class="text-red-500 text-sm mt-1">
              Last name is required
            </p>
          </div>

          <div class="mb-4">
            <label class="block text-black mb-2 font-medium" for="phone-number">
              Phone Number <span class="text-red-500">*</span>
            </label>
            <input 
              type="tel"
              id="phone-number"
              v-model="formData.phoneNumber"
              placeholder="Enter your phone number"
              @blur="markTouched('phoneNumber')"
              class="w-full px-3 py-2 border border-gray-300 rounded-md text-gray"
              :class="{'border-red-500': errors.phoneNumber}"
            />
            <p v-if="errors.phoneNumber" class="text-red-500 text-sm mt-1">
              Please enter a valid phone number (minimum 8 digits)
            </p>
          </div>

          <div class="mb-4">
            <label class="block text-black mb-2 font-medium" for="reservation-date">
              Reservation Date <span class="text-red-500">*</span>
            </label>
            <input 
              type="date"
              id="reservation-date"
              v-model="formData.reservationDate"
              @blur="markTouched('reservationDate')"
              class="w-full px-3 py-2 border border-gray-300 rounded-md text-gray"
              :class="{'border-red-500': errors.reservationDate}"
              :min="new Date().toISOString().split('T')[0]"
            />
            <p v-if="errors.reservationDate" class="text-red-500 text-sm mt-1">
              Please select a valid future date
            </p>
          </div>

          <div class="mb-4">
            <label class="block text-black mb-2 font-medium">
              Reservation Time <span class="text-red-500">*</span>
            </label>
            <div class="flex gap-2">
              <select
                v-model="formData.hours"
                @blur="markTouched('hours')"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-md text-gray"
                :class="{'border-red-500': errors.time}"
              >
                <option value="" disabled>Hour</option>
                <option v-for="hour in hours" :key="hour" :value="hour">{{ hour }}</option>
              </select>
              <select
                v-model="formData.minutes"
                @blur="markTouched('minutes')"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-md text-gray"
                :class="{'border-red-500': errors.time}"
              >
                <option value="" disabled>Minute</option>
                <option v-for="minute in minutes" :key="minute" :value="minute">{{ minute }}</option>
              </select>
              <select
                v-model="formData.period"
                class="px-3 py-2 border border-gray-300 rounded-md text-gray"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
            <p v-if="errors.time" class="text-red-500 text-sm mt-1">
              Please select a valid time
            </p>
          </div>

          <div class="mb-4">
            <label class="block text-black mb-2 font-medium" for="table-number">
              Table Number <span class="text-red-500">*</span>
            </label>
            <select
              id="table-number"
              v-model="formData.tableNumber"
              @blur="markTouched('tableNumber')"
              class="w-full px-3 py-2 border border-gray-300 rounded-md text-gray"
              :class="{'border-red-500': errors.tableNumber}"
            >
              <option value="" disabled>Select a table</option>
              <option v-for="number in 29" :key="number" :value="number">{{ number }}</option>
            </select>
            <p v-if="errors.tableNumber" class="text-red-500 text-sm mt-1">
              Please select a table number
            </p>
          </div>

          <div class="mb-4">
            <label class="block text-black mb-2 font-medium" for="message">
              Message <span class="text-gray-500">(Optional)</span>
            </label>
            <textarea 
              id="message"
              v-model="formData.message"
              placeholder="Type your message here"
              class="w-full px-3 py-2 border border-gray-300 rounded-md text-gray h-24"
            ></textarea>
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

input, textarea {
  color: gray;
}
</style>



