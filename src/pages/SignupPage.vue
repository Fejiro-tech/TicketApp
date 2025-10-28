<template>
  <section class="min-h-screen bg-gray-900 flex items-center justify-center p-10">
    <div class="max-w-[900px] px-6 py-20 text-center bg-gray-800 rounded-3xl shadow-lg p-10 w-full">
      <h1 class="text-2xl font-bold text-blue-400">Create Your Account?</h1>
      <p class="text-md text-blue-400">Join TicketFlow and start managing your tickets.</p>

      <form
        @submit.prevent="handleSignUp"
        class="flex flex-col items-center gap-6 w-full py-16 text-gray-800"
        novalidate
      >
        <div class="flex flex-col sm:flex-row justify-between w-full max-w-[600px] gap-4">
          <input
            type="text"
            placeholder="First Name"
            v-model="firstName"
            class="p-2 flex-1 bg-blue-100 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          />

          <input
            type="text"
            placeholder="Last Name"
            v-model="lastName"
            class="p-2 flex-1 bg-blue-100 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          />
        </div>

        <div class="w-full max-w-[600px]">
          <input
            type="email"
            placeholder="Enter your email"
            v-model="email"
            class="p-2 bg-blue-100 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 w-full"
          />
        </div>

        <div class="w-full max-w-[600px]">
          <input
            type="password"
            placeholder="Enter your password"
            v-model="password"
            class="p-2 bg-blue-100 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 w-full"
          />
        </div>

        <button
          type="submit"
          class="bg-blue-500 py-2 w-full max-w-[600px] rounded-lg text-white font-bold text-md cursor-pointer hover:bg-blue-600 transition"
        >
          Sign Up
        </button>
      </form>

      <div class="text-center">
        <p class="text-gray-400">
          Already have an account?
          <button @click="goToLogin" class="text-blue-400 cursor-pointer font-bold">
            Login Here
          </button>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

const router = useRouter()

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')

const handleSignUp = () => {
  if (!firstName.value && !lastName.value && !email.value && !password.value) {
    toast.error('Please fill up all fields!')
    return
  }

  const existingUsers = JSON.parse(localStorage.getItem('users')) || []
  const userExists = existingUsers.some(user => user.email === email.value)

  if (!firstName.value) {
    toast.error('First name is required')
    return
  }
  if (!lastName.value) {
    toast.error('Last name is required')
    return
  }
  if (!email.value) {
    toast.error('Email is required')
    return
  }
  if (!password.value) {
    toast.error('Password is required')
    return
  }

  if (userExists) {
    toast.error('User already exists. Please log in!')
    return
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(email.value)) {
    toast.error('Please enter a valid email address!')
    return
  }

  const newUser = { firstName: firstName.value, lastName: lastName.value, email: email.value, password: password.value }
  existingUsers.push(newUser)
  localStorage.setItem('users', JSON.stringify(existingUsers))

  toast.success('User Registered')

  router.push('/login')

  firstName.value = ''
  lastName.value = ''
  email.value = ''
  password.value = ''
}

const goToLogin = () => {
  router.push('/login')
}
</script>
