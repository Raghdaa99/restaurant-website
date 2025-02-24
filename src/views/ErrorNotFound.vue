<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-24 mt-10">
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
      <h2 class="text-3xl font-semibold text-gray-800 mb-6">Page Not Found</h2>
      <p class="text-gray-600 mb-8 max-w-md mx-auto">
        Oops! The page you're looking for seems to have vanished into thin air. 
        Let's get you back on track!
      </p>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          @click="router.go(-1)"
          class="error-button error-button--secondary"
        >
          <i class="fas fa-arrow-left mr-2"></i>
          Go Back
        </button>
        <router-link 
          to="/" 
          class="error-button error-button--primary"
        >
          <i class="fas fa-home mr-2"></i>
          Return Home
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style lang="scss" scoped>
.error {
  &-image {
    animation: float 3s ease-in-out infinite;
  }

  &-button {
    @apply px-6 py-3 rounded-lg transition-colors flex items-center justify-center;

    &--primary {
      @apply bg-primary text-white;
      
      &:hover {
        @apply bg-primary/90;
      }
    }

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