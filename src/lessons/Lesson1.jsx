import { useState } from 'react';

// ============================================================================
// PART 1: Component ဆိုတာဘာလဲ? (What is a Component?)
// ============================================================================
function SimpleGreeting() {
  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-900 font-medium">
      👋 မင်္ဂလာပါ! ကျွန်တော်က React Component တစ်ခုဖြစ်ပါတယ်။
    </div>
  );
}

function Part1Component() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold text-slate-850">
          အပိုင်း ၁: Component ဆိုတာဘာလဲ? (What is a Component?)
        </h3>
        <p className="text-slate-650 mt-1 leading-relaxed">
          React app တစ်ခုလုံးကို <strong>Component</strong> လို့ခေါ်တဲ့ အပိုင်းအစလေးတွေနဲ့ တည်ဆောက်ထားပါတယ်။
          အလွယ်ပြောရရင် Component ဆိုတာ <strong>JSX (HTML ပုံစံ) ပြန်ပေးတဲ့ ရိုးရိုး JavaScript function</strong> တစ်ခုပဲ ဖြစ်ပါတယ်။
        </p>
      </div>

      {/* အခြေခံ စည်းမျဉ်း ၂ ချက် */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-lg">
          <div className="font-bold text-emerald-900">
            📌 စည်းမျဉ်း ၁: နာမည်ကို စာလုံးကြီး (Capital letter) နဲ့ စပါ
          </div>
          <p className="text-emerald-800 text-xs mt-1 leading-relaxed">
            Component နာမည်ကို <code className="bg-emerald-100 px-1 rounded font-bold">Profile</code> လို့ ရေးရပါမယ်။
            <code className="bg-emerald-100 px-1 rounded text-red-600">profile</code> လို့ စာလုံးသေးနဲ့ မရေးရပါဘူး။
            ဒါမှ React က ရိုးရိုး HTML tag (ဥပမာ <code className="bg-emerald-100 px-1 rounded">&lt;div&gt;</code>) နဲ့ ခွဲခြားသိနိုင်မှာ ဖြစ်ပါတယ်။
          </p>
        </div>
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-lg">
          <div className="font-bold text-emerald-900">
            📌 စည်းမျဉ်း ၂: JSX markup ကို return ပြန်ပေးရပါမယ်
          </div>
          <p className="text-emerald-800 text-xs mt-1 leading-relaxed">
            Function ထဲကနေ screen ပေါ်မှာ ပြချင်တဲ့ UI (JSX) ကို <code className="bg-emerald-100 px-1 rounded font-bold">return</code> လုပ်ပေးရပါမယ်။
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          ကုဒ်အပြည့်အစုံ (Full Source Code)
        </span>
        <pre className="p-4 bg-slate-900 text-slate-100 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed">
{`function Welcome() {
  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-900 font-medium">
      👋 မင်္ဂလာပါ! ကျွန်တော်က React Component ဖြစ်ပါတယ်။
    </div>
  );
}

export default Welcome;`}
        </pre>
      </div>

      {/* လက်တွေ့ အဖြေ */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          လက်တွေ့ မျက်မြင်ရလဒ် (Live Result)
        </span>
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
          <SimpleGreeting />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PART 2: JSX ဆိုတာဘာလဲ & လိုက်နာရမည့် စည်းမျဉ်းများ (JSX Syntax & Rules)
// ============================================================================
function Part2JSX() {
  const learnerName = 'မောင်မောင်';
  const currentYear = 2026;
  const price = 5000;
  const quantity = 3;

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold text-slate-850">
          အပိုင်း ၂: JSX ဆိုတာဘာလဲ &amp; စည်းမျဉ်းများ (JSX Syntax)
        </h3>
        <p className="text-slate-650 mt-1 leading-relaxed">
          <strong>JSX</strong> ဆိုတာ JavaScript ထဲမှာ HTML လိုမျိုး ရေးလို့ရအောင် ပြုလုပ်ထားတဲ့ syntax ဖြစ်ပါတယ်။
          HTML နဲ့ ဆင်တူပေမယ့် JavaScript ဖြစ်တဲ့အတွက် အောက်ပါ <strong>စည်းမျဉ်း ၄ ချက်</strong> ကို သိထားရပါမယ်။
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
          <span className="font-bold text-slate-800">၁။ class အစား className သုံးပါ</span>
          <p className="text-slate-600 text-xs mt-1">
            JavaScript မှာ <code className="bg-slate-200 px-1 rounded">class</code> က reserved keyword ဖြစ်နေတဲ့အတွက် JSX မှာ <code className="bg-slate-200 px-1 rounded font-bold">className</code> လို့ ရေးရပါတယ်။
          </p>
        </div>
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
          <span className="font-bold text-slate-800">၂။ JS ထည့်ချင်ရင် curly braces {'{ }'} သုံးပါ</span>
          <p className="text-slate-600 text-xs mt-1">
            Variable တွေ၊ သင်္ချာတွက်ချက်မှုတွေကို JSX ထဲ ထည့်ပြချင်ရင် <code className="bg-slate-200 px-1 rounded font-bold">{'{ }'}</code> ထဲမှာ ရေးရပါတယ်။
          </p>
        </div>
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
          <span className="font-bold text-slate-800">၃။ Root element တစ်ခုတည်းသာ ဖြစ်ရမည်</span>
          <p className="text-slate-600 text-xs mt-1">
            Component တစ်ခုဟာ အပြင်ဆုံး tag အနေနဲ့ <strong>တစ်ခုတည်းသာ</strong> return လုပ်ရပါမယ်။ လိုအပ်ရင် <code className="bg-slate-200 px-1 rounded">&lt;&gt;...&lt;/&gt;</code> (Fragment) နဲ့ အုပ်ပေးပါ။
          </p>
        </div>
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
          <span className="font-bold text-slate-800">၄။ Tag အလွတ်များကို ပိတ်ပေးပါ (Self-closing)</span>
          <p className="text-slate-600 text-xs mt-1">
            Child မပါတဲ့ tag တွေကို နောက်ဆုံးမှာ slash ထည့်ပြီး ပိတ်ပေးရပါမယ် - <code className="bg-slate-200 px-1 rounded">&lt;img /&gt;</code>, <code className="bg-slate-200 px-1 rounded">&lt;input /&gt;</code>, <code className="bg-slate-200 px-1 rounded">&lt;br /&gt;</code>
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          ကုဒ်အပြည့်အစုံ (Full Source Code)
        </span>
        <pre className="p-4 bg-slate-900 text-slate-100 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed">
{`function JsxDemo() {
  const learnerName = 'မောင်မောင်';
  const currentYear = 2026;
  const price = 5000;
  const quantity = 3;

  return (
    <div className="space-y-1 text-slate-700">
      {/* JS variable များကို { } တွန့်ကွင်းဖြင့် ထည့်သွင်းပါသည် */}
      <p>ကြိုဆိုပါတယ်၊ <strong className="text-blue-600">{learnerName}</strong>!</p>
      <p>လက်ရှိခုနှစ်: <span className="font-medium">{currentYear}</span></p>
      <p>စုစုပေါင်းတန်ဖိုး (5000 × 3): <span className="font-bold text-emerald-600">{price * quantity} ကျပ်</span></p>
    </div>
  );
}

export default JsxDemo;`}
        </pre>
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          လက်တွေ့ မျက်မြင်ရလဒ် (Live Result)
        </span>
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-1 text-slate-700">
          <p>ကြိုဆိုပါတယ်၊ <strong className="text-blue-600">{learnerName}</strong>!</p>
          <p>လက်ရှိခုနှစ်: <span className="font-medium">{currentYear}</span></p>
          <p>စုစုပေါင်းတန်ဖိုး (5000 × 3): <span className="font-bold text-emerald-600">{price * quantity} ကျပ်</span></p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PART 3: Props ဆိုတာဘာလဲ? (Props - Passing Data)
// ============================================================================
function UserCard({ name, role, isOnline }) {
  return (
    <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs flex items-center justify-between">
      <div>
        <h4 className="font-bold text-slate-900">{name}</h4>
        <p className="text-xs text-slate-500 mt-0.5">{role}</p>
      </div>
      <span
        className={`px-2.5 py-1 text-xs rounded-full font-medium ${
          isOnline ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
        }`}
      >
        {isOnline ? '● Online ရှိနေသည်' : '○ Offline ဖြစ်နေသည်'}
      </span>
    </div>
  );
}

function Part3Props() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold text-slate-850">
          အပိုင်း ၃: Props ဆိုတာဘာလဲ? (Props - Passing Data)
        </h3>
        <p className="text-slate-650 mt-1 leading-relaxed">
          <strong>Props</strong> ဆိုတာ &quot;Properties&quot; ကို အတိုကောက်ခေါ်တာဖြစ်ပြီး <strong>မိဘ (Parent) component မှ သားသမီး (Child) component ဆီကို data လှမ်းပို့ပေးခြင်း</strong> ဖြစ်ပါတယ်။
          Function တွေဆီ argument ပေးသလိုမျိုး ဖြစ်ပြီး Component တစ်ခုတည်းကို data မတူဘဲ အကြိမ်ကြိမ် ပြန်လည်အသုံးပြုနိုင်စေပါတယ်။
        </p>
      </div>

      <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg text-sm text-indigo-950">
        💡 <strong>Props ဆိုင်ရာ အဓိကမှတ်သားဖွယ်များ:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1 text-indigo-900 text-xs leading-relaxed">
          <li><strong>လမ်းကြောင်းတစ်ခုတည်းသာ သွားသည်:</strong> Parent မှ Child ဆီသို့သာ စီးဆင်းပါတယ်။</li>
          <li><strong>Read-only (ဖတ်ရန်သာ):</strong> Child component က မိမိရရှိတဲ့ props ကို ပြင်ဆင်ခွင့်မရှိပါ။</li>
          <li>စာသား (String) ပို့လျှင် quotation သုံးပါ: <code className="bg-indigo-100 px-1 rounded">name=&quot;မောင်မောင်&quot;</code></li>
          <li>ကိန်းဂဏန်း၊ boolean၊ variable ပို့လျှင် တွန့်ကွင်း <code className="bg-indigo-100 px-1 rounded">{'{ }'}</code> သုံးပါ: <code className="bg-indigo-100 px-1 rounded">isOnline={'{true}'}</code></li>
        </ul>
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          ကုဒ်အပြည့်အစုံ (Full Source Code)
        </span>
        <pre className="p-4 bg-slate-900 text-slate-100 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed">
{`// ၁။ Child Component (Props လက်ခံပြီး ပြသပေးသည့် component)
function UserCard({ name, role, isOnline }) {
  return (
    <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs flex items-center justify-between">
      <div>
        <h4 className="font-bold text-slate-900">{name}</h4>
        <p className="text-xs text-slate-500 mt-0.5">{role}</p>
      </div>
      <span
        className={\`px-2.5 py-1 text-xs rounded-full font-medium \${
          isOnline ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
        }\`}
      >
        {isOnline ? '● Online ရှိနေသည်' : '○ Offline ဖြစ်နေသည်'}
      </span>
    </div>
  );
}

// ၂။ Parent Component (UserCard ကို data အမျိုးမျိုး ထည့်ပြီး ပြန်လည်အသုံးပြုခြင်း)
function App() {
  return (
    <div className="space-y-2.5">
      <UserCard name="ကိုဇော်" role="Frontend Developer" isOnline={true} />
      <UserCard name="မမြမြ" role="UI/UX Designer" isOnline={false} />
      <UserCard name="ကိုကျော်" role="Backend Developer" isOnline={true} />
    </div>
  );
}

export default App;`}
        </pre>
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          လက်တွေ့ မျက်မြင်ရလဒ် (Live Result)
        </span>
        <div className="space-y-2.5">
          <UserCard name="ကိုဇော်" role="Frontend Developer" isOnline={true} />
          <UserCard name="မမြမြ" role="UI/UX Designer" isOnline={false} />
          <UserCard name="ကိုကျော်" role="Backend Developer" isOnline={true} />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PART 4: အခြေအနေပေါ်မူတည်ပြီး ပြသခြင်း (Conditional Rendering)
// ============================================================================
function Part4Conditionals() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold text-slate-850">
          အပိုင်း ၄: အခြေအနေပေါ်မူတည်ပြီး ပြသခြင်း (Conditional Rendering)
        </h3>
        <p className="text-slate-650 mt-1 leading-relaxed">
          React မှာ သီးသန့် template if-else မရှိပါဘူး။ ရိုးရိုး JavaScript ရဲ့ logic တွေကို JSX ထဲမှာ တိုက်ရိုက်အသုံးပြုပြီး ပြသလိုတဲ့ UI ကို ရွေးချယ်ဖော်ပြနိုင်ပါတယ်။
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
          <div className="font-bold text-slate-800">နည်းလမ်း ၁: Ternary Operator (? :)</div>
          <p className="text-slate-600 text-xs mt-1 leading-relaxed">
            အခြေအနေပေါ် မူတည်ပြီး ၂ ခုထဲက ၁ ခုကို ရွေးပြချင်တဲ့အခါ သုံးပါတယ်: <br />
            <code className="text-blue-600 font-mono text-xs">{'{isLoggedIn ? <Welcome /> : <LoginButton />}'}</code>
          </p>
        </div>
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
          <div className="font-bold text-slate-800">နည်းလမ်း ၂: Logical AND (&amp;&amp;)</div>
          <p className="text-slate-600 text-xs mt-1 leading-relaxed">
            အခြေအနေ မှန်မှသာ ဖော်ပြချင်ပြီး မှားရင် ဘာမှ မပြချင်တဲ့အခါ သုံးပါတယ်: <br />
            <code className="text-blue-600 font-mono text-xs">{'{unreadCount > 0 && <Badge />}'}</code>
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          ကုဒ်အပြည့်အစုံ (Full Source Code)
        </span>
        <pre className="p-4 bg-slate-900 text-slate-100 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed">
{`import { useState } from 'react';

function ConditionalDemo() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  return (
    <div className="space-y-4">
      {/* ၁။ Toggle ခလုတ်များ */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          className="px-3 py-1.5 text-xs font-medium rounded-md bg-blue-600 text-white"
        >
          Login အခြေအနေ ပြောင်းရန် ({isLoggedIn ? 'Logged In' : 'Logged Out'})
        </button>
        <button
          type="button"
          onClick={() => setUnreadCount((c) => (c > 0 ? c - 1 : 3))}
          className="px-3 py-1.5 text-xs font-medium rounded-md bg-slate-700 text-white"
        >
          မက်ဆေ့ခ်ျ အရေအတွက် ပြောင်းရန် ({unreadCount})
        </button>
      </div>

      {/* ၂။ Ternary (? :) ဖြင့် ၂ ခုအနက် ၁ ခု ပြသခြင်း */}
      <div className="p-3 bg-white border border-slate-200 rounded-lg text-sm">
        <span className="text-xs text-slate-500 block">Ternary (? :) ရလဒ်:</span>
        {isLoggedIn ? (
          <span className="text-emerald-600 font-semibold">🎉 ကြိုဆိုပါတယ်! သင် Login ဝင်ထားပါပြီ။</span>
        ) : (
          <span className="text-amber-600 font-semibold">🔒 ဧည့်သည်အဖြစ် ကြည့်ရှုနေပါသည်။ ကျေးဇူးပြု၍ Login ဝင်ပါ။</span>
        )}
      </div>

      {/* ၃။ Logical (&&) ဖြင့် မှန်မှသာ ပြသခြင်း */}
      <div>
        {unreadCount > 0 && (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
            📬 မဖတ်ရသေးသော မက်ဆေ့ခ်ျ {unreadCount} စောင် ရှိနေပါသည်
          </span>
        )}
      </div>
    </div>
  );
}

export default ConditionalDemo;`}
        </pre>
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          စမ်းသပ်နှိပ်ကြည့်နိုင်သော နမူနာ (Interactive Demo)
        </span>
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <button
              type="button"
              onClick={() => setIsLoggedIn(!isLoggedIn)}
              className="px-3 py-1.5 text-xs font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer"
            >
              Login အခြေအနေ ပြောင်းရန် (လက်ရှိ: {isLoggedIn ? 'Login ဝင်ထားသည်' : 'Login မဝင်ရသေးပါ'})
            </button>
            <button
              type="button"
              onClick={() => setUnreadCount((c) => (c > 0 ? c - 1 : 3))}
              className="px-3 py-1.5 text-xs font-medium rounded-md bg-slate-700 text-white hover:bg-slate-800 transition cursor-pointer"
            >
              မက်ဆေ့ခ်ျ အရေအတွက် ပြောင်းရန် ({unreadCount})
            </button>
          </div>

          <div className="p-3 bg-white border border-slate-200 rounded-lg text-sm space-y-2">
            <div>
              <span className="text-slate-500 text-xs block font-medium">Ternary (? :) ဖြင့် ပြသသောရလဒ်:</span>
              {isLoggedIn ? (
                <span className="text-emerald-600 font-semibold">🎉 ကြိုဆိုပါတယ်! သင် Login ဝင်ထားပါပြီ။</span>
              ) : (
                <span className="text-amber-600 font-semibold">🔒 ဧည့်သည်အဖြစ် ကြည့်ရှုနေပါသည်။ ကျေးဇူးပြု၍ Login ဝင်ပါ။</span>
              )}
            </div>

            <div>
              <span className="text-slate-500 text-xs block font-medium">Logical (&amp;&amp;) ဖြင့် ပြသသောရလဒ်:</span>
              {unreadCount > 0 ? (
                <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                  📬 မဖတ်ရသေးသော မက်ဆေ့ခ်ျ {unreadCount} စောင် ရှိနေပါသည်
                </span>
              ) : (
                <span className="text-xs text-slate-400">မက်ဆေ့ခ်ျအားလုံး ဖတ်ရှုပြီးပါပြီ (unreadCount=0 ဖြစ်၍ ဘာမှ မပြပါ)</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PART 5: စာရင်းများကို ဖော်ပြခြင်း (.map & keys)
// ============================================================================
function Part5Lists() {
  const [courses, setCourses] = useState([
    { id: 'c1', title: 'HTML & CSS အခြေခံ', hours: 10 },
    { id: 'c2', title: 'JavaScript အခြေခံမှ အဆင့်မြင့်', hours: 25 },
    { id: 'c3', title: 'React Core Concept များ', hours: 15 },
  ]);

  const addSample = () => {
    const nextId = 'c' + (courses.length + 1);
    setCourses([...courses, { id: nextId, title: 'Tailwind CSS ဒီဇိုင်းရေးဆွဲနည်း', hours: 8 }]);
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold text-slate-850">
          အပိုင်း ၅: စာရင်းများကို ဖော်ပြခြင်း (Lists with .map &amp; keys)
        </h3>
        <p className="text-slate-650 mt-1 leading-relaxed">
          အချက်အလက် စာရင်း (array) တွေကို မျက်နှာပြင်ပေါ်မှာ ထုတ်ပြချင်ရင် JavaScript ရဲ့ <code className="bg-slate-100 px-1 rounded text-xs font-mono font-bold">array.map()</code> function ကို သုံးပါတယ်။
          အရေးကြီးဆုံးအချက်မှာ repeat လုပ်တဲ့ element တိုင်းမှာ သီးသန့်ဖြစ်သော <code className="bg-slate-100 px-1 rounded text-xs font-mono font-bold">key</code> prop တစ်ခု ထည့်ပေးရပါမယ်။
        </p>
      </div>

      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-950">
        ⚠️ <strong>&quot;key&quot; prop ကို ဘာကြောင့် မဖြစ်မနေ ထည့်ပေးရသလဲ?</strong>
        <p className="mt-1 text-xs text-amber-900 leading-relaxed">
          React က စာရင်းထဲမှာ ဘယ် item က အသစ်တိုးလာသလဲ၊ ဘယ် item က ပြင်လိုက်သလဲ၊ ဘယ်ဟာက ဖျက်လိုက်သလဲဆိုတာကို <code className="bg-amber-100 px-1 rounded font-bold">key</code> ကို ကြည့်ပြီး လျင်မြန်စွာ မှတ်သား update လုပ်တာဖြစ်ပါတယ်။ ထို့ကြောင့် ထပ်ခါမဖြစ်နိုင်သော id များကိုသာ key အဖြစ် သုံးသင့်ပါတယ်။
        </p>
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          ကုဒ်အပြည့်အစုံ (Full Source Code)
        </span>
        <pre className="p-4 bg-slate-900 text-slate-100 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed">
{`import { useState } from 'react';

function CourseList() {
  const [courses, setCourses] = useState([
    { id: 'c1', title: 'HTML & CSS အခြေခံ', hours: 10 },
    { id: 'c2', title: 'JavaScript အခြေခံမှ အဆင့်မြင့်', hours: 25 },
    { id: 'c3', title: 'React Core Concept များ', hours: 15 },
  ]);

  const addSample = () => {
    const nextId = 'c' + (courses.length + 1);
    setCourses([...courses, { id: nextId, title: 'Tailwind CSS ဒီဇိုင်းရေးဆွဲနည်း', hours: 8 }]);
  };

  return (
    <div className="space-y-3">
      <ul className="divide-y divide-slate-200 bg-white rounded-lg border border-slate-200 overflow-hidden">
        {/* .map() သုံးပြီး key prop ထည့်သွင်းဖော်ပြပါသည် */}
        {courses.map((item) => (
          <li key={item.id} className="p-3 flex items-center justify-between text-sm">
            <span className="font-semibold text-slate-800">{item.title}</span>
            <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-medium">
              ကြာချိန်: {item.hours} နာရီ
            </span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={addSample}
        className="px-3 py-1.5 text-xs font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        + သင်ခန်းစာအသစ် တစ်ခုထပ်ထည့်ရန်
      </button>
    </div>
  );
}

export default CourseList;`}
        </pre>
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          လက်တွေ့ မျက်မြင်ရလဒ် (Live Result)
        </span>
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
          <ul className="divide-y divide-slate-200 bg-white rounded-lg border border-slate-200 overflow-hidden">
            {courses.map((item) => (
              <li key={item.id} className="p-3 flex items-center justify-between text-sm">
                <span className="font-semibold text-slate-800">{item.title}</span>
                <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-medium">
                  ကြာချိန်: {item.hours} နာရီ
                </span>
              </li>
            ))}
          </ul>
          {courses.length < 4 && (
            <button
              type="button"
              onClick={addSample}
              className="px-3 py-1.5 text-xs font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer"
            >
              + သင်ခန်းစာအသစ် တစ်ခုထပ်ထည့်ရန်
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PART 6: လက်တွေ့လေ့ကျင့်ခန်း & အနှစ်ချုပ် (Practice Challenge & Summary)
// ============================================================================
function ProductCard({ title, price, inStock }) {
  return (
    <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-xs flex items-center justify-between">
      <div>
        <h5 className="font-bold text-slate-900 text-sm">{title}</h5>
        <span className="text-xs text-slate-500 font-mono">{price.toLocaleString()} ကျပ်</span>
      </div>
      <span
        className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
          inStock ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
        }`}
      >
        {inStock ? 'ပစ္စည်းရှိပါသည်' : 'ပစ္စည်းကုန်ပါပြီ'}
      </span>
    </div>
  );
}

function Part6Practice() {
  const products = [
    { id: 1, title: 'Mechanical Keyboard (ကီးဘုတ်)', price: 95000, inStock: true },
    { id: 2, title: 'Wireless Mouse (ကြိုးမဲ့မောက်စ်)', price: 45000, inStock: false },
    { id: 3, title: 'USB-C Monitor (မော်နီတာ)', price: 420000, inStock: true },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold text-slate-850">
          အပိုင်း ၆: လက်တွေ့လေ့ကျင့်ခန်း &amp; အနှစ်ချုပ် (Practice &amp; Summary)
        </h3>
        <p className="text-slate-650 mt-1 leading-relaxed">
          သင်ယူခဲ့သမျှ အဓိကအချက် ၄ ချက်ဖြစ်သော <strong>Component</strong> + <strong>Props</strong> + <strong>.map()</strong> + <strong>Conditionals</strong> တို့ကို ပေါင်းစပ်ရေးဆွဲထားသော ကုန်ပစ္စည်းစာရင်း နမူနာဖြစ်ပါတယ်။
        </p>
      </div>

      <div className="p-4 bg-slate-900 text-slate-100 rounded-lg text-xs font-mono space-y-2">
        <div className="text-emerald-400 font-bold">// အဓိက မှတ်သားရမည့် အချက်များ (Summary):</div>
        <div className="space-y-1 text-slate-300">
          <p>✔ Component = စာလုံးကြီးဖြင့် စတင်ရပြီး JSX ပြန်ပေးသော JS function ဖြစ်သည်</p>
          <p>✔ JSX = HTML နှင့်ဆင်တူပြီး JavaScript expression များကို တွန့်ကွင်း {'{ }'} ဖြင့် ထည့်ရသည်</p>
          <p>✔ Props = Parent မှ Child ဆီသို့ ပေးပို့သော Data ဖြစ်သည် (ပြင်ဆင်ခွင့်မရှိပါ)</p>
          <p>✔ Conditionals = Logic စစ်ရန် {'{condition ? a : b}'} သို့မဟုတ် {'{condition && a}'} သုံးသည်</p>
          <p>✔ Lists = .map() သုံးပြီး ထုတ်ပြရကာ မတူညီသော key prop ကို အမြဲထည့်ပေးရသည်</p>
        </div>
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          ကုဒ်အပြည့်အစုံ (Full Source Code)
        </span>
        <pre className="p-4 bg-slate-900 text-slate-100 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed">
{`// ၁။ ကုန်ပစ္စည်း Card Component (Props လက်ခံသည်)
function ProductCard({ title, price, inStock }) {
  return (
    <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-xs flex items-center justify-between">
      <div>
        <h5 className="font-bold text-slate-900 text-sm">{title}</h5>
        <span className="text-xs text-slate-500 font-mono">{price.toLocaleString()} ကျပ်</span>
      </div>
      {/* In Stock အခြေအနေကို ternary ဖြင့် စစ်ဆေးပြသသည် */}
      <span
        className={\`text-xs px-2.5 py-0.5 rounded-full font-medium \${
          inStock ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
        }\`}
      >
        {inStock ? 'ပစ္စည်းရှိပါသည်' : 'ပစ္စည်းကုန်ပါပြီ'}
      </span>
    </div>
  );
}

// ၂။ Main Component (.map ဖြင့် ProductCard များကို render လုပ်သည်)
function ProductCatalog() {
  const products = [
    { id: 1, title: 'Mechanical Keyboard (ကီးဘုတ်)', price: 95000, inStock: true },
    { id: 2, title: 'Wireless Mouse (ကြိုးမဲ့မောက်စ်)', price: 45000, inStock: false },
    { id: 3, title: 'USB-C Monitor (မော်နီတာ)', price: 420000, inStock: true },
  ];

  return (
    <div className="space-y-2">
      {products.map((p) => (
        <ProductCard key={p.id} title={p.title} price={p.price} inStock={p.inStock} />
      ))}
    </div>
  );
}

export default ProductCatalog;`}
        </pre>
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          ပေါင်းစပ်ရေးဆွဲထားသော ကုန်ပစ္စည်းစာရင်း နမူနာ (Mini-Challenge Output)
        </span>
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
          {products.map((p) => (
            <ProductCard key={p.id} title={p.title} price={p.price} inStock={p.inStock} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN LESSON 1 WRAPPER (Tabs to navigate clean, isolated parts)
// ============================================================================
const parts = [
  { id: 1, label: 'အပိုင်း ၁: Component ဆိုတာဘာလဲ', component: Part1Component },
  { id: 2, label: 'အပိုင်း ၂: JSX စည်းမျဉ်းများ', component: Part2JSX },
  { id: 3, label: 'အပိုင်း ၃: Props အသုံးပြုပုံ', component: Part3Props },
  { id: 4, label: 'အပိုင်း ၄: Conditionals', component: Part4Conditionals },
  { id: 5, label: 'အပိုင်း ၅: စာရင်းများ (.map & keys)', component: Part5Lists },
  { id: 6, label: 'အပိုင်း ၆: လေ့ကျင့်ခန်း & အနှစ်ချုပ်', component: Part6Practice },
];

export default function Lesson1() {
  const [activePart, setActivePart] = useState(0);
  const CurrentPart = parts[activePart].component;

  return (
    <section className="space-y-6">
      {/* Lesson Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
            Beginner Level (အခြေခံအဆင့်)
          </span>
          <span className="text-xs text-slate-400">•</span>
          <span className="text-xs text-slate-500">
            အပိုင်း {activePart + 1} / {parts.length}
          </span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mt-2">
          Lesson 1: Components &amp; JSX
        </h2>
        <p className="text-slate-600 text-sm mt-1">
          React ၏ အဓိက အခြေခံသဘောတရားများကို တစ်ဆင့်ချင်းစီ လွယ်ကူရှင်းလင်းစွာ လေ့လာနိုင်ပါသည်။
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
                  ? 'bg-white text-blue-600 shadow-xs font-semibold'
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
          className="px-3.5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          နောက်အပိုင်းသို့ →
        </button>
      </div>
    </section>
  );
}
