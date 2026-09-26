<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <article class="rounded-lg border border-[#d8d1c2] bg-[#fffdf8] p-7 shadow-[8px_8px_0_#ded5c4]">
    <span class="mb-4 block text-xs font-bold uppercase tracking-[0.12em] text-[#bd5d38]">Reusable child component</span>
    <h2 class="font-display text-2xl font-semibold tracking-[-0.04em]">{{ title }}</h2>
    <div class="mt-3 leading-relaxed text-[#68756c]">
      <slot />
    </div>
    <footer v-if="$slots.footer" class="mt-5 border-t border-[#e7e0d2] pt-4 text-sm text-blue-600">
      <slot name="footer" />
    </footer>
  </article>
</template>