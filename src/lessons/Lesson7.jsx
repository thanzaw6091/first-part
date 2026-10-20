import { useState } from 'react';

// ဒီ lesson မှာ အကြောင်းအရာ တစ်ခုတည်းပဲ သင်ပါမယ် - စာရင်းကို ရှာဖွေခြင်း (Search & Filter)
// လက်တွေ့ - ဆိုင်တစ်ဆိုင်ရဲ့ ပစ္စည်းစာရင်းကို ရိုက်ရှာတာ

// ကုဒ်ပြဖို့ စာသား (ရိုးရှင်းအောင် style တွေ ဖယ်ထားပါတယ်)
const demoCode = `import { useState } from 'react';

const products = [
  { id: 1, name: 'Apple ပန်းသီး', price: 1500 },
  { id: 2, name: 'Banana ငှက်ပျောသီး', price: 800 },
  { id: 3, name: 'Orange လိမ္မော်သီး', price: 1200 },
  { id: 4, name: 'Mango သရက်သီး', price: 2000 },
  { id: 5, name: 'Grape စပျစ်သီး', price: 2500 },
];

function ProductSearch() {
  // state က ရှာတဲ့ စာသား တစ်ခုတည်း
  const [search, setSearch] = useState('');

  // ရှာတဲ့ စာနဲ့ ကိုက်တဲ့ ပစ္စည်းတွေကိုပဲ ယူမယ်
  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="ပစ္စည်း ရှာပါ"
      />

      <p>တွေ့တာ: {filtered.length} ခု</p>

      {filtered.length === 0 ? (
        <p>ဘာမှ မတွေ့ပါဘူး</p>
      ) : (
        <ul>
          {filtered.map((product) => (
            <li key={product.id}>
              {product.name} - {product.price} ကျပ်
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}`;

// ---------- အောက်က ကုဒ်က နမူနာကို တကယ်ပြဖို့ပါ ----------

const products = [
  { id: 1, name: 'Apple ပန်းသီး', price: 1500 },
  { id: 2, name: 'Banana ငှက်ပျောသီး', price: 800 },
  { id: 3, name: 'Orange လိမ္မော်သီး', price: 1200 },
  { id: 4, name: 'Mango သရက်သီး', price: 2000 },
  { id: 5, name: 'Grape စပျစ်သီး', price: 2500 },
];

function ProductSearchDemo() {
  const [search, setSearch] = useState('');

  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="ပစ္စည်း ရှာပါ (ဥပမာ - app)"
        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <p className="text-xs text-slate-500">
        တွေ့တာ: <span className="font-bold text-blue-600">{filtered.length}</span> ခု
      </p>

      {filtered.length === 0 ? (
        <p className="text-sm text-slate-400">ဘာမှ မတွေ့ပါဘူး</p>
      ) : (
        <ul className="divide-y divide-slate-200 bg-white rounded-lg border border-slate-200 overflow-hidden">
          {filtered.map((product) => (
            <li key={product.id} className="flex justify-between p-3 text-sm">
              <span className="text-slate-800">{product.name}</span>
              <span className="text-slate-500">{product.price} ကျပ်</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Lesson7() {
  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full">
          Beginner Level (အခြေခံအဆင့်)
        </span>
        <h2 className="text-2xl font-bold text-slate-900 mt-2">
          Lesson 7: စာရင်းကို ရှာဖွေခြင်း (Search)
        </h2>
        <p className="text-slate-600 text-sm mt-1">
          ရိုက်လိုက်တာနဲ့ စာရင်းထဲက ကိုက်တာကိုပဲ ပြတဲ့ search box လုပ်ကြည့်ရအောင်။
        </p>
      </div>

      {/* ၁။ ဘာလဲ */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-slate-900">၁။ ဘာကို လုပ်မှာလဲ?</h3>
        <p className="text-slate-700 leading-relaxed">
          Shopping website, contact စာရင်း၊ ဖုန်းထဲက app စာရင်း - ပစ္စည်းများလာရင် search box
          တစ်ခုတော့ ပါပါတယ်။ ရိုက်လိုက်တာနဲ့ ကိုက်တဲ့ အရာတွေပဲ ကျန်ပြီး ကျန်တာတွေ ပျောက်သွားပါတယ်။
          React မှာ ဒါကို ဘယ်လို လုပ်လဲ ကြည့်ရအောင်။
        </p>
      </div>

      {/* ၂။ အချက် ၃ ခု */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-slate-900">၂။ သိထားရမယ့် အချက် ၃ ခု</h3>
        <div className="space-y-2 text-sm">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="font-bold text-slate-800">၁။ state က ရှာတဲ့စာသား တစ်ခုတည်း</span>
            <p className="text-slate-600 mt-1">
              <code className="bg-slate-200 px-1 rounded font-mono">search</code> state ထဲမှာ user ရိုက်တာကို
              သိမ်းပါတယ်။ (Lesson 6 က input နဲ့ state ချိတ်တာပါပဲ)
            </p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="font-bold text-slate-800">၂။ .filter() နဲ့ ကိုက်တာကို ရွေးယူ</span>
            <p className="text-slate-600 mt-1">
              <code className="bg-slate-200 px-1 rounded font-mono">products.filter(...)</code> က စာရင်းထဲက
              အခြေအနေနဲ့ ကိုက်တာတွေကိုပဲ ယူပြီး စာရင်းအသစ် ပေးပါတယ်။ မူရင်းစာရင်း မပြောင်းပါဘူး။
              <code className="bg-slate-200 px-1 rounded font-mono"> toLowerCase()</code> က အကြီးအသေး
              မခွဲဘဲ ရှာအောင် လုပ်တာပါ။
            </p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="font-bold text-slate-800">၃။ filter လုပ်ထားတာကို state ထဲ မသိမ်းပါနဲ့</span>
            <p className="text-slate-600 mt-1">
              <code className="bg-slate-200 px-1 rounded font-mono">filtered</code> ကို state အဖြစ် မသိမ်းဘဲ
              render လုပ်တိုင်း <code className="bg-slate-200 px-1 rounded font-mono">search</code> ကနေ
              တွက်ယူပါတယ်။ ဒါဆို state တစ်ခုပဲ ရှိလို့ ရှုပ်မသွားဘူး၊ ပြောင်းတာနဲ့ အလိုအလျောက် မှန်နေတယ်။
            </p>
          </div>
        </div>
      </div>

      {/* ၃။ နမူနာ */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-slate-900">၃။ စမ်းကြည့်ပါ</h3>
        <p className="text-slate-700 text-sm leading-relaxed">
          <strong>app</strong>၊ <strong>an</strong>၊ <strong>သီး</strong> လို့ ရိုက်ကြည့်ပါ။ ဘာမှမကိုက်တဲ့စာ
          (ဥပမာ <strong>xyz</strong>) ရိုက်ရင် "မတွေ့ပါဘူး" ပေါ်ပါမယ် 👇
        </p>

        <pre className="p-4 bg-slate-900 text-slate-100 rounded-lg text-sm font-mono overflow-x-auto leading-relaxed">
          {demoCode}
        </pre>

        <ProductSearchDemo />
      </div>

      {/* အနှစ်ချုပ် */}
      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-900 space-y-1">
        <p className="font-bold">📌 မှတ်ထားရမယ့် အချက် ၃ ချက်</p>
        <p>၁။ state ထဲမှာ ရှာတဲ့စာသား တစ်ခုတည်း သိမ်းပါ</p>
        <p>၂။ .filter() နဲ့ ကိုက်တာကို ရွေးပြီး .map() နဲ့ ပြပါ</p>
        <p>၃။ ရလဒ်စာရင်းကို state ထဲ မသိမ်းဘဲ render ထဲမှာ တွက်ပါ</p>
      </div>
    </section>
  );
}