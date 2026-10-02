<script setup>
import { computed, onMounted, onUnmounted, onUpdated, ref, watch, watchEffect } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import LessonCard from './components/LessonCard.vue'
import TodoFilter from './components/TodoFilter.vue'
import TodoItem from './components/TodoItem.vue'
import UserCard from './components/UserCard.vue'
import IntroPanel from './components/IntroPanel.vue'
import SkillsPanel from './components/SkillsPanel.vue'
import ResultPanel from './components/ResultPanel.vue'

const STORAGE_KEY = 'vue-beginner-todos'
const route = useRoute()
const isTodosPage = computed(() => route.path === '/todos')

const learnerName = ref('Vue learner')
const count = ref(0)

const readStoredTodos = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

const progressMessage = computed(() => {
  if (count.value === 0) return 'Click the button to start practicing.'
  if (count.value === 1) return 'Nice start. This value is reactive.'
  return `You have clicked ${count.value} times.`
})

const newTodo = ref('')
const todoError = ref('')
const todos = ref([])
const timerCount = ref(0)
const users = ref([])
const usersLoading = ref(false)
const usersError = ref('')
const sampleUsers = [
  { id: 1, name: 'Aye Aye', email: 'aye@example.com', role: 'Frontend developer' },
  { id: 2, name: 'Kyaw Kyaw', email: 'kyaw@example.com', role: 'UI designer' },
  { id: 3, name: 'Zaw Zaw', email: 'zaw@example.com', role: 'Backend developer' },
]
const selectedUser = ref(sampleUsers[0])
const formEmail = ref('')
const formError = ref('')
const submittedEmail = ref('')
const watchedEmail = ref('')
const watchedEmailError = ref('')
const watchEffectEmail = ref('')
const watchEffectStatus = ref('Type something to start.')
const focusInputRef = ref(null)
const focusInputValue = ref('')
const focusInputMessage = ref('Click the button to focus the input.')
const panelTabs = ['intro', 'skills', 'result']
const currentCachedPanel = ref('intro')
const showTransitionMessage = ref(true)
const dynamicPanel = {
  intro: IntroPanel,
  skills: SkillsPanel,
  result: ResultPanel,
}
let timerId = null

onMounted(() => {
  todos.value = readStoredTodos()
  loadUsers()
  timerId = setInterval(() => {
    timerCount.value += 1
  }, 1000)
  console.log('Component mounted and timer started.')
})

onUpdated(() => {
  console.log('Component updated and timerCount is now:', timerCount.value)
})

onUnmounted(() => {
  console.log('Component unmounted and timer stopped.')
  if (timerId) {
    clearInterval(timerId)
  }
})

watch(
  todos,
  (newTodos) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos))
  },
  { deep: true },
)

const remainingTodos = computed(() => todos.value.filter((todo) => !todo.completed).length)

function addTodo() {
  const text = newTodo.value.trim()
  todoError.value = ''

  if (!text) {
    todoError.value = 'Please enter a task.'
    return
  }

  if (text.length > 80) {
    todoError.value = 'Task must be 80 characters or fewer.'
    return
  }

  todos.value.push({
    id: Date.now(),
    text,
    completed: false,
  })

  newTodo.value = ''
}

function toggleTodo(todoId) {
  todos.value = todos.value.map((todo) =>
    todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
  )
}

function removeTodo(todoId) {
  todos.value = todos.value.filter((todo) => todo.id !== todoId)
}

const todoFilter = ref('all')

const visibleTodos = computed(() => {
  if (todoFilter.value === 'active') return todos.value.filter((todo) => !todo.completed)
  if (todoFilter.value === 'done') return todos.value.filter((todo) => todo.completed)
  return todos.value
})

async function loadUsers() {
  usersLoading.value = true
  usersError.value = ''

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=4')
    if (!response.ok) throw new Error(`Request failed (${response.status})`)
    users.value = await response.json()
  } catch {
    usersError.value = 'Could not load users. Check your connection and try again.'
  } finally {
    usersLoading.value = false
  }
}

function chooseUser(user) {
  selectedUser.value = user
}

function submitForm() {
  const value = formEmail.value.trim()
  formError.value = ''

  if (!value) {
    formError.value = 'Please enter your email.'
    return
  }

  if (!value.includes('@')) {
    formError.value = 'Please enter a valid email address.'
    return
  }

  submittedEmail.value = value
  formEmail.value = ''
}

watch(watchedEmail, (value) => {
  if (!value) {
    watchedEmailError.value = 'Email is required.'
    return
  }

  if (!value.includes('@')) {
    watchedEmailError.value = 'Email must contain @.'
    return
  }

  watchedEmailError.value = ''
})

watchEffect(() => {
  const value = watchEffectEmail.value.trim()

  if (!value) {
    watchEffectStatus.value = 'Type something to start.'
    return
  }

  if (!value.includes('@')) {
    watchEffectStatus.value = 'Not valid yet — add @.'
    return
  }

  watchEffectStatus.value = 'Valid email! watchEffect is working.'
})

function focusInputField() {
  focusInputRef.value?.focus()
  focusInputMessage.value = 'The input is focused through a template ref.'
}

const currentCachedComponent = computed(() => dynamicPanel[currentCachedPanel.value])
</script>

<template>
  <main class="min-h-screen bg-[#f5f1e8] px-5 py-12 text-[#17221d] sm:py-[72px]">
    <nav class="mx-auto mb-8 flex max-w-[980px] gap-3 rounded-lg border border-[#d8d1c2] bg-[#fffdf8] p-3 shadow-[8px_8px_0_#ded5c4]">
      <RouterLink class="rounded px-4 py-2 font-bold text-[#526057] hover:bg-[#f4e8d7]" to="/">Home</RouterLink>
      <RouterLink class="rounded px-4 py-2 font-bold text-[#526057] hover:bg-[#f4e8d7]" to="/about">About</RouterLink>
      <RouterLink class="rounded px-4 py-2 font-bold text-[#526057] hover:bg-[#f4e8d7]" to="/todos">Todos</RouterLink>
      <RouterLink class="rounded px-4 py-2 font-bold text-[#526057] hover:bg-[#f4e8d7]" to="/lazy-demo">Lazy Loading</RouterLink>
    </nav>

    <RouterView v-if="!isTodosPage" />

    <section v-if="!isTodosPage" class=" mt-4  mx-auto mb-8 max-w-[980px] sm:mb-12">
      <p class=" mb-4 text-xs font-bold uppercase tracking-[0.12em] text-[#bd5d38]">
        Vue.js beginner playground
      </p>
      <h1 class="max-w-[650px] font-display text-5xl font-bold leading-[0.98] tracking-[-0.06em] sm:text-7xl">
        Hello, {{ learnerName }}.
      </h1>
      <p class="mt-6 max-w-[520px] text-lg leading-relaxed text-[#617066]">
        Change the name and click the counter to see Vue update the page automatically.
      </p>
    </section>

    <section v-if="!isTodosPage" class="mx-auto grid max-w-[980px] gap-5 md:grid-cols-2" aria-label="Vue practice examples">
      <article class="min-h-[360px] rounded-lg border border-[#d8d1c2] bg-[#fffdf8] p-7 shadow-[8px_8px_0_#ded5c4]">
        <span class="mb-8 block text-xs font-bold uppercase tracking-[0.12em] text-[#bd5d38] sm:mb-12">01</span>
        <h2 class="font-display text-2xl font-semibold tracking-[-0.04em]">Reactive input</h2>
        <p class="mt-2 leading-relaxed text-[#68756c]">
          <code class="rounded bg-[#f1e6d5] px-1.5 py-0.5 font-mono text-[0.9em] text-[#8d462c]">v-model</code>
          keeps this input and the heading in sync.
        </p>
        <label class="mt-7 block text-sm font-bold text-[#526057]" for="learner-name">Your name</label>
        <input
          id="learner-name"
          v-model="learnerName"
          class="mt-2 w-full rounded border border-[#bfc8bd] bg-[#f9f7f0] px-3.5 py-3 text-[#17221d] outline-none focus:border-[#bd5d38] focus:ring-4 focus:ring-[#f2d8c8]"
          type="text"
        />
      </article>

      <article class="min-h-[360px] rounded-lg border border-[#d8d1c2] bg-[#dce8d9] p-7 shadow-[8px_8px_0_#ded5c4]">
        <span class="mb-8 block text-xs font-bold uppercase tracking-[0.12em] text-[#bd5d38] sm:mb-12">02</span>
        <h2 class="font-display text-2xl font-semibold tracking-[-0.04em]">Click counter</h2>
        <p class="mt-2 leading-relaxed text-[#68756c]">
          <code class="rounded bg-[#f1e6d5] px-1.5 py-0.5 font-mono text-[0.9em] text-[#8d462c]">ref()</code>
          stores a value that Vue watches for changes.
        </p>
        <strong class="my-7 block font-display text-6xl leading-none">{{ count }}</strong>
        <button
          class="rounded bg-[#bd5d38] px-4 py-3 font-bold text-[#fffdf8] hover:bg-[#99462d]"
          type="button"
          @click="count++"
        >
          Increase count
        </button>
        <button
          class="ml-2 rounded border border-[#aebda9] bg-transparent px-4 py-3 text-[#526057]"
          type="button"
          @click="count = 0"
        >
          Reset
        </button>
        <p class="mt-5 text-sm leading-relaxed text-[#68756c]" aria-live="polite">{{ progressMessage }}</p>
      </article>
    </section>
    
    <section class="mx-auto mt-5 max-w-[980px] rounded-lg border border-[#d8d1c2] bg-[#fffdf8] p-7 shadow-[8px_8px_0_#ded5c4]" aria-labelledby="todo-title">
      <div class="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span class="mb-8 block text-xs font-bold uppercase tracking-[0.12em] text-[#bd5d38]">03</span>
          <h2 id="todo-title" class="font-display text-2xl font-semibold tracking-[-0.04em]">Todo list</h2>
          <p class="mt-2 leading-relaxed text-[#68756c]">
            <code class="rounded bg-[#f1e6d5] px-1.5 py-0.5 font-mono text-[0.9em] text-[#8d462c]">v-for</code>
            renders each item, while <code class="rounded bg-[#f1e6d5] px-1.5 py-0.5 font-mono text-[0.9em] text-[#8d462c]">v-if</code>
            can show different states.
          </p>
        </div>
        <strong class="text-sm text-[#526057]">{{ remainingTodos }} remaining</strong>
      </div>

      <p class="mt-3 text-sm text-[#68756c]">
        Saved automatically with <code class="rounded bg-[#f1e6d5] px-1.5 py-0.5 font-mono text-[0.9em] text-[#8d462c]">watch()</code>
        and <code class="rounded bg-[#f1e6d5] px-1.5 py-0.5 font-mono text-[0.9em] text-[#8d462c]">localStorage</code>.
        <span class="mt-1 block text-[#526057]">Lesson: <code class="rounded bg-[#f1e6d5] px-1.5 py-0.5 font-mono text-[0.9em] text-[#8d462c]">onMounted()</code> loads data when the component starts.</span>
      </p>

      <form class="mt-6 flex flex-col gap-2 sm:flex-row" @submit.prevent="addTodo">
        <input
          v-model="newTodo"
          class="min-w-0 flex-1 rounded border border-[#bfc8bd] bg-[#f9f7f0] px-3.5 py-3 text-[#17221d] outline-none focus:border-[#bd5d38] focus:ring-4 focus:ring-[#f2d8c8]"
          type="text"
          placeholder="What will you practice?"
          aria-label="New todo"
          :aria-invalid="Boolean(todoError)"
          :aria-describedby="todoError ? 'todo-error' : undefined"
        />
        <button class="rounded bg-[#bd5d38] px-4 py-3 font-bold text-[#fffdf8] hover:bg-[#99462d]" type="submit">
          Add task
        </button>
      </form>
      <p v-if="todoError" class="mt-2 text-sm font-bold text-[#a3482c]" role="alert">
        {{ todoError }}
      </p>

      <ul class="mt-5 divide-y divide-[#e7e0d2]">
        <li v-for="todo in todos" :key="todo.id" class="flex items-center gap-3 py-3">
          
          <input v-model="todo.completed" class="h-4 w-4 accent-[#bd5d38]" type="checkbox" :aria-label="`Complete ${todo.text}`" />
          <span :class="todo.completed ? 'text-[#9aa39b] line-through' : 'text-[#526057]'" class="flex-1">
            {{ todo.text }}
          </span>
          <button class="text-sm font-bold text-[#bd5d38] hover:text-[#99462d]" type="button" @click="removeTodo(todo.id)">
            Remove
          </button>
        </li>
      </ul>
    </section>

    <section v-if="!isTodosPage" class="mx-auto mt-5 max-w-[980px] rounded-lg border border-[#d8d1c2] bg-[#e9dfd0] p-7 shadow-[8px_8px_0_#ded5c4]" aria-labelledby="computed-title">
      <span class="mb-8 block text-xs font-bold uppercase tracking-[0.12em] text-[#bd5d38]">04</span>
      <h2 id="computed-title" class="font-display text-2xl font-semibold tracking-[-0.04em]">Computed views</h2>
      <p class="mt-2 max-w-[620px] leading-relaxed text-[#68756c]">
        A <code class="rounded bg-[#f1e6d5] px-1.5 py-0.5 font-mono text-[0.9em] text-[#8d462c]">computed()</code>
        value derives a new list from your todos and updates when their state changes.
      </p>

      <TodoFilter v-model="todoFilter" />

      <ul class="mt-5 divide-y divide-[#d8cdbd]" aria-live="polite">
        <TodoItem
          v-for="todo in visibleTodos"
          :key="todo.id"
          :todo="todo"
          @toggle="toggleTodo"
          @remove="removeTodo"
        />
        <li v-if="visibleTodos.length === 0" class="py-3 text-[#68756c]">Nothing here yet.</li>
      </ul>
    </section>

    <section v-if="!isTodosPage" class="mx-auto mt-5 max-w-[980px] rounded-lg border border-[#d8d1c2] bg-[#f7f1e6] p-7 shadow-[8px_8px_0_#ded5c4]" aria-labelledby="lifecycle-title">
      <span class="mb-8 block text-xs font-bold uppercase tracking-[0.12em] text-[#bd5d38]">05</span>
      <h2 id="lifecycle-title" class="font-display text-2xl font-semibold tracking-[-0.04em]">Lifecycle hook practice</h2>
      <p class="mt-2 leading-relaxed text-[#68756c]">
        This timer starts when the component mounts, updates while it runs, and stops when the component unmounts.
      </p>
      <div class="mt-5 rounded border border-[#d8cdbd] bg-[#fffdf8] p-4">
        <p class="text-sm font-bold uppercase tracking-[0.12em] text-[#bd5d38]">Timer</p>
        <strong class="mt-2 block font-display text-5xl leading-none text-[#17221d]">{{ timerCount }}s</strong>
      </div>
    </section>

    <section v-if="!isTodosPage" class="mx-auto mt-5 max-w-[980px] rounded-lg border border-[#d8d1c2] bg-[#e8eee3] p-7 shadow-[8px_8px_0_#ded5c4]" aria-labelledby="api-title">
      <span class="mb-8 block text-xs font-bold uppercase tracking-[0.12em] text-[#bd5d38]">06</span>
      <h2 id="api-title" class="font-display text-2xl font-semibold tracking-[-0.04em]">Fetch data from an API</h2>
      <p class="mt-2 max-w-[620px] leading-relaxed text-[#68756c]">
        <code class="rounded bg-[#f1e6d5] px-1.5 py-0.5 font-mono text-[0.9em] text-[#8d462c]">fetch()</code>
        requests data; the loading and error states tell the user what is happening.
      </p>

      <p v-if="usersLoading" class="mt-5 text-[#526057]" role="status">Loading users...</p>
      <div v-else-if="usersError" class="mt-5" role="alert">
        <p class="text-sm font-bold text-[#a3482c]">{{ usersError }}</p>
        <button class="mt-3 rounded bg-[#bd5d38] px-4 py-2 font-bold text-[#fffdf8] hover:bg-[#99462d]" type="button" @click="loadUsers">
          Try again
        </button>
      </div>
      <ul v-else class="mt-5 divide-y divide-[#cdd8c8]">
        <li v-for="user in users" :key="user.id" class="py-3">
          <strong class="block text-[#17221d]">{{ user.name }}</strong>
          <span class="text-sm text-[#68756c]">{{ user.email }}</span>
        </li>
      </ul>
    </section>

    <section v-if="!isTodosPage" class="mx-auto mt-5 max-w-[980px] rounded-lg border border-[#d8d1c2] bg-[#f3e9dc] p-7 shadow-[8px_8px_0_#ded5c4]" aria-labelledby="props-title">
      <span class="mb-8 block text-xs font-bold uppercase tracking-[0.12em] text-[#bd5d38]">07</span>
      <h2 id="props-title" class="font-display text-2xl font-semibold tracking-[-0.04em]">Parent and child communication</h2>
      <p class="mt-2 max-w-[620px] leading-relaxed text-[#68756c]">
        The parent sends data with <code class="rounded bg-[#f1e6d5] px-1.5 py-0.5 font-mono text-[0.9em] text-[#8d462c]">props</code>
        and receives events with <code class="rounded bg-[#f1e6d5] px-1.5 py-0.5 font-mono text-[0.9em] text-[#8d462c]">emit()</code>.
      </p>

      <div class="mt-6 grid gap-6 md:grid-cols-2">
        <div class="rounded border border-[#d8cdbd] bg-[#fffdf8] p-4">
          <h3 class="font-display text-xl font-semibold">User list</h3>
          <ul class="mt-4 space-y-3">
            <li v-for="user in sampleUsers" :key="user.id">
              <button
                class="w-full rounded border px-3 py-2 text-left font-bold transition"
                :class="selectedUser && selectedUser.id === user.id ? 'border-[#bd5d38] bg-[#f2d8c8] text-[#17221d]' : 'border-[#d8cdbd] bg-[#f9f7f0] text-[#526057] hover:border-[#bd5d38]'"
                type="button"
                @click="chooseUser(user)"
              >
                {{ user.name }}
              </button>
            </li>
          </ul>
        </div>

        <UserCard :user="selectedUser" @select-user="chooseUser" />
      </div>
    </section>

    <section v-if="!isTodosPage" class="mx-auto mt-5 max-w-[980px] rounded-lg border border-[#d8d1c2] bg-[#fefaf5] p-7 shadow-[8px_8px_0_#ded5c4]" aria-labelledby="form-title">
      <span class="mb-8 block text-xs font-bold uppercase tracking-[0.12em] text-[#bd5d38]">08</span>
      <h2 id="form-title" class="font-display text-2xl font-semibold tracking-[-0.04em]">Form handling with v-model</h2>
      <p class="mt-2 leading-relaxed text-[#68756c]">
        The input value is linked with <code class="rounded bg-[#f1e6d5] px-1.5 py-0.5 font-mono text-[0.9em] text-[#8d462c]">v-model</code>,
        and the form validates before saving the value.
      </p>

      <form class="mt-5 max-w-[520px]" @submit.prevent="submitForm">
        <label class="block text-sm font-bold text-[#526057]" for="lesson-email">Email</label>
        <input
          id="lesson-email"
          v-model="formEmail"
          class="mt-2 w-full rounded border border-[#bfc8bd] bg-[#f9f7f0] px-3.5 py-3 text-[#17221d] outline-none focus:border-[#bd5d38] focus:ring-4 focus:ring-[#f2d8c8]"
          type="text"
          placeholder="Enter your email"
        />

        <button class="mt-4 rounded bg-[#bd5d38] px-4 py-3 font-bold text-[#fffdf8] hover:bg-[#99462d]" type="submit">
          Submit
        </button>

        <p v-if="formError" class="mt-3 text-sm font-bold text-[#a3482c]" role="alert">
          {{ formError }}
        </p>

        <p v-if="submittedEmail" class="mt-3 text-sm font-bold text-[#526057]">
          Submitted: {{ submittedEmail }}
        </p>
      </form>
    </section>

    <section v-if="!isTodosPage" class="mx-auto mt-5 max-w-[980px] rounded-lg border border-[#d8d1c2] bg-[#f9f5ef] p-7 shadow-[8px_8px_0_#ded5c4]" aria-labelledby="watch-title">
      <span class="mb-8 block text-xs font-bold uppercase tracking-[0.12em] text-[#bd5d38]">09</span>
      <h2 id="watch-title" class="font-display text-2xl font-semibold tracking-[-0.04em]">Watch and live validation</h2>
      <p class="mt-2 leading-relaxed text-[#68756c]">
        The <code class="rounded bg-[#f1e6d5] px-1.5 py-0.5 font-mono text-[0.9em] text-[#8d462c]">watch()</code> function runs
        whenever the value changes, so you can validate while the user is typing.
      </p>

      <div class="mt-5 max-w-[520px]">
        <label class="block text-sm font-bold text-[#526057]" for="watch-email">Live email check</label>
        <input
          id="watch-email"
          v-model="watchedEmail"
          class="mt-2 w-full rounded border border-[#bfc8bd] bg-[#f9f7f0] px-3.5 py-3 text-[#17221d] outline-none focus:border-[#bd5d38] focus:ring-4 focus:ring-[#f2d8c8]"
          type="text"
          placeholder="Type an email"
        />
        <p v-if="watchedEmailError" class="mt-3 text-sm font-bold text-[#a3482c]" role="alert">
          {{ watchedEmailError }}
        </p>
      </div>
    </section>

    <section v-if="!isTodosPage" class="mx-auto mt-5 max-w-[980px] rounded-lg border border-[#d8d1c2] bg-[#eef5ee] p-7 shadow-[8px_8px_0_#ded5c4]" aria-labelledby="watch-effect-title">
      <span class="mb-8 block text-xs font-bold uppercase tracking-[0.12em] text-[#bd5d38]">10</span>
      <h2 id="watch-effect-title" class="font-display text-2xl font-semibold tracking-[-0.04em]">watchEffect</h2>
      <p class="mt-2 leading-relaxed text-[#68756c]">
        <code class="rounded bg-[#f1e6d5] px-1.5 py-0.5 font-mono text-[0.9em] text-[#8d462c]">watchEffect()</code>
        tracks every reactive value used inside it and runs again whenever one of them changes.
      </p>

      <div class="mt-5 max-w-[520px]">
        <label class="block text-sm font-bold text-[#526057]" for="watch-effect-email">Auto validation with watchEffect</label>
        <input
          id="watch-effect-email"
          v-model="watchEffectEmail"
          class="mt-2 w-full rounded border border-[#bfc8bd] bg-[#f9f7f0] px-3.5 py-3 text-[#17221d] outline-none focus:border-[#bd5d38] focus:ring-4 focus:ring-[#f2d8c8]"
          type="text"
          placeholder="Type an email"
        />
        <p class="mt-3 text-sm font-bold text-[#526057]" aria-live="polite">
          {{ watchEffectStatus }}
        </p>
      </div>
    </section>

    <section v-if="!isTodosPage" class="mx-auto mt-5 max-w-[980px] rounded-lg border border-[#d8d1c2] bg-[#f8f1ea] p-7 shadow-[8px_8px_0_#ded5c4]" aria-labelledby="template-ref-title">
      <span class="mb-8 block text-xs font-bold uppercase tracking-[0.12em] text-[#bd5d38]">11</span>
      <h2 id="template-ref-title" class="font-display text-2xl font-semibold tracking-[-0.04em]">Template refs</h2>
      <p class="mt-2 leading-relaxed text-[#68756c]">
        A <code class="rounded bg-[#f1e6d5] px-1.5 py-0.5 font-mono text-[0.9em] text-[#8d462c]">ref</code>
        can also point to a real HTML element. Then you can call its built-in browser methods like <code class="rounded bg-[#f1e6d5] px-1.5 py-0.5 font-mono text-[0.9em] text-[#8d462c]">focus()</code>.
      </p>

      <div class="mt-5 max-w-[520px]">
        <input
          ref="focusInputRef"
          v-model="focusInputValue"
          class="w-full rounded border border-[#bfc8bd] bg-[#f9f7f0] px-3.5 py-3 text-[#17221d] outline-none focus:border-[#bd5d38] focus:ring-4 focus:ring-[#f2d8c8]"
          type="text"
          placeholder="Type something here"
        />

        <button
          class="mt-4 rounded bg-[#bd5d38] px-4 py-3 font-bold text-[#fffdf8] hover:bg-[#99462d]"
          type="button"
          @click="focusInputField"
        >
          Focus input
        </button>

        <p class="mt-3 text-sm font-bold text-[#526057]" aria-live="polite">
          {{ focusInputMessage }}
        </p>
      </div>
    </section>

    <section v-if="!isTodosPage" class="mx-auto mt-5 max-w-[980px] rounded-lg border border-[#d8d1c2] bg-[#e8eee3] p-7 shadow-[8px_8px_0_#ded5c4]" aria-labelledby="keep-alive-title">
      <span class="mb-8 block text-xs font-bold uppercase tracking-[0.12em] text-[#bd5d38]">12</span>
      <h2 id="keep-alive-title" class="font-display text-2xl font-semibold tracking-[-0.04em]">KeepAlive: preserve component state</h2>
      <p class="mt-2 leading-relaxed text-[#68756c]">
        Normally, switching away from a component removes it. <code class="rounded bg-[#f1e6d5] px-1.5 py-0.5 font-mono text-[0.9em] text-[#8d462c]">KeepAlive</code>
        caches it, so its counter is still there when you return.
      </p>

      <div class="mt-5 flex flex-wrap gap-2">
        <button
          v-for="tab in panelTabs"
          :key="tab"
          type="button"
          class="rounded border px-3 py-2 font-bold capitalize transition"
          :class="currentCachedPanel === tab ? 'border-[#bd5d38] bg-[#86a17e] text-[#17221d]' : 'border-[#b19e9e] bg-[#f1f0f9] text-[#526057] hover:border-[#bd5d38]'"
          @click="currentCachedPanel = tab"
        >
          {{ tab }}
        </button>
      </div>

      <div class="mt-5 max-w-[520px]">
        <KeepAlive>
          <component :is="currentCachedComponent" />
        </KeepAlive>
      </div>
      <p class="mt-3 text-sm text-[#526057]">Click a panel's counter, switch tabs, then return. Its count should remain.</p>
    </section>

    <section v-if="!isTodosPage" class="mx-auto mt-5 max-w-[980px] rounded-lg border border-[#d8d1c2] bg-[#f3e9dc] p-7 shadow-[8px_8px_0_#ded5c4]" aria-labelledby="transition-title">
      <span class="mb-8 block text-xs font-bold uppercase tracking-[0.12em] text-[#bd5d38]">13</span>
      <h2 id="transition-title" class="font-display text-2xl font-semibold tracking-[-0.04em]">Transitions: animate show and hide</h2>
      <p class="mt-2 leading-relaxed text-[#68756c]">
        Vue's <code class="rounded bg-[#f1e6d5] px-1.5 py-0.5 font-mono text-[0.9em] text-[#8d462c]">Transition</code>
        component adds classes while an element enters or leaves the page.
      </p>

      <button
        class="mt-5 rounded bg-[#bd5d38] px-4 py-3 font-bold text-[#fffdf8] hover:bg-[#99462d]"
        type="button"
        @click="showTransitionMessage = !showTransitionMessage"
      >
        {{ showTransitionMessage ? 'Hide message' : 'Show message' }}
      </button>

      <div class="mt-5 min-h-24 max-w-[520px]">
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="translate-y-2 opacity-0"
          enter-to-class="translate-y-0 opacity-100"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="translate-y-0 opacity-100"
          leave-to-class="-translate-y-2 opacity-0"
        >
          <p v-if="showTransitionMessage" class="rounded border border-[#d8cdbd] bg-[#fffdf8] p-4 text-[#526057]">
            This message fades and moves when it appears or disappears.
          </p>
        </Transition>
      </div>
    </section>

    <section v-if="!isTodosPage" class="mx-auto mt-5 max-w-[980px]" aria-labelledby="slots-title">
      <LessonCard title="Slots: parent supplies the content">
        <p>
          A <code class="rounded bg-[#f1e6d5] px-1.5 py-0.5 font-mono text-[0.9em] text-[#8d462c]">slot</code>
          lets a parent place its own template content inside a reusable child component.
        </p>
        <template #footer>
          Parent content is rendered inside <code class="font-mono text-[#8d462c]">LessonCard.vue</code>.
        </template>
      </LessonCard>
    </section>

    <p v-if="!isTodosPage" class="mx-auto mt-11 max-w-[980px] text-center text-[#68756c]">
      Try changing the code in
      <code class="rounded bg-[#f1e6d5] px-1.5 py-0.5 font-mono text-[0.9em] text-[#8d462c]">src/App.vue</code>,
      then watch the browser update.
    </p>
  </main>
</template>
