import { createContext, useContext, useState } from 'react';

// ဒီ lesson မှာ အကြောင်းအရာ တစ်ခုတည်းပဲ သင်ပါမယ် - Context (props ကို အဆင့်ဆင့် မပို့ဘဲ မျှဝေခြင်း)
// လက်တွေ့ - Dark mode / Light mode ခလုတ် (website အားလုံးလိုလိုမှာ ပါတယ်)

// ကုဒ်ပြဖို့ စာသား (ရိုးရှင်းအောင် style တွေ ဖယ်ထားပါတယ်)
const demoCode = `import { createContext, useContext, useState } from 'react';

// ၁။ Context တစ်ခု ဖန်တီးမယ်
const ThemeContext = createContext();

// ၂။ Parent မှာ Provider နဲ့ ဖုံးပြီး တန်ဖိုးကို ထည့်ပေးမယ်
function App() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Navbar />
      <Content />
    </ThemeContext.Provider>
  );
}

// ၃။ ဘယ်နေရာကမဆို useContext နဲ့ တန်းယူသုံးမယ်
function Navbar() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div>
      <p>အခု mode: {theme}</p>
      <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        Mode ပြောင်းမယ်
      </button>
    </div>
  );
}

function Content() {
  // Content က theme ကို props နဲ့ မလက်ခံဘူး
  return <Card />;
}

function Card() {
  // Card က အဆင့်နှစ်ဆင့် နက်နေပေမယ့် တန်းယူနိုင်တယ်
  const { theme } = useContext(ThemeContext);

  return (
    <div className={theme === 'dark' ? 'dark-card' : 'light-card'}>
      ဒီ card က {theme} mode မှာ ရှိနေပါတယ်
    </div>
  );
}`;

// ---------- အောက်က ကုဒ်က နမူနာကို တကယ်ပြဖို့ပါ ----------

const ThemeContext = createContext();

function Navbar() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className="flex items-center justify-between gap-2 flex-wrap">
      <p className="text-sm font-semibold">
        အခု mode: <span className="text-blue-500">{theme}</span>
      </p>
      <button
        type="button"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="px-3.5 py-1.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition cursor-pointer"
      >
        {theme === 'light' ? '🌙 Dark ပြောင်းမယ်' : '☀️ Light ပြောင်းမယ်'}
      </button>
    </div>
  );
}

function Content() {
  return <Card />;
}

function Card() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={
        theme === 'dark'
          ? 'p-4 rounded-lg text-sm bg-slate-700 text-slate-100'
          : 'p-4 rounded-lg text-sm bg-white text-slate-800 border border-slate-200'
      }
    >
      ဒီ card က <strong>{theme}</strong> mode မှာ ရှိနေပါတယ်။ Navbar က ခလုတ်ကို နှိပ်တာကို
      ဒီ card က props မရဘဲ သိနေတာ ကြည့်ပါ။
    </div>
  );
}

function ThemeDemo() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div
        className={
          theme === 'dark'
            ? 'p-4 rounded-lg space-y-3 bg-slate-900 text-slate-100'
            : 'p-4 rounded-lg space-y-3 bg-slate-50 text-slate-800 border border-slate-200'
        }
      >
        <Navbar />
        <Content />
      </div>
    </ThemeContext.Provider>
  );
}

export default function Lesson8() {
  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-fuchsia-600 bg-fuchsia-50 px-2.5 py-1 rounded-full">
          Beginner Level (အခြေခံအဆင့်)
        </span>
        <h2 className="text-2xl font-bold text-slate-900 mt-2">
          Lesson 8: Context (Dark Mode ခလုတ်)
        </h2>
        <p className="text-slate-600 text-sm mt-1">
          Component အများကြီးက data တူတူ သုံးချင်ရင် props ကို အဆင့်ဆင့် မပို့ဘဲ ဘယ်လိုလုပ်မလဲ။
        </p>
      </div>

      {/* ၁။ ပြဿနာ */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-slate-900">၁။ ပြဿနာက ဘာလဲ?</h3>
        <p className="text-slate-700 leading-relaxed">
          Website တစ်ခုမှာ Dark mode ခလုတ် ရှိတယ်ဆိုပါစို့။ Mode ကို Navbar, Sidebar, Card, Footer
          စတဲ့ component အများကြီးက သိဖို့ လိုပါတယ်။ Lesson 4 နည်းအတိုင်း props နဲ့ ပို့ရင်
          component တစ်ဆင့်ပြီး တစ်ဆင့် <strong>အကုန်ဖြတ်ပို့</strong> ရပါမယ်။ ကြားထဲက component
          တွေက ကိုယ်တိုင် မသုံးတောင် ဆက်ပို့ပေးနေရတာမို့ ရှုပ်ပါတယ်။ ဒါကို{' '}
          <strong>props drilling</strong> လို့ ခေါ်ပါတယ်။
        </p>
      </div>

      {/* ၂။ အဖြေ */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-slate-900">၂။ အဖြေ - Context</h3>
        <p className="text-slate-700 leading-relaxed">
          Context ဆိုတာ data ကို <strong>အလယ်မှာ ထားပေးထားပြီး</strong> ဘယ်နေရာက component ကမဆို
          တန်းယူသုံးလို့ရတဲ့ နည်းပါ။ အဆင့် ၃ ဆင့်ပဲ ရှိပါတယ်။
        </p>
        <div className="space-y-2 text-sm">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="font-bold text-slate-800">၁။ ဖန်တီးမယ်</span>
            <p className="text-slate-600 mt-1">
              <code className="bg-slate-200 px-1 rounded font-mono">const ThemeContext = createContext();</code>
            </p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="font-bold text-slate-800">၂။ Provider နဲ့ ဖုံးပြီး တန်ဖိုးထည့်ပေးမယ်</span>
            <p className="text-slate-600 mt-1">
              Parent မှာ <code className="bg-slate-200 px-1 rounded font-mono">ThemeContext.Provider</code> နဲ့
              ကလေးတွေကို ဖုံးပြီး <code className="bg-slate-200 px-1 rounded font-mono">value</code> ထဲမှာ
              မျှဝေချင်တာ ထည့်ပါတယ်။
            </p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="font-bold text-slate-800">၃။ useContext နဲ့ ယူသုံးမယ်</span>
            <p className="text-slate-600 mt-1">
              ဘယ်အဆင့်မှာ ရှိတဲ့ component ကမဆို{' '}
              <code className="bg-slate-200 px-1 rounded font-mono">useContext(ThemeContext)</code> လို့
              ခေါ်ရင် တန်ဖိုးကို ရပါတယ်။ ကြားထဲက component တွေ ဆက်ပို့ပေးစရာ မလိုတော့ပါဘူး။
            </p>
          </div>
        </div>
      </div>

      {/* ၃။ နမူနာ */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-slate-900">၃။ စမ်းကြည့်ပါ</h3>
        <p className="text-slate-700 text-sm leading-relaxed">
          ခလုတ်ကို နှိပ်ကြည့်ပါ။ <code className="bg-slate-100 px-1 rounded font-mono">Navbar</code> မှာ
          နှိပ်ပေမယ့် <code className="bg-slate-100 px-1 rounded font-mono">Card</code> ပါ ပြောင်းသွားပါမယ်။
          Card က Navbar နဲ့ ဝေးပြီး (Content ကြားထဲမှာ) props လည်း မရပါဘူး 👇
        </p>

        <pre className="p-4 bg-slate-900 text-slate-100 rounded-lg text-sm font-mono overflow-x-auto leading-relaxed">
          {demoCode}
        </pre>

        <ThemeDemo />
      </div>

      {/* အနှစ်ချုပ် */}
      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-900 space-y-1">
        <p className="font-bold">📌 မှတ်ထားရမယ့် အချက် ၃ ချက်</p>
        <p>၁။ component အများကြီးက data တူတူ သုံးချင်ရင် Context သုံးပါ</p>
        <p>၂။ createContext → Provider (value ထည့်) → useContext (ယူသုံး)</p>
        <p>၃။ data ကို ၂ ခုလောက်ပဲ သုံးရင် props က ပိုရိုးရှင်းတယ်၊ Context ကို အကုန်မသုံးပါနဲ့</p>
      </div>
    </section>
  );
}