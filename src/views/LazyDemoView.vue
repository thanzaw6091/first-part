<template>
  <section class="mx-auto max-w-[980px] rounded-lg border border-[#d8d1c2] bg-[#e8eee3] p-7 shadow-[8px_8px_0_#ded5c4]">
    <span class="mb-6 block text-xs font-bold uppercase tracking-[0.12em] text-[#bd5d38]">Lesson 07</span>
    <h1 class="font-display text-3xl font-bold tracking-[-0.04em]">Lazy loading a page</h1>
    <p class="mt-3 max-w-[650px] leading-relaxed text-[#526057]">
      This page is a separate Vue file. Vue Router downloads its JavaScript only when you open this route.
    </p>

    <h2 class="mt-7 font-display text-xl font-semibold">The route setup</h2>
    <pre class="mt-3 overflow-x-auto rounded border border-[#cdd8c8] bg-[#fffdf8] p-4 text-sm text-[#17221d]"><code>component: () =&gt; import('../views/LazyDemoView.vue')</code></pre>

    <h2 class="mt-7 font-display text-xl font-semibold">See it happen</h2>
    <ol class="mt-3 list-decimal space-y-2 pl-5 leading-relaxed text-[#526057]">
      <li>Open browser developer tools and choose the Network tab.</li>
      <li>Filter by JavaScript, then reload the Home page.</li>
      <li>Click Lazy Loading in the navigation.</li>
      <li>Look for a new JavaScript request for this page. That request happens when the route is opened.</li>
    </ol>
    <p class="mt-5 text-sm text-[#68756c]">
      The production build also creates a separate <code class="rounded bg-[#f1e6d5] px-1.5 py-0.5 font-mono text-[#8d462c]">LazyDemoView</code> file.
    </p>
  </section>
</template>
