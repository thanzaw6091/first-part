import { useState, useEffect } from 'react';

// ဒီ lesson မှာ အကြောင်းအရာ တစ်ခုတည်းပဲ သင်ပါမယ် - useEffect
// ဖန်သားပြင်မှာ ပြမယ့် ကုဒ်ကို စာသားအဖြစ် သိမ်းထားတာပါ (ကုဒ်ပြဖို့သာ)
const demoCode = `import { useState, useEffect } from 'react';

function EffectDemo() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [runs, setRuns] = useState(0);

  // count ပြောင်းတိုင်း ဒီ effect run မယ်
  useEffect(() => {
    document.title = 'Count: ' + count;
    setRuns((r) => r + 1);
  }, [count]);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="နာမည်ရိုက်ကြည့်ပါ"
      />

      <p>Effect run ခဲ့တဲ့ အကြိမ်: {runs}</p>
    </div>
  );
}`;

function EffectDemo() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [runs, setRuns] = useState(0);

  useEffect(() => {
    document.title = 'Count: ' + count;
    setRuns((r) => r + 1);
  }, [count]);

  return (
    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
      <div className="flex flex-wrap gap-2 items-center">
        <button
          type="button"
          onClick={() => setCount(count + 1)}
          className="px-3.5 py-1.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition cursor-pointer"
        >
          Count: {count}
        </button>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="နာမည် ရိုက်ကြည့်ပါ"
          className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="p-3 bg-white border border-slate-200 rounded-lg text-sm space-y-1">
        <p>
          Effect run ခဲ့တဲ့ အကြိမ်:{' '}
          <span className="font-bold text-blue-600">{runs}</span>
        </p>
        <p className="text-xs text-slate-500">
          👀 Browser tab ရဲ့ ခေါင်းစဉ် (title) ကိုလည်း ကြည့်ပါ၊ "Count: {count}" လို့ ပြောင်းနေပါလိမ့်မယ်။
        </p>
      </div>
    </div>
  );
}

export default function Lesson3() {
  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-violet-600 bg-violet-50 px-2.5 py-1 rounded-full">
          Beginner Level (အခြေခံအဆင့်)
        </span>
        <h2 className="text-2xl font-bold text-slate-900 mt-2">
          Lesson 3: useEffect
        </h2>
        <p className="text-slate-600 text-sm mt-1">
          Component ပြပြီးတဲ့နောက် ထပ်လုပ်ချင်တဲ့ အလုပ်တွေကို ဘယ်လိုရေးမလဲ။
        </p>
      </div>

      {/* ၁။ ဘာလဲ */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-slate-900">၁။ useEffect ဆိုတာ ဘာလဲ?</h3>
        <p className="text-slate-700 leading-relaxed">
          Component ရဲ့ အလုပ်က UI ပြဖို့ပါ။ ဒါပေမယ့် တခါတလေ UI ပြပြီးတဲ့နောက်{' '}
          <strong>အပိုအလုပ်</strong> လုပ်ချင်တတ်ပါတယ်။ ဥပမာ - browser tab title ပြောင်းတာ၊
          timer စတာ၊ server က data ခေါ်တာ။ အဲဒီလို အလုပ်တွေကို{' '}
          <code className="bg-slate-100 px-1 rounded font-mono text-sm font-bold">useEffect</code>{' '}
          ထဲမှာ ရေးပါတယ်။
        </p>
      </div>

      {/* ၂။ ပုံစံ */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-slate-900">၂။ ရေးပုံရေးနည်း</h3>
        <pre className="p-4 bg-slate-900 text-slate-100 rounded-lg text-sm font-mono overflow-x-auto leading-relaxed">
{`useEffect(() => {
  // လုပ်ချင်တဲ့ အလုပ်
}, [dependency]);`}
        </pre>
        <p className="text-slate-700 leading-relaxed text-sm">
          အပိုင်း ၂ ပိုင်းပဲ ရှိပါတယ်။ <strong>function</strong> (လုပ်မယ့်အလုပ်) နဲ့{' '}
          <strong>[ ] စာရင်း</strong> (ဘယ်အချိန်မှာ run မလဲ ဆိုတာ သတ်မှတ်တာ)။
        </p>
      </div>

      {/* ၃။ [ ] ရဲ့ ပုံစံ ၃ မျိုး */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-slate-900">၃။ [ ] ထဲမှာ ဘာထည့်လဲ?</h3>
        <div className="space-y-2 text-sm">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <code className="font-mono font-bold text-blue-600">{'[count]'}</code>
            <p className="text-slate-600 mt-1">
              <strong>count</strong> ပြောင်းတိုင်း run မယ်။
            </p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <code className="font-mono font-bold text-blue-600">{'[]'}</code>
            <p className="text-slate-600 mt-1">
              ဘာမှမထည့်ဘူး (အလွတ်) - ပထမဆုံး ပြတဲ့အခါ <strong>တစ်ခါတည်း</strong> run မယ်။
            </p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <code className="font-mono font-bold text-blue-600">{'(နောက်က [ ] လုံးဝမရေးရင်)'}</code>
            <p className="text-slate-600 mt-1">
              render လုပ်တိုင်း run မယ်။ မလိုအပ်ဘဲ များများ run တတ်လို့ အစပိုင်းမှာ မသုံးသင့်ပါ။
            </p>
          </div>
        </div>
      </div>

      {/* ၄။ နမူနာ */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-slate-900">၄။ နမူနာ</h3>
        <p className="text-slate-700 text-sm leading-relaxed">
          ခလုတ်ကို နှိပ်ရင် count တိုးပြီး effect run ပါမယ်။ နာမည်ရိုက်ရင်တော့ effect{' '}
          <strong>မ run</strong> ပါဘူး၊ ဘာလို့လဲဆို <code className="bg-slate-100 px-1 rounded font-mono">[count]</code> ကိုပဲ
          စောင့်ကြည့်ထားလို့ပါ။ ကိုယ်တိုင် စမ်းကြည့်ပါ 👇
        </p>

        <pre className="p-4 bg-slate-900 text-slate-100 rounded-lg text-sm font-mono overflow-x-auto leading-relaxed">
          {demoCode}
        </pre>

        <EffectDemo />
      </div>

      {/* အနှစ်ချုပ် */}
      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-900 space-y-1">
        <p className="font-bold">📌 မှတ်ထားရမယ့် အချက် ၃ ချက်</p>
        <p>၁။ useEffect = ပြပြီးတဲ့နောက် လုပ်ချင်တဲ့ အပိုအလုပ်ကို ရေးတဲ့နေရာ</p>
        <p>၂။ [ ] ထဲက တန်ဖိုး ပြောင်းမှ effect ပြန် run မယ်</p>
        <p>၃။ [ ] အလွတ်ဆိုရင် ပထမတစ်ခါပဲ run မယ်</p>
      </div>
    </section>
  );
}