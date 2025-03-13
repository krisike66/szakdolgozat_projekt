<template>
    <nav class="navbar">
      <ul class="menu">
        <li class="menu-item"><a href="/home">Főoldal</a></li>
        <li class="menu-item"><a href="/tudasanyagok">Tudásanyagok</a></li>
        <li class="menu-item"><a href="/kereses">Keresés</a></li>
        <li class="menu-item"><a href="/profil">Profil</a></li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'MenusorKomponens',
  };
  </script>
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: center;
    background-color: #1e1e1e;
    padding: 1em;
  }
  
  .menu {
    display: flex;
    gap: 15px;
    padding: 0;
    margin: 0;
    list-style: none;
  }
  
  .menu-item {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    transition: transform 0.3s;
  }
  
  .menu-item a {
    display: block;
    padding: 0.8em 1.5em;
    color: #ddd;
    font-size: 1em;
    font-weight: 500;
    text-transform: uppercase;
    text-decoration: none;
    transition: color 0.3s;
  }
  
  .menu-item a::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #505758, #381f1f);
    transition: left 0.3s;
    z-index: -1;
  }
  
  .menu-item:hover {
    transform: scale(1.05);
  }
  
  .menu-item a:hover::before {
    left: 0;
  }
  
  .menu-item a:hover {
    color: #f0f0f0;
  }
  </style>
  