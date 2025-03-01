<template>
  <form @submit.prevent="submitForm" class="mt-4 space-y-6 max-w-4xl mx-auto px-6 w-full bg-white p-6 md:p-8 rounded-lg shadow-md">
    <!-- Name & Email Fields -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <InputField :label="$t('name')" class="w-full" :placeholder="$t('enter_your_name')" />
      <InputField :label="$t('email')" type="email" class="w-full" :placeholder="$t('enter_your_email')" />
    </div>

    <!-- Phone & Subject Fields -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <InputField :label="$t('phone_number')" type="tel" class="w-full" :placeholder="$t('enter_your_phone_number')" />
      <InputField :label="$t('subject')" class="w-full" :placeholder="$t('enter_your_subject')" />
    </div>

    <!-- Message Field -->
    <TextArea
      v-model="message"
      :label="$t('message')"
      :placeholder="$t('enter_your_message')"
      :rows="4"
    />

    <!-- Submit Button -->
    <div class="flex justify-center">
      <Button :title="$t('submit')" />
    </div>
  </form>
</template>

<script setup lang="ts">
import InputField from "@/components/UI/InputField.vue";
import TextArea from "@/components/UI/TextArea.vue";
import Button from "@/components/UI/Button.vue";
import { ref } from 'vue';

const message = ref('');

const submitForm = () => {
  console.log("Form submitted with message:", message.value);
};
</script>
