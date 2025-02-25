<template>
  <ion-page>
    <div class="verification-container">
      <Logo></Logo>
      <!-- Verification Form -->
      <div class="verification-form">
        <h1 class="title">Confirm</h1>
        <p class="subtitle">We have sent you a verification code to your email</p>

        <!-- Code Input -->
        <div class="code-inputs">
          <input 
            v-for="(digit, index) in 4" 
            :key="index"
            type="text"
            maxlength="1"
            v-model="code[index]"
            @input="handleInput($event, index)"
            @keydown.backspace="handleBackspace($event, index)"
            @paste="handlePaste"
            ref="inputs"
          />
        </div>

        <!-- Submit Button -->
        <button 
          class="submit-btn"
          @click="handleSubmit"
          :disabled="!isCodeComplete"
        >
          Verify
        </button>
      </div>
    </div>
  </ion-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { IonPage } from '@ionic/vue'
import { useRouter } from 'vue-router' // Importa el enrutador
import Logo from '@/components/Logo.vue'

const router = useRouter() // Obtén la instancia del enrutador

const code = ref(['', '', '', ''])
const inputs = ref([])

const isCodeComplete = computed(() => {
  return code.value.every(digit => digit !== '')
})

const handleInput = (event, index) => {
  const value = event.target.value
  // Ensure only numbers
  if (!/^\d*$/.test(value)) {
    code.value[index] = ''
    return
  }
  
  // Move to next input
  if (value && index < 3) {
    inputs.value[index + 1].focus()
  }
}

const handleBackspace = (event, index) => {
  if (!code.value[index] && index > 0) {
    code.value[index - 1] = ''
    inputs.value[index - 1].focus()
  }
}

const handlePaste = (event) => {
  event.preventDefault()
  const pastedText = event.clipboardData.getData('text')
  const numbers = pastedText.match(/\d/g)
  
  if (numbers) {
    numbers.slice(0, 4).forEach((number, index) => {
      code.value[index] = number
    })
  }
}

const handleSubmit = () => {
  const verificationCode = code.value.join('')
  // Redirige a la ruta tabs/tab1
  router.push({ path: '/tabs/tab1' })
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



.verification-form {
  width: 100%;
  max-width: 24rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #666;
  text-align: center;
  margin-bottom: 2rem;
}

.code-inputs {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.code-inputs input {
  width: 3.5rem;
  height: 3.5rem;
  background-color: #1A1A1A;
  border: none;
  border-radius: 0.5rem;
  color: white;
  font-size: 1.5rem;
  text-align: center;
  outline: none;
}

.code-inputs input:focus {
  box-shadow: 0 0 0 2px #E67E22;
}

.submit-btn {
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

.submit-btn:hover:not(:disabled) {
  background-color: #D35400;
}

.submit-btn:disabled {
  background-color: #666;
  cursor: not-allowed;
}

/* Remove default focus outline for better custom styling */
button:focus,
input:focus {
  outline: none;
}

/* Remove spinner buttons from number inputs */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>