import { ref } from "vue";

export function useValidation() {
  const errors = ref({
    number: "",
    expiry: "",
    cvv: "",
    holderName: "",
  });

  const validateCardNumber = (value: string) => {
    if (!value.trim()) {
      errors.value.number = "Card number is required";
    } else if (!/^\d{16}$/.test(value)) {
      errors.value.number = "Card number must be 16 digits";
    } else {
      errors.value.number = "";
    }
  };

  const validateCardHolderName = (value: string) => {
    if (!value.trim()) {
      errors.value.holderName = "Card holder name is required";
    } else {
      errors.value.holderName = "";
    }
  };

  const validateExpiryDate = (value: string) => {
    if (!value.trim()) {
      errors.value.expiry = "Expiry date is required";
    } else if (!/^\d{2}\/\d{2}$/.test(value)) {
      errors.value.expiry = "Expiry date must be in the format MM/YY";
    } else {
      const [month, year] = value.split("/");
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;

      if (+year < currentYear || (+year === currentYear && +month < currentMonth)) {
        errors.value.expiry = "Expiry date must be in the future";
      } else {
        errors.value.expiry = "";
      }
    }
  };

  const validateCVV = (value: string) => {
    if (!value.trim()) {
      errors.value.cvv = "CVV is required";
    } else if (!/^\d{3,4}$/.test(value)) {
      errors.value.cvv = "CVV must be 3 or 4 digits";
    } else {
      errors.value.cvv = "";
    }
  };

  const isFormValid = ((cardDetails: any) => {
    validateCardNumber(cardDetails.number);
    validateCardHolderName(cardDetails.holderName);
    validateExpiryDate(cardDetails.expiry);
    validateCVV(cardDetails.cvv); 
    return (
      !errors.value.number &&
      !errors.value.holderName &&
      !errors.value.expiry &&
      !errors.value.cvv
    );
  });

  return {
    errors,
    validateCardNumber,
    validateCardHolderName,
    validateExpiryDate,
    validateCVV,
    isFormValid,
  };
}