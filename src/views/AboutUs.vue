<template>
  <div class="font-salsa" :class="$darkClass">
    <!-- Hero Section with Parallax -->
    <section
      class="relative h-[100vh] overflow-hidden bg-cover bg-center bg-[url('@/assets/images/restaurant/RestaurantPlace.jpeg')]"
    >
      <div class="absolute inset-0 bg-primary/20 backdrop-blur-sm"></div>
      <div class="absolute inset-0 grid text-white">
        <h1
          class="text-5xl md:text-7xl flex flex-col items-center justify-center font-bold mb-6 animate-fade-in-down drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
        >
          About Our Restaurant
        </h1>
      </div>
    </section>

    <!-- Story Section with Creative Layout -->
    <section class="relative py-24 px-4">
      <div class="container mx-auto">
        <div class="flex flex-col md:flex-row items-center gap-12">
          <div class="w-full md:w-1/2 animate-slide-in-left">
            <div class="relative">
              <div
                class="absolute -inset-4 bg-gradient-to-r from-amber-500 to-red-500 rounded-lg blur-lg opacity-20 group-hover:opacity-30 transition duration-500"
              ></div>
              <div class="relative bg-white p-8 rounded-lg shadow-xl">
                <h2 class="text-4xl font-bold mb-6 text-gray-800">Our Story</h2>
                <p class="text-gray-700 leading-relaxed">
                  Founded in 2020, Our Restaurant has been serving exceptional
                  cuisine for over 3 years. What started as a small family dream
                  has grown into one of the city's most beloved dining
                  destinations.
                </p>
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/2 animate-slide-in-right">
            <div class="relative">
              <div
                class="absolute -inset-4 bg-gradient-to-l from-amber-500 to-red-500 rounded-lg blur-lg opacity-20 group-hover:opacity-30 transition duration-500"
              ></div>
              <div class="relative bg-white p-8 rounded-lg shadow-xl">
                <h2 class="text-4xl font-bold mb-6 text-gray-800">
                  Our Heritage
                </h2>
                <p class="text-gray-700 leading-relaxed">
                  Our commitment to quality and service has made us a
                  cornerstone of the local dining scene. We take pride in
                  creating memorable experiences through exceptional food and
                  hospitality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Director Section with Hover Effects -->
    <section class="py-24 px-4 bg-white">
      <div class="container mx-auto">
        <h2 class="text-4xl font-bold text-center mb-16 animate-fade-in">
          Meet Our Director
        </h2>
        <div class="group relative max-w-4xl mx-auto">
          <div
            class="absolute -inset-1 bg-gradient-to-r from-amber-500 via-red-500 to-amber-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000"
          ></div>
          <div
            class="relative flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-lg shadow-xl"
          >
            <div class="relative w-64 h-64 animate-slide-in-left">
              <div
                class="absolute inset-0 bg-gradient-to-br from-amber-500 to-red-500 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition duration-500"
              ></div>
              <img
                src="@/assets/images/restaurant/Director.webp"
                alt="Director"
                class="relative w-full h-full rounded-full object-cover shadow-lg transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
              />
            </div>
            <div class="flex-1 text-center md:text-left animate-slide-in-right">
              <h3 class="text-3xl font-bold mb-4 text-gray-800">John Smith</h3>
              <p class="text-gray-700 leading-relaxed mb-4">
                With over 20 years of culinary experience, John has transformed
                his passion for food into a successful enterprise.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Chefs Section with Card Animations -->
    <section class="py-24 px-4">
      <div class="container mx-auto">
        <h2 class="text-4xl font-bold text-center mb-16 animate-fade-in">
          Our Expert Chefs
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(chef, index) in chefs"
            :key="chef.id"
            class="group relative animate-fade-in"
            :style="{ animationDelay: `${index * 200}ms` }"
          >
            <div
              class="absolute -inset-1 bg-gradient-to-r from-amber-500 to-red-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"
            ></div>
            <div
              class="relative bg-white p-8 rounded-xl shadow-lg transform group-hover:-translate-y-2 transition duration-500"
            >
              <div class="relative w-48 h-48 mx-auto mb-6">
                <div
                  class="absolute inset-0 bg-gradient-to-br from-amber-500 to-red-500 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition duration-500"
                ></div>
                <img
                  :src="chef.image"
                  :alt="chef.name"
                  class="relative w-full h-full rounded-full object-cover shadow-lg transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
                />
              </div>
              <h3 class="text-2xl font-bold mb-2 text-gray-800">
                {{ chef.name }}
              </h3>
              <p class="text-gray-600 mb-2">{{ chef.specialty }}</p>
              <p class="text-gray-500">{{ chef.experience }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section with Counter Animation -->
    <section class="py-24 px-4 bg-white">
      <div class="container mx-auto max-w-4xl text-center">
        <h2 class="text-4xl font-bold mb-8 animate-fade-in">Our Team</h2>
        <div class="relative">
          <div
            class="absolute -inset-1 bg-gradient-to-r from-amber-500 to-red-500 rounded-lg blur opacity-20"
          ></div>
          <div class="relative bg-white p-8 rounded-lg shadow-xl">
            <p class="text-6xl font-bold text-amber-500 mb-4">
              <span ref="counter">{{ teamCount }}</span>
            </p>
            <p class="text-xl text-gray-700 mb-4">
              Dedicated professionals working tirelessly to ensure you have the
              best dining experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import chef1Image from "@/assets/images/chefs/Chef1.png";
import chef2Image from "@/assets/images/chefs/Chef2.png";
import chef3Image from "@/assets/images/chefs/Chef3.webp";

interface Chef {
  id: number;
  name: string;
  specialty: string;
  experience: string;
  image: string;
}

let counter = ref<HTMLElement | Number>(0);
let teamCount = ref(25);

const chefs: Chef[] = [
  {
    id: 1,
    name: "Michael Brown",
    specialty: "Executive Chef",
    experience: "15 years of experience",
    image: chef1Image,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    specialty: "Pastry Chef - International Cuisine ",
    experience: "10 years of experience",
    image: chef2Image,
  },
  {
    id: 3,
    name: "Ahmed Hassan",
    specialty: "Head Chef - Middle Eastern Cuisine",
    experience: "12 years of experience",
    image: chef3Image,
  },
];

// Intersection Observer for animations
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    },
    { threshold: 0.2 }
  );

  document
    .querySelectorAll(
      ".animate-fade-in, .animate-slide-in-left, .animate-slide-in-right"
    )
    .forEach((el) => observer.observe(el));
});
</script>

<style scoped>
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-down {
  animation: fadeInDown 1s ease-out;
}

.animate-fade-in-up {
  animation: fadeInUp 1s ease-out;
}

.animate-fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: all 1s ease-out;
}

.animate-slide-in-left {
  opacity: 0;
  transform: translateX(-50px);
  transition: all 1s ease-out;
}

.animate-slide-in-right {
  opacity: 0;
  transform: translateX(50px);
  transition: all 1s ease-out;
}

.animate-in {
  opacity: 1;
  transform: translate(0, 0);
}
</style>
