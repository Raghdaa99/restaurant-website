<template>
  <div>
    <img
        src="@/assets/images/foods/pic2.png"
        alt="Burger"
        class="absolute -left-40 top-1/2  w-72 opacity-30 animate-floating hidden sm:block"
    />
    <img
        src="@/assets/images/foods/pic2.png"
        alt="Burger"
        class="absolute -right-40 top-1/2  w-72 opacity-30 animate-floating hidden sm:block"
    />
  </div>
</template>

<style scoped>
@keyframes floatUpDown {
  0% {
    transform: translateY(-10px);
  }
  50% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(-10px);
  }
}
.animate-floating {
  animation: floatUpDown 3s ease-in-out infinite;
}
</style>
