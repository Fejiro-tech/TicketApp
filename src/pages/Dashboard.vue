<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <header class="border-b border-gray-800">
      <nav class="px-6 py-4 flex justify-between items-center max-w-[1440px] mx-auto">
        <h1 class="font-bold text-blue-400 text-lg sm:text-2xl md:text-3xl hidden md:block">
          TicketFlow
        </h1>

        <ul class="flex gap-6 sm:gap-8 items-center flex-1 justify-between md:justify-end">
          <li>
            <button
              @click="navigateTo('/dashboard')"
              class="py-2 text-blue-400 hover:text-blue-300 font-bold transition cursor-pointer"
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              @click="navigateTo('/ticket')"
              class="py-2 text-blue-400 hover:text-blue-300 font-bold transition mr-4 cursor-pointer"
            >
              Tickets
            </button>
          </li>
        </ul>

        <button
          @click="handleLogOut"
          class="text-blue-400 hover:text-blue-300 font-bold transition flex items-center gap-2 cursor-pointer"
        >
          <font-awesome-icon :icon="faCircleUser" class="text-gray-500 text-2xl" />
          Logout
        </button>
      </nav>
    </header>

    <main class="max-w-[1440px] mx-auto px-6 py-10">
      <section class="bg-blue-500 rounded-2xl max-w-[1200px] mx-auto p-10 mt-12">
        <h2 class="text-4xl font-bold text-gray-100">
          Welcome back, {{ currentUser?.firstName }} 👋
        </h2>
        <p class="text-gray-200">Here's what's happening today.</p>
      </section>

      <section class="grid md:grid-cols-3 gap-6 max-w-[1200px] text-center py-10 mx-auto">
        <article class="bg-gray-800 p-6 rounded-xl">
          <p class="text-sm text-gray-400">Open Tickets</p>
          <h3 class="text-4xl font-bold text-green-400">{{ openCount }}</h3>
        </article>

        <article class="bg-gray-800 p-6 rounded-xl">
          <p class="text-sm text-gray-400">In Progress</p>
          <h3 class="text-4xl font-bold text-amber-400">{{ inProgressCount }}</h3>
        </article>

        <article class="bg-gray-800 p-6 rounded-xl">
          <p class="text-sm text-gray-400">Closed Tickets</p>
          <h3 class="text-4xl font-bold text-gray-400">{{ closedCount }}</h3>
        </article>
      </section>

      <div class="flex justify-center">
        <button
          @click="navigateTo('/ticket')"
          class="text-white p-4 bg-blue-500 hover:bg-blue-600 transition rounded"
        >
          Manage Tickets
        </button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'

const router = useRouter()

const openCount = ref(0)
const inProgressCount = ref(0)
const closedCount = ref(0)
const currentUser = ref(null)

const navigateTo = (path) => {
  router.push(path)
}

const handleLogOut = () => {
  localStorage.removeItem('ticketapp_session')
  toast.success('You have been logged out.')
  router.push('/')
}

const loadTickets = () => {
  const storedTickets = JSON.parse(localStorage.getItem('tickets')) || []
  openCount.value = storedTickets.filter((t) => t.status === 'open').length
  inProgressCount.value = storedTickets.filter((t) => t.status === 'in_progress').length
  closedCount.value = storedTickets.filter((t) => t.status === 'closed').length
}

onMounted(() => {
  const sessionText = localStorage.getItem('ticketapp_session')
  const session = sessionText ? JSON.parse(sessionText) : null

  if (!session || !session.token || !session.isLoggedIn) {
    router.push('/login')
    return
  }

  const loggedInEmail = session.email
  const storedUsers = JSON.parse(localStorage.getItem('users')) || []
  currentUser.value = storedUsers.find((user) => user.email === loggedInEmail)

  loadTickets()
  window.addEventListener('storage', loadTickets)
})

onUnmounted(() => {
  window.removeEventListener('storage', loadTickets)
})
</script>