<script setup>
import { ref } from 'vue'

const clickCount = ref(0)
</script>

<template>
  <div class="rounded border border-[#d8cdbd] bg-[#edf3e8] p-4">
    <p class="text-sm font-bold uppercase tracking-[0.12em] text-[#bd5d38]">Skills</p>
    <ul class="mt-3 space-y-2 text-[#526057]">
      <li>v-model</li>
      <li>computed()</li>
      <li>watch()</li>
      <li>ref()</li>
    </ul>
    <button class="mt-4 rounded bg-[#bd5d38] px-3 py-2 font-bold text-[#fffdf8]" type="button" @click="clickCount++">
      Skills clicks: {{ clickCount }}
    </button>
  </div>
</template>