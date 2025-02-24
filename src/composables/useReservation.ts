
import { ref, computed } from 'vue';

export interface ReservationFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  message: string;
  reservationDate: string;
  hours: string;
  minutes: string;
  period: string;
  tableNumber: string;
}

export interface Reservation extends Omit<ReservationFormData, 'hours' | 'minutes' | 'period'> {
  reservationTime: string;
  id: string;
  timestamp: string;
}

export interface ReservationsStore {
  [key: string]: Reservation[];
}

export function useReservation() {
  const formData = ref<ReservationFormData>({
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
    
    const hour = parseInt(hours);
    const minute = parseInt(minutes);
    
    if (isNaN(hour) || isNaN(minute)) return false;
    if (hour < 1 || hour > 12) return false;
    if (minute < 0 || minute >= 60) return false;
    
    let hour24 = hour;
    if (period === 'PM' && hour !== 12) {
      hour24 += 12;
    } else if (period === 'AM' && hour === 12) {
      hour24 = 0;
    }
    
    const selectedDateTime = new Date(date);
    selectedDateTime.setHours(hour24, minute);
    return selectedDateTime > new Date();
  };

  const errors = computed(() => ({
    firstName: touched.value.firstName && formData.value.firstName.trim().length === 0,
    lastName: touched.value.lastName && formData.value.lastName.trim().length === 0,
    phoneNumber: touched.value.phoneNumber && !validatePhoneNumber(formData.value.phoneNumber),
    reservationDate: touched.value.reservationDate && !validateDate(formData.value.reservationDate),
    hours: touched.value.hours && (!formData.value.hours || 
      isNaN(parseInt(formData.value.hours)) || 
      parseInt(formData.value.hours) < 1 || 
      parseInt(formData.value.hours) > 12),
    minutes: touched.value.minutes && (!formData.value.minutes || 
      isNaN(parseInt(formData.value.minutes)) || 
      parseInt(formData.value.minutes) < 0 || 
      parseInt(formData.value.minutes) >= 60),
    time: (touched.value.hours || touched.value.minutes) && 
      !validateTime(formData.value.hours, formData.value.minutes, formData.value.reservationDate, formData.value.period),
    tableNumber: touched.value.tableNumber && !formData.value.tableNumber,
  }));

  const markTouched = (field: string) => {
    touched.value[field] = true;
  };

  const checkTableAvailability = (date: string, hours: string, minutes: string, period: string, tableNumber: string) => {
    try {
      let hour = parseInt(hours);
      if (period === 'PM' && hour !== 12) {
        hour += 12;
      } else if (period === 'AM' && hour === 12) {
        hour = 0;
      }
      
      const formattedTime = `${hour.toString().padStart(2, '0')}:${minutes.padStart(2, '0')}`;
      
      const reservationsString = localStorage.getItem('reservations');
      if (!reservationsString) return true;
      
      const reservations = JSON.parse(reservationsString);
      
      for (const phoneNumber in reservations) {
        const userReservations = reservations[phoneNumber];
        const hasConflict = userReservations.some((reservation: Reservation) => 
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

  const saveReservation = async () => {
    try {
      let hour = parseInt(formData.value.hours);
      if (formData.value.period === 'PM' && hour !== 12) {
        hour += 12;
      } else if (formData.value.period === 'AM' && hour === 12) {
        hour = 0;
      }
      
      const minutes = formData.value.minutes.padStart(2, '0');
      const formattedTime = `${hour.toString().padStart(2, '0')}:${minutes}`;

      const isTableAvailable = checkTableAvailability(
        formData.value.reservationDate,
        formData.value.hours,
        formData.value.minutes,
        formData.value.period,
        formData.value.tableNumber
      );

      if (!isTableAvailable) {
        throw new Error('Table is already reserved at this time');
      }

      const reservation: Reservation = {
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

      let storedReservations: ReservationsStore = {};
      const existingData = localStorage.getItem('reservations');
      if (existingData) {
        storedReservations = JSON.parse(existingData);
      }

      const userPhone = formData.value.phoneNumber;
      if (!storedReservations[userPhone]) {
        storedReservations[userPhone] = [];
      }
      storedReservations[userPhone].push(reservation);

      localStorage.setItem('reservations', JSON.stringify(storedReservations));
      return true;
    } catch (error) {
      console.error('Error saving reservation:', error);
      throw error;
    }
  };

  return {
    formData,
    errors,
    touched,
    markTouched,
    saveReservation,
    checkTableAvailability
  };
} 
