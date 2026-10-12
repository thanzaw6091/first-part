import { useState } from 'react';

/* ============================================================
   LESSON 1 — Components & JSX
   ============================================================
   THE BIG IDEAS:

   1. React apps are made of COMPONENTS — reusable JavaScript
      functions that return markup (JSX).

   2. JSX looks like HTML, but it is really JavaScript:
      - Use className instead of class
      - Use { } to embed any JavaScript expression
      - A component must return ONE root element

   3. Props are how data flows from parent to child —
      like function arguments for components.
   ============================================================ */

// --- Example A: The simplest possible component ---------------
function Welcome() {
  return <h2 className="text-2xl font-semibold text-cyan-600">Hello, React! 👋</h2>;
}

// --- Example B: A component with PROPS ------------------------
// Props come in as an object. { name } is destructuring.
function Greeting({ name, age }) {
  return (
    <p>
      Hi, I'm <strong>{name}</strong> and I'm {age} years old.
      {age >= 18 ? ' (an adult)' : ' (a minor)'}
    </p>
  );
}

// --- Example C: JSX is just JavaScript ------------------------
// You can put ANY expression inside { }:
// variables, math, function calls, ternaries, .map()...
const favoriteLangs = ['JavaScript', 'TypeScript', 'Python'];

function LangList() {
  return (
    <ul>
      {/* .map() turns an array into an array of JSX elements.
          Each child in a list needs a unique "key" prop. */}
      {favoriteLangs.map((lang) => (
        <li key={lang}>{lang}</li>
      ))}
    </ul>
  );
}

// --- Example D: Conditional rendering ------------------------
function Status({ isOnline }) {
  // Three ways to render conditionally:
  // 1. Ternary:            {cond ? a : b}
  // 2. Short-circuit:      {cond && a}
  // 3. if/return before the JSX
  return (
    <p>
      Status: {isOnline ? '🟢 Online' : '🔴 Offline'}
      {isOnline && <em> — ready to chat!</em>}
    </p>
  );
}

/* ============================================================
   INTERACTIVE PART — try changing things and watch the
   browser update instantly (Hot Module Replacement)!
   ============================================================ */
export default function Lesson1() {
  // useState: state is data that belongs to the component.
  // Changing it makes React re-render (redraw) the UI.
  const [count, setCount] = useState(0);

  // --- Your playground: edit this JSX freely! ---
  return (
    <section className="text-left">
      <h1 className="text-2xl font-bold">Lesson 1: Components &amp; JSX</h1>

      <h3 className="mt-8 mb-2 font-semibold text-slate-900 border-b border-slate-200 pb-1">
        Example A — a simple component
      </h3>
      <Welcome />

      <h3 className="mt-8 mb-2 font-semibold text-slate-900 border-b border-slate-200 pb-1">
        Example B — props
      </h3>
      <Greeting name="Zaw" age={25} />
      <Greeting name="Alice" age={15} />

      <h3 className="mt-8 mb-2 font-semibold text-slate-900 border-b border-slate-200 pb-1">
        Example C — lists with .map()
      </h3>
      <LangList />

      <h3 className="mt-8 mb-2 font-semibold text-slate-900 border-b border-slate-200 pb-1">
        Example D — conditional rendering
      </h3>
      <Status isOnline={true} />
      <Status isOnline={false} />

      <h3 className="mt-8 mb-2 font-semibold text-slate-900 border-b border-slate-200 pb-1">
        Example E — state + events (interactive!)
      </h3>
      <p className="mt-2">
        You clicked <strong className="text-blue-600">{count}</strong> times.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          className="px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-blue-600 transition"
          onClick={() => setCount(count + 1)}
        >
          Click me
        </button>
        <button
          className="px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-blue-600 transition"
          onClick={() => setCount(0)}
        >
          Reset
        </button>
        <button
          className="px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-blue-600 transition"
          onClick={() => setCount(count * 2)}
        >
          Double ({count * 2})
        </button>
      </div>

      <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-600 rounded-lg">
        💡 <b>Try it yourself:</b> open <code className="bg-blue-100 px-1.5 py-0.5 rounded">src/lessons/Lesson1.jsx</code>,
        change the text, add another {'<Greeting />'}, or edit the JSX below —
        the browser updates instantly without reloading.
      </div>
    </section>
  );
}
