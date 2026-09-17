<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const filters = ['all', 'active', 'done']

function updateFilter(filter) {
  emit('update:modelValue', filter)
}
</script>

<template>
  <div class="mt-6 flex flex-wrap gap-2" aria-label="Filter todos">
    <button
      v-for="filter in filters"
      :key="filter"
      class="rounded border px-3 py-2 text-sm font-bold capitalize transition-colors"
      :class="modelValue === filter ? 'border-[#bd5d38] bg-[#bd5d38] text-[#fffdf8]' : 'border-[#c6bbaa] bg-[#fffdf8] text-[#526057] hover:border-[#bd5d38]'"
      type="button"
      @click="updateFilter(filter)"
    >
      {{ filter }}
    </button>
  </div>
</template>
