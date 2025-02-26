<template>
  <ion-page>
    <ion-content class="search-container">
      <HeaderLogo />
      <div class="content-wrapper">
        <!-- Search Bar -->

        <h1 class="section-title">SHOP</h1>
        <div class="search-bar">
          <input type="text" placeholder="Card Name" class="search-input" />
          <button class="search-button" @click="goToCards">
            <ion-icon :icon="searchOutline" class="search-icon"></ion-icon>
          </button>
        </div>

        <!-- Filter Toggle Button -->
        <button class="filter-toggle" @click="showFilters = !showFilters">
          <span>Filters</span>
          <ion-icon :icon="chevronDownOutline" :class="{ 'rotate': showFilters }"></ion-icon>
        </button>

        <!-- Filters Section -->
        <div class="filters-section" :class="{ 'expanded': showFilters }">
          <div class="filters-grid">
            <!-- Primera fila -->
            <div class="filters-row">
              <div class="filter-group">
                <label>Language</label>
                <select class="filter-select">
                  <option>All</option>
                </select>
              </div>

              <div class="filter-group">
                <label>Expansion</label>
                <select class="filter-select">
                  <option>All</option>
                </select>
              </div>
            </div>

            <!-- Segunda fila -->
            <div class="filters-row">
              <div class="filter-group price-input-container">
                <label>Min. Price</label>
                <input type="number" placeholder="0.00" class="filter-input" />
              </div>

              <div class="filter-group price-input-container">
                <label>Max. Price</label>
                <input type="number" placeholder="0.00" class="filter-input" />
              </div>

              <div class="filter-group">
                <label>Min Condition</label>
                <select class="filter-select">
                  <option>Poor</option>
                </select>
              </div>
            </div>

            <!-- Tercera fila -->
            <div class="filters-row">
              <div class="filter-group">
                <label>Foil?</label>
                <select class="filter-select">
                  <option>Any</option>
                </select>
              </div>

              <div class="filter-group">
                <label>Rarity</label>
                <select class="filter-select">
                  <option>Rare</option>
                </select>
              </div>

              <div class="filter-group">
                <label>Altered</label>
                <select class="filter-select">
                  <option>Any</option>
                </select>
              </div>
            </div>
          </div>
        </div>


        <!-- BEST SELLERS Title -->
        <h2 class="section-subtitle">BEST SELLERS</h2>
        <!-- Trending Carousel -->
        <swiper :modules="[SwiperAutoplay, SwiperPagination, SwiperNavigation]" :slides-per-view="3" :space-between="40"
          :pagination="{ clickable: true }" :navigation="false" :autoplay="{ delay: 3000, disableOnInteraction: false }"
          :breakpoints="{
            '640': {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            '768': {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }" class="trending-carousel">
          <swiper-slide v-for="(card, index) in trendingCards" :key="index">
            <ion-card class="card-item-car">
              <ion-img :src="card.image" :alt="card.name" class="card-image-car"></ion-img>
            </ion-card>
          </swiper-slide>
        </swiper>


        <!-- RECOMMENDATIONS Title -->
        <h2 class="section-subtitle">RECOMMENDATIONS</h2>

        <!-- Cards List -->
        <div class="cards-list">
          <div class="card-item" v-for="(card, index) in cards" :key="index">
            <div class="card-content">
              <div class="card-left">
                <ion-icon 
                  :icon="cameraOutline" 
                  class="camera-icon"
                  @click="showCardPreview"
                ></ion-icon>
                <span class="card-name">{{ card.name }}</span>
              </div>
              <div class="card-right">
                <span class="card-price">{{ card.price }}</span>
                <button class="cart-button" @click="addToCart(card)">
                  <ion-icon :icon="cartOutline"></ion-icon>
                </button>
              </div>
            </div>
          </div>
        </div>

        <Transition name="fade">
          <div v-if="isPreviewVisible" class="card-preview-overlay" @click="hideCardPreview">
            <div class="card-preview-container" @click.stop>
              <img 
                :src="previewImageUrl" 
                alt="Card preview" 
                class="preview-image"
                @click="hideCardPreview"
              />
            </div>
          </div>
        </Transition>

        <!-- Toast Notification -->
        <ion-toast :is-open="showToast" message="Se ha añadido correctamente al carrito" :duration="2000"
          @didDismiss="showToast = false" class="custom-toast"></ion-toast>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { IonPage, IonContent, IonIcon, IonToast } from '@ionic/vue';
import { searchOutline, cartOutline, cameraOutline, chevronDownOutline } from 'ionicons/icons';
import HeaderLogo from '@/components/HeaderLogo.vue';

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useRouter } from 'vue-router';

// Rename the modules to avoid conflicts
const SwiperAutoplay = Autoplay;
const SwiperPagination = Pagination;
const SwiperNavigation = Navigation;


const isPreviewVisible = ref(false);
const previewImageUrl = ref('https://cards.scryfall.io/normal/front/1/9/19911e6e-7c35-4281-b31c-266382f052cc.jpg?1717190810');

const showCardPreview = () => {
  isPreviewVisible.value = true;
  // Prevenir scroll cuando el modal está abierto
  document.body.style.overflow = 'hidden';
};

const hideCardPreview = () => {
  isPreviewVisible.value = false;
  // Restaurar scroll
  document.body.style.overflow = 'auto';
};


const trendingCards = [
  { name: 'Card 1', image: 'https://cards.scryfall.io/normal/front/b/b/bb246be3-d9cb-4753-8d8c-0c770a584090.jpg?1662752634' },
  { name: 'Card 1', image: 'https://cards.scryfall.io/normal/front/7/e/7e44b856-1803-4e63-ad81-43a1c4ef5020.jpg?1730489782' },
  { name: 'Card 1', image: 'https://cards.scryfall.io/normal/front/f/8/f8ead24c-dd4a-40cd-839e-de08017a7c29.jpg?1721425683' },
  { name: 'Card 1', image: 'https://cards.scryfall.io/normal/front/b/6/b67c27f1-12d1-4c48-9e22-31c43a9ecbbc.jpg?1681082373' },
  { name: 'Card 1', image: 'https://cards.scryfall.io/normal/front/7/9/79ba5c35-6e5c-406a-b95f-844d5ec296ab.jpg?1692933638' },
  { name: 'Card 1', image: 'https://cards.scryfall.io/normal/front/5/d/5da14d86-0780-4821-a799-96f64b377df4.jpg?1717011855' },
  { name: 'Card 2', image: 'https://cards.scryfall.io/normal/front/a/b/ab061406-38f4-40e7-a9ea-e3cbcaabc127.jpg?1562631458' },
  { name: 'Card 3', image: 'https://cards.scryfall.io/normal/front/2/e/2e261489-8dde-4594-8868-69f432f03d03.jpg?1740336344' },
];

const showFilters = ref(false);
const showToast = ref(false);
const cards = ref(Array(11).fill({
  name: 'Sol Ring',
  price: '1,99$'
}));

// Función para añadir al carrito y mostrar el toast
const addToCart = (card) => {
  console.log('Añadido al carrito:', card.name);
  showToast.value = true; // Mostrar el toast
};



const router = useRouter();

const goToCards = () => {
  router.push({ path: '/tabs/tab4/shoping' }); // Usa router.push con la ruta correcta
};
</script>

<style scoped>
.camera-container {
  position: relative;
  cursor: pointer;
}

.card-preview {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #1A1A1A;
  padding: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  margin-bottom: 0.5rem;
}

.preview-image {
  width: 200px;
  height: auto;
  border-radius: 0.25rem;
}

/* Flecha del popup */
.card-preview::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 8px;
  border-style: solid;
  border-color: #1A1A1A transparent transparent transparent;
}

/* Ajuste para asegurar que el icono de la cámara mantenga su estilo */
.camera-icon {
  color: #E67E22;
  font-size: 1.5rem;
  transition: color 0.2s ease;
}

.camera-container:hover .camera-icon {
  color: #D35400;
}

.search-container {
  padding: 3rem;
  background-color: #121212;
  min-height: 100vh;
}

.content-wrapper {
  padding: 2rem;
  max-width: 600px;
  margin-top: 0.5rem;
}

.search-bar {
  position: relative;
  margin-bottom: 1rem;
}

.search-input {
  width: 100%;
  background-color: #1A1A1A;
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: none;
  outline: none;
  font-size: 0.875rem;
  height: 45px;
}

.search-button {
  position: absolute;
  right: 0;
  top: 0;
  height: 45px;
  width: 45px;
  background-color: #E67E22;
  border: none;
  border-radius: 0 0.5rem 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
}

.search-button:hover {
  background-color: #D35400;
}

.search-icon {
  color: white;
  font-size: 1.5rem;
}

.filter-toggle {
  width: 100%;
  background-color: #E67E22;
  border: none;
  border-radius: 0.5rem;
  color: white;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  cursor: pointer;
}

.filter-toggle ion-icon {
  transition: transform 0.3s ease;
}

.filter-toggle ion-icon.rotate {
  transform: rotate(180deg);
}

.filters-section {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}

.filters-section.expanded {
  max-height: 500px;
  margin-bottom: 1rem;
}

.filters-grid {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.filters-row {
  display: grid;
  gap: 1rem;
  width: 100%;
}

/* Primera fila: 2 columnas */
.filters-row:nth-child(1) {
  grid-template-columns: 1fr 1fr;
}

/* Segunda fila: 3 columnas */
.filters-row:nth-child(2) {
  grid-template-columns: 1fr 1fr 1fr;
}

/* Tercera fila: 3 columnas */
.filters-row:nth-child(3) {
  grid-template-columns: 1fr 1fr 1fr;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-group label {
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
}

.filter-select,
.filter-input {
  width: 100%;
  background-color: #1A1A1A;
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: none;
  outline: none;
  height: 45px;
  font-size: 0.875rem;
}

/* Input placeholder color */
input::placeholder {
  color: #666;
}

/* Select arrow styling */
select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1em;
  padding-right: 2rem;
}

.cards-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 3rem;
}

.card-item {
  background-color: #1A1A1A;
  border-radius: 0.5rem;
}

.card-content {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.camera-icon {
  color: #E67E22;
  font-size: 1.5rem;
}

.card-name {
  color: #ffffff;
  font-size: 1rem;
}

.card-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.card-price {
  color: white;
  font-weight: 500;
}

.cart-button {
  background: none;
  border: none;
  color: #E67E22;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-button ion-icon {
  font-size: 1.25rem;
}

/* Focus states */
.search-input:focus,
.filter-select:focus,
.filter-input:focus {
  box-shadow: 0 0 0 2px #E67E22;
}

/* Remove default focus outline */
button:focus,
input:focus,
select:focus {
  outline: none;
}

.trending-carousel {
  width: 100%;
  height: 180px;
  padding: 10px 0;
}

.card-item-car {
  margin: 0;
  background: #2a2a2a;
  height: 130px;
  width: 90px;
}

.card-image-car {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

/* Controles del carrusel más pequeños */
.trending-carousel :deep(.swiper-button-next),
.trending-carousel :deep(.swiper-button-prev) {
  color: #E67E22;
  transform: scale(0.7);
}

.trending-carousel :deep(.swiper-button-next):after,
.trending-carousel :deep(.swiper-button-prev):after {
  font-size: 20px;
}

.trending-carousel :deep(.swiper-pagination-bullet) {
  background: #fff;
  width: 6px;
  height: 6px;
}

/* Ajuste del espacio para los controles */
.trending-carousel :deep(.swiper-button-next) {
  right: 5px;
}

.trending-carousel :deep(.swiper-button-prev) {
  left: 5px;
}

/* Estilos personalizados para el toast */
.custom-toast {
  --background: #4CAF50;
  /* Fondo verde */
  --color: white;
  /* Texto blanco */
  --border-radius: 12px;
  /* Bordes redondeados */
  --box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  /* Sombra suave */
  --padding: 16px;
  /* Espaciado interno */
  --font-size: 14px;
  /* Tamaño de fuente */
  --font-weight: 500;
  /* Grosor de fuente */
  --icon-color: white;
  /* Color del ícono (si se usa) */
  --width: auto;
  /* Ancho automático */
  --max-width: 90%;
  /* Ancho máximo */
  --min-width: 250px;
  /* Ancho mínimo */
  --height: auto;
  /* Altura automática */
  --animation-duration: 300ms;
  /* Duración de la animación */
  --animation-timing-function: ease-in-out;
  /* Función de temporización */
}

.custom-toast::part(message) {
  text-align: center;
  /* Centrar el texto */
}

.custom-toast::part(button) {
  color: white;
  /* Color del botón (si se usa) */
}

.section-title {
  font-size: 2rem;
  font-weight: bold;
  color: white;
  margin-bottom: 1.5rem;
}

.section-subtitle {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  margin: 2rem 0 1rem;
}

.card-preview-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
}

.card-preview-container {
  position: relative;
  max-width: 100%;
  max-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.preview-image {
  max-height: 90vh;
  max-width: 90vw;
  object-fit: contain;
  border-radius: 10px;
  cursor: pointer;
}

/* Animaciones */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Mejoras para el icono de la cámara */
.camera-icon {
  color: #E67E22;
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s ease, color 0.2s ease;
}

.camera-icon:hover {
  color: #D35400;
  transform: scale(1.1);
}

/* Asegurar que el contenido detrás del modal no se pueda interactuar */
.card-preview-overlay {
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .preview-image {
    max-width: 95vw;
    max-height: 80vh;
  }
}
</style>