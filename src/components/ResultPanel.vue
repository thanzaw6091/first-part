<script setup>
import { ref } from 'vue'

const clickCount = ref(0)
</script>

<template>
  <div class="rounded border border-[#d8cdbd] bg-[#f4e9d8] p-4">
    <p class="text-sm font-bold uppercase tracking-[0.12em] text-[#bd5d38]">Result</p>
    <h3 class="mt-2 font-display text-2xl text-[#17221d]">Learning becomes easier</h3>
    <p class="mt-2 text-[#68756c]">Dynamic components let you show different UI states in one place.</p>
    <button class="mt-4 rounded bg-[#bd5d38] px-3 py-2 font-bold text-[#fffdf8]" type="button" @click="clickCount++">
      Result clicks: {{ clickCount }}
    </button>
  </div>
</template>