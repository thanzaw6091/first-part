<script setup>
import { ref } from 'vue'

const clickCount = ref(0)
</script>

<template>
  <div class="rounded border border-[#d8cdbd] bg-[#fffdf8] p-4">
    <p class="text-sm font-bold uppercase tracking-[0.12em] text-[#bd5d38]">Intro</p>
    <h3 class="mt-2 font-display text-2xl text-[#17221d]">This is the first panel</h3>
    <p class="mt-2 text-[#68756c]">Vue can switch the whole component body without reloading the page.</p>
    <button class="mt-4 rounded bg-[#bd5d38] px-3 py-2 font-bold text-[#fffdf8]" type="button" @click="clickCount++">
      Intro clicks: {{ clickCount }}
    </button>
  </div>
</template>