<template>
        <div class="content-wrapper">
          <!-- Previous search and filters code remains the same -->
          
          <!-- New Card Showcase Section -->
          <div class="card-showcase">
            <h2 class="showcase-title">LOOKING FOR CARDS TO<br/>BUILD YOUR DECK?</h2>
            
            <div class="cards-display">
              <div class="card card-side-left">
                <img :src="'https://cards.scryfall.io/normal/front/3/1/31e4b7a1-b377-49d2-a92e-4bcb0db35f16.jpg'" alt="Magic Card" />
              </div>
              <div class="card card-side-left-2">
                <img :src="'https://cards.scryfall.io/normal/front/3/1/31e4b7a1-b377-49d2-a92e-4bcb0db35f16.jpg'" alt="Magic Card" />
              </div>
              <div class="card card-center">
                <img :src="'https://cards.scryfall.io/normal/front/3/1/31e4b7a1-b377-49d2-a92e-4bcb0db35f16.jpg'" alt="Magic Card" />
              </div>
              <div class="card card-side-right-2">
                <img :src="'https://cards.scryfall.io/normal/front/3/1/31e4b7a1-b377-49d2-a92e-4bcb0db35f16.jpg'" alt="Magic Card" />
              </div>
              <div class="card card-side-right">
                <img :src="'https://cards.scryfall.io/normal/front/3/1/31e4b7a1-b377-49d2-a92e-4bcb0db35f16.jpg'" alt="Magic Card" />
              </div>
            </div>
  
            <h3 class="showcase-subtitle">FIND SYNERGIES FOR YOUR<br/>DECK AND BUY IT</h3>
            <button class="showcase-button">Get Started</button>
          </div>
        </div>
  </template>
  
  <style scoped>
  /* Keep existing styles and add: */
  
  .card-showcase {
    text-align: center;
  }
  
  .showcase-title {
    color: white;
    font-size: 1.75rem;
    font-weight: bold;
    margin-bottom: rem;
    line-height: 1.2;
  }
  
  .cards-display {
    position: relative;
    height: 300px;
    margin: 2rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .card {
    position: absolute;
    width: 200px;
    transition: all 0.3s ease;
  }
  
  .card img {
    width: 100%;
    height: auto;
    border-radius: 4.5%;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  }
  
  .card-center {
    z-index: 5;
    transform: scale(1.1);
  }
  
  .card-side-left {
    transform: translateX(-160px) rotate(-15deg);
    z-index: 1;
    opacity: 0.7;
  }
  
  .card-side-left-2 {
    transform: translateX(-80px) rotate(-8deg);
    z-index: 2;
    opacity: 0.8;
  }
  
  .card-side-right-2 {
    transform: translateX(80px) rotate(8deg);
    z-index: 2;
    opacity: 0.8;
  }
  
  .card-side-right {
    transform: translateX(160px) rotate(15deg);
    z-index: 1;
    opacity: 0.7;
  }
  
  .showcase-subtitle {
    color: white;
    font-size: 1.25rem;
    margin: 2rem 0;
    line-height: 1.4;
  }
  
  .showcase-button {
    background-color: #E67E22;
    color: white;
    border: none;
    padding: 1rem 2.5rem;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .showcase-button:hover {
    background-color: #D35400;
  }
  
  @media (max-width: 768px) {
    .cards-display {
      height: 200px;
    }
    
    .card {
      width: 140px;
    }
    
    .card-side-left {
      transform: translateX(-100px) rotate(-15deg);
    }
    
    .card-side-left-2 {
      transform: translateX(-50px) rotate(-8deg);
    }
    
    .card-side-right-2 {
      transform: translateX(50px) rotate(8deg);
    }
    
    .card-side-right {
      transform: translateX(100px) rotate(15deg);
    }
    
    .showcase-title {
      font-size: 1.5rem;
    }
    
    .showcase-subtitle {
      font-size: 1rem;
    }
  }
  </style>