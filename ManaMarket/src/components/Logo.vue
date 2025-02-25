<template>
    <div class="logo">
      <div class="logo-icon">
        <div class="logo-square orange"></div>
        <div class="logo-square white"></div>
      </div>
      <span class="logo-text">MANA MARKET</span>
    </div>
  </template>
  
  
  <style scoped>
  .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 2rem;
  }
  
  .logo-icon {
    position: relative;
    width: 24px;
    height: 32px;
  }
  
  .logo-square {
    position: absolute;
    width: 24px;
    height: 32px;
    border-radius: 2px;
  }
  
  .logo-square.white {
    background-color: white; /* Color fijo */
    transform: rotate(0deg);
  }
  
  .logo-square.orange {
    background-color: #E67E22; /* Color fijo */
    transform: rotate(-12deg);
    top: -10px;
    left: -10px;
  }
  
  .logo-text {
    color: white;
    font-size: 1.25rem;
    font-weight: bold;
  }
  </style>