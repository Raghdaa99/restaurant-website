<template>
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
    
  </template>
  
  <script>
import Header from './components/Header/HomeHeader.vue';
import Navbar from './components/Navbar/Navbar.vue';
import Button from './components/Button/Button.vue';
  
  export default {
    components: {
      Header,
      Navbar,
      Button
    }
  };
  </script>
  
  <style>
  </style>
  