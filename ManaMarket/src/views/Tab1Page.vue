<template>
  <ion-page>
    <HeaderLogo></HeaderLogo>
    <ion-content :fullscreen="true">
      <div class="news-container">
        <!-- Header -->
        <h1 class="news-title">NEWS</h1>

        <!-- Trending Cards Section -->
        <div class="trending-section">
          <h2 class="trending-title">TRENDING CARDS</h2>
          <swiper :modules="[SwiperAutoplay, SwiperPagination, SwiperNavigation]" :slides-per-view="3"
            :space-between="20" :pagination="{ clickable: true }" :navigation="false"
            :autoplay="{ delay: 3000, disableOnInteraction: false }" :breakpoints="{
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
              <ion-card class="card-item">
                <ion-img :src="card.image" :alt="card.name" class="card-image"></ion-img>
              </ion-card>
            </swiper-slide>
          </swiper>
          <button class="all-cards-btn" @click="goToCards">
            Explore New Cards
          </button>
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
import HeaderLogo from '@/components/HeaderLogo.vue';
import {
  IonContent,
  IonPage,
  IonCard,
  IonItem,
  IonThumbnail,
  IonImg,
  IonLabel,
} from '@ionic/vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useRouter } from 'vue-router';

const router = useRouter();

const goToCards = () => {
  router.push({ path: '/tabs/tab2/' }); // Usa router.push con la ruta correcta
};



// Rename the modules to avoid conflicts
const SwiperAutoplay = Autoplay;
const SwiperPagination = Pagination;
const SwiperNavigation = Navigation;

const trendingCards = [
  { name: 'Card 1', image: 'https://cards.scryfall.io/large/front/3/1/31e4b7a1-b377-49d2-a92e-4bcb0db35f16.jpg?1721428130' },
  { name: 'Card 1', image: 'https://cards.scryfall.io/large/front/b/d/bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd.jpg?1614638838' },
  { name: 'Card 1', image: 'https://cards.scryfall.io/normal/front/0/2/02cbd397-3ef3-465f-84fe-765dd1444af8.jpg?1698988417' },
  { name: 'Card 1', image: 'https://cards.scryfall.io/normal/front/5/9/59793f1c-8c7e-433e-9c09-40aa3ce931a1.jpg?1730489103' },
  { name: 'Card 1', image: 'https://cards.scryfall.io/normal/front/7/9/79ba5c35-6e5c-406a-b95f-844d5ec296ab.jpg?1692933638' },
  { name: 'Card 1', image: 'https://cards.scryfall.io/normal/front/d/0/d0d33d52-3d28-4635-b985-51e126289259.jpg?1599707796' },
  { name: 'Card 2', image: 'https://cards.scryfall.io/normal/front/9/3/93f786a2-a7b7-4f9e-92e8-9a6a11efe290.jpg?1627428096' },
  { name: 'Card 3', image: 'https://cards.scryfall.io/normal/front/2/e/2e261489-8dde-4594-8868-69f432f03d03.jpg?1740336344' },
];

const newsItems = [
  {
    title: 'Mana Crypt Banned forever from the game.',
    author: 'olexmartin153',
    time: '1h ago',
    thumbnail: 'https://cards.scryfall.io/art_crop/front/4/d/4d960186-4559-4af0-bd22-63baa15f8939.jpg?1727298349'
  },
  {
    title: 'Mana Crypt Banned forever from the game.',
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
    title: 'Mana Crypt Banned forever from the game.',
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
    title: 'Mana Crypt Banned forever from the game.',
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
    title: 'Mana Crypt Banned forever from the game.',
    author: 'olexmartin153',
    time: '1h ago',
    thumbnail: '/placeholder.svg?height=80&width=80'
  }, {
    title: 'Mana Crypt Banned forever from the game.',
    author: 'olexmartin153',
    time: '1h ago',
    thumbnail: '/placeholder.svg?height=80&width=80'
  },
  // ... rest of the news items
];
</script>

<style scoped>
.news-container {
  background-color: #121212;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.trending-section {
  margin-bottom: 1rem;
}

/* Estilos actualizados para el carrusel */
.trending-carousel {
  width: 100%;
  height: 180px;
  /* Altura reducida */
  padding: 10px 0;
  /* Padding reducido */
}

.card-item {
  margin: 0;
  background: #2a2a2a;
  height: 130px;
  /* Altura fija más pequeña */
  width: 90px;
  /* Ancho fijo más pequeño */
}

.card-image {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

/* Controles del carrusel más pequeños */
.trending-carousel :deep(.swiper-button-next),
.trending-carousel :deep(.swiper-button-prev) {
  color: #E67E22;
  transform: scale(0.7);
  /* Hace las flechas más pequeñas */
}

.trending-carousel :deep(.swiper-button-next):after,
.trending-carousel :deep(.swiper-button-prev):after {
  font-size: 20px;
  /* Tamaño de flecha más pequeño */
}

.trending-carousel :deep(.swiper-pagination-bullet) {
  background: #fff;
  width: 6px;
  /* Bullets más pequeños */
  height: 6px;
}

/* Ajuste del espacio para los controles */
.trending-carousel :deep(.swiper-button-next) {
  right: 5px;
}

.trending-carousel :deep(.swiper-button-prev) {
  left: 5px;
}

/* Resto de tus estilos existentes... */
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
  margin: 10px 0;
  /* Margen reducido */
}

.news-title {
  font-size: 2rem;
  font-weight: bold;
  color: white;
  margin-bottom: 1rem;
  /* Margen reducido */
}

.trending-title {
  font-size: 1.2rem;
  color: white;
  margin-bottom: .5rem;
  /* Margen reducido */
}

.news-item {
  margin-bottom: 1rem;
  background: #2a2a2a;
  border-radius: 1rem;

}
</style>