<template>
  <ion-page>
    <div class="login-container">
      <Logo></Logo>
      <!-- Register Form -->
      <div class="login-form">
        <h1 class="title">Register</h1>

        <form @submit.prevent="handleSubmit">
          <!-- Email Input -->
          <div class="form-group">
            <input 
              type="email" 
              v-model="email" 
              placeholder="Email" 
              required 
            />
          </div>

          <!-- Password Input -->
          <div class="form-group">
            <input 
              type="password" 
              v-model="password" 
              placeholder="Password" 
              required 
            />
          </div>

          <!-- Confirm Password Input -->
          <div class="form-group">
            <input 
              type="password" 
              v-model="confirmPassword" 
              placeholder="Confirm Password" 
              required 
            />
          </div>

          <!-- Remember Me -->
          <div class="form-footer">
            <label class="remember-me">
              <input type="checkbox" v-model="rememberMe" />
              <span>Remember Me</span>
            </label>
          </div>

          <!-- Register Button -->
          <button type="submit" class="login-btn" @click="goToConfirm">
            Register
          </button>
        </form>

        <!-- Divider -->
        <div class="divider">Or</div>

        <!-- Google Button -->
        <button class="google-btn" @click="registerWithGoogle">
          <img src="https://www.google.com/favicon.ico" alt="Google" />
          Continue with Google
        </button>
      </div>
    </div>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue'
import Logo from '@/components/Logo.vue';

const router = useRouter();
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const rememberMe = ref(false)
var form = false;

const goToConfirm = () => {
  if (form == true) {
    router.push({ name: 'Confirm' });
  }
  
};


const handleSubmit = () => {
  // Handle form submission
  console.log('Form submitted')
  form = true;
}

const registerWithGoogle = () => {
  // Handle Google registration
  console.log('Google registration')
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.login-form {
  width: 100%;
  max-width: 24rem;
}

.title {
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group input {
  width: 100%;
  background-color: #1A1A1A;
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: none;
  outline: none;
}

.form-group input:focus {
  box-shadow: 0 0 0 2px #E67E22;
}

.form-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: white;
  font-size: 0.875rem;
}

.remember-me input[type="checkbox"] {
  width: 1rem;
  height: 1rem;
  border-radius: 0.25rem;
  border-color: #666;
  background-color: #1A1A1A;
  accent-color: #E67E22;
}

.login-btn {
  width: 100%;
  background-color: #E67E22;
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  font-weight: 500;
}

.login-btn:hover {
  background-color: #D35400;
}

.divider {
  color: #666;
  text-align: center;
  margin: 1rem;
}

.google-btn {
  width: 100%;
  background-color: #f1f1f1;
  color: #333;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.google-btn:hover {
  background-color: #e1e1e1;
}

.google-btn img {
  width: 1.25rem;
  height: 1.25rem;
}

/* Input placeholder color */
input::placeholder {
  color: #666;
}

/* Remove default focus outline for better custom styling */
button:focus,
input:focus {
  outline: none;
}
</style>