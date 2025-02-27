<template>
  <div class="lg:container mt-32 mx-auto px-6 md:px-12 lg:px-28 py-6 md:py-12 font-salsa" :class="$darkClass">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Contact Information Section -->
      <div  class="dark:text-white">
        <h2 class="text-2xl md:text-3xl font-bold">Contact Us</h2>
        <h3 class="text-lg md:text-xl font-semibold mt-2">
          We're here to help
        </h3>

        <div class="mt-4">
          <ContactInfoItem
              v-for="(info, index) in contactInfo"
              :key="index"
              :icon="info.icon"
              :title="info.title"
              :content="info.content"
              
          />
        </div>

        <h3 class="text-lg md:text-xl font-semibold mt-6">
          Visit Us at Our Headquarters
        </h3>
        <ContactInfoItem 
            icon="map-marker-alt"
            title="Address"
            content="Lazeez, Inc. 1234 Main Street, Suite 500, Toronto, Canada"
            
        />
        <h3 class="text-lg md:text-xl font-semibold mt-6">
          Connect with Us on Social Media
        </h3>
        <div
            class="flex flex-col md:flex-row md:space-x-4 lg:flex-row lg:space-x-4 mt-2"
        >
          <SocialItem
              v-for="(social, index) in socialLinks"
              :key="index"
              :icon="social.icon"
              :title="social.title"
              class="dark:text-white"
          />
        </div>
      </div>

      <!-- Location Map Section -->
      <div class="w-full h-full">
        <LocationMap height="500px" />
      </div>
    </div>

    <!-- Divider Section -->
    <div class="my-8">
      <hr class="border-t-2 border-gray-300 mb-8 mx-8" />
    </div>

    <!-- Contact Form Title -->
    <h3
        class="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-6 dark:text-white">
      Send Us a Message
    </h3>

    <!-- Contact Form Component -->
    <ContactForm />
  </div>
</template>

<script setup lang="ts">
import LocationMap from "@/components/contact/LocationMap.vue";
import ContactInfoItem from "@/components/contact/ContactInfoItem.vue";
import SocialItem from "@/components/contact/SocialItem.vue";
import ContactForm from "@/components/contact/ContactForm.vue";
const socialLinks = [
  { icon: "facebook", title: "Facebook" },
  { icon: "twitter", title: "Twitter" },
  { icon: "instagram", title: "Instagram" },
];
const contactInfo = [
  {
    icon: "phone",
    title: "Phone Number",
    content: "For any questions or concerns, please call us at 123-456-7890",
  },
  {
    icon: "envelope",
    title: "Email",
    content: "Please email us at info@lazeez.com",
  },
  {
    icon: "clock",
    title: "Opening Hours",
    content: "Monday-Friday: 9 AM - 5 PM EST",
  },
];
</script>