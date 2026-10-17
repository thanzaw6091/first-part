import { useState } from 'react';

// ============================================================================
// PART 1: State ဆိုတာဘာလဲ & useState အသုံးပြုပုံ (What is State?)
// ============================================================================
function CounterExample() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-3">
      <p className="text-slate-700 text-sm">
        လက်ရှိ ကလစ်နှိပ်ထားသော အကြိမ်အရေအတွက်:
        <span className="ml-2 px-2.5 py-0.5 bg-blue-600 text-white font-bold rounded-md text-base">
          {count}
        </span>
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setCount(count + 1)}
          className="px-3.5 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition cursor-pointer"
        >
          + ၁ တိုးရန် (Increment)
        </button>
        <button
          type="button"
          onClick={() => setCount(0)}
          className="px-3.5 py-1.5 bg-slate-700 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition cursor-pointer"
        >
          ပြန်လည်သတ်မှတ်ရန် (Reset)
        </button>
      </div>
    </div>
  );
}

function Part1StateBasics() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold text-slate-850">
          အပိုင်း ၁: State ဆိုတာဘာလဲ &amp; useState Hook (What is State?)
        </h3>
        <p className="text-slate-650 mt-1 leading-relaxed">
          <strong>State</strong> ဆိုတာ Component က အချိန်နဲ့အမျှ မှတ်သားထားတဲ့ <strong>ကိုယ်ပိုင် ဒေတာ (Data)</strong> ဖြစ်ပါတယ်။
          ရိုးရိုး JavaScript variable တွေနဲ့ မတူတာက <strong>State တန်ဖိုး ပြောင်းလဲသွားတိုင်း React က UI ကို အလိုအလျောက် ပြန်လည်ဆွဲတင် (Re-render)</strong> ပေးပါတယ်။
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-lg">
          <div className="font-bold text-emerald-900">
            📌 useState ဖွဲ့စည်းပုံ:
          </div>
          <p className="text-emerald-800 text-xs mt-1 leading-relaxed">
            <code className="bg-emerald-100 px-1 rounded font-bold">const [state, setState] = useState(initialValue);</code><br />
            - <code className="bg-emerald-100 px-1 rounded">state</code>: လက်ရှိ တန်ဖိုး<br />
            - <code className="bg-emerald-100 px-1 rounded">setState</code>: တန်ဖိုးအသစ် ပြောင်းပေးမည့် function
          </p>
        </div>
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-lg">
          <div className="font-bold text-emerald-900">
            ⚠️ အရေးကြီးသော စည်းမျဉ်း:
          </div>
          <p className="text-emerald-800 text-xs mt-1 leading-relaxed">
            State ကို <code className="bg-emerald-100 px-1 rounded text-red-600 font-bold">count = count + 1</code> လို့ တိုက်ရိုက် မပြောင်းရပါ။
            အမြဲတမ်း <code className="bg-emerald-100 px-1 rounded font-bold text-emerald-900">setCount(count + 1)</code> လို့ setter function သုံးပြီးမှ ပြောင်းရပါမယ်။
          </p>
        </div>
      </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                ကုဒ်အပြည့်အစုံ (Full Source Code)
              </span>
              <pre className="p-4 bg-slate-900 text-slate-100 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed">
      {`import { useState } from 'react';

      function CounterExample() {
        const [count, setCount] = useState(0);

        return (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-3">
            <p className="text-slate-700 text-sm">
              လက်ရှိ ကလစ်နှိပ်ထားသော အကြိမ်အရေအတွက်:
              <span className="ml-2 px-2.5 py-0.5 bg-blue-600 text-white font-bold rounded-md text-base">
                {count}
              </span>
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setCount(count + 1)}
                className="px-3.5 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                + ၁ တိုးရန် (Increment)
              </button>
              <button
                type="button"
                onClick={() => setCount(0)}
                className="px-3.5 py-1.5 bg-slate-700 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition"
              >
                ပြန်လည်သတ်မှတ်ရန် (Reset)
              </button>
            </div>
          </div>
        );
      }

      export default CounterExample;`}
              </pre>
            </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          လက်တွေ့ မျက်မြင်ရလဒ် (Live Result)
        </span>
        <CounterExample />
      </div>
    </div>
  );
}

// ============================================================================
// PART 2: Event Handling (Click & Change အသုံးပြုပုံ)
// ============================================================================
function Part2EventHandling() {
  const [message, setMessage] = useState('ခလုတ်တစ်ခုခုကို နှိပ်ကြည့်ပါ');

  const handleSayHi = () => {
    setMessage('မင်္ဂလာပါ! ခလုတ်ကို အောင်မြင်စွာ နှိပ်လိုက်ပါပြီ။ 👋');
  };

  const handleAlert = (text) => {
    setMessage(`သင်ရွေးချယ်လိုက်သော မက်ဆေ့ခ်ျ: "${text}"`);
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold text-slate-850">
          အပိုင်း ၂: Event Handling (ခလုတ်နှိပ်ခြင်း &amp; တုံ့ပြန်ခြင်း)
        </h3>
        <p className="text-slate-650 mt-1 leading-relaxed">
          React မှာ HTML လိုမျိုး <code className="bg-slate-100 px-1 rounded font-mono text-xs">onclick</code> အစား CamelCase ပုံစံ <strong><code className="bg-slate-100 px-1 rounded font-mono text-xs font-bold">onClick</code></strong> လို့ ရေးသားရပါတယ်။
          Function ကို လက်သည်းကွင်းမပါဘဲ လှမ်းပေးရပါမယ်။
        </p>
      </div>

      <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg text-sm text-indigo-950">
        💡 <strong>Event Handler ရေးသားနည်း ၂ မျိုး:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1.5 text-indigo-900 text-xs leading-relaxed">
          <li>
            <strong>Argument မပါလျှင်:</strong> <code className="bg-indigo-100 px-1 rounded font-bold">onClick={'{handleSayHi}'}</code> (လက်သည်းကွင်း <code className="line-through">()</code> မထည့်ရပါ၊ ထည့်လျှင် ချက်ချင်း run သွားပါမည်)
          </li>
          <li>
            <strong>Argument ပေးပို့လိုလျှင်:</strong> Arrow function သုံးပါ - <code className="bg-indigo-100 px-1 rounded font-bold">onClick={'() => handleAlert("မင်္ဂလာပါ")'}</code>
          </li>
        </ul>
      </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                ကုဒ်အပြည့်အစုံ (Full Source Code)
              </span>
              <pre className="p-4 bg-slate-900 text-slate-100 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed">
      {`import { useState } from 'react';

      function EventDemo() {
        const [message, setMessage] = useState('ခလုတ်တစ်ခုခုကို နှိပ်ကြည့်ပါ');

        // ၁။ Argument မပါသော Event Handler
        const handleSayHi = () => {
          setMessage('မင်္ဂလာပါ! ခလုတ်ကို အောင်မြင်စွာ နှိပ်လိုက်ပါပြီ။ 👋');
        };

        // ၂။ Argument ပါသော Event Handler
        const handleAlert = (text) => {
          setMessage(\`သင်ရွေးချယ်လိုက်သော မက်ဆေ့ခ်ျ: "\${text}"\`);
        };

        return (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
            <div className="p-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-700">
              ရလဒ်ပြသချက်: <span className="font-semibold text-blue-600">{message}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {/* Argument မပါလျှင် () မပါဘဲ function reference သာ ပေးရပါသည် */}
              <button
                type="button"
                onClick={handleSayHi}
                className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-md hover:bg-blue-700 transition cursor-pointer"
              >
                ရိုးရိုး ခလုတ်နှိပ်ရန်
              </button>

              {/* Argument ပေးပို့လိုလျှင် Arrow Function () => fn(...) ဖြင့် ပေးရပါသည် */}
              <button
                type="button"
                onClick={() => handleAlert('React လေ့လာရတာ အရမ်းလွယ်ကူတယ်')}
                className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-medium rounded-md hover:bg-emerald-700 transition cursor-pointer"
              >
                Argument ပေးပို့၍ နှိပ်ရန်
              </button>

              <button
                type="button"
                onClick={() => setMessage('မူလအခြေအနေသို့ ပြန်ရောက်ပါပြီ')}
                className="px-3 py-1.5 bg-slate-600 text-white text-xs font-medium rounded-md hover:bg-slate-700 transition cursor-pointer"
              >
                မူလအတိုင်း ပြန်ထားရန်
              </button>
            </div>
          </div>
        );
      }

      export default EventDemo;`}
              </pre>
            </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          လက်တွေ့ မျက်မြင်ရလဒ် (Live Result)
        </span>
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
          <div className="p-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-700">
            ရလဒ်ပြသချက်: <span className="font-semibold text-blue-600">{message}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleSayHi}
              className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-md hover:bg-blue-700 transition cursor-pointer"
            >
              ရိုးရိုး ခလုတ်နှိပ်ရန်
            </button>
            <button
              type="button"
              onClick={() => handleAlert('React လေ့လာရတာ အရမ်းလွယ်ကူတယ်')}
              className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-medium rounded-md hover:bg-emerald-700 transition cursor-pointer"
            >
              Argument ပေးပို့၍ နှိပ်ရန်
            </button>
            <button
              type="button"
              onClick={() => setMessage('မူလအခြေအနေသို့ ပြန်ရောက်ပါပြီ')}
              className="px-3 py-1.5 bg-slate-600 text-white text-xs font-medium rounded-md hover:bg-slate-700 transition cursor-pointer"
            >
              မူလအတိုင်း ပြန်ထားရန်
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PART 3: Form Input & Controlled Components
// ============================================================================
function Part3FormInputs() {
  const [userName, setUserName] = useState('');
  const [selectedRole, setSelectedRole] = useState('Frontend Developer');

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold text-slate-850">
          အပိုင်း ၃: Form Input ဖတ်ရှုခြင်း (Controlled Components)
        </h3>
        <p className="text-slate-650 mt-1 leading-relaxed">
          Input box တွေထဲမှာ user စာရိုက်ထည့်တဲ့အခါ ချက်ချင်း သိရှိနိုင်ဖို့ <strong>Controlled Component</strong> ပုံစံကို သုံးပါတယ်။
          Input ရဲ့ <code className="bg-slate-100 px-1 rounded font-mono text-xs font-bold">value</code> ကို State နဲ့ ချိတ်ဆက်ပြီး၊ <code className="bg-slate-100 px-1 rounded font-mono text-xs font-bold">onChange</code> event ဖြစ်တိုင်း State ကို update လုပ်ပေးပါတယ်။
        </p>
      </div>

      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-950">
        📝 <strong>အရေးကြီးသော ပုံစံ (Formula):</strong>
        <p className="mt-1 font-mono text-xs text-amber-900 bg-amber-100/60 p-2 rounded">
          &lt;input value={'{text}'} onChange={'{'} (e) =&gt; setText(e.target.value) {'}'} /&gt;
        </p>
        <p className="mt-2 text-xs text-amber-800">
          <code className="font-bold">e.target.value</code> ဆိုတာ user ရိုက်ထည့်လိုက်တဲ့ လက်ရှိ စာသားအသစ် ဖြစ်ပါတယ်။
        </p>
      </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                ကုဒ်အပြည့်အစုံ (Full Source Code)
              </span>
              <pre className="p-4 bg-slate-900 text-slate-100 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed">
      {`import { useState } from 'react';

      function FormDemo() {
        const [userName, setUserName] = useState('');
        const [selectedRole, setSelectedRole] = useState('Frontend Developer');

        return (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-4">
            <div className="space-y-3 max-w-md">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  သင့်အမည် ရိုက်ထည့်ပါ:
                </label>
                {/* Controlled Input: value ကို state ချိတ်ပြီး onChange ဖြင့် setState လုပ်ပါသည် */}
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="ဥပမာ - မောင်မောင်"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  အလုပ်အကိုင် ရွေးချယ်ပါ:
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="UI/UX Designer">UI/UX Designer</option>
                  <option value="Fullstack Engineer">Fullstack Engineer</option>
                </select>
              </div>
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-lg text-sm">
              <span className="text-xs text-slate-500 block">အစစ်အမှန်အချိန်တွင် ထွက်ပေါ်လာသော ရလဒ်:</span>
              <p className="font-semibold text-slate-800 mt-1">
                {userName ? (
                  <span>
                    👋 မင်္ဂလာပါ <strong>{userName}</strong>! ရာထူး: <span className="text-blue-600 font-bold">{selectedRole}</span>
                  </span>
                ) : (
                  <span className="text-slate-400 italic">အပေါ်က အကွက်ထဲတွင် နာမည်ရိုက်ထည့်ကြည့်ပါ...</span>
                )}
              </p>
            </div>
          </div>
        );
      }

      export default FormDemo;`}
              </pre>
            </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          လက်တွေ့ မျက်မြင်ရလဒ် (Live Result)
        </span>
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-4">
          <div className="space-y-3 max-w-md">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                သင့်အမည် ရိုက်ထည့်ပါ:
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="ဥပမာ - မောင်မောင်"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                အလုပ်အကိုင် ရွေးချယ်ပါ:
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="UI/UX Designer">UI/UX Designer</option>
                <option value="Fullstack Engineer">Fullstack Engineer</option>
              </select>
            </div>
          </div>

          <div className="p-3 bg-white border border-slate-200 rounded-lg text-sm">
            <span className="text-xs text-slate-500 block">အစစ်အမှန်အချိန်တွင် ထွက်ပေါ်လာသော ရလဒ်:</span>
            <p className="font-semibold text-slate-800 mt-1">
              {userName ? (
                <span>
                  👋 မင်္ဂလာပါ <strong>{userName}</strong>! ရာထူး: <span className="text-blue-600 font-bold">{selectedRole}</span>
                </span>
              ) : (
                <span className="text-slate-400 italic">အပေါ်က အကွက်ထဲတွင် နာမည်ရိုက်ထည့်ကြည့်ပါ...</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PART 4: Boolean State (Toggle & Modal & Dark Mode နမူနာ)
// ============================================================================
function Part4ToggleState() {
  const [isOn, setIsOn] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold text-slate-850">
          အပိုင်း ၄: အဖွင့်အပိတ် (Boolean Toggle State)
        </h3>
        <p className="text-slate-650 mt-1 leading-relaxed">
          အဖွင့်/အပိတ် (On/Off)၊ ပြသ/ဖျောက်ကွယ် (Show/Hide) စတဲ့ လုပ်ဆောင်ချက်တွေအတွက် <code className="bg-slate-100 px-1 rounded font-mono text-xs font-bold">true / false</code> Boolean State ကို အသုံးများပါတယ်။
          တန်ဖိုးကို ဆန့်ကျင်ဘက်သို့ ပြောင်းချင်ရင် <strong><code className="bg-slate-100 px-1 rounded font-mono text-xs font-bold">!currentState</code></strong> (Not operator) ကို သုံးပါတယ်။
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
          <span className="font-bold text-slate-800">Toggle ပုံစံရေးနည်း:</span>
          <p className="text-slate-600 text-xs mt-1 font-mono">
            setIsOn(!isOn)
          </p>
          <p className="text-slate-500 text-xs mt-1">
            (true ဖြစ်နေလျှင် false သို့၊ false ဖြစ်နေလျှင် true သို့ ပြောင်းပေးပါသည်)
          </p>
        </div>
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
          <span className="font-bold text-slate-800">အသုံးဝင်သော နေရာများ:</span>
          <p className="text-slate-600 text-xs mt-1">
            Dropdown menu ဖွင့်/ပိတ်၊ Modal popup ပြသ/ဖျောက်၊ Dark mode ဖွင့်/ပိတ် အစရှိသည်တို့တွင် အသုံးပြုပါတယ်။
          </p>
        </div>
      </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                ကုဒ်အပြည့်အစုံ (Full Source Code)
              </span>
              <pre className="p-4 bg-slate-900 text-slate-100 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed">
      {`import { useState } from 'react';

      function ToggleDemo() {
        const [isOn, setIsOn] = useState(false);
        const [showDetails, setShowDetails] = useState(false);

        return (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-4">
            {/* Demo 1: Switch Light */}
            <div className="p-3 bg-white border border-slate-200 rounded-lg flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-500 block">မီးခလုတ်နမူနာ:</span>
                <span className={\`font-bold text-sm \${isOn ? 'text-amber-500' : 'text-slate-400'}\`}>
                  {isOn ? '💡 မီးဖွင့်ထားပါသည် (ON)' : '🌑 မီးပိတ်ထားပါသည် (OFF)'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsOn(!isOn)}
                className={\`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer \${
                  isOn ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-700'
                }\`}
              >
                {isOn ? 'မီးပိတ်ရန်' : 'မီးဖွင့်ရန်'}
              </button>
            </div>

            {/* Demo 2: Accordion Show/Hide */}
            <div className="p-3 bg-white border border-slate-200 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-800">
                  React လေ့လာရန် အကြံပြုချက်များ
                </span>
                <button
                  type="button"
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-xs text-blue-600 font-semibold hover:underline cursor-pointer"
                >
                  {showDetails ? '▲ ပြန်ပိတ်ရန်' : '▼ အသေးစိတ်ကြည့်ရန်'}
                </button>
              </div>
              {/* showDetails မှန်မှသာ အောက်ပါစာသားကို render လုပ်ပါသည် */}
              {showDetails && (
                <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1">
                  <p>၁။ Component နှင့် JSX ကို အရင်ကျွမ်းကျင်အောင် လေ့ကျင့်ပါ။</p>
                  <p>၂။ useState ၏ data စီးဆင်းမှုကို မျက်မြင်လက်တွေ့ နားလည်အောင် ရေးကြည့်ပါ။</p>
                  <p>၃။ အမြဲတမ်း error message များကို သေချာဖတ်ရှုပါ။</p>
                </div>
              )}
            </div>
          </div>
        );
      }

      export default ToggleDemo;`}
              </pre>
            </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          လက်တွေ့ မျက်မြင်ရလဒ် (Live Result)
        </span>
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-4">
          {/* Demo 1: Switch Light */}
          <div className="p-3 bg-white border border-slate-200 rounded-lg flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 block">မီးခလုတ်နမူနာ:</span>
              <span className={`font-bold text-sm ${isOn ? 'text-amber-500' : 'text-slate-400'}`}>
                {isOn ? '💡 မီးဖွင့်ထားပါသည် (ON)' : '🌑 မီးပိတ်ထားပါသည် (OFF)'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsOn(!isOn)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                isOn ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {isOn ? 'မီးပိတ်ရန်' : 'မီးဖွင့်ရန်'}
            </button>
          </div>

          {/* Demo 2: Accordion Show/Hide */}
          <div className="p-3 bg-white border border-slate-200 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-800">
                React လေ့လာရန် အကြံပြုချက်များ
              </span>
              <button
                type="button"
                onClick={() => setShowDetails(!showDetails)}
                className="text-xs text-blue-600 font-semibold hover:underline cursor-pointer"
              >
                {showDetails ? '▲ ပြန်ပိတ်ရန်' : '▼ အသေးစိတ်ကြည့်ရန်'}
              </button>
            </div>
            {showDetails && (
              <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1">
                <p>၁။ Component နှင့် JSX ကို အရင်ကျွမ်းကျင်အောင် လေ့ကျင့်ပါ။</p>
                <p>၂။ useState ၏ data စီးဆင်းမှုကို မျက်မြင်လက်တွေ့ နားလည်အောင် ရေးကြည့်ပါ။</p>
                <p>၃။ အမြဲတမ်း error message များကို သေချာဖတ်ရှုပါ။</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PART 5: Array & Object State (စာရင်းများ ထည့်သွင်း/ဖျက်ပစ်ခြင်း)
// ============================================================================
function Part5ArrayState() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'HTML & CSS အခြေခံ လေ့ကျင့်ရန်' },
    { id: 2, text: 'React Components ရေးဆွဲရန်' },
  ]);
  const [inputText, setInputText] = useState('');

  const handleAdd = () => {
    if (!inputText.trim()) return;
    const newTodo = { id: Date.now(), text: inputText };
    // Array ထဲ အသစ်ထည့်လျှင် Spread Operator (...) ကို သုံးရပါသည်
    setTodos([...todos, newTodo]);
    setInputText('');
  };

  const handleDelete = (id) => {
    // Array ထဲမှ ဖျက်ထုတ်လျှင် .filter() ကို သုံးရပါသည်
    setTodos(todos.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold text-slate-850">
          အပိုင်း ၅: Array State (စာရင်းများ ထည့်/ဖျက် ပြုလုပ်ခြင်း)
        </h3>
        <p className="text-slate-650 mt-1 leading-relaxed">
          React မှာ Array ဒါမှမဟုတ် Object State ကို ပြင်ဆင်တဲ့အခါ <strong>မူလ data ကို တိုက်ရိုက် မပြောင်းရ (Immutable)</strong> ပါဘူး။
          <code className="bg-slate-100 px-1 rounded font-mono text-xs font-bold text-red-600">todos.push()</code> လို့ မရေးရဘဲ အသစ်တစ်ခု ပြန်တည်ဆောက်ပြီး ပေးရပါတယ်။
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
          <span className="font-bold text-emerald-900">၁။ စာရင်း အသစ်ထည့်ခြင်း (Add):</span>
          <p className="text-emerald-800 text-xs mt-1 font-mono">
            setTodos([...todos, newItem]);
          </p>
          <p className="text-emerald-700 text-xs mt-1">
            Spread operator (<code className="font-bold">...</code>) သုံးပြီး ယခင်စာရင်းဟောင်းများနောက်တွင် အသစ်ထပ်ပေါင်းပါတယ်။
          </p>
        </div>
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
          <span className="font-bold text-emerald-900">၂။ စာရင်း ဖျက်ပစ်ခြင်း (Delete):</span>
          <p className="text-emerald-800 text-xs mt-1 font-mono">
            setTodos(todos.filter(t =&gt; t.id !== id));
          </p>
          <p className="text-emerald-700 text-xs mt-1">
            <code className="font-bold">.filter()</code> သုံးပြီး ဖျက်ချင်သော ID မဟုတ်သည့် ကျန် item များကိုသာ စစ်ထုတ်ယူပါတယ်။
          </p>
        </div>
      </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                ကုဒ်အပြည့်အစုံ (Full Source Code)
              </span>
              <pre className="p-4 bg-slate-900 text-slate-100 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed">
      {`import { useState } from 'react';

      function TodoDemo() {
        const [todos, setTodos] = useState([
          { id: 1, text: 'HTML & CSS အခြေခံ လေ့ကျင့်ရန်' },
          { id: 2, text: 'React Components ရေးဆွဲရန်' },
        ]);
        const [inputText, setInputText] = useState('');

        // ၁။ အသစ်ထည့်ခြင်း: Spread operator (...) သုံးပြီး array အသစ် ပြန်တည်ဆောက်ပါသည်
        const handleAdd = () => {
          if (!inputText.trim()) return;
          const newTodo = { id: Date.now(), text: inputText };
          setTodos([...todos, newTodo]);
          setInputText('');
        };

        // ၂။ ဖျက်ထုတ်ခြင်း: .filter() သုံးပြီး ID တူတာကို ဖယ်ထုတ်ပါသည်
        const handleDelete = (id) => {
          setTodos(todos.filter((item) => item.id !== id));
        };

        return (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="လုပ်ဆောင်ရမည့် အလုပ် အသစ်ရိုက်ထည့်ပါ..."
                className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={handleAdd}
                className="px-3.5 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition cursor-pointer"
              >
                + ထည့်ရန်
              </button>
            </div>

            <ul className="divide-y divide-slate-200 bg-white rounded-lg border border-slate-200 overflow-hidden">
              {todos.length === 0 ? (
                <li className="p-3 text-center text-xs text-slate-400">စာရင်းတွင် ဘာမှ မရှိသေးပါ</li>
              ) : (
                todos.map((item) => (
                  <li key={item.id} className="p-2.5 flex items-center justify-between text-xs">
                    <span className="text-slate-800 font-medium">{item.text}</span>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 hover:text-red-700 font-semibold cursor-pointer px-2 py-0.5"
                    >
                      ဖျက်ရန် ✕
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        );
      }

      export default TodoDemo;`}
              </pre>
            </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          လက်တွေ့ မျက်မြင်ရလဒ် (Live Result - Todo List)
        </span>
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="လုပ်ဆောင်ရမည့် အလုပ် အသစ်ရိုက်ထည့်ပါ..."
              className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleAdd}
              className="px-3.5 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition cursor-pointer"
            >
              + ထည့်ရန်
            </button>
          </div>

          <ul className="divide-y divide-slate-200 bg-white rounded-lg border border-slate-200 overflow-hidden">
            {todos.length === 0 ? (
              <li className="p-3 text-center text-xs text-slate-400">စာရင်းတွင် ဘာမှ မရှိသေးပါ</li>
            ) : (
              todos.map((item) => (
                <li key={item.id} className="p-2.5 flex items-center justify-between text-xs">
                  <span className="text-slate-850 font-medium">{item.text}</span>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 hover:text-red-700 font-semibold cursor-pointer px-2 py-0.5"
                  >
                    ဖျက်ရန် ✕
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PART 6: လက်တွေ့ ပေါင်းစပ်လေ့ကျင့်ခန်း (Interactive Mini Project & Summary)
// ============================================================================
function Part6Practice() {
  const [likes, setLikes] = useState(12);
  const [isLiked, setIsLiked] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState(['အရမ်းကောင်းတဲ့ သင်ခန်းစာပါ 👍']);

  const handleLikeToggle = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  const handleAddComment = () => {
    if (!commentInput.trim()) return;
    setComments([...comments, commentInput]);
    setCommentInput('');
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold text-slate-850">
          အပိုင်း ၆: လက်တွေ့လေ့ကျင့်ခန်း &amp; အနှစ်ချုပ် (Mini Post Project &amp; Summary)
        </h3>
        <p className="text-slate-650 mt-1 leading-relaxed">
          သင်ယူခဲ့သမျှ <strong>Number State</strong> (Like count), <strong>Boolean State</strong> (Like/Unlike), <strong>Input Handling</strong> နှင့် <strong>Array State</strong> (Comments) တို့ကို ပေါင်းစပ်ထားသော Social Post နမူနာ ဖြစ်ပါတယ်။
        </p>
      </div>

      <div className="p-4 bg-slate-900 text-slate-100 rounded-lg text-xs font-mono space-y-2">
        <div className="text-emerald-400 font-bold">// Lesson 2 အဓိက မှတ်သားရမည့် အချက်များ (Summary):</div>
        <div className="space-y-1 text-slate-300">
          <p>✔ State = Component ၏ ကိုယ်ပိုင် ဒေတာဖြစ်ပြီး ပြောင်းလဲတိုင်း UI ကို Re-render လုပ်ပေးသည်</p>
          <p>✔ useState = [value, setValue] ပုံစံဖြင့် အမြဲတမ်း setter function ဖြင့်သာ တန်ဖိုးပြောင်းရမည်</p>
          <p>✔ onClick = Event handler function များကို CamelCase ဖြင့် ရေးသားရသည်</p>
          <p>✔ Inputs = value နှင့် onChange ပေါင်းစပ်ပြီး e.target.value ဖြင့် State သို့ သိမ်းရသည်</p>
          <p>✔ Arrays = မူလ array ကို မပြောင်းဘဲ Spread ([...prev, new]) နှင့် Filter ဖြင့် ပြုပြင်ရသည်</p>
        </div>
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          ကုဒ်အပြည့်အစုံ (Full Source Code)
        </span>
        <pre className="p-4 bg-slate-900 text-slate-100 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed">
{`import { useState } from 'react';

function SocialPostDemo() {
  const [likes, setLikes] = useState(12);
  const [isLiked, setIsLiked] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState(['အရမ်းကောင်းတဲ့ သင်ခန်းစာပါ 👍']);

  const handleLikeToggle = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  const handleAddComment = () => {
    if (!commentInput.trim()) return;
    setComments([...comments, commentInput]);
    setCommentInput('');
  };

  return (
    <div className="p-4 bg-white border border-slate-200 rounded-lg space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
          KZ
        </div>
        <div>
          <h5 className="font-bold text-xs text-slate-900">ကိုဇော် (React Developer)</h5>
          <p className="text-[10px] text-slate-400">လွန်ခဲ့သော ၁ နာရီက</p>
        </div>
      </div>

      <p className="text-xs text-slate-700 leading-relaxed">
        React မှာ State & Events တွေကို ကျွမ်းကျင်သွားရင် အပြန်အလှန်တုံ့ပြန်မှုရှိတဲ့ ခေတ်မီ Website တွေကို လွယ်ကူစွာ ဖန်တီးနိုင်ပါပြီ! 🚀
      </p>

      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <button
          type="button"
          onClick={handleLikeToggle}
          className={\`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition cursor-pointer \${
            isLiked
              ? 'bg-rose-50 text-rose-600 border border-rose-200'
              : 'text-slate-600 hover:bg-slate-100'
          }\`}
        >
          <span>{isLiked ? '❤️' : '🤍'}</span>
          <span>{likes} Likes</span>
        </button>
        <span className="text-xs text-slate-500">{comments.length} Comments</span>
      </div>

      <div className="pt-2 border-t border-slate-100 space-y-2">
        <div className="space-y-1.5">
          {comments.map((c, i) => (
            <div key={i} className="p-2 bg-slate-50 rounded text-xs text-slate-700">
              💬 {c}
            </div>
          ))}
        </div>

        <div className="flex gap-2 pt-1">
          <input
            type="text"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="မှတ်ချက် ရေးသားရန်..."
            className="flex-1 px-2.5 py-1 text-xs border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={handleAddComment}
            className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-md hover:bg-blue-700 transition cursor-pointer"
          >
            ပို့ရန်
          </button>
        </div>
      </div>
    </div>
  );
}

export default SocialPostDemo;`}
        </pre>
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          လက်တွေ့ ပေါင်းစပ်ဖန်တီးထားသော Post Card
        </span>
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
          <div className="p-4 bg-white border border-slate-200 rounded-lg space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                KZ
              </div>
              <div>
                <h5 className="font-bold text-xs text-slate-900">ကိုဇော် (React Developer)</h5>
                <p className="text-[10px] text-slate-400">လွန်ခဲ့သော ၁ နာရီက</p>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              React မှာ State &amp; Events တွေကို ကျွမ်းကျင်သွားရင် အပြန်အလှန်တုံ့ပြန်မှုရှိတဲ့ ခေတ်မီ Website တွေကို လွယ်ကူစွာ ဖန်တီးနိုင်ပါပြီ! 🚀
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={handleLikeToggle}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                  isLiked
                    ? 'bg-rose-50 text-rose-600 border border-rose-200'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>{isLiked ? '❤️' : '🤍'}</span>
                <span>{likes} Likes</span>
              </button>
              <span className="text-xs text-slate-500">{comments.length} Comments</span>
            </div>

            {/* Comments List */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <div className="space-y-1.5">
                {comments.map((c, i) => (
                  <div key={i} className="p-2 bg-slate-50 rounded text-xs text-slate-700">
                    💬 {c}
                  </div>
                ))}
              </div>

              {/* Add Comment */}
              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  placeholder="မှတ်ချက် ရေးသားရန်..."
                  className="flex-1 px-2.5 py-1 text-xs border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={handleAddComment}
                  className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-md hover:bg-blue-700 transition cursor-pointer"
                >
                  ပို့ရန်
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN LESSON 2 WRAPPER (Tabs to navigate clean, isolated parts)
// ============================================================================
const parts = [
  { id: 1, label: 'အပိုင်း ၁: State ဆိုတာဘာလဲ', component: Part1StateBasics },
  { id: 2, label: 'အပိုင်း ၂: Event Handling', component: Part2EventHandling },
  { id: 3, label: 'အပိုင်း ၃: Form Input ဖတ်နည်း', component: Part3FormInputs },
  { id: 4, label: 'အပိုင်း ၄: Toggle State', component: Part4ToggleState },
  { id: 5, label: 'အပိုင်း ၅: Array State', component: Part5ArrayState },
  { id: 6, label: 'အပိုင်း ၆: လေ့ကျင့်ခန်း & အနှစ်ချုပ်', component: Part6Practice },
];

export default function Lesson2() {
  const [activePart, setActivePart] = useState(0);
  const CurrentPart = parts[activePart].component;

  return (
    <section className="space-y-6">
      {/* Lesson Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
            Beginner Level (အခြေခံအဆင့်)
          </span>
          <span className="text-xs text-slate-400">•</span>
          <span className="text-xs text-slate-500">
            အပိုင်း {activePart + 1} / {parts.length}
          </span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mt-2">
          Lesson 2: State &amp; Events (အပြန်အလှန် တုံ့ပြန်မှုများ)
        </h2>
        <p className="text-slate-600 text-sm mt-1">
          Website များကို dynamic ဖြစ်စေပြီး user များနှင့် တုံ့ပြန်နိုင်စေသော React ၏ အဓိက အသက်သွေးကြောဖြစ်သည့် State နှင့် Event များကို တစ်ဆင့်ချင်းစီ လေ့လာပါ။
        </p>
      </div>

      {/* Part Navigation Pills */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-xl">
        {parts.map((part, index) => {
          const isActive = activePart === index;
          return (
            <button
              key={part.id}
              type="button"
              onClick={() => setActivePart(index)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                isActive
                  ? 'bg-white text-emerald-600 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              {part.label}
            </button>
          );
        })}
      </div>

      {/* Active Part Content */}
      <div className="pt-2">
        <CurrentPart />
      </div>

      {/* Footer Navigation between parts */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200 text-sm">
        <button
          type="button"
          disabled={activePart === 0}
          onClick={() => setActivePart(activePart - 1)}
          className="px-3.5 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          ← ရှေ့အပိုင်းသို့
        </button>

        <span className="text-xs font-medium text-slate-500">
          {parts[activePart].label}
        </span>

        <button
          type="button"
          disabled={activePart === parts.length - 1}
          onClick={() => setActivePart(activePart + 1)}
          className="px-3.5 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          နောက်အပိုင်းသို့ →
        </button>
      </div>
    </section>
  );
}
