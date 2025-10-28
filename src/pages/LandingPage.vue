<template>
  <div class="relative min-h-screen bg-gray-900 text-white">
    <header class="border-b border-gray-800">
      <nav class="flex justify-between items-center max-w-[1440px] mx-auto px-4 py-4">
        <h1 class="font-bold text-blue-400 text-2xl">TicketFlow</h1>
        <div class="flex gap-4">
          <button
            @click="navigateToLogin"
            class="px-6 py-2 text-blue-400 hover:text-blue-300 font-medium transition cursor-pointer"
          >
            Login
          </button>
          
        </div>
      </nav>
    </header>

    <main>
      <section
        class="relative max-w-[1440px] mx-auto px-6 py-[150px] overflow-hidden flex flex-col justify-center items-center"
      >
        <div
          class="absolute top-10 right-10 w-64 h-64 bg-purple-600/40 rounded-full opacity-30 blur-lg"
        ></div>
        <div
          class="absolute bottom-40 left-10 w-48 h-48 bg-blue-500/30 rounded-full opacity-40 blur-lg"
        ></div>

        <div class="relative z-10 text-center max-w-4xl mx-auto text-gray-200">
          <h1 id="hero-heading" class="text-5xl md:text-6xl font-bold mb-6">
            Manage Your Tickets
            <span class="block text-blue-400">Effortlessly</span>
          </h1>
          <p class="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Streamline your workflow with our powerful ticket management system.
            Create, track, and resolve tickets with ease.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              @click="navigateToSignup"
              class="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl cursor-pointer"
            >
              Get Started
            </button>
            <button
              @click="navigateToLogin"
              class="px-8 py-4 text-white rounded-lg font-semibold hover:bg-gray-500 transition border-2 border-gray-500 cursor-pointer"
            >
              Login
            </button>
          </div>
        </div>

        <div class="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#1e3a8a"
              fill-opacity="1"
              d="M0,32L48,58.7C96,85,192,139,288,181.3C384,224,480,256,576,229.3C672,203,768,117,864,85.3C960,53,1056,75,1152,69.3C1248,64,1344,32,1392,16L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      <section
        class="max-w-[1440px] mx-auto px-6 py-20"
        aria-labelledby="features-heading"
      >
        <h2 id="features-heading" class="text-4xl font-bold text-center text-gray-100 mb-12">
          Powerful Features
        </h2>

        <div class="grid md:grid-cols-3 gap-8">
          <div
            class="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition"
          >
            <div
              class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4"
            >
            <<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Easy Creation</h3>
            <p class="text-gray-600">
              Create and assign tickets in seconds with our intuitive interface.
            </p>
          </div>

          <div
            class="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition"
          >
            <div
              class="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">
              Real-time Updates
            </h3>
            <p class="text-gray-600">
              Track ticket status changes and updates as they happen.
            </p>
          </div>

          <div
            class="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition"
          >
            <div
              class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4"
            >
               <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3v18h18M9 17v-6m6 6V9" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Analytics</h3>
            <p class="text-gray-600">
              Get insights into your team's performance and ticket metrics.
            </p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToLogin = () => {
  router.push('/login')
}

const navigateToSignup = () => {
  router.push('/signup')
}
</script>