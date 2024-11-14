<template>
    <footer class="footer">
      <p>&copy; 2024 Tudásbázis</p>
      <ul class="footer-links">
        <li><a href="mailto:info@tudasbazis.hu">Kapcsolat</a></li>
        <li><a href="/impresszum">Impresszum</a></li>
        <li><a href="/adatvedelem">Adatvédelem</a></li>
      </ul>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'LablecKomponens',
  };
  </script>
  
  <style scoped>
  .footer {
    background-color: #1e1e1e;
    color: #ccc;
    padding: 20px;
    text-align: center;
  }
  
  .footer p {
    margin: 0;
    font-size: 0.9em;
  }
  
  .footer-links {
    list-style: none;
    padding: 0;
    margin: 10px 0 0;
    display: flex;
    justify-content: center;
    gap: 20px;
  }
  
  .footer-links a {
    color: #ccc;
    text-decoration: none;
    font-size: 0.9em;
    font-weight: 500;
    transition: color 0.3s, transform 0.3s;
  }
  
  .footer-links a:hover {
    color: #00b4db;
    transform: scale(1.1);
  }
  </style>
  