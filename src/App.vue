<script setup>
import {
  computed,
  defineComponent,
  h,
  onErrorCaptured,
  onMounted,
  onUnmounted,
  onUpdated,
  provide,
  reactive,
  ref,
  toRefs,
  watch,
  watchEffect,
} from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import LessonCard from './components/LessonCard.vue'
import TodoFilter from './components/TodoFilter.vue'
import TodoItem from './components/TodoItem.vue'
import UserCard from './components/UserCard.vue'
import IntroPanel from './components/IntroPanel.vue'
import SkillsPanel from './components/SkillsPanel.vue'
import ResultPanel from './components/ResultPanel.vue'
import ThemeDisplay from './components/ThemeDisplay.vue'
import SearchBox from './components/SearchBox.vue'
import { useSearch } from './composables/useSearch'

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
const showPortalMessage = ref(false)
const appTheme = ref('day')
const highlightColor = ref('#bd5d38')
const demoVisible = ref(false)
// Lesson 18: real error handling
const postData = ref(null)
const postLoading = ref(false)
const postError = ref('')
const simulateBrokenUrl = ref(false)
const postAttempts = ref(0)
const widgetCrash = ref(false)
const widgetError = ref('')
// Lesson 19: a real, reusable search feature built from a composable.
const lessonTopics = ref([
  { id: 1, title: 'Template syntax', tag: 'basics' },
  { id: 2, title: 'Reactive state with ref()', tag: 'basics' },
  { id: 3, title: 'Computed values', tag: 'reactivity' },
  { id: 4, title: 'Handling events', tag: 'basics' },
  { id: 5, title: 'Forms and v-model', tag: 'forms' },
  { id: 6, title: 'Fetching data from an API', tag: 'async' },
  { id: 7, title: 'Error handling', tag: 'async' },
  { id: 8, title: 'Parent and child props', tag: 'components' },
  { id: 9, title: 'reactive() and toRefs()', tag: 'reactivity' },
])
const { query: topicQuery, results: matchingTopics, reset: resetTopicSearch } =
  useSearch(lessonTopics, (topic) => `${topic.title} ${topic.tag}`)

// Lesson 20: reactive() makes one object reactive, and toRefs() turns each
// property into a ref you can safely destructure without losing reactivity.
const profile = reactive({
  name: 'Vue learner',
  role: 'Frontend beginner',
  hours: 0,
})
// Destructuring `profile` directly would break reactivity for the plain values.
// These refs stay connected to the object above, so both views update together.
const { name: profileName, role: profileRole, hours: profileHours } = toRefs(profile)
const isProfileEmpty = computed(() => !profileName.value.trim() && !profileRole.value.trim())
const dynamicPanel = {
  intro: IntroPanel,
  skills: SkillsPanel,
  result: ResultPanel,
}
provide('themeMode', appTheme)
const vHighlight = {
  mounted(el, binding) {
    el.style.backgroundColor = binding.value || '#f2d8c8'
    el.style.borderColor = binding.value || '#bd5d38'
    el.style.borderWidth = '1px'
    el.style.borderStyle = 'solid'
    el.style.borderRadius = '0.75rem'
    el.style.padding = '0.875rem 1rem'
    el.style.transition = 'all 0.2s ease'
  },
  updated(el, binding) {
    el.style.backgroundColor = binding.value || '#f2d8c8'
    el.style.borderColor = binding.value || '#bd5d38'
  },
}

const AsyncLessonBlock = defineComponent({
  async setup() {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return () =>
      h(
        'div',
        {
          class: 'mt-5 rounded border border-[#d8cdbd] bg-[#fffdf8] p-4 text-[#526057] shadow-[8px_8px_0_#ded5c4]',
        },
        'This content was loaded asynchronously. Suspense waits until it is ready and then shows the result.',
      )
  },
})

// A child component that really throws an error while rendering.
const BuggyWidget = defineComponent({
  name: 'BuggyWidget',
  props: { crash: Boolean },
  setup(props) {
    return () => {
      if (props.crash) {
        throw new Error('BuggyWidget crashed while rendering.')
      }
      return h(
        'p',
        { class: 'rounded border border-[#d8cdbd] bg-[#e8eee3] p-4 text-[#17221d]' },
        'Widget is working normally.',
      )
    }
  },
})

// Error boundary: catch errors thrown by child components so the whole app does not break.
onErrorCaptured((err, instance, info) => {
  if (instance?.$options?.name === 'BuggyWidget') {
    console.error('Captured component error:', err, info)
    widgetError.value = err.message
    return false // stop the error from going further up
  }
  return true
})

function resetWidget() {
  widgetCrash.value = false
  widgetError.value = ''
}

async function loadPost() {
  postLoading.value = true
  postError.value = ''
  postData.value = null
  postAttempts.value += 1

  // Cancel the request if it takes longer than 5 seconds.
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 5000)

  const url = simulateBrokenUrl.value
    ? 'https://jsonplaceholder.typicode.com/posts/999999'
    : 'https://jsonplaceholder.typicode.com/posts/1'

  try {
    const response = await fetch(url, { signal: controller.signal })

    // fetch() does NOT throw for 404 / 500, so we must check it ourselves.
    if (!response.ok) {
      throw new Error(`Server responded with ${response.status} ${response.statusText || ''}`.trim())
    }

    const data = await response.json()
    if (!data || !data.title) {
      throw new Error('The server returned unexpected data.')
    }

    postData.value = data
  } catch (error) {
    if (error.name === 'AbortError') {
      postError.value = 'The request took too long and was cancelled. Please try again.'
    } else if (!navigator.onLine) {
      postError.value = 'You are offline. Check your internet connection.'
    } else if (error instanceof TypeError) {
      postError.value = 'Network error: could not reach the server.'
    } else {
      postError.value = error.message
    }
    console.error('loadPost failed:', error)
  } finally {
    clearTimeout(timeoutId)
    postLoading.value = false
  }
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

    <section v-if="!isTodosPage" class="mx-auto mt-5 max-w-[980px] rounded-lg border border-[#d8d1c2] bg-[#f0f5eb] p-7 shadow-[8px_8px_0_#ded5c4]" aria-labelledby="teleport-title">
      <span class="mb-8 block text-xs font-bold uppercase tracking-[0.12em] text-[#bd5d38]">14</span>
      <h2 id="teleport-title" class="font-display text-2xl font-semibold tracking-[-0.04em]">Teleport: move UI outside the component</h2>
      <p class="mt-2 leading-relaxed text-[#68756c]">
        A <code class="rounded bg-[#f1e6d5] px-1.5 py-0.5 font-mono text-[0.9em] text-[#8d462c]">Teleport</code>
        sends content to another part of the DOM, which is useful for modals, popups, and toast messages.
      </p>

      <button
        class="mt-5 rounded bg-[#bd5d38] px-4 py-3 font-bold text-[#fffdf8] hover:bg-[#99462d]"
        type="button"
        @click="showPortalMessage = !showPortalMessage"
      >
        {{ showPortalMessage ? 'Close toast' : 'Open toast' }}
      </button>

      <Teleport to="body">
        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2"
        >
          <div
            v-if="showPortalMessage"
            class="fixed inset-x-4 top-5 z-50 mx-auto max-w-md rounded-lg border border-[#d8cdbd] bg-[#17221d] p-4 text-[#fffdf8] shadow-[0_16px_40px_rgba(23,34,29,0.25)]"
          >
            <p class="text-sm font-bold uppercase tracking-[0.12em] text-[#f2d8c8]">Portal message</p>
            <p class="mt-2 text-sm leading-relaxed text-[#f8f1ea]">
              This card is rendered outside the component tree, but it still stays connected to Vue state.
            </p>
          </div>
        </Transition>
      </Teleport>
    </section>

    <section v-if="!isTodosPage" class="mx-auto mt-5 max-w-[980px] rounded-lg border border-[#d8d1c2] bg-[#eef5ee] p-7 shadow-[8px_8px_0_#ded5c4]" aria-labelledby="provide-title">
      <span class="mb-8 block text-xs font-bold uppercase tracking-[0.12em] text-[#bd5d38]">15</span>
      <h2 id="provide-title" class="font-display text-2xl font-semibold tracking-[-0.04em]">Provide and inject: share state without prop drilling</h2>
      <p class="mt-2 leading-relaxed text-[#68756c]">
        When many nested components need the same value, <code class="rounded bg-[#f1e6d5] px-1.5 py-0.5 font-mono text-[0.9em] text-[#8d462c]">provide()</code>
        can make it available, and <code class="rounded bg-[#f1e6d5] px-1.5 py-0.5 font-mono text-[0.9em] text-[#8d462c]">inject()</code>
        lets a deeper component read it directly.
      </p>

      <div class="mt-5 flex flex-wrap gap-3">
        <button
          class="rounded border px-3 py-2 font-bold transition"
          :class="appTheme === 'day' ? 'border-[#bd5d38] bg-[#f2d8c8] text-[#17221d]' : 'border-[#bfc8bd] bg-[#f9f7f0] text-[#526057] hover:border-[#bd5d38]'"
          type="button"
          @click="appTheme = 'day'"
        >
          Day mode
        </button>
        <button
          class="rounded border px-3 py-2 font-bold transition"
          :class="appTheme === 'night' ? 'border-[#bd5d38] bg-[#d2d9c3] text-[#17221d]' : 'border-[#bfc8bd] bg-[#f9f7f0] text-[#526057] hover:border-[#bd5d38]'"
          type="button"
          @click="appTheme = 'night'"
        >
          Night mode
        </button>
      </div>

      <ThemeDisplay />
    </section>

    <section v-if="!isTodosPage" class="mx-auto mt-5 max-w-[980px] rounded-lg border border-[#d8d1c2] bg-[#f9f5ef] p-7 shadow-[8px_8px_0_#ded5c4]" aria-labelledby="directive-title">
      <span class="mb-8 block text-xs font-bold uppercase tracking-[0.12em] text-[#bd5d38]">16</span>
      <h2 id="directive-title" class="font-display text-2xl font-semibold tracking-[-0.04em]">Custom directives: reuse DOM behavior</h2>
      <p class="mt-2 leading-relaxed text-[#68756c]">
        A custom directive lets you attach reusable DOM logic to an element. It is useful for focus, animation, styling,
        and behavior you want to repeat across many components.
      </p>

      <div class="mt-5 flex flex-wrap gap-3">
        <button
          class="rounded bg-[#bd5d38] px-4 py-3 font-bold text-[#fffdf8] hover:bg-[#99462d]"
          type="button"
          @click="highlightColor = highlightColor === '#bd5d38' ? '#86a17e' : '#bd5d38'"
        >
          Change accent
        </button>
      </div>

      <p
        v-highlight="highlightColor"
        class="mt-5 max-w-[520px] text-[#526057]"
      >
        This paragraph is styled by a custom directive, and the color updates with the button.
      </p>
    </section>

    <section v-if="!isTodosPage" class="mx-auto mt-5 max-w-[980px] rounded-lg border border-[#d8d1c2] bg-[#f7f1e6] p-7 shadow-[8px_8px_0_#ded5c4]" aria-labelledby="suspense-title">
      <span class="mb-8 block text-xs font-bold uppercase tracking-[0.12em] text-[#bd5d38]">17</span>
      <h2 id="suspense-title" class="font-display text-2xl font-semibold tracking-[-0.04em]">Suspense: load async content gracefully</h2>
      <p class="mt-2 leading-relaxed text-[#68756c]">
        <code class="rounded bg-[#f1e6d5] px-1.5 py-0.5 font-mono text-[0.9em] text-[#8d462c]">Suspense</code>
        lets you show a fallback while async data or async components are still loading.
      </p>

      <Suspense>
        <AsyncLessonBlock />
        <template #fallback>
          <div class="mt-5 rounded border border-[#d8cdbd] bg-[#f9f7f0] p-4 text-[#526057]">
            Loading async lesson content...
          </div>
        </template>
      </Suspense>
    </section>

    <section v-if="!isTodosPage" class="mx-auto mt-5 max-w-[980px] rounded-lg border border-[#d8d1c2] bg-[#f6efe8] p-7 shadow-[8px_8px_0_#ded5c4]" aria-labelledby="state-title">
      <span class="mb-8 block text-xs font-bold uppercase tracking-[0.12em] text-[#bd5d38]">18</span>
      <h2 id="state-title" class="font-display text-2xl font-semibold tracking-[-0.04em]">Error handling: real requests and crashing components</h2>
      <p class="mt-2 leading-relaxed text-[#68756c]">
        Real apps fail: servers return 404, the network drops, requests hang. We use
        <code class="rounded bg-[#f1e6d5] px-1.5 py-0.5 font-mono text-[0.9em] text-[#8d462c]">try / catch / finally</code>
        for async code and
        <code class="rounded bg-[#f1e6d5] px-1.5 py-0.5 font-mono text-[0.9em] text-[#8d462c]">onErrorCaptured()</code>
        to catch errors from child components.
      </p>

      <!-- Part A: API request error handling -->
      <h3 class="mt-6 font-display text-xl font-semibold">A. Fetch with error handling</h3>
      <label class="mt-3 flex items-center gap-2 text-sm font-bold text-[#526057]">
        <input v-model="simulateBrokenUrl" class="h-4 w-4 accent-[#bd5d38]" type="checkbox" />
        Use a broken URL (server returns 404)
      </label>
      <p class="mt-1 text-xs text-[#68756c]">Tip: turn off your Wi-Fi (or use DevTools → Network → Offline) to test a network error.</p>

      <button
        class="mt-4 rounded bg-[#bd5d38] px-4 py-3 font-bold text-[#fffdf8] hover:bg-[#99462d] disabled:cursor-not-allowed disabled:opacity-60"
        type="button"
        :disabled="postLoading"
        @click="loadPost"
      >
        {{ postLoading ? 'Loading...' : postError ? 'Try again' : 'Load post' }}
      </button>
      <span class="ml-3 text-sm text-[#68756c]">Attempts: {{ postAttempts }}</span>

      <div class="mt-5 max-w-[520px]" aria-live="polite">
        <p v-if="postLoading" class="rounded border border-[#d8cdbd] bg-[#fffdf8] p-4 text-[#526057]" role="status">
          Loading post from the server...
        </p>

        <div v-else-if="postError" class="rounded border border-[#d8cdbd] bg-[#f2d8c8] p-4 text-[#17221d]" role="alert">
          <p class="text-sm font-bold uppercase tracking-[0.12em] text-[#a3482c]">Something went wrong</p>
          <p class="mt-2 text-sm">{{ postError }}</p>
        </div>

        <div v-else-if="postData" class="rounded border border-[#d8cdbd] bg-[#e8eee3] p-4 text-[#17221d]">
          <p class="text-sm font-bold uppercase tracking-[0.12em] text-[#bd5d38]">Post #{{ postData.id }}</p>
          <strong class="mt-2 block">{{ postData.title }}</strong>
          <p class="mt-2 text-sm text-[#526057]">{{ postData.body }}</p>
        </div>

        <p v-else class="rounded border border-[#d8cdbd] bg-[#fffdf8] p-4 text-[#526057]">
          Nothing loaded yet. Click "Load post".
        </p>
      </div>

      <!-- Part B: component error boundary -->
      <h3 class="mt-8 font-display text-xl font-semibold">B. Catch a crashing component</h3>
      <div class="mt-3 flex flex-wrap gap-3">
        <button
          class="rounded bg-[#bd5d38] px-4 py-3 font-bold text-[#fffdf8] hover:bg-[#99462d]"
          type="button"
          @click="widgetCrash = true"
        >
          Break the widget
        </button>
        <button
          class="rounded border border-[#aebda9] bg-transparent px-4 py-3 text-[#526057]"
          type="button"
          @click="resetWidget"
        >
          Reset widget
        </button>
      </div>

      <div class="mt-5 max-w-[520px]">
        <div v-if="widgetError" class="rounded border border-[#d8cdbd] bg-[#f2d8c8] p-4 text-[#17221d]" role="alert">
          <p class="text-sm font-bold">Fallback UI: this widget failed, but the rest of the page still works.</p>
          <p class="mt-1 font-mono text-xs text-[#8d462c]">{{ widgetError }}</p>
        </div>
        <BuggyWidget v-else :crash="widgetCrash" />
      </div>
    </section>

    <section v-if="!isTodosPage" class="mx-auto mt-5 max-w-[980px] rounded-lg border border-[#d8d1c2] bg-[#f7f1e6] p-7 shadow-[8px_8px_0_#ded5c4]" aria-labelledby="search-title">
      <span class="mb-8 block text-xs font-bold uppercase tracking-[0.12em] text-[#bd5d38]">19</span>
      <h2 id="search-title" class="font-display text-2xl font-semibold tracking-[-0.04em]">A real search feature with a composable</h2>
      <p class="mt-2 max-w-[620px] leading-relaxed text-[#68756c]">
        A <code class="rounded bg-[#f1e6d5] px-1.5 py-0.5 font-mono text-[0.9em] text-[#8d462c]">composable</code>
        is a plain function that returns reactive values, so the same logic can be reused in many components. Here
        <code class="rounded bg-[#f1e6d5] px-1.5 py-0.5 font-mono text-[0.9em] text-[#8d462c]">useSearch()</code>
        filters a real list as you type.
      </p>

      <div class="mt-5 max-w-[520px]">
        <label class="mb-2 block text-sm font-bold text-[#526057]" for="topic-search">Search lessons</label>
        <SearchBox
          id="topic-search"
          v-model="topicQuery"
          placeholder="Try typing 'async' or 'forms'"
        />
      </div>

      <p class="mt-4 text-sm text-[#68756c]" aria-live="polite">
        Showing <strong>{{ matchingTopics.length }}</strong> of {{ lessonTopics.length }} lessons.
      </p>

      <ul v-if="matchingTopics.length" class="mt-3 max-w-[520px] divide-y divide-[#e7e0d2]">
        <li v-for="topic in matchingTopics" :key="topic.id" class="flex items-center justify-between gap-3 py-3">
          <span class="text-[#526057]">{{ topic.title }}</span>
          <span class="rounded bg-[#f1e6d5] px-2 py-0.5 font-mono text-xs text-[#8d462c]">{{ topic.tag }}</span>
        </li>
      </ul>
      <p v-else class="mt-3 text-[#68756c]" role="status">No lessons match your search.</p>

      <button
        v-if="topicQuery"
        class="mt-4 text-sm font-bold text-[#bd5d38] hover:text-[#99462d]"
        type="button"
        @click="resetTopicSearch"
      >
        Reset search
      </button>

      <p class="mt-4 text-sm text-[#68756c]">
        Try it yourself: edit <code class="rounded bg-[#f1e6d5] px-1.5 py-0.5 font-mono text-[0.9em] text-[#8d462c]">src/composables/useSearch.js</code>
        and watch the list update.
      </p>
    </section>

    <section v-if="!isTodosPage" class="mx-auto mt-5 max-w-[980px] rounded-lg border border-[#d8d1c2] bg-[#eef5ee] p-7 shadow-[8px_8px_0_#ded5c4]" aria-labelledby="reactive-title">
      <span class="mb-8 block text-xs font-bold uppercase tracking-[0.12em] text-[#bd5d38]">20</span>
      <h2 id="reactive-title" class="font-display text-2xl font-semibold tracking-[-0.04em]">
        reactive() and toRefs(): object state
      </h2>
      <p class="mt-2 max-w-[620px] leading-relaxed text-[#68756c]">
        Every lesson so far used
        <code class="rounded bg-[#f1e6d5] px-1.5 py-0.5 font-mono text-[0.9em] text-[#8d462c]">ref()</code>
        for one value. When several values belong together,<br />
        <code class="rounded bg-[#f1e6d5] px-1.5 py-0.5 font-mono text-[0.9em] text-[#8d462c]">reactive()</code>
        wraps a whole object in reactivity, and
        <code class="rounded bg-[#f1e6d5] px-1.5 py-0.5 font-mono text-[0.9em] text-[#8d462c]">toRefs()</code>
        lets you destructure it without losing reactivity.
      </p>

      <div class="mt-6 grid gap-6 md:grid-cols-2">
        <div class="rounded border border-[#d8cdbd] bg-[#fffdf8] p-4">
          <h3 class="font-display text-xl font-semibold">The reactive object</h3>
          <p class="mt-1 text-sm text-[#68756c]">
            Edit these fields and watch the panel on the right update too.
          </p>

          <label class="mt-4 block text-sm font-bold text-[#526057]" for="profile-name">Name</label>
          <input
            id="profile-name"
            v-model="profile.name"
            class="mt-2 w-full rounded border border-[#bfc8bd] bg-[#f9f7f0] px-3.5 py-3 text-[#17221d] outline-none focus:border-[#bd5d38] focus:ring-4 focus:ring-[#f2d8c8]"
            type="text"
          />

          <label class="mt-4 block text-sm font-bold text-[#526057]" for="profile-role">Role</label>
          <input
            id="profile-role"
            v-model="profile.role"
            class="mt-2 w-full rounded border border-[#bfc8bd] bg-[#f9f7f0] px-3.5 py-3 text-[#17221d] outline-none focus:border-[#bd5d38] focus:ring-4 focus:ring-[#f2d8c8]"
            type="text"
          />

          <label class="mt-4 block text-sm font-bold text-[#526057]" for="profile-hours">Study hours</label>
          <input
            id="profile-hours"
            v-model.number="profile.hours"
            class="mt-2 w-full rounded border border-[#bfc8bd] bg-[#f9f7f0] px-3.5 py-3 text-[#17221d] outline-none focus:border-[#bd5d38] focus:ring-4 focus:ring-[#f2d8c8]"
            type="number"
            min="0"
          />

          <button
            class="mt-4 rounded bg-[#bd5d38] px-4 py-3 font-bold text-[#fffdf8] hover:bg-[#99462d]"
            type="button"
            @click="profile.hours += 1"
          >
            Add one hour
          </button>
        </div>

        <div class="rounded border border-[#d8cdbd] bg-[#fffdf8] p-4">
          <h3 class="font-display text-xl font-semibold">Read through toRefs()</h3>
          <p class="mt-1 text-sm text-[#68756c]">
            These lines use the destructured refs, not the object directly.
          </p>

          <div class="mt-4 space-y-2 rounded bg-[#f9f7f0] p-3 text-[#17221d]">
            <p>Name: <strong>{{ profileName }}</strong></p>
            <p>Role: <strong>{{ profileRole }}</strong></p>
            <p>Hours: <strong>{{ profileHours }}</strong></p>
          </div>

          <p v-if="isProfileEmpty" class="mt-4 text-sm font-bold text-[#a3482c]" role="alert">
            Add a name or a role so the profile is not empty.
          </p>
          <p v-else class="mt-4 text-sm text-[#526057]">
            The refs and the object always show the same values, because they share one source.
          </p>

          <pre class="mt-4 overflow-x-auto rounded bg-[#17221d] p-3 font-mono text-xs leading-relaxed text-[#f8f1ea]">const profile = reactive({ name: '', role: '', hours: 0 })
const { name, role, hours } = toRefs(profile)</pre>
        </div>
      </div>

      <p class="mt-5 max-w-[620px] text-sm leading-relaxed text-[#68756c]">
        Try this: remove <code class="rounded bg-[#f1e6d5] px-1.5 py-0.5 font-mono text-[0.9em] text-[#8d462c]">toRefs()</code>
        and destructure the object plainly instead. Typing in the left panel stops updating the right panel,
        because a plain destructured value is only a one-time copy.
      </p>
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
