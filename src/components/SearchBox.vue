<script setup>
// A small, reusable child component.
// It keeps its own local state (the search text) and tells the parent
// when the text changes by emitting an event: "update:modelValue".
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: 'Search...' },
})

const emit = defineEmits(['update:modelValue'])

const localText = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

function clearText() {
  emit('update:modelValue', '')
}
</script>

<template>
  <div class="flex flex-col gap-2 sm:flex-row">
    <input
      v-model="localText"
      class="min-w-0 flex-1 rounded border border-[#bfc8bd] bg-[#f9f7f0] px-3.5 py-3 text-[#17221d] outline-none focus:border-[#bd5d38] focus:ring-4 focus:ring-[#f2d8c8]"
      type="text"
      :placeholder="placeholder"
      aria-label="Search lessons"
    />
    <button
      class="rounded border border-[#aebda9] bg-transparent px-4 py-3 text-[#526057] hover:border-[#bd5d38]"
      type="button"
      @click="clearText"
    >
      Clear
    </button>
  </div>
</template>
