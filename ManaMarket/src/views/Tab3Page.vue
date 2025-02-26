<template>
  <ion-page>
    <HeaderLogo></HeaderLogo>
    <ion-content :fullscreen="true" class="ion-padding custom-content">
      <div class="collection-container">
        <!-- Stats Circle -->
        <div class="stats-circle">
          <div class="percentage">+7.54%</div>
          <div class="amount">932$</div>
          <div class="cards-count">6,523 Cards</div>
        </div>

        <!-- All Cards Button -->
        <button class="all-cards-btn" @click="goToCard">
          All Cards
        </button>

        <!-- Cards Grid -->
        <div class="cards-grid">
          <div v-for="deck in decks" :key="deck.name" class="deck-card" @click="viewdeck">
            <div class="deck-content" :style="{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${deck.background || deck.card1})` }">
              <div class="mana-dots">
                <div v-for="(color, index) in deck.mana" 
                     :key="index" 
                     class="mana-dot"
                     :class="getManaClass(color)">
                </div>
              </div>
              <div class="deck-overlay">
                <h3>{{ deck.name }}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Fixed FAB -->
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button color="warning" @click="newwdeck">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script setup>
import HeaderLogo from '@/components/HeaderLogo.vue';
import { IonPage, IonContent, IonFab, IonFabButton, IonIcon } from '@ionic/vue';
import { add } from 'ionicons/icons';
import { useRouter } from 'vue-router'; // Importa useRouter

const router = useRouter(); // Instancia de router

const goToCard = () => {
  router.push({ path: '/tabs/tab3/collection' }); // Usa router.push con la ruta correcta
};

const viewdeck = () => {
  router.push({ path: '/tabs/tab3/deck' }); // Usa router.push con la ruta correcta
};

const newwdeck = () => {
  router.push({ path: '/tabs/tab3/newdeck' }); // Usa router.push con la ruta correcta
};

const getManaClass = (color) => {
  const classes = {
    'B': 'black',
    'G': 'green',
    'R': 'red',
    'W': 'white',
    'Z': 'blue',
    'I': 'colorless'
  };
  return classes[color] || 'colorless';
};

const decks = [
  {
    name: 'Disa The Restless',
    background: 'https://cards.scryfall.io/art_crop/front/c/9/c976edeb-0fa1-4647-a16c-870d8a3c30c6.jpg?1727175653',
    mana: ['G', 'R', 'B']
  },
  {
    name: 'Bello Bard of the brambles',
    background: 'https://cards.scryfall.io/art_crop/front/3/1/31e4b7a1-b377-49d2-a92e-4bcb0db35f16.jpg?1721428130',
    mana: ['G', 'R']
  },  {
    name: 'Ms Bumbleflower',
    background: 'https://cards.scryfall.io/art_crop/front/4/2/42bbedc1-6b83-46b4-8b3b-a4e05ce77d87.jpg?1721428140',
    mana: ['G','W','Z']
  },
  {
    name: 'Atraxa',
    background: 'https://cards.scryfall.io/art_crop/front/d/0/d0d33d52-3d28-4635-b985-51e126289259.jpg?1599707796',
    mana: ['G', 'W','Z','B']
  },
  {
    name: 'Krenko Mob Boss',
    background: 'https://cards.scryfall.io/art_crop/front/8/2/824b2d73-2151-4e5e-9f05-8f63e2bdcaa9.jpg?1730632010',
    mana: ['R']
  },
  {
    name: 'Will EDH Deck',
    background: 'https://cards.scryfall.io/art_crop/front/1/6/162088ea-5f99-4244-9427-2fdfb2168fc3.jpg?1692939510',
    mana: ['W', 'Z']
  },
  {
    name: 'Gat i Gos',
    background: 'https://cards.scryfall.io/art_crop/front/d/6/d605c780-a42a-4816-8fb9-63e3114a8246.jpg?1677724018',
    mana: ['G', 'R', 'W']
  },
  {
    name: 'Sauron Lord',
    background: 'https://cards.scryfall.io/art_crop/front/0/3/034e0929-b2c7-4b5f-94f2-8eaf4fb1a2a1.jpg?1693611218',
    mana: ['Z','B', 'R']
  },
  // ... rest of the decks data
];
</script>

<style scoped>


.collection-container {
  background-color: #121212;
  padding: 1rem;
  min-height: 100%;
}

.stats-circle {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 2px solid #E67E22;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
}

.percentage {
  color: #4caf50;
  font-size: 0.9em;
}

.amount {
  font-size: 1.8em;
  font-weight: bold;
}

.cards-count {
  font-size: 0.8em;
  color: #666;
}

.all-cards-btn {
  width: 100%;
  background-color: #E67E22;
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  font-weight: 500;
  margin: 20px 0;
}

.all-cards-btn:hover {
  background-color: #D35400;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  padding-bottom: 80px;
}

.deck-card {
  aspect-ratio: 1;
  border-radius: 1.5rem;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.deck-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.deck-content {
  position: relative;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: rgba(0, 0, 0, 0.7);
}

.deck-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  background: linear-gradient(
    to top,
    rgb(0, 0, 0)10%,
    rgba(0,0,0,0.7) 60%,
    rgba(0, 0, 0, 0) 100%
  );
}

.deck-content h3 {
  color: white;
  font-size: 1.1em;
  margin: 0;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

.mana-dots {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
}

.mana-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
}

.mana-dot.black {
  background: #970884;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.8);
  border: 1px solid #8f097d;
}

.mana-dot.green {
  background: #26df16;
  box-shadow: 0 0 8px rgba(42, 145, 52, 0.8);
  border: 1px solid #3dd947;
}

.mana-dot.red {
  background: #d83838;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.8);
  border: 1px solid #ff4444;
}

.mana-dot.white {
  background: #c6e638;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.8);
  border: 1px solid #ffffff;
}

.mana-dot.blue {
  background: #2184e7;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.8);
  border: 1px solid #3399ff;
}

.mana-dot.colorless {
  background: #808080;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.8);
  border: 1px solid #a6a6a6;
}

/* Customize Ionic FAB button */
ion-fab-button::part(native) {
  background-color: #E67E22;
  border-radius: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s;
}

ion-fab-button::part(native):hover {
  background-color: #D35400;
}

/* Ensure Ionic content is scrollable */
:host {
  display: flex;
  flex-direction: column;
  height: 100%;
}

ion-content::part(scroll) {
  display: flex;
  flex-direction: column;
}

@media (max-width: 640px) {
  .cards-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
  
  .deck-overlay {
    padding: 1rem;
  }
  
  .deck-content h3 {
    font-size: 1em;
  }
}
</style>