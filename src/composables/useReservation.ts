import { ref, computed } from "vue";

export interface ReservationFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  message: string;
  reservationDateTime: string;
  peopleCount: string;
}

export interface Reservation extends ReservationFormData {
  id: string;
  timestamp: string;
}

export function useReservation() {
  const formData = ref<ReservationFormData>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    message: "",
    reservationDateTime: "",
    peopleCount: "",
  });

  const touched = ref<{ [key: string]: boolean }>({});

  const validatePhoneNumber = (phone: string) => {
    return /^\d{8,}$/.test(phone);
  };

  const errors = computed(() => ({
    firstName:
      touched.value.firstName && formData.value.firstName.trim().length === 0,
    lastName:
      touched.value.lastName && formData.value.lastName.trim().length === 0,
    phoneNumber:
      touched.value.phoneNumber &&
      !validatePhoneNumber(formData.value.phoneNumber),
    peopleCount: touched.value.peopleCount && !formData.value.peopleCount,
  }));

  const markTouched = (field: string) => {
    touched.value[field] = true;
  };


/**
 * Creates a reservation object and updates the stored reservations.
 * Saves reservation data to localStorage using the phone number as the key.
 * Returns `true` on success and throws an error if it fails.
 */

const saveReservation = async () => {
  try {
    // Create a new reservation object using the form data.
    const reservation: Reservation = {
      ...formData.value,  // Use the form data such as first name, last name, etc.
      id: Date.now().toString(),  // Assign a unique ID using the current timestamp.
      timestamp: new Date().toISOString(),  // Assign the timestamp to store the reservation date and time.
    };

    // Define a variable to store reservations.
    let storedReservations: { [key: string]: Reservation[] } = {};

    // Check if there are any existing reservation data in localStorage.
    const existingData = localStorage.getItem("reservations");

    // If there is existing data, load it.
    if (existingData) {
      storedReservations = JSON.parse(existingData);
    }

    // Get the phone number from the form data.
    const userPhone = formData.value.phoneNumber;

    // If there are no reservations for this phone number, create a new array for this phone number.
    if (!storedReservations[userPhone]) {
      storedReservations[userPhone] = [];
    }

    // Add the new reservation to the list of reservations for the given phone number.
    storedReservations[userPhone].push(reservation);

    // Save all the updated reservations in localStorage.
    localStorage.setItem("reservations", JSON.stringify(storedReservations));

    // Return true to indicate the reservation was saved successfully.
    return true;
  } catch (error) {
    // If an error occurs while saving the reservation, log it to the console and throw the error.
    console.error("Error saving reservation:", error);
    throw error;
  }
};

  return {
    formData,
    errors,
    touched,
    markTouched,
    saveReservation,
  };
}
