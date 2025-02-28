<template>
  <ion-page>
    <div class="login-container">
      <Logo/>
      <div class="login-form">
        <h1 class="title">Login</h1>

        <!-- Google Login Button -->
        <button class="google-btn" @click="goToApp">
          <img src="https://www.google.com/favicon.ico" alt="Google" />
          Continue with Google
        </button>

        <!-- Or Divider -->
        <div class="divider">Or</div>

        <form @submit.prevent="handleSubmit">
          <!-- Email Input -->
          <div class="form-group">
            <input type="email" v-model="email" placeholder="Email" required />
          </div>

          <!-- Password Input -->
          <div class="form-group">
            <input type="password" v-model="password" placeholder="Password" required />
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="form-footer">
            <label class="remember-me">
              <input type="checkbox" v-model="rememberMe" />
              <span>Remember Me</span>
            </label>
            <a class="forgot-password" @click="goToForg">Forgot your password?</a>
          </div>

          <!-- Login Button -->
          <button type="submit" class="login-btn" @click="goToApp">
            Login
          </button>
        </form>

        <!-- Create Account Link -->
        <div class="create-account">
          <p>
            Don't have an account?
            <a href="#" @click.prevent="goToRegister">Create a account</a>
          </p>
        </div>
      </div>
    </div>
  </ion-page>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue'
import Logo from '@/components/Logo.vue';

const router = useRouter();

const goToRegister = () => {
  router.push({ name: 'Register' });
};

const goToForg = () => {
  router.push({ name: 'Forgot' });
};

const goToApp = () => {
  router.push({ path: '/tabs/tab1' });
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

.divider {
  color: #666;
  text-align: center;
  margin-bottom: 1rem;
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

.forgot-password {
  color: #999;
  font-size: 0.875rem;
  text-decoration: none;
  transition: color 0.2s;
}

.forgot-password:hover {
  color: white;
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

.create-account {
  margin-top: 1.5rem;
  text-align: center;
}

.create-account p {
  color: #666;
}

.create-account a {
  color: #E67E22;
  text-decoration: none;
  transition: color 0.2s;
}

.create-account a:hover {
  color: #D35400;
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