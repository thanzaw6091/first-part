import { useState, useEffect } from 'react';

// ဒီ lesson မှာ အကြောင်းအရာ တစ်ခုတည်းပဲ သင်ပါမယ် - Custom Hook (ကိုယ်ပိုင် Hook ရေးခြင်း)
// လက်တွေ့ - localStorage ထဲ သိမ်းတဲ့ ကုဒ်ကို အကြိမ်ကြိမ် မရေးရအောင် useLocalStorage အဖြစ် ထုတ်ထားမယ်

// ကုဒ်ပြဖို့ စာသား (ရိုးရှင်းအောင် style တွေ ဖယ်ထားပါတယ်)
const demoCode = `import { useState, useEffect } from 'react';

// ကိုယ်ပိုင် Hook - နာမည်က use နဲ့ စရမယ်
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// အသုံးပြုပုံ - useState လိုပဲ ရေးရုံပဲ
function Profile() {
  const [name, setName] = useLocalStorage('username', '');
  const [note, setNote] = useLocalStorage('note', '');

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <textarea value={note} onChange={(e) => setNote(e.target.value)} />
    </div>
  );
}`;

// ---------- အောက်က ကုဒ်က နမူနာကို တကယ်ပြဖို့ပါ ----------

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

function ProfileDemo() {
  const [name, setName] = useLocalStorage('username', '');
  const [note, setNote] = useLocalStorage('note', '');

  return (
    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">နာမည်</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="နာမည် ရိုက်ပါ"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">မှတ်စု</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="မှတ်ထားချင်တာ ရေးပါ"
          rows={3}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <p className="text-xs text-slate-500">
        {name ? 'မင်္ဂလာပါ ' + name + ' 👋' : 'နာမည် ရိုက်ထည့်ပါ'}
      </p>
    </div>
  );
}

export default function Lesson9() {
  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full">
          Beginner Level (အခြေခံအဆင့်)
        </span>
        <h2 className="text-2xl font-bold text-slate-900 mt-2">
          Lesson 9: Custom Hook
        </h2>
        <p className="text-slate-600 text-sm mt-1">
          အကြိမ်ကြိမ် ထပ်ရေးနေရတဲ့ ကုဒ်ကို function တစ်ခုအဖြစ် ထုတ်ပြီး ပြန်သုံးမယ်။
        </p>
      </div>

      {/* ၁။ ပြဿနာ */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-slate-900">၁။ ပြဿနာက ဘာလဲ?</h3>
        <p className="text-slate-700 leading-relaxed">
          Lesson 3 မှာ Todo စာရင်းကို Refresh လုပ်လည်း မပျောက်အောင် localStorage ထဲ သိမ်းခဲ့တာ
          မှတ်မိမလား။ အဲဒီအတွက် <code className="bg-slate-100 px-1 rounded font-mono text-sm">useState</code> နဲ့{' '}
          <code className="bg-slate-100 px-1 rounded font-mono text-sm">useEffect</code> နှစ်ခုလုံး ရေးခဲ့ရပါတယ်။
        </p>
        <p className="text-slate-700 leading-relaxed">
          ဒါပေမယ့် သိမ်းချင်တာ တစ်ခုတည်း မဟုတ်ပါဘူး၊ နာမည်၊ မှတ်စု၊ dark mode ရွေးထားတာ၊ ဘာသာစကား...
          တစ်ခုချင်းစီအတွက် ဒီကုဒ်ကို copy ကူးပြီး ထပ်ထပ်ရေးနေရရင် ရှည်လည်း ရှည်၊ မှားလည်း မှားလွယ်ပါတယ်။
        </p>
      </div>

      {/* ၂။ အဖြေ */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-slate-900">၂။ အဖြေ - Custom Hook</h3>
        <p className="text-slate-700 leading-relaxed">
          ထပ်ရေးနေရတဲ့ ကုဒ်ကို function တစ်ခုအဖြစ် ထုတ်ထားပြီး ပြန်သုံးတာကို{' '}
          <strong>Custom Hook</strong> လို့ ခေါ်ပါတယ်။ စည်းကမ်း ၃ ချက်ပဲ ရှိပါတယ်။
        </p>
        <div className="space-y-2 text-sm">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="font-bold text-slate-800">၁။ နာမည်က use နဲ့ စရမယ်</span>
            <p className="text-slate-600 mt-1">
              ဥပမာ <code className="bg-slate-200 px-1 rounded font-mono">useLocalStorage</code>။
              ဒီလိုပေးမှ React က Hook လို့ သိပါတယ်။
            </p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="font-bold text-slate-800">၂။ အထဲမှာ တခြား Hook တွေကို သုံးလို့ရတယ်</span>
            <p className="text-slate-600 mt-1">
              <code className="bg-slate-200 px-1 rounded font-mono">useState</code> နဲ့{' '}
              <code className="bg-slate-200 px-1 rounded font-mono">useEffect</code> ကို Custom Hook
              ထဲမှာ ရေးလို့ရပါတယ်။
            </p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="font-bold text-slate-800">၃။ လိုတာကို return ပြန်ပေးမယ်</span>
            <p className="text-slate-600 mt-1">
              <code className="bg-slate-200 px-1 rounded font-mono">[value, setValue]</code> ပြန်ပေးထားလို့
              သုံးတဲ့နေရာမှာ <code className="bg-slate-200 px-1 rounded font-mono">useState</code> လိုပဲ
              ရေးလို့ရပါတယ်။
            </p>
          </div>
        </div>
      </div>

      {/* ၃။ နမူနာ */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-slate-900">၃။ စမ်းကြည့်ပါ</h3>
        <p className="text-slate-700 text-sm leading-relaxed">
          နာမည်နဲ့ မှတ်စု ရေးပြီး browser ကို <strong>Refresh (F5)</strong> လုပ်ကြည့်ပါ။ နှစ်ခုလုံး
          မပျောက်ဘဲ ရှိနေပါမယ်။ နှစ်ခုလုံးက <code className="bg-slate-100 px-1 rounded font-mono">useLocalStorage</code> ကို
          တစ်ကြောင်းစီပဲ ခေါ်ထားတာပါ 👇
        </p>

        <pre className="p-4 bg-slate-900 text-slate-100 rounded-lg text-sm font-mono overflow-x-auto leading-relaxed">
          {demoCode}
        </pre>

        <ProfileDemo />
      </div>

      {/* အနှစ်ချုပ် */}
      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-900 space-y-1">
        <p className="font-bold">📌 မှတ်ထားရမယ့် အချက် ၃ ချက်</p>
        <p>၁။ ကုဒ်တူတူ အကြိမ်ကြိမ် ရေးနေရရင် Custom Hook အဖြစ် ထုတ်ပါ</p>
        <p>၂။ Custom Hook ရဲ့ နာမည်က use နဲ့ စရမယ်</p>
        <p>၃။ useState လိုပဲ [value, setValue] ပြန်ပေးရင် သုံးရလွယ်တယ်</p>
      </div>
    </section>
  );
}