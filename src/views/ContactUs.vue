<template>
  <div class="lg:container mt-32 mx-auto px-6 md:px-12 lg:px-28 py-6 md:py-12 font-salsa" :class="$darkClass">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Contact Information Section -->
      <div class="dark:text-white">
        <h2 class="text-2xl md:text-3xl font-bold"> {{ $t('contact_us') }}</h2>
        <h3 class="text-lg md:text-xl font-semibold mt-2">
          {{ $t('we_are_here_to_help') }}
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
          {{ $t('visit_us') }}
        </h3>
        <ContactInfoItem 
            icon="map-marker-alt"
            :title="$t('address')"
            :content="$t('company_address')"
        />
        <h3 class="text-lg md:text-xl font-semibold mt-6">
          {{ $t('connect_with_us') }}
        </h3>
        <div class="flex flex-col md:flex-row md:space-x-4 lg:flex-row lg:space-x-4 mt-2">
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
        <LocationMap />
      </div>
    </div>

    <!-- Divider Section -->
    <div class="my-8">
      <hr class="border-t-2 border-gray-300 mb-8 mx-8" />
    </div>

    <!-- Contact Form Title -->
    <h3 class="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-6 dark:text-white">
      {{ $t('send_us_a_message') }}
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
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const socialLinks = [
  { icon: "facebook", title: t("facebook") },
  { icon: "twitter", title: t("twitter") },
  { icon: "instagram", title: t("instagram") },
];

const contactInfo = [
  {
    icon: "phone",
    title: t("phone_number"),
    content: t("phone_details"),
  },
  {
    icon: "envelope",
    title: t("email"),
    content: t("email_details"),
  },
  {
    icon: "clock",
    title: t("opening_hours"),
    content: t("opening_hours_details"),
  },
];
</script>
