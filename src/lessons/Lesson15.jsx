import { Link, MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';

const demoCode = `import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <>
        <nav>
          <Link to="/">ပင်မ</Link>
          <Link to="/about">အကြောင်း</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}`;

function RoutePreview() {
  const location = useLocation();

  return (
    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-4">
      <nav aria-label="နမူနာစာမျက်နှာများ" className="flex flex-wrap gap-2">
        <Link
          to="/"
          className="px-3.5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          ပင်မစာမျက်နှာ
        </Link>
        <Link
          to="/about"
          className="px-3.5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          အကြောင်း
        </Link>
        <Link
          to="/contact"
          className="px-3.5 py-2 border border-slate-300 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-100 transition"
        >
          မရှိတဲ့ လမ်းကြောင်း
        </Link>
      </nav>

      <div className="p-4 bg-white border border-slate-200 rounded-lg">
        <p className="text-xs text-slate-500 mb-2">လက်ရှိ path: {location.pathname}</p>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h4 className="font-bold text-slate-900">ပင်မစာမျက်နှာ</h4>
                <p className="text-sm text-slate-600 mt-1">ဒီနေရာက Home route ရဲ့ အကြောင်းအရာပါ။</p>
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <h4 className="font-bold text-slate-900">ကျွန်ုပ်တို့အကြောင်း</h4>
                <p className="text-sm text-slate-600 mt-1">ဒီနေရာက About route ရဲ့ အကြောင်းအရာပါ။</p>
              </>
            }
          />
          <Route
            path="*"
            element={
              <>
                <h4 className="font-bold text-slate-900">စာမျက်နှာ မတွေ့ပါ</h4>
                <p className="text-sm text-slate-600 mt-1">ဒီ path အတွက် Route မသတ်မှတ်ထားပါ။</p>
              </>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default function Lesson15() {
  return (
    <section className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-lime-700 bg-lime-50 px-2.5 py-1 rounded-full">
          Intermediate Level (အလယ်အလတ်အဆင့်)
        </span>
        <h2 className="text-2xl font-bold text-slate-900 mt-2">Lesson 15: React Router</h2>
        <p className="text-slate-600 text-sm mt-1">URL လမ်းကြောင်းအလိုက် စာမျက်နှာအကြောင်းအရာ ပြောင်းပြမယ်။</p>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-bold text-slate-900">၁။ Route ဆိုတာဘာလဲ?</h3>
        <p className="text-slate-700 leading-relaxed">
          App တစ်ခုမှာ Home, About လို စာမျက်နှာအများကြီးရှိနိုင်ပါတယ်။ React Router က URL path နဲ့
          ဘယ် component ကို ပြရမလဲ ဆက်စပ်ပေးပါတယ်။
        </p>
        <div className="grid gap-2 sm:grid-cols-3 text-sm">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg"><code>Link</code><p className="text-slate-600 mt-1">စာမျက်နှာပြောင်းဖို့</p></div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg"><code>Routes</code><p className="text-slate-600 mt-1">Route များကို စုစည်းဖို့</p></div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg"><code>Route</code><p className="text-slate-600 mt-1">Path နဲ့ component ချိတ်ဖို့</p></div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-bold text-slate-900">၂။ အလုပ်လုပ်ပုံ</h3>
        <pre className="p-4 bg-slate-900 text-slate-100 rounded-lg text-sm font-mono overflow-x-auto leading-relaxed">{demoCode}</pre>
        <p className="text-sm text-slate-600">
          ဒီသင်ခန်းစာရဲ့ နမူနာမှာ <code>MemoryRouter</code> ကို သုံးထားတာကြောင့် browser ရဲ့ URL ကို မပြောင်းပါဘူး။
          တကယ့် app မှာတော့ အများအားဖြင့် <code>BrowserRouter</code> နဲ့ app ကို ဝန်းရံပေးရပါတယ်။
        </p>
        <MemoryRouter>
          <RoutePreview />
        </MemoryRouter>
      </div>

      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-900 space-y-1">
        <p className="font-bold">📌 မှတ်ထားရန်</p>
        <p>၁။ Link နဲ့ navigation လုပ်ပါ၊ ပုံမှန် anchor လို page reload မဖြစ်ပါ</p>
        <p>၂။ Routes ထဲမှာ path နဲ့ element ကို Route နဲ့ တွဲသတ်မှတ်ပါ</p>
        <p>၃။ မကိုက်ညီတဲ့ path အတွက် path="*" နဲ့ 404 စာမျက်နှာ ပြနိုင်တယ်</p>
      </div>
    </section>
  );
}
