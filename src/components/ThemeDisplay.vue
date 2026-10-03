<script setup>
import { computed, inject, ref } from 'vue'

const themeMode = inject('themeMode', ref('day'))

const palette = computed(() => {
  if (themeMode.value === 'night') {
    return {
      background: '#17221d',
      border: '#7a8c6f',
      title: '#f5f1e8',
      text: '#dfeadf',
      pill: '#d9a67a',
    }
  }

  return {
    background: '#f3e9dc',
    border: '#d8cdbd',
    title: '#17221d',
    text: '#526057',
    pill: '#bd5d38',
  }
})
</script>

<template>
  <div
    class="mt-5 rounded border p-5 shadow-[8px_8px_0_#ded5c4]"
    :style="{
      background: palette.background,
      borderColor: palette.border,
    }"
  >
    <p
      class="text-xs font-bold uppercase tracking-[0.12em]"
      :style="{ color: palette.pill }"
    >
      Shared by parent
    </p>
    <h3
      class="mt-3 font-display text-2xl font-semibold tracking-[-0.04em]"
      :style="{ color: palette.title }"
    >
      {{ themeMode === 'night' ? 'Night mode' : 'Day mode' }}
    </h3>
    <p class="mt-2 text-sm leading-relaxed" :style="{ color: palette.text }">
      This child receives the current theme through <code class="font-mono text-[#8d462c]">provide()</code>
      and <code class="font-mono text-[#8d462c]">inject()</code> instead of passing props down manually.
    </p>
  </div>
</template>
