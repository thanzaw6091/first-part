import { memo, useState } from 'react';

const demoCode = `import { memo, useState } from 'react';

const Greeting = memo(function Greeting({ name }) {
  return <p>မင်္ဂလာပါ {name} 👋</p>;
});

function App() {
  const [name, setName] = useState('မောင်မောင်');
  const [clicks, setClicks] = useState(0);

  return (
    <>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={() => setClicks(clicks + 1)}>
        နှိပ်ထားတာ {clicks}
      </button>
      <Greeting name={name} />
    </>
  );
}`;

const MemoGreeting = memo(function MemoGreeting({ name }) {
  return (
    <div className="p-3 bg-white border border-slate-200 rounded-lg">
      <p className="font-semibold text-slate-900">မင်္ဂလာပါ {name || 'မိတ်ဆွေ'} 👋</p>
    </div>
  );
});

function GreetingDemo() {
  const [name, setName] = useState('မောင်မောင်');
  const [clicks, setClicks] = useState(0);
  return (
    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
      <label className="block text-sm font-medium text-slate-700" htmlFor="memo-name">နာမည်</label>
      <input
        id="memo-name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="button"
        onClick={() => setClicks((value) => value + 1)}
        className="px-3.5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition cursor-pointer"
      >
        မသက်ဆိုင်တဲ့ ခလုတ်ကို နှိပ်ပါ ({clicks})
      </button>
      <MemoGreeting name={name} />
      <p className="text-xs text-slate-500">
        အပေါ်က ခလုတ်နှိပ်တဲ့အခါ နာမည် prop မပြောင်းလို့ မင်္ဂလာပါ component က render ထပ်မဖြစ်ပါဘူး။
      </p>
    </div>
  );
}

export default function Lesson13() {
  return (
    <section className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-lime-700 bg-lime-50 px-2.5 py-1 rounded-full">
          Intermediate Level (အလယ်အလတ်အဆင့်)
        </span>
        <h2 className="text-2xl font-bold text-slate-900 mt-2">Lesson 13: React.memo</h2>
        <p className="text-slate-600 text-sm mt-1">Props မပြောင်းတဲ့ child component ကို မလိုအပ်ဘဲ render ထပ်မဖြစ်စေပါနဲ့။</p>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-bold text-slate-900">၁။ ပုံမှန်အခြေအနေ</h3>
        <p className="text-slate-700 leading-relaxed">
          Parent component ပြန် render ဖြစ်တဲ့အခါ child component တွေလည်း ပုံမှန်အားဖြင့် ပြန် render ဖြစ်ပါတယ်။
          ဒါပေမယ့် child ရဲ့ props တွေ မပြောင်းဘူးဆိုရင် <code className="bg-slate-100 px-1 rounded font-mono text-sm">memo</code>
          {' '}နဲ့ ဖုံးထားပြီး မလိုအပ်တဲ့ render ကို လျှော့နိုင်ပါတယ်။
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-bold text-slate-900">၂။ စမ်းကြည့်ပါ</h3>
        <p className="text-slate-700 text-sm leading-relaxed">
          နာမည်မပြောင်းဘဲ အပြာရောင်ခလုတ်ကို နှိပ်ပါ။ Parent ပြန် render ဖြစ်ပေမယ့် Greeting ရဲ့ props မပြောင်းလို့
          memo က Greeting ကို ပြန် render မလုပ်ပါဘူး။ နာမည်ပြင်လိုက်ရင်တော့ Greeting ကို ပြန်ပြပါမယ်။
        </p>
        <pre className="p-4 bg-slate-900 text-slate-100 rounded-lg text-sm font-mono overflow-x-auto leading-relaxed">{demoCode}</pre>
        <GreetingDemo />
      </div>

      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-900 space-y-1">
        <p className="font-bold">သတိပြုရန်</p>
        <p>memo က props တွေကို အပေါ်ယံ နှိုင်းယှဉ်ပါတယ်။ Props ပြောင်းရင်၊ ဒါမှမဟုတ် component ရဲ့ ကိုယ်ပိုင် state/context ပြောင်းရင် render ဖြစ်မှာပါ။</p>
        <p>Render ပြဿနာရှိမှ သုံးတာက ပိုကောင်းပြီး၊ memo ကို အမြဲတမ်းသုံးဖို့ မလိုပါဘူး။</p>
      </div>

      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-900 space-y-1">
        <p className="font-bold">📌 မှတ်ထားရန်</p>
        <p>၁။ memo က props မပြောင်းတဲ့ component ကို render ထပ်မဖြစ်အောင် ကူညီတယ်</p>
        <p>၂။ Parent ပြန် render ဖြစ်တိုင်း child ပြန် render ဖြစ်ရမယ်လို့ မဆိုလိုပါ</p>
        <p>၃။ လိုအပ်မှသာ optimization အဖြစ် သုံးပါ</p>
      </div>
    </section>
  );
}
