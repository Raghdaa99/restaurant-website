<template>
  <div>
    <label 
      v-if="label"
      class="font-medium text-lg text-gray-700 block mb-3"
    >
      {{ label }}
    </label>
    <textarea
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      :rows="rows"
      :placeholder="placeholder"
      class="w-full p-3 border border-gray-300 rounded-lg focus:border-primary focus:ring-primary focus:ring-1 transition-all
             placeholder:text-gray-400"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;
  label?: string;
  placeholder?: string;
  rows?: number;
}>();

defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script> 