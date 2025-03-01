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
              v-for="(info, index) in contactInfo.slice(0, 3)"
              :key="index"
              :icon="info.icon"
              :title="info.title[locale]"
              :content="info.content[locale]"
          />
        </div>

        <h3 class="text-lg md:text-xl font-semibold mt-6">
          {{ $t('visit_us') }}
        </h3>
        <ContactInfoItem 
            icon="map-marker-alt"
            :title="contactInfo[3].title[locale]"
            :content="contactInfo[3].content[locale]"
        />
        <h3 class="text-lg md:text-xl font-semibold mt-6">
          {{ $t('connect_with_us') }}
        </h3>
        <div class="flex flex-col md:flex-row md:space-x-4 lg:flex-row lg:space-x-4 mt-2">
          <SocialItem
              v-for="(social, index) in socialLinks"
              :key="index"
              :icon="social.icon"
              :title="social.title[locale]"
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

const { t, locale } = useI18n();

const socialLinks = [
  { icon: "facebook", title: {
      en: "Facebook", 
      ar: "فيسبوك",
    },
  },
  { icon: "twitter", title: {
      en: "Twitter",
      ar: "تويتر",
    },
  },
  { icon: "instagram", title: {
      en: "Instagram",
      ar: "انستجرام",
    },
  },
];

const contactInfo = [
  {
    icon: "phone",
    title: {
      en: "Phone",
      ar: "رقم الهاتف",
    },
    content: {
      en: "For any questions or concerns, please call us at 123-456-7890",
      ar: "لأي أسئلة أو إستفسارات، يرجى الاتصال بنا على 123-456-7890",
    },
  },
  {
    icon: "envelope",
    title: {
      en: "Email",
      ar: "البريد الإلكتروني",
    },
    content: {
      en: "Please email us at info@lazeez.com",
      ar: "يرجى إرسال بريد إلكتروني إلى info@lazeez.com",
    },
  },
  {
    icon: "clock",
    title: {
      en: "Opening Hours",
      ar: "ساعات العمل",
    },
    content: {
      en: "Monday-Friday: 9 AM - 5 PM EST",
      ar: "الاثنين - الجمعة: 9 ص - 5 م",
    },
  },
  {
    icon: "map-marker-alt",
    title: {
      en: "Address",
      ar: "العنوان",
    },
    content: {
      en: "Lazeez, Inc. 1234 Main Street, Suite 500, Toronto, Canada",
      ar: "Lazeez, Inc. 1234 شارع المناصير, مجمع 500, تورونتو, كندا",
    },
  },
];
</script>
