import { useReducer } from 'react';

const initialState = { quantity: 1 };

function cartReducer(state, action) {
  switch (action.type) {
    case 'increase':
      return { quantity: state.quantity + 1 };
    case 'decrease':
      return { quantity: Math.max(0, state.quantity - 1) };
    case 'reset':
      return initialState;
    default:
      throw new Error(`Unknown cart action: ${action.type}`);
  }
}

const demoCode = `import { useReducer } from 'react';

const initialState = { quantity: 1 };

// state အဟောင်းနဲ့ action ကိုကြည့်ပြီး state အသစ် ပြန်ပေးမယ်
function cartReducer(state, action) {
  switch (action.type) {
    case 'increase':
      return { quantity: state.quantity + 1 };
    case 'decrease':
      return { quantity: Math.max(0, state.quantity - 1) };
    case 'reset':
      return initialState;
    default:
      throw new Error('Unknown action');
  }
}

function Cart() {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <div>
      <p>ပစ္စည်းအရေအတွက်: {state.quantity}</p>
      <button onClick={() => dispatch({ type: 'decrease' })}>လျှော့မယ်</button>
      <button onClick={() => dispatch({ type: 'increase' })}>တိုးမယ်</button>
      <button onClick={() => dispatch({ type: 'reset' })}>အစပြန်ထားမယ်</button>
    </div>
  );
}`;

function CartDemo() {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-slate-900">ပစ္စည်းအရေအတွက်</p>
          <p className="text-sm text-slate-600">လျှော့လို့ ၀ အောက် မရောက်ပါ</p>
        </div>
        <span className="text-2xl font-bold text-blue-700" aria-live="polite">
          {state.quantity}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => dispatch({ type: 'decrease' })}
          disabled={state.quantity === 0}
          className="px-3.5 py-2 border border-slate-300 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-100 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          − လျှော့မယ်
        </button>
        <button
          type="button"
          onClick={() => dispatch({ type: 'increase' })}
          className="px-3.5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition cursor-pointer"
        >
          + တိုးမယ်
        </button>
        <button
          type="button"
          onClick={() => dispatch({ type: 'reset' })}
          className="px-3.5 py-2 border border-slate-300 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-100 transition cursor-pointer"
        >
          အစပြန်ထားမယ်
        </button>
      </div>
    </div>
  );
}

export default function Lesson11() {
  return (
    <section className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-lime-700 bg-lime-50 px-2.5 py-1 rounded-full">
          Beginner Level (အခြေခံအဆင့်)
        </span>
        <h2 className="text-2xl font-bold text-slate-900 mt-2">Lesson 11: useReducer</h2>
        <p className="text-slate-600 text-sm mt-1">
          Action တွေကနေ state ပြောင်းလဲပုံကို တစ်နေရာတည်းမှာ စီမံမယ်။
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-bold text-slate-900">၁။ ဘယ်အချိန်မှာ သုံးမလဲ?</h3>
        <p className="text-slate-700 leading-relaxed">
          ရိုးရှင်းတဲ့ တန်ဖိုးတစ်ခုကို ပြောင်းဖို့ဆို <code className="bg-slate-100 px-1 rounded font-mono text-sm">useState</code> က
          အဆင်ပြေပါတယ်။ ဒါပေမယ့် state ပြောင်းလဲပုံတွေ များလာတဲ့အခါ ဘယ် action က ဘယ်လိုပြောင်းမလဲဆိုတာ
          တစ်နေရာတည်းမှာ ရှင်းရှင်းလင်းလင်း ထားဖို့ <strong>useReducer</strong> ကို သုံးနိုင်ပါတယ်။
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-bold text-slate-900">၂။ အလုပ်လုပ်ပုံ</h3>
        <div className="grid gap-2 sm:grid-cols-3 text-sm">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <p className="font-bold text-slate-800">state</p>
            <p className="text-slate-600 mt-1">လက်ရှိအခြေအနေ၊ ဥပမာ ပစ္စည်းအရေအတွက်</p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <p className="font-bold text-slate-800">dispatch(action)</p>
            <p className="text-slate-600 mt-1">ဘာလုပ်ချင်လဲဆိုတဲ့ action ကို ပို့တယ်</p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <p className="font-bold text-slate-800">reducer(state, action)</p>
            <p className="text-slate-600 mt-1">state အသစ်ကို တွက်ချက်ပြီး ပြန်ပေးတယ်</p>
          </div>
        </div>
        <p className="text-slate-700 text-sm leading-relaxed">
          Reducer ထဲက state ကို တိုက်ရိုက်မပြင်ဘဲ <strong>state အသစ်ကို return</strong> လုပ်ရပါတယ်။
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-bold text-slate-900">၃။ ကုဒ်နမူနာ</h3>
        <p className="text-slate-700 text-sm leading-relaxed">
          Shopping cart ထဲက ပစ္စည်းအရေအတွက်ကို တိုး၊ လျှော့၊ အစပြန်ထား လုပ်ကြည့်ပါ။
        </p>
        <pre className="p-4 bg-slate-900 text-slate-100 rounded-lg text-sm font-mono overflow-x-auto leading-relaxed">
          {demoCode}
        </pre>
        <CartDemo />
      </div>

      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-900 space-y-1">
        <p className="font-bold">📌 မှတ်ထားရမယ့် အချက် ၃ ချက်</p>
        <p>၁။ useReducer က state နဲ့ state ပြောင်းလဲပုံကို စုစည်းပေးတယ်</p>
        <p>၂။ dispatch(action) နဲ့ လုပ်ဆောင်ချက်ကို reducer ဆီ ပို့တယ်</p>
        <p>၃။ reducer က state အဟောင်းကို မပြင်ဘဲ state အသစ် ပြန်ပေးရတယ်</p>
      </div>
    </section>
  );
}
