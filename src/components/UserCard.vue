<script setup>
const props = defineProps({
  user: {
    type: Object,
    default: () => ({ name: 'No user selected', email: '-', role: '-' }),
  },
})

const emit = defineEmits(['select-user'])
</script>

<template>
  <div class="rounded border border-[#d8cdbd] bg-[#fffdf8] p-4">
    <h3 class="font-display text-xl font-semibold">Selected user</h3>
    <div class="mt-4 rounded bg-[#f9f7f0] p-3">
      <p class="text-lg font-bold text-[#17221d]">{{ props.user.name }}</p>
      <p class="mt-1 text-[#526057]">{{ props.user.email }}</p>
      <p class="mt-2 text-sm text-[#bd5d38]">{{ props.user.role }}</p>
    </div>

    <button
      class="mt-4 rounded bg-[#bd5d38] px-4 py-2 font-bold text-[#fffdf8] hover:bg-[#99462d]"
      type="button"
      @click="emit('select-user', props.user)"
    >
      Select this user
    </button>
  </div>
</template>
