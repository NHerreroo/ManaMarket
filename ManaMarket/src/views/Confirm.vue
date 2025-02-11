<template>
    <ion-page>
      <ion-content class="ion-padding">
        <div class="verification-container">
          <!-- Logo -->
          <div class="logo">
            <div class="logo-icon">
              <div class="logo-square white"></div>
              <div class="logo-square orange"></div>
            </div>
            <span class="logo-text">MANA MARKET</span>
          </div>
  
          <!-- Verification Form -->
          <div class="verification-form">
            <h1 class="title">Confirm</h1>
            <p class="subtitle">
              We have sent you a verification code to your email
            </p>
  
            <form @submit.prevent="handleSubmit">
              <!-- Code Input Boxes -->
              <div class="code-inputs">
                <ion-item v-for="(digit, index) in 4" :key="index" class="code-input">
                  <ion-input
                    type="text"
                    maxlength="1"
                    v-model="code[index]"
                    @input="handleInput($event, index)"
                    @keydown="handleKeydown($event, index)"
                    :ref="el => inputRefs[index] = el"
                  ></ion-input>
                </ion-item>
              </div>
  
              <!-- Resend Code Link -->
              <div class="resend-code">
                <ion-button fill="clear" @click="resendCode">
                  resend code
                </ion-button>
              </div>
  
              <!-- Submit Button -->
              <ion-button 
                expand="block" 
                type="submit" 
                class="submit-btn"
                :disabled="!isCodeComplete"
              >
                Verify
              </ion-button>
            </form>
          </div>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { 
    IonPage, 
    IonContent, 
    IonButton, 
    IonItem, 
    IonInput 
  } from '@ionic/vue'
  
  const code = ref(['', '', '', ''])
  const inputRefs = ref([])
  
  const isCodeComplete = computed(() => {
    return code.value.every(digit => digit !== '')
  })
  
  const handleInput = (event, index) => {
    const value = event.target.value
    // Ensure only one character
    code.value[index] = value.slice(-1)
    
    // Move to next input if available
    if (value && index < 3) {
      inputRefs.value[index + 1].$el.querySelector('input').focus()
    }
  }
  
  const handleKeydown = (event, index) => {
    // Handle backspace
    if (event.key === 'Backspace' && !code.value[index] && index > 0) {
      code.value[index - 1] = ''
      inputRefs.value[index - 1].$el.querySelector('input').focus()
    }
  }
  
  const handleSubmit = () => {
    const verificationCode = code.value.join('')
    console.log('Submitting code:', verificationCode)
    // Add your verification logic here
  }
  
  const resendCode = () => {
    console.log('Resending verification code')
    // Add your resend logic here
  }
  </script>
  
  <style scoped>
  .verification-container {
    min-height: 100vh;
    background-color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
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
  
  .verification-form {
    width: 100%;
    max-width: 24rem;
    text-align: center;
  }
  
  .title {
    color: white;
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  
  .subtitle {
    color: white;
    font-size: 0.875rem;
    margin-bottom: 2rem;
  }
  
  .code-inputs {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    margin-bottom: 1.5rem;
  }
  
  .code-input {
    width: 4rem;
    height: 4rem;
    --background: #1A1A1A;
    --border-radius: 0.5rem;
    --border-color: transparent;
  }
  
  .code-input ion-input {
    --color: white;
    --placeholder-color: #666;
    text-align: center;
    font-size: 1.5rem;
  }
  
  .resend-code {
    margin-bottom: 1.5rem;
  }
  
  .resend-code ion-button {
    --color: #666;
    text-transform: none;
    font-size: 0.875rem;
  }
  
  .resend-code ion-button:hover {
    --color: #E67E22;
  }
  
  .submit-btn {
    --background: #E67E22;
    --background-hover: #D35400;
    --border-radius: 0.5rem;
    --padding-top: 0.75rem;
    --padding-bottom: 0.75rem;
    font-weight: 500;
  }
  
  /* Remove default Ionic styles */
  ion-item {
    --padding-start: 0;
    --inner-padding-end: 0;
    --background: transparent;
  }
  
  ion-input {
    --padding-start: 0;
    --padding-end: 0;
  }
  </style>