<template>
  <div>
    <h3 class="text-lg font-semibold mb-2">{{ $t('checkout.enterCardDetails') }}</h3>
    <form @submit.prevent="handleSubmit">
      <InputField
        :label="$t('checkout.cardNumber')"
        type="number"
        v-model="cardDetails.number"
        :placeholder="$t('checkout.enterCardNumber')"
        :error="errors.number"
        @blur="validateCardNumber(cardDetails.number)"
        @input="errors.number = ''"
        :class="{ 'border-red-500': errors.number }"
      />
      <InputField
        :label="$t('checkout.cardHolderName')"
        v-model="cardDetails.holderName"
        :placeholder="$t('checkout.enterCardHolderName')"
        :error="errors.holderName"
        @blur="validateCardHolderName(cardDetails.holderName)"
        @input="errors.holderName = ''"
        :class="{ 'border-red-500': errors.holderName }"
      />
      <div class="grid grid-cols-2 gap-4">
        <InputField
          :label="$t('checkout.expiryDate')"
          v-model="cardDetails.expiry"
          :placeholder="$t('checkout.enterExpiryDate')"
          :error="errors.expiry"
          @blur="validateExpiryDate(cardDetails.expiry)"
          @input="errors.expiry = ''"
          :class="{ 'border-red-500': errors.expiry }"
        />
        <InputField
          :label="$t('checkout.cvv')"
          v-model="cardDetails.cvv"
          type="number"
          :placeholder="$t('checkout.enterCvv')"
          :error="errors.cvv"
          @blur="validateCVV(cardDetails.cvv)"
          @input="errors.cvv = ''"
          :class="{ 'border-red-500': errors.cvv }"
        />
      </div>
      <Button
        type="submit"
        class="w-full mt-4"
        :title="$t('checkout.payNow')"
        :disabled="!isFormValid || isProcessing"
      >
        {{ isProcessing ? $t('checkout.processing') : $t('checkout.payNow') }}
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
