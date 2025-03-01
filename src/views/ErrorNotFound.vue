<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-24 mt-10" :class="$darkMode">
    <div class="text-center">
      <!-- Error Image -->
      <div class="mb-8 relative">
        <img 
          src="@/assets/images/404.png" 
          alt="404 Error" 
          class="w-64 h-64 mx-auto object-contain error-image"
        />
      </div>

      <!-- Error Message -->
      <h2 class="text-3xl font-semibold text-gray-800 mb-6 dark:text-white">Page Not Found</h2>
      <p class="text-gray-600 mb-8 max-w-md mx-auto dark:text-gray-300">
        Oops! The page you're looking for seems to have vanished into thin air. 
        Let's get you back on track!
      </p>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          @click="router.go(-1)"
          title="Go Back"
          icon="fa-solid fa-arrow-left"
          class="error-button error-button--secondary"
        />
        <Button 
          title="Return Home"
          icon="fa-solid fa-house"
          @click="router.push('/')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Button from '@/components/UI/Button.vue'
const router = useRouter()
</script>

<style lang="scss" scoped>
.error {
  &-image {
    animation: float 3s ease-in-out infinite;
  }

  &-button {
    @apply px-6 py-3 rounded-lg transition-colors flex items-center justify-center;

    &--secondary {
      @apply bg-gray-200 text-gray-800;
      
      &:hover {
        @apply bg-gray-300;
      }
    }
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}
</style> 