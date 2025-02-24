<template>
  <form @submit.prevent="submitForm"
        class="mt-4 space-y-6 max-w-4xl mx-auto px-6 w-full bg-white p-6 md:p-8 rounded-lg shadow-md">

    <!-- Name & Email Fields -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <InputField label="Name" class="w-full" placeholder="Enter your name" />
      <InputField label="Email" type="email" class="w-full" placeholder="Enter your Email" />
    </div>

    <!-- Phone & Subject Fields -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <InputField label="Phone Number" type="tel" class="w-full" placeholder="Enter your Phone Number" />
      <InputField label="Subject" class="w-full" placeholder="Enter Subject" />
    </div>

    <!-- Message Field -->
    <div>
      <label class="font-medium text-lg text-gray-700">Message</label>
      <textarea
          placeholder="Your message"
          class="w-full p-3 border border-gray-300 rounded-md focus:border-primary focus:ring-primary focus:ring-1 transition-all"
          rows="4">
      </textarea>
    </div>

    <!-- Submit Button -->
    <div class="flex justify-center">
      <Button title="Submit" class="bg-primary" to="#" />
    </div>
  </form>
</template>

<script setup lang="ts">
import InputField from "@/components/ui/InputField.vue";
import Button from "@/components/ui/Button.vue";

const submitForm = () => {
  console.log("Form submitted!");
};
</script>
