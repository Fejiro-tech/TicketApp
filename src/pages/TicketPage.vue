<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <header class="border-b border-gray-800">
      <nav class="flex items-center justify-between max-w-[1440px] mx-auto px-4 py-4">
        <h1 class="hidden md:flex font-bold text-blue-400 text-lg sm:text-xl md:text-2xl">
          TicketFlow
        </h1>

        <div class="flex md:hidden items-center justify-start w-full text-blue-400 text-xl mr-4">
          <font-awesome-icon :icon="faTicketAlt" />
        </div>

        <div class="flex items-center gap-3 sm:gap-5 md:gap-8">
          <button
            @click="navigateTo('/dashboard')"
            class="py-2 text-blue-400 hover:text-blue-300 font-bold transition whitespace-nowrap cursor-pointer"
          >
            Dashboard
          </button>

          <button
            @click="toggleForm"
            class="bg-blue-500 hover:bg-blue-600 text-white py-1.5 px-2 rounded-lg text-sm sm:text-base font-semibold whitespace-nowrap cursor-pointer"
          >
            + {{ editingId ? 'Edit' : 'Create' }} Ticket
          </button>

          <button
            @click="handleLogOut"
            class="text-blue-400 hover:text-blue-300 font-bold transition flex items-center gap-2 whitespace-nowrap cursor-pointer"
          >
            <font-awesome-icon :icon="faCircleUser" class="text-gray-500 text-xl" />
            Logout
          </button>
        </div>
      </nav>
    </header>

    <main class="max-w-[1440px] mx-auto px-6 py-10">
      <section v-if="showForm" id="ticket-form" class="bg-gray-800 p-6 rounded-lg my-6">
        <form @submit.prevent="handleSubmit" class="bg-gray-800 p-6 rounded-lg my-6">
          <h2 class="text-xl font-semibold mb-4">
            {{ editingId ? 'Edit Ticket' : 'Create Ticket' }}
          </h2>

          <input
            type="text"
            placeholder="Ticket Title"
            v-model="title"
            class="w-full p-2 mb-3 rounded bg-gray-700"
          />

          <textarea
            placeholder="Description"
            v-model="description"
            class="w-full p-2 mb-3 rounded bg-gray-700"
          ></textarea>

          <select v-model="status" class="w-full p-2 mb-4 rounded bg-gray-700">
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>

          <button
            type="submit"
            class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            {{ editingId ? 'Update Ticket' : 'Save Ticket' }}
          </button>
        </form>
      </section>

      <section>
        <div class="space-y-4">
          <p v-if="tickets.length === 0" class="text-gray-400">No tickets yet. Create one!</p>

          <div
            v-else
            v-for="ticket in tickets"
            :key="ticket.id"
            class="bg-gray-800 p-4 rounded flex justify-between items-center"
          >
            <div>
              <h3 class="text-lg font-semibold">{{ ticket.title }}</h3>
              <p class="text-gray-400 text-sm">{{ ticket.description }}</p>
              <p class="text-xs text-gray-500 mt-1">{{ ticket.createdAt }}</p>
            </div>

            <div class="flex items-center gap-3">
              <span
                :class="[
                  'px-3 py-1 rounded text-sm font-medium',
                  ticket.status === 'open'
                    ? 'bg-green-500/20 text-green-400'
                    : ticket.status === 'in_progress'
                    ? 'bg-amber-500/20 text-amber-400'
                    : 'bg-gray-500/20 text-gray-400'
                ]"
              >
                {{ ticket.status }}
              </span>

              <button
                @click="handleEdit(ticket)"
                class="text-blue-400 hover:text-blue-500"
                title="Edit"
              >
                <font-awesome-icon :icon="faEdit" />
              </button>

              <button
                @click="handleDelete(ticket.id)"
                class="text-red-400 hover:text-red-500"
                title="Delete"
              >
                <font-awesome-icon :icon="faTrash" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import { faTicketAlt, faEdit, faTrash, faCircleUser } from '@fortawesome/free-solid-svg-icons'

const router = useRouter()

const tickets = ref([])
const title = ref('')
const description = ref('')
const status = ref('open')
const showForm = ref(false)
const editingId = ref(null)

onMounted(() => {
  const sessionText = localStorage.getItem('ticketapp_session')
  const session = sessionText ? JSON.parse(sessionText) : null

  if (!session || !session.token || !session.isLoggedIn) {
    router.push('/login')
    return
  }

  const storedTickets = JSON.parse(localStorage.getItem('tickets')) || []
  tickets.value = storedTickets
})

watch(
  tickets,
  (newTickets) => {
    localStorage.setItem('tickets', JSON.stringify(newTickets))
  },
  { deep: true }
)

const handleSubmit = () => {
  if (!title.value || !description.value) {
    toast.error('Please fill all fields')
    return
  }

  if (editingId.value) {
    tickets.value = tickets.value.map((t) =>
      t.id === editingId.value
        ? { ...t, title: title.value, description: description.value, status: status.value }
        : t
    )
    toast.success('Ticket updated successfully!')
    editingId.value = null
  } else {
    const newTicket = {
      id: Date.now(),
      title: title.value,
      description: description.value,
      status: status.value,
      createdAt: new Date().toLocaleString(),
    }
    tickets.value.push(newTicket)
    toast.success('Ticket created successfully!')
  }

  title.value = ''
  description.value = ''
  status.value = 'open'
  showForm.value = false
}

const handleEdit = (ticket) => {
  editingId.value = ticket.id
  title.value = ticket.title
  description.value = ticket.description
  status.value = ticket.status
  showForm.value = true
}

const handleDelete = (id) => {
  if (confirm('Are you sure you want to delete this ticket?')) {
    tickets.value = tickets.value.filter((t) => t.id !== id)
    toast.success('Ticket deleted successfully!')
  }
}

const handleLogOut = () => {
  localStorage.removeItem('ticketapp_session')
  toast.success('You have been logged out.')
  router.push('/')
}

const toggleForm = () => {
  showForm.value = !showForm.value
  editingId.value = null
  title.value = ''
  description.value = ''
  status.value = 'open'
}

const navigateTo = (path) => {
  router.push(path)
}
</script>
