// Lesson 19: a real "search" feature, split into a reusable piece of logic.
// This is a composable: a plain function that returns reactive values.
// Any component can call useSearch() and get the same behavior for free.
import { computed, ref } from 'vue'

export function useSearch(items, getText = (item) => String(item)) {
  const query = ref('')

  const results = computed(() => {
    const needle = query.value.trim().toLowerCase()
    if (!needle) return items.value
    return items.value.filter((item) => getText(item).toLowerCase().includes(needle))
  })

  function reset() {
    query.value = ''
  }

  return { query, results, reset }
}
