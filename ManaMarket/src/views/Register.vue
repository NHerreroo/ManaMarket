<template>
  <ion-page>
    <div class="login-container">
      <!-- Logo -->
      <div class="logo">
        <div class="logo-icon">
          <div class="logo-square white"></div>
          <div class="logo-square orange"></div>
        </div>
        <span class="logo-text">MANA MARKET</span>
      </div>

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
          <div class="remember-me-container">
            <label class="remember-me">
              <input type="checkbox" v-model="rememberMe" />
              <span>Remember Me</span>
            </label>
          </div>

          <!-- Register Button -->
          <button type="submit" class="register-btn">
            Register
          </button>
        </form>

        <!-- Divider -->
        <div class="divider">
          <span class="divider-line"></span>
        </div>

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
import { IonPage } from '@ionic/vue'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const rememberMe = ref(false)

const handleSubmit = () => {
  // Handle form submission
  console.log('Form submitted')
}

const registerWithGoogle = () => {
  // Handle Google registration
  console.log('Google registration')
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  background-color: #121212;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 3rem;
}

.logo-icon {
  position: relative;
  width: 32px;
  height: 40px;
}

.logo-square {
  position: absolute;
  width: 32px;
  height: 40px;
  border-radius: 4px;
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
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.login-form {
  width: 100%;
  max-width: 400px;
}

.title {
  color: white;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group input {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
}

.form-group input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.remember-me-container {
  margin: 1.5rem 0;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  cursor: pointer;
}

.remember-me input[type="checkbox"] {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  accent-color: #E67E22;
}

.register-btn {
  width: 100%;
  background-color: #E67E22;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.register-btn:hover {
  background-color: #D35400;
}

.divider {
  margin: 2rem 0;
  position: relative;
  height: 1px;
}

.divider-line {
  position: absolute;
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.1);
}

.google-btn {
  width: 100%;
  background-color: white;
  color: #333;
  padding: 1rem;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.google-btn:hover {
  background-color: #f5f5f5;
}

.google-btn img {
  width: 20px;
  height: 20px;
}

@media (max-width: 480px) {
  .login-container {
    padding: 1rem;
  }
  
  .title {
    font-size: 1.75rem;
  }
  
  .logo-text {
    font-size: 1.25rem;
  }
}
</style>