<template>
  <div>

    <div class="relative">
        <div class="">
        <Navbar/>
    </div>
    <div class="z-0">
      <Header />
    </div>
    </div>
    <div>
        <Button/>
    </div>
    <Footer class="mt-6"></Footer>
    </div>
  </template>
  
  <script>
import Header from './components/Header/HomeHeader.vue';
import Navbar from './components/Navbar/Navbar.vue';
import Button from './components/Button/Button.vue';
import Footer from './components/layouts/Footer.vue';

  export default {
    components: {
      Header,
      Navbar,
      Button,
      Footer
    }
  };
  </script>
  
  <style>
  </style>
  