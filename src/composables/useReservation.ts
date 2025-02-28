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

  const saveReservation = async () => {
    try {
      const reservation: Reservation = {
        ...formData.value,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
      };

      let storedReservations: { [key: string]: Reservation[] } = {};
      const existingData = localStorage.getItem("reservations");
      if (existingData) {
        storedReservations = JSON.parse(existingData);
      }

      const userPhone = formData.value.phoneNumber;
      if (!storedReservations[userPhone]) {
        storedReservations[userPhone] = [];
      }
      storedReservations[userPhone].push(reservation);

      localStorage.setItem("reservations", JSON.stringify(storedReservations));
      return true;
    } catch (error) {
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
