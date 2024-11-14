<template>
    <div id="app">
      <Home />
    </div>
  </template>
  
  <script>
  import Home from './views/FooldalOldal.vue';
  
  export default {
    components: {
      Home,
    },
  };
  </script>
  
  <style>
  /* Globális stílusok */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Roboto', sans-serif;
    background-color: #f7f7f7;
    color: #333;
  }
  
  h1, h2, p {
    color: #333;
  }
  </style>
  