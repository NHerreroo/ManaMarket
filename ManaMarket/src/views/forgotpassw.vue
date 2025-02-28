<template>
    <ion-page>
      <div class="forgot-password-container">
        <Logo/>
        <div class="forgot-password-form">
          <h1 class="title">Forgot Password</h1>
          
          <p class="description">
            Enter your email address and we'll send you a link to reset your password.
          </p>
  
          <form @submit.prevent="handleResetPassword">
            <!-- Email Input -->
            <div class="form-group">
              <input type="email" v-model="email" placeholder="Email" required />
            </div>
  
            <!-- Reset Password Button -->
            <button type="submit" class="reset-btn">
              Send Reset Link
            </button>
          </form>
  
          <!-- Back to Login Link -->
          <div class="back-to-login">
            <p>
              Remember your password?
              <a href="#" @click.prevent="goToLogin">Back to login</a>
            </p>
          </div>
        </div>
      </div>
    </ion-page>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { IonPage } from '@ionic/vue';
  import Logo from '@/components/Logo.vue';
  import { toastController } from '@ionic/vue';
  
  const router = useRouter();
  const email = ref('');
  
  const goToLogin = () => {
    router.push({ name: 'Login' });
  };
  
  const handleResetPassword = async () => {
    try {
      // Here you would implement the actual password reset logic
      // For example, using Supabase or your authentication provider:
      // await supabase.auth.resetPasswordForEmail(email.value)
      
      const toast = await toastController.create({
        message: 'Password reset link sent to your email!',
        duration: 3000,
        position: 'bottom',
        color: 'success'
      });
      
      await toast.present();
      
      // Optionally redirect back to login after a delay
      setTimeout(() => {
        goToLogin();
      }, 1000);
    } catch (error) {
      const toast = await toastController.create({
        message: 'Failed to send reset link. Please try again.',
        duration: 3000,
        position: 'bottom',
        color: 'danger'
      });
      
      await toast.present();
    }
  };
  </script>
  
  <style scoped>
  .forgot-password-container {
    min-height: 100vh;
    background-color: #121212;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }
  
  .forgot-password-form {
    width: 100%;
    max-width: 24rem;
  }
  
  .title {
    color: white;
    font-size: 1.5rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 1rem;
  }
  
  .description {
    color: #999;
    text-align: center;
    margin-bottom: 1.5rem;
    font-size: 0.95rem;
    line-height: 1.5;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
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
  
  .reset-btn {
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
  
  .reset-btn:hover {
    background-color: #D35400;
  }
  
  .back-to-login {
    margin-top: 1.5rem;
    text-align: center;
  }
  
  .back-to-login p {
    color: #666;
  }
  
  .back-to-login a {
    color: #E67E22;
    text-decoration: none;
    transition: color 0.2s;
  }
  
  .back-to-login a:hover {
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