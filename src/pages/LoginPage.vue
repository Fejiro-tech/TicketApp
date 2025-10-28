<template>
  <div class="min-h-screen bg-gray-900 flex items-center justify-center p-10">
    <div class="max-w-[900px] px-6 py-20 text-center bg-gray-800 rounded-3xl shadow-lg w-full">
      <h1 class="text-2xl font-bold text-blue-400">Welcome Back</h1>
      <p class="text-md text-blue-400">Enter your email and password to access your account</p>

      <form @submit.prevent="handleLogin" class="flex flex-col gap-6 items-center w-full py-10 text-gray-800" novalidate>
        <div class="flex flex-col gap-2 w-full max-w-[600px]">
          <label for="email" class="text-left text-blue-400 font-medium">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            v-model="email"
            @input="emailError = ''"
            class="bg-blue-100 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          />
          <p v-if="emailError" class="text-red-400 text-left">{{ emailError }}</p>
        </div>

        <div class="flex flex-col gap-2 items-start w-full max-w-[600px]">
          <label for="password" class="text-left text-blue-400 font-medium">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            v-model="password"
            @input="passwordError = ''"
            class="bg-blue-100 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          />
          <p v-if="passwordError" class="text-red-400">{{ passwordError }}</p>
        </div>

        <button
          type="submit"
          class="bg-blue-500 py-2 w-full max-w-[600px] rounded-lg text-white font-bold text-md cursor-pointer hover:bg-blue-600 transition"
        >
          Sign In
        </button>
      </form>

      <div class="text-center">
        <p class="text-gray-400">
          Don't have an account?
          <button @click="navigateToSignup" class="text-blue-400 font-bold cursor-pointer">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

const router = useRouter()

const email = ref('')
const password = ref('')
const emailError = ref('')
const passwordError = ref('')

const handleLogin = () => {
  emailError.value = ''
  passwordError.value = ''

  let isValid = true

  if (!email.value) {
    emailError.value = 'Email is required'
    isValid = false
  } else {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email.value)) {
      emailError.value = 'Please enter a valid email address!'
      isValid = false
    }
  }

  if (!password.value) {
    passwordError.value = 'Password is required'
    isValid = false
  }

  if (!isValid) return

  const storedUsers = JSON.parse(localStorage.getItem('users')) || []
  const foundUser = storedUsers.find(
    (user) => user.email === email.value && user.password === password.value
  )

  const generateToken = () => {
    const randomPart = Math.random().toString(36).substring(2)
    const timePart = Date.now().toString(36)
    return randomPart + timePart
  }

  if (foundUser) {
    const token = generateToken()
    const session = {
      token,
      email: foundUser.email,
      isLoggedIn: true,
      loginTime: Date.now()
    }
    localStorage.setItem('ticketapp_session', JSON.stringify(session))
    toast.success('Login successful!')
    router.push('/dashboard')
    email.value = ''
    password.value = ''
  } else {
    toast.error('Invalid credentials or user not found')
  }
}

const navigateToSignup = () => {
  router.push('/signup')
}
</script>