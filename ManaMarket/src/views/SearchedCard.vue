<template>
    <ion-page>
      <HeaderLogo />
      <ion-content class="ion-padding" :class="{ 'dark-theme': true }">
        <!-- Back Button -->
        <button class="back-button" @click="router.back()">
            <ion-icon :icon="arrowBackOutline"></ion-icon>
        </button>
  
        <div class="content-wrapper">
          <!-- Card Image and Title -->
          <div class="card-header">
            <div class="card-image-container">
              <ion-img
                :src="cardImage"
                class="card-image"
                alt="Bello, Bard of the Brambles card image"
              />
            </div>
            <h1 class="card-title">
              <span>Bello, Bard of the Brambles</span>
            </h1>
          </div>
  
          <!-- Charts Section -->
          <div class="charts-container">
            <ion-card class="chart-card">
              <ion-card-header>
                <ion-card-title>Price History</ion-card-title>
                <ion-card-subtitle>Last 4 Weeks</ion-card-subtitle>
              </ion-card-header>
              <ion-card-content>
                <canvas ref="priceChart" />
              </ion-card-content>
            </ion-card>
  
            <ion-card class="chart-card">
              <ion-card-header>
                <ion-card-title>Popularity Trend</ion-card-title>
                <ion-card-subtitle>Weekly Data</ion-card-subtitle>
              </ion-card-header>
              <ion-card-content>
                <canvas ref="popularityChart" />
              </ion-card-content>
            </ion-card>
          </div>
  
          <!-- Rest of the template remains the same -->
          <ion-card class="details-card">
            <ion-card-content>
              <div class="price-grid">
                <div class="price-item">
                  <ion-label color="medium">Lowest Price</ion-label>
                  <div class="price-value">
                    <ion-icon :icon="trendingDown" color="success" />
                    <span>$3.50</span>
                  </div>
                </div>
                <div class="price-item">
                  <ion-label color="medium">Highest Price</ion-label>
                  <div class="price-value">
                    <ion-icon :icon="trendingUp" color="danger" />
                    <span>$11.22</span>
                  </div>
                </div>
                <div class="price-item">
                  <ion-label color="medium">Total Decks</ion-label>
                  <div class="price-value">
                    <ion-icon :icon="people" />
                    <span>100,284</span>
                  </div>
                </div>
              </div>
  
              <div class="tags-section">
                <ion-chip 
                  v-for="(tag, index) in tags" 
                  :key="index"
                  class="tag-chip"
                  :color="getTagColor(tag)"
                >
                  <ion-icon :icon="getTagIcon(tag)" />
                  <ion-label>{{ tag }}</ion-label>
                </ion-chip>
              </div>
            </ion-card-content>
          </ion-card>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { 
    IonPage, IonContent, IonButton, IonIcon, IonChip, IonLabel, 
    IonImg, IonCard, IonCardContent, IonCardHeader, IonCardTitle, 
    IonCardSubtitle, IonButtons, IonToolbar, IonHeader, IonSkeletonText
  } from '@ionic/vue';
  import { 
    arrowBack, trendingUp, trendingDown, people, colorPalette,
    diamond, documents, checkmark, map ,
    arrowBackOutline,
  } from 'ionicons/icons';
  import Chart from 'chart.js/auto';
  import HeaderLogo from '@/components/HeaderLogo.vue';
  import type { ChartConfiguration } from 'chart.js';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const searchQuery = ref('');

  const cardImage = ref('https://cards.scryfall.io/normal/front/3/1/31e4b7a1-b377-49d2-a92e-4bcb0db35f16.jpg?1721428130');
  const priceChart = ref<HTMLCanvasElement | null>(null);
  const popularityChart = ref<HTMLCanvasElement | null>(null);
  
  const tags = [
    "Colors: Red, Green",
    "Good Stock: Yes",
    "Type Card: Creature",
    "Rarity: Rare",
    "Legendary: Yes",
    "Collection: BloomBurrow",
    "Format: Commander/EDH",
    "Legal: Yes",
    "Have atlas: Yes"
  ];
  
  const getTagColor = (tag: string): string => {
    if (tag.includes('Colors:')) return 'primary';
    if (tag.includes('Rarity:')) return 'warning';
    if (tag.includes('Legal:')) return 'success';
    return 'medium';
  };
  
  const getTagIcon = (tag: string) => {
    if (tag.includes('Colors:')) return colorPalette;
    if (tag.includes('Rarity:')) return diamond;
    if (tag.includes('Format:')) return documents;
    if (tag.includes('Legal:')) return checkmark;
    if (tag.includes('atlas:')) return map;
    return undefined;
  };
  
  const createChart = (canvas: HTMLCanvasElement, data: number[], color: string) => {
    const gradient = canvas.getContext('2d')?.createLinearGradient(0, 0, 0, 400);
    if (gradient) {
      gradient.addColorStop(0, `${color}33`);
      gradient.addColorStop(1, 'transparent');
    }
  
    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
          data,
          borderColor: color,
          backgroundColor: gradient,
          tension: 0.4,
          borderWidth: 2,
          fill: true,
          pointBackgroundColor: color,
          pointRadius: 4,
          pointHoverRadius: 6,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: 'index'
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1f1f1f',
            titleColor: '#fff',
            bodyColor: '#fff',
            padding: 12,
            cornerRadius: 8
          }
        },
        scales: {
          y: {
            grid: { 
              color: '#333333',
            },
            ticks: { color: '#888888' }
          },
          x: {
            grid: { 
              color: '#333333',

            },
            ticks: { color: '#888888' }
          }
        }
      }
    };
  
    return new Chart(canvas, config);
  };
  
  onMounted(() => {
    if (priceChart.value) {
      createChart(priceChart.value, [5, 8, 6, 9], '#4CAF50');
    }
  
    if (popularityChart.value) {
      createChart(popularityChart.value, [70, 65, 80, 75], '#FF5722');
    }
  });
  </script>
  
  <style scoped>
  

  
  .back-button:hover {
    background-color: #c56516;
  }

  .content-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding: 16px;
    background-color: #121212;
  }
  
  .back-button {
  font-size: 28px;
  background-color: #d87219;
  border: none;
  border-radius: 9999px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  position: sticky;
  top: 2rem; /* Ajusta este valor para moverlo más abajo */
  z-index: 10;
  margin-left: 8px;
}

  
  .card-header {
    text-align: center;
    margin-bottom: 32px;
  }
  
  .card-image-container {
    position: relative;
    width: 100%;
    max-width: 300px; /* Reduced from 400px */
    margin: 0 auto 24px;
  }
  
  .card-image {
    width: 100%;
    border-radius: 2rem;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease;
  }
  
  .card-image:hover {
    transform: scale(1.02);
  }
  
  .card-title {
    color: white;
    font-size: 24px; /* Slightly reduced */
    font-weight: 700;
    margin: 0;
  }
  
  .charts-container {
    display: grid;
    gap: 24px;
    margin-bottom: 24px;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); /* Increased from 300px */
  }
  
  .chart-card, .details-card {
    background: #252525;
    border-radius: 16px;
    overflow: hidden;
  }
  
  .chart-card ion-card-header {
    padding: 16px;
  }
  
  .chart-card ion-card-content {
    height: 200px; /* Reduced from 300px to make charts more rectangular */
    padding: 16px;
  }
  
  /* Rest of the styles remain the same */
  .price-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 24px;
    margin-bottom: 24px;
  }
  
  .price-item {
    text-align: center;
  }
  
  .price-value {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 24px;
    font-weight: 600;
    margin-top: 8px;
  }
  
  .tags-section {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    padding-top: 16px;
    border-top: 1px solid #333;
  }
  
  .tag-chip {
    --background: #333;
    --color: white;
    transition: transform 0.2s ease;
  }
  
  .tag-chip:hover {
    transform: translateY(-2px);
  }
  
  
  </style>