<template>
    <section class="bg-primary-light py-28 px-8" :class="$darkClass">
    <div class="container mx-auto text-center">
      <h2 class="text-3xl font-semibold mb-8 dark:text-white"> {{ $t("our_services") }} </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ServiceCard
            v-for="(service, index) in services"
            :key="index"
            v-bind="service"
        />
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import ServiceCard from "@/components/Home/ServiceCard.vue";
import {services} from "@/data/serviceData";
</script>