import { useState, useRef } from 'react';

// ဒီ lesson မှာ အကြောင်းအရာ တစ်ခုတည်းပဲ သင်ပါမယ် - useRef (Input ကို ကိုယ်တိုင် ထိန်းချုပ်ခြင်း)
// လက်တွေ့ - Search box မှာ မရိုက်ဘဲ နှိပ်ရင် ပြန် focus ထားပေးတာ၊ ဖျက်ပြီးရင် ပြန် focus ထားပေးတာ

// ကုဒ်ပြဖို့ စာသား (ရိုးရှင်းအောင် style တွေ ဖယ်ထားပါတယ်)
const demoCode = `import { useState, useRef } from 'react';

function SearchBox() {
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');

  // ၁။ ref တစ်ခု ဖန်တီးမယ်
  const inputRef = useRef(null);

  function handleSearch() {
    if (text.trim() === '') {
      setMessage('ရှာမယ့်စာ ရိုက်ထည့်ပါ');
      // ၃။ input ကို တိုက်ရိုက် focus ပေးမယ်
      inputRef.current.focus();
      return;
    }
    setMessage('"' + text + '" ကို ရှာနေပါတယ်...');
  }

  function handleClear() {
    setText('');
    setMessage('');
    inputRef.current.focus();
  }

  return (
    <div>
      {/* ၂။ input ကို ref နဲ့ ချိတ်မယ် */}
      <input
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleSearch}>ရှာမယ်</button>
      <button onClick={handleClear}>ဖျက်မယ်</button>

      <p>{message}</p>
    </div>
  );
}`;

// ---------- အောက်က ကုဒ်က နမူနာကို တကယ်ပြဖို့ပါ ----------

function SearchBoxDemo() {
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

  function handleSearch() {
    if (text.trim() === '') {
      setMessage('ရှာမယ့်စာ ရိုက်ထည့်ပါ');
      inputRef.current.focus();
      return;
    }
    setMessage('"' + text + '" ကို ရှာနေပါတယ်...');
  }

  function handleClear() {
    setText('');
    setMessage('');
    inputRef.current.focus();
  }

  return (
    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
      <div className="flex flex-wrap gap-2">
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="ရှာချင်တာ ရိုက်ပါ"
          className="flex-1 min-w-40 px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={handleSearch}
          className="px-3.5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition cursor-pointer"
        >
          ရှာမယ်
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="px-3.5 py-2 border border-slate-300 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-100 transition cursor-pointer"
        >
          ဖျက်မယ်
        </button>
      </div>

      {message && <p className="text-sm text-slate-700">{message}</p>}
    </div>
  );
}

export default function Lesson10() {
  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-lime-700 bg-lime-50 px-2.5 py-1 rounded-full">
          Beginner Level (အခြေခံအဆင့်)
        </span>
        <h2 className="text-2xl font-bold text-slate-900 mt-2">
          Lesson 10: useRef
        </h2>
        <p className="text-slate-600 text-sm mt-1">
          Input ကို ကိုယ်တိုင် ထိန်းချုပ်ပြီး ပြန် focus ပေးမယ်။
        </p>
      </div>

      {/* ၁။ ပြဿနာ */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-slate-900">၁။ ပြဿနာက ဘာလဲ?</h3>
        <p className="text-slate-700 leading-relaxed">
          Search box မှာ ဘာမှမရိုက်ဘဲ "ရှာမယ်" ကို နှိပ်မိရင် ဘာဖြစ်သင့်လဲ။ ကောင်းတဲ့ website တွေက
          error ပြပြီး <strong>cursor ကို input ထဲ ပြန်ထည့်ပေး</strong> ပါတယ်။ ဒါမှ user က
          ချက်ချင်း ပြန်ရိုက်လို့ရလို့ပါ။ Search ကို ဖျက်လိုက်ရင်လည်း cursor က input ထဲ ပြန်ရောက်နေရင် အဆင်ပြေပါတယ်။
        </p>
        <p className="text-slate-700 leading-relaxed">
          ဒါပေမယ့် <code className="bg-slate-100 px-1 rounded font-mono text-sm">useState</code> ကနေ
          input ကို focus ပေးလို့ မရပါဘူး။ State က တန်ဖိုးကိုပဲ မှတ်ထားပြီး input ကိုယ်တိုင်ကို မထိနိုင်ပါဘူး။
        </p>
      </div>

      {/* ၂။ အဖြေ */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-slate-900">၂။ အဖြေ - useRef</h3>
        <p className="text-slate-700 leading-relaxed">
          <code className="bg-slate-100 px-1 rounded font-mono text-sm font-bold">useRef</code> က
          screen ပေါ်က element (ဒီမှာ input) ကို <strong>တိုက်ရိုက်ကိုင်လို့ရအောင်</strong> လုပ်ပေးတဲ့ Hook ပါ။
          အဆင့် ၃ ဆင့်ပဲ ရှိပါတယ်။
        </p>
        <div className="space-y-2 text-sm">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="font-bold text-slate-800">၁။ ref ဖန်တီးမယ်</span>
            <p className="text-slate-600 mt-1">
              <code className="bg-slate-200 px-1 rounded font-mono">const inputRef = useRef(null);</code>
            </p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="font-bold text-slate-800">၂။ input နဲ့ ချိတ်မယ်</span>
            <p className="text-slate-600 mt-1">
              <code className="bg-slate-200 px-1 rounded font-mono">{'<input ref={inputRef} />'}</code>
            </p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="font-bold text-slate-800">၃။ .current နဲ့ ကိုင်မယ်</span>
            <p className="text-slate-600 mt-1">
              <code className="bg-slate-200 px-1 rounded font-mono">inputRef.current</code> က input
              element ကိုယ်တိုင်ပါ။ <code className="bg-slate-200 px-1 rounded font-mono">inputRef.current.focus()</code> လို့
              ခေါ်ရင် cursor က အဲဒီ input ထဲ ရောက်သွားပါတယ်။
            </p>
          </div>
        </div>
        <p className="text-slate-700 text-sm leading-relaxed">
          <strong>State နဲ့ ကွာတာ:</strong> state ပြောင်းရင် screen ပြန်ဆွဲပါတယ်။{' '}
          <code className="bg-slate-100 px-1 rounded font-mono">ref.current</code> ကို ပြောင်းရင်
          screen ပြန်မဆွဲပါဘူး။
        </p>
      </div>

      {/* ၃။ နမူနာ */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-slate-900">၃။ စမ်းကြည့်ပါ</h3>
        <p className="text-slate-700 text-sm leading-relaxed">
          ဘာမှမရိုက်ဘဲ "ရှာမယ်" ကို နှိပ်ကြည့်ပါ၊ cursor က input ထဲ ပြန်ရောက်သွားပါမယ်။ စာရိုက်ပြီး
          "ဖျက်မယ်" ကို နှိပ်ရင်လည်း ဖျက်ပြီး cursor ပြန်ရောက်ပါမယ် 👇
        </p>

        <pre className="p-4 bg-slate-900 text-slate-100 rounded-lg text-sm font-mono overflow-x-auto leading-relaxed">
          {demoCode}
        </pre>

        <SearchBoxDemo />
      </div>

      {/* အနှစ်ချုပ် */}
      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-900 space-y-1">
        <p className="font-bold">📌 မှတ်ထားရမယ့် အချက် ၃ ချက်</p>
        <p>၁။ element ကို တိုက်ရိုက်ကိုင်ချင်ရင် (focus စသည်) useRef သုံးပါ</p>
        <p>၂။ useRef(null) → ref={"{inputRef}"} နဲ့ ချိတ်ပါ → inputRef.current နဲ့ ကိုင်ပါ</p>
        <p>၃။ ref.current ပြောင်းလို့ screen ပြန်မဆွဲဘူး၊ state နဲ့ မတူဘူး</p>
      </div>
    </section>
  );
}