<script setup>
const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['toggle', 'remove'])

function toggleTodo() {
  emit('toggle', props.todo.id)
}

function removeTodo() {
  emit('remove', props.todo.id)
}
</script>

<template>
  <li class="flex items-center gap-3 py-3">
    <input
      :checked="todo.completed"
      class="h-4 w-4 accent-[#bd5d38]"
      type="checkbox"
      :aria-label="`Complete ${todo.text}`"
      @change="toggleTodo"
    />

    <span
      :class="todo.completed ? 'text-[#9aa39b] line-through' : 'text-[#526057]'"
      class="flex-1"
    >
      {{ todo.text }}
    </span>

    <button
      class="text-sm font-bold text-[#bd5d38] hover:text-[#99462d]"
      type="button"
      @click="removeTodo"
    >
      Remove
    </button>
  </li>
</template>
