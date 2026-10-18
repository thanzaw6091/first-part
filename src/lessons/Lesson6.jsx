    import { useState } from 'react';

// ဒီ lesson မှာ အကြောင်းအရာ တစ်ခုတည်းပဲ သင်ပါမယ် - Form ကို React မှာ ကိုင်တွယ်ခြင်း
// လက်တွေ့ - အကောင့်ဖွင့်တဲ့ (Sign up) form နဲ့ အချက်အလက် စစ်ဆေးခြင်း (Validation)

// ကုဒ်ပြဖို့ စာသား (ရိုးရှင်းအောင် style တွေ ဖယ်ထားပါတယ်)
const demoCode = `import { useState } from 'react';

function SignUpForm() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // ၁။ ရိုက်တိုင်း state ထဲ သိမ်းမယ်
  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  // ၂။ မှန်မမှန် စစ်မယ်
  function validate() {
    const newErrors = {};
    if (form.name.trim() === '') {
      newErrors.name = 'နာမည် ထည့်ပါ';
    }
    if (!form.email.includes('@')) {
      newErrors.email = 'Email မှန်မှန်ကန်ကန် ထည့်ပါ';
    }
    if (form.password.length < 6) {
      newErrors.password = 'Password က အနည်းဆုံး ၆ လုံး ရှိရမယ်';
    }
    return newErrors;
  }

  // ၃။ Submit နှိပ်ရင်
  function handleSubmit(e) {
    e.preventDefault(); // page refresh မဖြစ်အောင် တားမယ်

    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSuccess(true);
      setForm({ name: '', email: '', password: '' });
    } else {
      setSuccess(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} />
      {errors.name && <p>{errors.name}</p>}

      <input name="email" value={form.email} onChange={handleChange} />
      {errors.email && <p>{errors.email}</p>}

      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
      />
      {errors.password && <p>{errors.password}</p>}

      <button type="submit">အကောင့်ဖွင့်မယ်</button>
      {success && <p>အကောင့်ဖွင့်ပြီးပါပြီ ✅</p>}
    </form>
  );
}`;

// ---------- အောက်က ကုဒ်က နမူနာကို တကယ်ပြဖို့ပါ ----------

const emptyForm = { name: '', email: '', password: '' };

const inputClass =
  'w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500';

function SignUpDemo() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function validate() {
    const newErrors = {};
    if (form.name.trim() === '') {
      newErrors.name = 'နာမည် ထည့်ပါ';
    }
    if (!form.email.includes('@')) {
      newErrors.email = 'Email မှန်မှန်ကန်ကန် ထည့်ပါ';
    }
    if (form.password.length < 6) {
      newErrors.password = 'Password က အနည်းဆုံး ၆ လုံး ရှိရမယ်';
    }
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSuccess(true);
      setForm(emptyForm);
    } else {
      setSuccess(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3"
    >
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">နာမည်</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="ဥပမာ - မောင်မောင်"
          className={inputClass}
        />
        {errors.name && <p className="text-xs text-red-600 mt-1">⚠️ {errors.name}</p>}
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">Email</label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="name@example.com"
          className={inputClass}
        />
        {errors.email && <p className="text-xs text-red-600 mt-1">⚠️ {errors.email}</p>}
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">Password</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="အနည်းဆုံး ၆ လုံး"
          className={inputClass}
        />
        {errors.password && <p className="text-xs text-red-600 mt-1">⚠️ {errors.password}</p>}
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition cursor-pointer"
      >
        အကောင့်ဖွင့်မယ်
      </button>

      {success && (
        <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg p-3">
          ✅ အကောင့်ဖွင့်ပြီးပါပြီ!
        </p>
      )}
    </form>
  );
}

export default function Lesson6() {
  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full">
          Beginner Level (အခြေခံအဆင့်)
        </span>
        <h2 className="text-2xl font-bold text-slate-900 mt-2">
          Lesson 6: Form ကိုင်တွယ်ခြင်း
        </h2>
        <p className="text-slate-600 text-sm mt-1">
          အကောင့်ဖွင့်တဲ့ form လုပ်ပြီး ရိုက်ထည့်တာတွေ မှန်မမှန် စစ်ကြည့်ရအောင်။
        </p>
      </div>

      {/* ၁။ ဘာလဲ */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-slate-900">၁။ ဘာကို လုပ်မှာလဲ?</h3>
        <p className="text-slate-700 leading-relaxed">
          Website တိုင်းမှာ form ပါပါတယ် - Login, Sign up, ဆက်သွယ်ရန်၊ ပစ္စည်းမှာတာ။
          Form မှာ user ရိုက်တာကို React က မှတ်ထားဖို့ လိုပါတယ်။ ပြီးရင် Submit နှိပ်တဲ့အခါ{' '}
          <strong>မှန်မမှန် စစ်</strong> ပြီး မှားရင် error ပြရပါမယ်။
        </p>
      </div>

      {/* ၂။ အချက် ၃ ခု */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-slate-900">၂။ သိထားရမယ့် အချက် ၃ ခု</h3>
        <div className="space-y-2 text-sm">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="font-bold text-slate-800">၁။ ရိုက်တာကို state ထဲ သိမ်းတာ</span>
            <p className="text-slate-600 mt-1">
              Input တိုင်းမှာ <code className="bg-slate-200 px-1 rounded font-mono">value</code> နဲ့{' '}
              <code className="bg-slate-200 px-1 rounded font-mono">onChange</code> ကို ထည့်ပါတယ်။
              စာတစ်လုံးရိုက်တိုင်း state ပြောင်းပြီး input ကို state က ထိန်းထားပါတယ်။
            </p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="font-bold text-slate-800">၂။ e.preventDefault()</span>
            <p className="text-slate-600 mt-1">
              Form ကို Submit နှိပ်ရင် browser က page ကို အလိုလို Refresh လုပ်ပါတယ်။
              ဒါကို တားဖို့ <code className="bg-slate-200 px-1 rounded font-mono">e.preventDefault()</code> ကို
              အရင်ဆုံး ခေါ်ရပါတယ်။
            </p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="font-bold text-slate-800">၃။ errors state</span>
            <p className="text-slate-600 mt-1">
              မှားနေတာတွေကို <code className="bg-slate-200 px-1 rounded font-mono">errors</code> ထဲမှာ
              သိမ်းပြီး input အောက်မှာ ပြပါတယ်။ Error မရှိရင် အောင်မြင်တယ်လို့ သတ်မှတ်ပါတယ်။
            </p>
          </div>
        </div>
      </div>

      {/* ၃။ နမူနာ */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-slate-900">၃။ စမ်းကြည့်ပါ</h3>
        <p className="text-slate-700 text-sm leading-relaxed">
          ဘာမှမရိုက်ဘဲ ခလုတ်ကို အရင်နှိပ်ကြည့်ပါ၊ error ၃ ခု ပေါ်ပါမယ်။ ပြီးရင် မှန်အောင် ဖြည့်ပြီး ထပ်နှိပ်ကြည့်ပါ 👇
        </p>

        <pre className="p-4 bg-slate-900 text-slate-100 rounded-lg text-sm font-mono overflow-x-auto leading-relaxed">
          {demoCode}
        </pre>

        <SignUpDemo />
      </div>

      {/* အနှစ်ချုပ် */}
      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-900 space-y-1">
        <p className="font-bold">📌 မှတ်ထားရမယ့် အချက် ၃ ချက်</p>
        <p>၁။ Input တိုင်းမှာ value နဲ့ onChange ထည့်ပြီး state နဲ့ ချိတ်ပါ</p>
        <p>၂။ Submit မှာ e.preventDefault() ကို အရင်ခေါ်ပါ</p>
        <p>၃။ မှားတာတွေကို errors state ထဲ သိမ်းပြီး input အောက်မှာ ပြပါ</p>
      </div>
    </section>
  );
}