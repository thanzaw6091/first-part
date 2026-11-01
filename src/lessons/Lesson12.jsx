import { useMemo, useState } from 'react';

const products = [
  { id: 1, name: 'ကော်ဖီ', category: 'အစားအသောက်', price: 2500 },
  { id: 2, name: 'လက်ဖက်ရည်', category: 'အစားအသောက်', price: 1500 },
  { id: 3, name: 'မှတ်စုစာအုပ်', category: 'စာရေးကိရိယာ', price: 3000 },
  { id: 4, name: 'ဘောပင်', category: 'စာရေးကိရိယာ', price: 800 },
  { id: 5, name: 'ရေဘူး', category: 'အသုံးအဆောင်', price: 5000 },
];

const demoCode = `import { useMemo, useState } from 'react';

function ProductSearch({ products }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('အားလုံး');

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesName = product.name.includes(query);
      const matchesCategory =
        category === 'အားလုံး' || product.category === category;
      return matchesName && matchesCategory;
    });
  }, [products, query, category]);

  return (
    <ul>
      {filteredProducts.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}`;

function ProductSearchDemo() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('အားလုံး');

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesName = product.name.includes(query.trim());
        const matchesCategory = category === 'အားလုံး' || product.category === category;
        return matchesName && matchesCategory;
      }),
    [query, category],
  );

  return (
    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
      <div className="flex flex-wrap gap-2">
        <label className="sr-only" htmlFor="product-query">ပစ္စည်းရှာရန်</label>
        <input
          id="product-query"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="ပစ္စည်းအမည် ရှာပါ"
          className="flex-1 min-w-40 px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label className="sr-only" htmlFor="product-category">အမျိုးအစားရွေးရန်</label>
        <select
          id="product-category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
        >
          <option>အားလုံး</option>
          <option>အစားအသောက်</option>
          <option>စာရေးကိရိယာ</option>
          <option>အသုံးအဆောင်</option>
        </select>
      </div>
      <ul className="divide-y divide-slate-200">
        {filteredProducts.map((product) => (
          <li key={product.id} className="py-2 flex justify-between gap-4 text-sm">
            <span>{product.name} <span className="text-slate-500">({product.category})</span></span>
            <span className="font-semibold">{product.price.toLocaleString()} ကျပ်</span>
          </li>
        ))}
        {filteredProducts.length === 0 && (
          <li className="py-2 text-sm text-slate-500">ကိုက်ညီတဲ့ ပစ္စည်းမရှိပါ</li>
        )}
      </ul>
      <p className="text-xs text-slate-500">ပြထားသော ပစ္စည်း {filteredProducts.length} မျိုး</p>
    </div>
  );
}

export default function Lesson12() {
  return (
    <section className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-lime-700 bg-lime-50 px-2.5 py-1 rounded-full">
          Intermediate Level (အလယ်အလတ်အဆင့်)
        </span>
        <h2 className="text-2xl font-bold text-slate-900 mt-2">Lesson 12: useMemo</h2>
        <p className="text-slate-600 text-sm mt-1">လိုအပ်တဲ့အချိန်မှသာ တန်ဖိုးကြီးတဲ့ တွက်ချက်မှုကို ပြန်လုပ်မယ်။</p>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-bold text-slate-900">၁။ ဘာအတွက်လဲ?</h3>
        <p className="text-slate-700 leading-relaxed">
          List ကြီးတစ်ခုကို ရှာဖွေ၊ စီစဉ်တာလို တွက်ချက်မှုများတဲ့ ရလဒ်ကို render တိုင်း အစကနေ မတွက်ချင်တဲ့အခါ
          <code className="bg-slate-100 px-1 rounded font-mono text-sm"> useMemo</code> က ယခင်ရလဒ်ကို မှတ်ထားပေးနိုင်ပါတယ်။
          dependency တစ်ခုခုပြောင်းမှသာ တွက်ချက်မှုကို ပြန်လုပ်ပါတယ်။
        </p>
        <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg p-3">
          ရလဒ်ကို မှတ်ထားဖို့ပဲ သုံးပါ။ ရိုးရှင်းတဲ့ တွက်ချက်မှုတိုင်းကို useMemo ထည့်ဖို့ မလိုပါဘူး။
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-bold text-slate-900">၂။ Dependency array</h3>
        <p className="text-slate-700 text-sm leading-relaxed">
          <code className="bg-slate-100 px-1 rounded font-mono">useMemo(() =&gt; တွက်ချက်မှု, [မှီခိုတန်ဖိုးများ])</code>
          {' '}လို့ ရေးပါတယ်။ ဒီဥပမာမှာ စာရှာတဲ့စကားလုံး ဒါမှမဟုတ် အမျိုးအစား ပြောင်းမှ ရလဒ်အသစ်တွက်ပါတယ်။
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-bold text-slate-900">၃။ ရှာဖွေကြည့်ပါ</h3>
        <pre className="p-4 bg-slate-900 text-slate-100 rounded-lg text-sm font-mono overflow-x-auto leading-relaxed">{demoCode}</pre>
        <ProductSearchDemo />
      </div>

      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-900 space-y-1">
        <p className="font-bold">📌 မှတ်ထားရန်</p>
        <p>၁။ useMemo က တွက်ချက်ပြီးရတဲ့ value ကို မှတ်ထားပေးတယ်</p>
        <p>၂။ dependency ပြောင်းမှ တွက်ချက်မှုကို ပြန်လုပ်တယ်</p>
        <p>၃။ ပိုမိုမြန်ဆန်ဖို့ လိုအပ်တဲ့အခါမှ သုံးပါ</p>
      </div>
    </section>
  );
}
