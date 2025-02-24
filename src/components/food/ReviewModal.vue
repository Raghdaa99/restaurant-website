<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="handleClose" class="relative z-50">
      <!-- Backdrop -->
      <TransitionChild
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      </TransitionChild>

      <!-- Modal -->
      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4">
          <TransitionChild
            enter="ease-out duration-300"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="bg-white rounded-xl p-6 w-full max-w-lg mx-4 shadow-xl"
            >
              <div class="flex justify-between items-center mb-8">
                <DialogTitle class="text-2xl font-bold text-gray-800">
                  Write a Review
                </DialogTitle>
                <button
                  @click="handleClose"
                  class="text-gray-500 hover:text-gray-700 transition-colors p-2"
                >
                  <i class="fas fa-times"></i>
                </button>
              </div>

              <form @submit.prevent="handleSubmit" class="space-y-8">
                <!-- Rating Selection -->
                <div>
                  <label class="font-medium text-lg text-gray-700 block mb-3"
                    >Your Rating</label
                  >
                  <div class="flex gap-3">
                    <button
                      v-for="star in 5"
                      :key="star"
                      type="button"
                      @click="rating = star"
                      @mouseenter="hoverRating = star"
                      @mouseleave="hoverRating = 0"
                      class="text-3xl focus:outline-none transition-colors hover:scale-110"
                    >
                      <i
                        class="fas fa-star"
                        :class="[
                          (hoverRating || rating) >= star
                            ? 'text-yellow-400'
                            : 'text-gray-300',
                        ]"
                      ></i>
                    </button>
                  </div>
                </div>

                <!-- Review Text -->
                <TextArea
                  v-model="comment"
                  label="Your Review"
                  placeholder="Share your experience with this dish..."
                  :rows="4"
                />

                <!-- Submit Button -->
                <div class="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    @click="handleClose"
                    class="px-6 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <Button title="Submit" icon="paper-plane" />
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";
import type { Review } from "@/types/food";
import TextArea from "@/components/UI/TextArea.vue";
import Button from "@/components/UI/Button.vue";
const props = defineProps<{
  isOpen: boolean;
  foodId: number;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "submit", review: Review): void;
}>();

const rating = ref(0);
const hoverRating = ref(0);
const comment = ref("");

const handleClose = () => {
  emit("close");
  resetForm();
};

const handleSubmit = () => {
  const review = {
  id: Date.now(),
  userName: "Anonymous User",
  userImage: "https://ui-avatars.com/api/?name=Anonymous+User",
  rating: rating.value,
  comment: comment.value.trim(),
  date: new Date().toISOString(),
  foodId: props.foodId,
};

  try {
    emit("submit", review);
    handleClose();
  } catch (error) {
    console.error("Error submitting review:", error);
  }
};

const resetForm = () => {
  rating.value = 0;
  hoverRating.value = 0;
  comment.value = "";
};
</script>
