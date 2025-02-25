<template>
  <ion-page>
    <ion-content class="search-container">
      <HeaderLogo></HeaderLogo>
      <div class="content-wrapper">
        <!-- Search Bar -->
        <div class="search-bar">
          <input 
            type="text" 
            placeholder="Card Name"
            class="search-input"
          />
          <button class="search-button">
            <ion-icon :icon="searchOutline" class="search-icon"></ion-icon>
          </button>
        </div>

        <!-- Filter Toggle Button -->
        <button class="filter-toggle" @click="showFilters = !showFilters">
          <span>Filters</span>
          <ion-icon :icon="chevronDownOutline" :class="{'rotate': showFilters}"></ion-icon>
        </button>

        <!-- Filters Section -->
        <div class="filters-section" :class="{'expanded': showFilters}">
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
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { IonPage, IonContent, IonIcon, IonHeader } from '@ionic/vue';
import { searchOutline, cartOutline, cameraOutline, chevronDownOutline } from 'ionicons/icons';
import HeaderLogo from '@/components/HeaderLogo.vue';

const showFilters = ref(false); // Estado para controlar si los filtros están visibles
</script>

<style scoped>
.search-container {
  --background: #000000;
  min-height: 100vh;
}

.content-wrapper {
  padding: 1.5rem;
  max-width: 600px;
  margin-top: 2rem;
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
  max-height: 500px; /* Ajusta este valor según la altura de tus filtros */
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

/* Responsive adjustments */
@media (max-width: 480px) {
  .content-wrapper {
    padding: 1rem;
  }

  .filters-row {
    gap: 0.75rem;
  }

  .filter-select,
  .filter-input {
    padding: 0.75rem 0.5rem;
    font-size: 0.8rem;
  }
}

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
}

.logo-square.white {
  background-color: white;
  transform: rotate(-12deg);
}

.logo-square.orange {
  background-color: #E67E22;
  transform: rotate(12deg);
}

.logo-text {
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
}

.login-form {
  width: 100%;
  max-width: 24rem;
}
</style>