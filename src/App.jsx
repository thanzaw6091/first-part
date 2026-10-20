import { useState } from 'react'
import Lesson1 from './lessons/Lesson1'
import Lesson2 from './lessons/Lesson2'
import Lesson3 from './lessons/Lesson3'
import Lesson4 from './lessons/Lesson4'
import Lesson5 from './lessons/Lesson5'
import Lesson6 from './lessons/Lesson6'
import Lesson7 from './lessons/Lesson7'
import Lesson8 from './lessons/Lesson8'
import Lesson9 from './lessons/Lesson9'
import Lesson10 from './lessons/Lesson10'

const lessons = [
  { id: 1, title: 'Components & JSX (အပိုင်း ၁ - အခြေခံများ)', component: Lesson1 },
  { id: 2, title: 'State & Events (အပိုင်း ၂ - အပြန်အလှန် တုံ့ပြန်မှုများ)', component: Lesson2 },
  { id: 3, title: 'useEffect (အပိုအလုပ်များ လုပ်ဆောင်ခြင်း)', component: Lesson3 },
  { id: 4, title: 'Lifting State Up (State ကို မိဘ component ဆီ ရွှေ့တင်ခြင်း)', component: Lesson4 },
  { id: 5, title: 'Data ခေါ်ခြင်း (Fetching Data)', component: Lesson5 },
  { id: 6, title: 'Form ကိုင်တွယ်ခြင်း (Sign up form နဲ့ Validation)', component: Lesson6 },
  { id: 7, title: 'စာရင်းကို ရှာဖွေခြင်း (Search & Filter)', component: Lesson7 },
  { id: 8, title: 'Context (Dark Mode ခလုတ်)', component: Lesson8 },
  { id: 9, title: 'Custom Hook (ကိုယ်ပိုင် Hook ရေးခြင်း)', component: Lesson9 },
  { id: 10, title: 'useRef (Input ကို ကိုယ်တိုင် ထိန်းချုပ်ခြင်း)', component: Lesson10 },
]

function App() {
  const [current, setCurrent] = useState(0)
  const Lesson = lessons[current].component
  const isFirst = current === 0
  const isLast = current === lessons.length - 1

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Course header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">⚛️ React လေ့လာရေး သင်ခန်းစာ</h1>
          <p className="mt-2 text-slate-500">
            သင်ခန်းစာ {current + 1} / {lessons.length}: {lessons[current].title}
          </p>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              disabled={isFirst}
              onClick={() => setCurrent(current - 1)}
              className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              ← ရှေ့သင်ခန်းစာ
            </button>
            <button
              type="button"
              disabled={isLast}
              onClick={() => setCurrent(current + 1)}
              className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              နောက်သင်ခန်းစာ →
            </button>
          </div>
        </header>

        {/* Lesson content */}
        <main className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-left">
          <Lesson />
        </main>
      </div>
    </div>
  )
}

export default App