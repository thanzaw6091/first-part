import { memo, useCallback, useState } from 'react';

const demoCode = `import { memo, useCallback, useState } from 'react';

const AddButton = memo(function AddButton({ onAdd }) {
  return <button onClick={onAdd}>တစ်ခု တိုးမယ်</button>;
});

function Counter() {
  const [count, setCount] = useState(0);
  const [note, setNote] = useState('');

  const addOne = useCallback(() => {
    setCount((current) => current + 1);
  }, []);

  return (
    <>
      <p>အရေအတွက်: {count}</p>
      <input value={note} onChange={(e) => setNote(e.target.value)} />
      <AddButton onAdd={addOne} />
    </>
  );
}`;

const AddButton = memo(function AddButton({ onAdd }) {
  return (
    <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-2">
      <button
        type="button"
        onClick={onAdd}
        className="px-3.5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition cursor-pointer"
      >
        တစ်ခု တိုးမယ်
      </button>
    </div>
  );
});

function CounterDemo() {
  const [count, setCount] = useState(0);
  const [note, setNote] = useState('');
  const addOne = useCallback(() => {
    setCount((current) => current + 1);
  }, []);

  return (
    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
      <p className="text-lg font-bold text-slate-900">အရေအတွက်: {count}</p>
      <label className="block text-sm font-medium text-slate-700" htmlFor="callback-note">
        မှတ်စု (ဒီစာရိုက်တာက အရေအတွက်နဲ့ မသက်ဆိုင်ပါ)
      </label>
      <input
        id="callback-note"
        value={note}
        onChange={(event) => setNote(event.target.value)}
        placeholder="တစ်ခုခု ရိုက်ပါ"
        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <AddButton onAdd={addOne} />
      <p className="text-xs text-slate-500">
        မှတ်စုရိုက်တဲ့အခါ Parent render ဖြစ်ပေမယ့် callback တူညီနေလို့ memo ထားတဲ့ button က render ထပ်မဖြစ်ပါဘူး။
      </p>
    </div>
  );
}

export default function Lesson14() {
  return (
    <section className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-lime-700 bg-lime-50 px-2.5 py-1 rounded-full">
          Intermediate Level (အလယ်အလတ်အဆင့်)
        </span>
        <h2 className="text-2xl font-bold text-slate-900 mt-2">Lesson 14: useCallback</h2>
        <p className="text-slate-600 text-sm mt-1">Function ကို render များအကြား တူညီအောင် မှတ်ထားပါ။</p>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-bold text-slate-900">၁။ Function ကလည်း တန်ဖိုးတစ်ခုပါ</h3>
        <p className="text-slate-700 leading-relaxed">
          Parent component ပြန် render ဖြစ်တိုင်း function အသစ်တစ်ခု ဖန်တီးတတ်ပါတယ်။ ဒီ function ကို
          <code className="bg-slate-100 px-1 rounded font-mono text-sm"> memo</code> ထားတဲ့ child ဆီ prop အဖြစ်ပို့ရင်
          function အသစ်ဖြစ်နေတဲ့အတွက် child ကလည်း ပြန် render ဖြစ်နိုင်ပါတယ်။
        </p>
        <p className="text-slate-700 leading-relaxed">
          <code className="bg-slate-100 px-1 rounded font-mono text-sm">useCallback</code> က dependency မပြောင်းသရွေ့
          function တူညီတာကို မှတ်ထားပေးပါတယ်။ များသောအားဖြင့် memo ထားတဲ့ child နဲ့ တွဲသုံးပါတယ်။
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-bold text-slate-900">၂။ စမ်းကြည့်ပါ</h3>
        <p className="text-slate-700 text-sm leading-relaxed">
          မှတ်စုအကွက်ထဲ စာရိုက်ကြည့်ပါ။ Parent က ပြန် render ဖြစ်ပေမယ့် callback တူညီနေလို့ memo ထားတဲ့
          ခလုတ် component ကို ပြန် render မလုပ်ပါဘူး။ ခလုတ်ကို နှိပ်ရင်တော့ အရေအတွက် တိုးလာပါမယ်။
        </p>
        <pre className="p-4 bg-slate-900 text-slate-100 rounded-lg text-sm font-mono overflow-x-auto leading-relaxed">{demoCode}</pre>
        <CounterDemo />
      </div>

      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-900 space-y-1">
        <p className="font-bold">📌 မှတ်ထားရန်</p>
        <p>၁။ useCallback က function ကို မှတ်ထားပေးတယ်</p>
        <p>၂။ Dependency ပြောင်းရင် function အသစ်လိုအပ်လို့ dependency array ကို မှန်ကန်စွာ ထည့်ပါ</p>
        <p>၃။ memo ထားတဲ့ child ကို မလိုအပ်ဘဲ render မဖြစ်စေဖို့ အသုံးဝင်တယ်</p>
      </div>
    </section>
  );
}
