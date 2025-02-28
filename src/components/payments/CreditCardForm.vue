<template>
  <div>
    <h3 class="text-lg font-semibold mb-2">Enter Card Details</h3>
    <form @submit.prevent="handleSubmit">
      <InputField
        label="Card Number *"
        type="number"
        v-model="cardDetails.number"
        placeholder="XXXX XXXX XXXX XXXX"
        :error="errors.number"
        @blur="validateCardNumber(cardDetails.number)"
        @input="errors.number = ''"
        :class="{ 'border-red-500': errors.number }"
      />
      <InputField
        label="Card Holder Name *"
        v-model="cardDetails.holderName"
        placeholder="Enter Card Holder Name"
        :error="errors.holderName"
        @blur="validateCardHolderName(cardDetails.holderName)"
        @input="errors.holderName = ''"
        :class="{ 'border-red-500': errors.holderName }"
      />
      <div class="grid grid-cols-2 gap-4">
        <InputField
          label="Expiry Date *"
          v-model="cardDetails.expiry"
          placeholder="MM/YY"
          :error="errors.expiry"
          @blur="validateExpiryDate(cardDetails.expiry)"
          @input="errors.expiry = ''"
          :class="{ 'border-red-500': errors.expiry }"
        />
        <InputField
          label="CVV *"
          v-model="cardDetails.cvv"
          type="number"
          placeholder="CVV"
          :error="errors.cvv"
          @blur="validateCVV(cardDetails.cvv)"
          @input="errors.cvv = ''"
          :class="{ 'border-red-500': errors.cvv }"
        />
      </div>
      <Button
        type="submit"
        class="w-full mt-4"
        title="Pay Now"
        :disabled="!isFormValid || isProcessing"
      >
        {{ isProcessing ? "Processing..." : "Pay Now" }}
      </Button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import InputField from "@/components/UI/InputField.vue";
import Button from "@/components/UI/Button.vue";
import { useValidation } from "@/composables/useValidation";

const {
  errors,
  validateCardNumber,
  validateCardHolderName,
  validateExpiryDate,
  validateCVV,
  isFormValid,
} = useValidation();

const cardDetails = ref({
  number: "",
  expiry: "",
  cvv: "",
  holderName: "",
});
const emit = defineEmits(["submit"]);

const handleSubmit = () => {
  if (!isFormValid(cardDetails.value)) return;
  emit("submit", cardDetails.value);
};
</script>
