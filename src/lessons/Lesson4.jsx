    import { useState } from 'react';

// ဒီ lesson မှာ အကြောင်းအရာ တစ်ခုတည်းပဲ သင်ပါမယ် - Lifting State Up
// (Component နှစ်ခုက state တူတူသုံးချင်ရင် state ကို မိဘ component ဆီ ရွှေ့တင်လိုက်တာ)

// ကုဒ်ပြဖို့ စာသား (ရိုးရှင်းအောင် style တွေ ဖယ်ထားပါတယ်)
const demoCode = `import { useState } from 'react';

// Child ၁ - ပစ္စည်းရွေးတဲ့ ခလုတ်များ
function ProductList({ onAdd }) {
  const products = ['ပန်းသီး', 'ငှက်ပျောသီး', 'လိမ္မော်သီး'];

  return (
    <div>
      {products.map((name) => (
        <button key={name} onClick={() => onAdd(name)}>
          + {name}
        </button>
      ))}
    </div>
  );
}

// Child ၂ - ခြင်းတောင်းထဲက ပစ္စည်းများကို ပြတာ
function CartSummary({ items }) {
  return (
    <div>
      <p>ခြင်းတောင်းထဲမှာ: {items.length} ခု</p>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

// Parent - state ကို ဒီမှာ ထားတယ်
function Shop() {
  const [cart, setCart] = useState([]);

  const handleAdd = (name) => {
    setCart([...cart, name]);
  };

  return (
    <div>
      <ProductList onAdd={handleAdd} />
      <CartSummary items={cart} />
    </div>
  );
}`;

// ---------- အောက်က ကုဒ်တွေက နမူနာကို တကယ်ပြဖို့ပါ ----------

function ProductList({ onAdd }) {
  const products = ['ပန်းသီး', 'ငှက်ပျောသီး', 'လိမ္မော်သီး', 'သရက်သီး'];

  return (
    <div className="flex flex-wrap gap-2">
      {products.map((name) => (
        <button
          key={name}
          type="button"
          onClick={() => onAdd(name)}
          className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition cursor-pointer"
        >
          + {name}
        </button>
      ))}
    </div>
  );
}

function CartSummary({ items, onClear }) {
  return (
    <div className="p-3 bg-white border border-slate-200 rounded-lg text-sm space-y-2">
      <p className="font-semibold text-slate-800">
        🛒 ခြင်းတောင်းထဲမှာ:{' '}
        <span className="text-blue-600">{items.length}</span> ခု
      </p>
      {items.length === 0 ? (
        <p className="text-xs text-slate-400">ဘာမှ မရှိသေးပါ</p>
      ) : (
        <ul className="list-disc list-inside text-slate-700 text-xs space-y-0.5">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
      {items.length > 0 && (
        <button
          type="button"
          onClick={onClear}
          className="text-xs text-red-500 hover:text-red-700 font-semibold cursor-pointer"
        >
          အားလုံး ဖျက်ရန် ✕
        </button>
      )}
    </div>
  );
}

function ShopDemo() {
  const [cart, setCart] = useState([]);

  const handleAdd = (name) => {
    setCart([...cart, name]);
  };

  return (
    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
      <ProductList onAdd={handleAdd} />
      <CartSummary items={cart} onClear={() => setCart([])} />
    </div>
  );
}

export default function Lesson4() {
  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
          Beginner Level (အခြေခံအဆင့်)
        </span>
        <h2 className="text-2xl font-bold text-slate-900 mt-2">
          Lesson 4: Lifting State Up
        </h2>
        <p className="text-slate-600 text-sm mt-1">
          Component နှစ်ခုက data တူတူ သုံးချင်ရင် ဘယ်လိုလုပ်မလဲ။
        </p>
      </div>

      {/* ၁။ ပြဿနာ */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-slate-900">၁။ ပြဿနာက ဘာလဲ?</h3>
        <p className="text-slate-700 leading-relaxed">
          ဆိုင်တစ်ဆိုင်မှာ <strong>ပစ္စည်းရွေးတဲ့ အပိုင်း</strong> နဲ့{' '}
          <strong>ခြင်းတောင်း အပိုင်း</strong> ဆိုပြီး component ၂ ခု ရှိတယ်ဆိုပါစို့။
          ပစ္စည်းရွေးတဲ့နေရာက နှိပ်လိုက်ရင် ခြင်းတောင်းထဲမှာ ပေါ်လာရမယ်။
        </p>
        <p className="text-slate-700 leading-relaxed">
          ဒါပေမယ့် state ကို component တစ်ခုထဲမှာ ထားရင် ကျန်တစ်ခုက အဲဒီ state ကို မမြင်ရပါဘူး။
          React မှာ component နှစ်ခု တိုက်ရိုက် ပြောလို့ မရပါဘူး။
        </p>
      </div>

      {/* ၂။ အဖြေ */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-slate-900">၂။ အဖြေ - state ကို Parent ဆီ ရွှေ့တင်လိုက်ပါ</h3>
        <p className="text-slate-700 leading-relaxed">
          Component ၂ ခုလုံးရဲ့ <strong>မိဘ (Parent)</strong> component ထဲမှာ state ကို ထားပါ။
          ပြီးရင် ၂ ခုလုံးကို props နဲ့ ပို့ပေးပါ။ ဒါကို{' '}
          <strong>Lifting State Up</strong> လို့ ခေါ်ပါတယ်။
        </p>

        <div className="space-y-2 text-sm">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="font-bold text-slate-800">⬇️ Data ကို အောက်ကို ပို့တာ</span>
            <p className="text-slate-600 mt-1">
              Parent ကနေ Child ဆီ <code className="bg-slate-200 px-1 rounded font-mono">items={'{cart}'}</code> လို့
              props နဲ့ ပို့ပါတယ်။ (Lesson 1 မှာ သင်ခဲ့တဲ့ props ပါပဲ)
            </p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="font-bold text-slate-800">⬆️ ပြောင်းလဲမှုကို အပေါ်ကို ပြန်ပို့တာ</span>
            <p className="text-slate-600 mt-1">
              Child က state ကို တိုက်ရိုက် မပြောင်းနိုင်ပါဘူး။ ဒါကြောင့် Parent က{' '}
              <strong>function</strong> တစ်ခု props နဲ့ ပို့ပေးပြီး၊ Child က အဲဒီ function ကို ခေါ်ပါတယ်။
              (<code className="bg-slate-200 px-1 rounded font-mono">onAdd={'{handleAdd}'}</code>)
            </p>
          </div>
        </div>
      </div>

      {/* ၃။ နမူနာ */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-slate-900">၃။ နမူနာ</h3>
        <p className="text-slate-700 text-sm leading-relaxed">
          ပစ္စည်းခလုတ်ကို နှိပ်ကြည့်ပါ။ <code className="bg-slate-100 px-1 rounded font-mono">ProductList</code> မှာ နှိပ်ပေမယ့်
          <code className="bg-slate-100 px-1 rounded font-mono">CartSummary</code> မှာ ပေါ်လာတာ မြင်ရပါလိမ့်မယ်။
          ဘာလို့လဲဆို state (<code className="bg-slate-100 px-1 rounded font-mono">cart</code>) က Parent မှာ ရှိနေလို့ပါ။
        </p>

        <pre className="p-4 bg-slate-900 text-slate-100 rounded-lg text-sm font-mono overflow-x-auto leading-relaxed">
          {demoCode}
        </pre>

        <ShopDemo />
      </div>

      {/* အနှစ်ချုပ် */}
      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-900 space-y-1">
        <p className="font-bold">📌 မှတ်ထားရမယ့် အချက် ၃ ချက်</p>
        <p>၁။ Component ၂ ခု state တူတူသုံးချင်ရင် state ကို သူတို့ရဲ့ Parent မှာ ထားပါ</p>
        <p>၂။ Data ကို props နဲ့ အောက်ကို ပို့ပါ</p>
        <p>၃။ ပြောင်းချင်ရင် Parent ပို့ပေးတဲ့ function ကို Child က ခေါ်ပါ</p>
      </div>
    </section>
  );
}