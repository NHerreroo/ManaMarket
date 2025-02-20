<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding custom-content">
      <div class="collection-container">
        <!-- Stats Circle -->
        <div class="stats-circle">
          <div class="percentage">+7.54%</div>
          <div class="amount">932$</div>
          <div class="cards-count">6,523 Cards</div>
        </div>

        <!-- All Cards Button -->
        <button class="all-cards-btn">
          All Cards
        </button>

        <!-- Cards Grid -->
        <div class="cards-grid">
          <div v-for="deck in decks" :key="deck.name" class="deck-card">
            <div class="deck-content">
              <h3>{{ deck.name }}</h3>
              <div class="card-previews">
                <img :src="deck.card1" alt="Card preview" class="card-preview"/>
                <img :src="deck.card2" alt="Card preview" class="card-preview"/>
              </div>
              <div class="mana-icons">
                <div v-for="(icon, index) in deck.manaIcons" 
                     :key="index" 
                     class="mana-icon">
                  ⚪
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Fixed FAB -->
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button color="warning">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent, IonFab, IonFabButton, IonIcon } from '@ionic/vue';
import { add } from 'ionicons/icons';

const decks = [
  {
    name: 'Disa The Restless',
    card1: '/placeholder.svg?height=100&width=70',
    card2: '/placeholder.svg?height=100&width=70',
    manaIcons: [1, 2, 3]
  },
  {
    name: 'Bello Bard',
    card1: '/placeholder.svg?height=100&width=70',
    card2: '/placeholder.svg?height=100&width=70',
    manaIcons: [1, 2]
  },
  {
    name: 'Yqra & Squirrels',
    card1: '/placeholder.svg?height=100&width=70',
    card2: '/placeholder.svg?height=100&width=70',
    manaIcons: [1, 2]
  },
  {
    name: 'Simic Frogs 4 L win',
    card1: '/placeholder.svg?height=100&width=70',
    card2: '/placeholder.svg?height=100&width=70',
    manaIcons: [1, 2]
  },
  {
    name: 'Finn Counter Comb',
    card1: '/placeholder.svg?height=100&width=70',
    card2: '/placeholder.svg?height=100&width=70',
    manaIcons: [1, 2]
  },
  {
    name: 'Will Gitano',
    card1: '/placeholder.svg?height=100&width=70',
    card2: '/placeholder.svg?height=100&width=70',
    manaIcons: [1, 2]
  },{
    name: 'Disa The Restless',
    card1: '/placeholder.svg?height=100&width=70',
    card2: '/placeholder.svg?height=100&width=70',
    manaIcons: [1, 2, 3]
  },
  {
    name: 'Bello Bard',
    card1: '/placeholder.svg?height=100&width=70',
    card2: '/placeholder.svg?height=100&width=70',
    manaIcons: [1, 2]
  },
  {
    name: 'Yqra & Squirrels',
    card1: '/placeholder.svg?height=100&width=70',
    card2: '/placeholder.svg?height=100&width=70',
    manaIcons: [1, 2]
  },
  {
    name: 'Simic Frogs 4 L win',
    card1: '/placeholder.svg?height=100&width=70',
    card2: '/placeholder.svg?height=100&width=70',
    manaIcons: [1, 2]
  },
  {
    name: 'Finn Counter Comb',
    card1: '/placeholder.svg?height=100&width=70',
    card2: '/placeholder.svg?height=100&width=70',
    manaIcons: [1, 2]
  },
  {
    name: 'Will Gitano',
    card1: '/placeholder.svg?height=100&width=70',
    card2: '/placeholder.svg?height=100&width=70',
    manaIcons: [1, 2]
  }
];
</script>

<style scoped>
/* Remove default Ionic background */
.custom-content::part(background) {
  background: black;
}

.custom-content::part(scroll) {
  background: black;
}

.collection-container {
  background-color: black;
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
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  padding-bottom: 80px;
}

.deck-card {
  background-color: #1A1A1A;
  border-radius: 0.5rem;
  padding: 1rem;
  transition: transform 0.2s;
}

.deck-card:hover {
  transform: translateY(-2px);
}

.deck-content h3 {
  color: white;
  font-size: 0.9em;
  margin: 0 0 10px 0;
  font-weight: 500;
}

.card-previews {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}

.card-preview {
  width: 45%;
  height: auto;
  border-radius: 0.5rem;
}

.mana-icons {
  display: flex;
  gap: 4px;
}

.mana-icon {
  width: 16px;
  height: 16px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
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

/* Remove default focus outline for better custom styling */
button:focus {
  outline: none;
}

button:focus-visible {
  box-shadow: 0 0 0 2px #E67E22;
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
</style>