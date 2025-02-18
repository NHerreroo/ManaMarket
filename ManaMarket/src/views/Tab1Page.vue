<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding dark">
      <div class="news-container">
        <!-- Header -->
        <h1 class="news-title">NEWS</h1>

        <!-- Trending Cards Section -->
        <div class="trending-section">
          <h2 class="trending-title">TRENDING CARDS</h2>
          <div class="trending-cards">
            <ion-card v-for="(card, index) in trendingCards" :key="index" class="card-item">
              <ion-img :src="card.image" :alt="card.name"></ion-img>
            </ion-card>
          </div>
          <ion-button expand="block" class="find-cards-btn">
            FIND NEW CARDS
          </ion-button>
        </div>

        <!-- News Feed -->
        <div class="news-feed">
          <ion-card v-for="(item, index) in newsItems" :key="index" class="news-item">
            <ion-item lines="none">
              <ion-thumbnail slot="start">
                <ion-img :src="item.thumbnail"></ion-img>
              </ion-thumbnail>
              <ion-label>
                <h3>{{ item.title }}</h3>
                <p class="author">-{{ item.author }}</p>
                <p class="timestamp">{{ item.time }}</p>
              </ion-label>
            </ion-item>
          </ion-card>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonContent,
  IonPage,
  IonCard,
  IonItem,
  IonThumbnail,
  IonImg,
  IonLabel,
  IonButton
} from '@ionic/vue';

const trendingCards = [
  { name: 'Card 1', image: '/placeholder.svg?height=200&width=150' },
  { name: 'Card 2', image: '/placeholder.svg?height=200&width=150' },
  { name: 'Card 3', image: '/placeholder.svg?height=200&width=150' },
];

const newsItems = [
  {
    title: 'Mana Crypt Banned forever from the game.',
    author: 'olexmartin153',
    time: '1h ago',
    thumbnail: '/placeholder.svg?height=80&width=80'
  },
  {
    title: 'Jewled Lotus Banned forever from the game.',
    author: 'olexmartin153',
    time: '1h ago',
    thumbnail: '/placeholder.svg?height=80&width=80'
  },
  {
    title: 'New Foundation Expansion in MTG! (NEW REPRINTS)',
    author: 'olexmartin153',
    time: '1h ago',
    thumbnail: '/placeholder.svg?height=80&width=80'
  },
  {
    title: 'Mana Crypt Banned forever from the game.',
    author: 'olexmartin153',
    time: '1h ago',
    thumbnail: '/placeholder.svg?height=80&width=80'
  },
  {
    title: 'Jewled Lotus Banned forever from the game.',
    author: 'olexmartin153',
    time: '1h ago',
    thumbnail: '/placeholder.svg?height=80&width=80'
  },
  {
    title: 'New Foundation Expansion in MTG! (NEW REPRINTS)',
    author: 'olexmartin153',
    time: '1h ago',
    thumbnail: '/placeholder.svg?height=80&width=80'
  },{
    title: 'Mana Crypt Banned forever from the game.',
    author: 'olexmartin153',
    time: '1h ago',
    thumbnail: '/placeholder.svg?height=80&width=80'
  },
  {
    title: 'Jewled Lotus Banned forever from the game.',
    author: 'olexmartin153',
    time: '1h ago',
    thumbnail: '/placeholder.svg?height=80&width=80'
  },
  {
    title: 'New Foundation Expansion in MTG! (NEW REPRINTS)',
    author: 'olexmartin153',
    time: '1h ago',
    thumbnail: '/placeholder.svg?height=80&width=80'
  },{
    title: 'Mana Crypt Banned forever from the game.',
    author: 'olexmartin153',
    time: '1h ago',
    thumbnail: '/placeholder.svg?height=80&width=80'
  },
  {
    title: 'Jewled Lotus Banned forever from the game.',
    author: 'olexmartin153',
    time: '1h ago',
    thumbnail: '/placeholder.svg?height=80&width=80'
  },
  {
    title: 'New Foundation Expansion in MTG! (NEW REPRINTS)',
    author: 'olexmartin153',
    time: '1h ago',
    thumbnail: '/placeholder.svg?height=80&width=80'
  },
];
</script>

<style scoped>
.news-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

.news-title {
  font-size: 2rem;
  font-weight: bold;
  color: white;
  margin-bottom: 1.5rem;
}

.trending-title {
  font-size: 1.2rem;
  color: white;
  margin-bottom: 1rem;
}

.trending-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
}

.card-item {
  margin: 0;
  background: #2a2a2a;
}

.find-cards-btn {
  --background: #e67e22;
  --background-hover: #d35400;
  margin: 1rem 0;
  font-weight: bold;
}

.news-feed {
  margin-top: 2rem;
}

.news-item {
  margin-bottom: 1rem;
  background: #2a2a2a;
}

.news-item ion-item {
  --background: transparent;
}

.author {
  color: #666;
  font-size: 0.9rem;
  margin: 0.2rem 0;
}

.timestamp {
  color: #666;
  font-size: 0.8rem;
  margin: 0;
}

/* Dark theme overrides */
:host {
  --ion-background-color: #1a1a1a;
  --ion-text-color: white;
}

ion-thumbnail {
  --size: 60px;
  margin-right: 1rem;
}

ion-label h3 {
  font-weight: 500;
  color: white;
}
</style>