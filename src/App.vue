<script setup>
import { computed, ref } from 'vue'

const learnerName = ref('Vue learner')
const count = ref(0)

const progressMessage = computed(() => {
  if (count.value === 0) return 'Click the button to start practicing.'
  if (count.value === 1) return 'Nice start. This value is reactive.'
  return `You have clicked ${count.value} times.`
})
</script>

<template>
  <main class="min-h-screen bg-[#f5f1e8] px-5 py-12 text-[#17221d] sm:py-[72px]">
    <section class="mx-auto mb-8 max-w-[980px] sm:mb-12">
      <p class="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-[#bd5d38]">
        Vue.js beginner playground
      </p>
      <h1 class="max-w-[650px] font-display text-5xl font-bold leading-[0.98] tracking-[-0.06em] sm:text-7xl">
        Hello, {{ learnerName }}.
      </h1>
      <p class="mt-6 max-w-[520px] text-lg leading-relaxed text-[#617066]">
        Change the name and click the counter to see Vue update the page automatically.
      </p>
    </section>

    <section class="mx-auto grid max-w-[980px] gap-5 md:grid-cols-2" aria-label="Vue practice examples">
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

    <p class="mx-auto mt-11 max-w-[980px] text-center text-[#68756c]">
      Try changing the code in
      <code class="rounded bg-[#f1e6d5] px-1.5 py-0.5 font-mono text-[0.9em] text-[#8d462c]">src/App.vue</code>,
      then watch the browser update.
    </p>
  </main>
</template>
