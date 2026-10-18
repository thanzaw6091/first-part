import { useState, useEffect } from 'react';

// ဒီ lesson မှာ အကြောင်းအရာ တစ်ခုတည်းပဲ သင်ပါမယ် - Server က Data ခေါ်ခြင်း (Fetching Data)
// Lesson 3 က useEffect ကို အသုံးချမှာပါ

// ကုဒ်ပြဖို့ စာသား (ရိုးရှင်းအောင် style တွေ ဖယ်ထားပါတယ်)
const demoCode = `import { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);      // data
  const [loading, setLoading] = useState(true); // ခေါ်နေဆဲလား
  const [error, setError] = useState('');       // error စာသား

  useEffect(() => {
    async function loadUsers() {
      try {
        const res = await fetch(
          'https://jsonplaceholder.typicode.com/users?_limit=5'
        );
        if (!res.ok) throw new Error('Server error');

        const data = await res.json();
        setUsers(data);
      } catch {
        setError('Data ခေါ်လို့ မရပါဘူး');
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []); // [] = ပထမတစ်ခါပဲ ခေါ်မယ်

  if (loading) return <p>ခေါ်နေပါတယ်...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name} ({user.email})
        </li>
      ))}
    </ul>
  );
}`;

// ---------- အောက်က ကုဒ်က နမူနာကို တကယ်ပြဖို့ပါ ----------

function UserListDemo() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        const res = await fetch(
          'https://jsonplaceholder.typicode.com/users?_limit=5'
        );
        if (!res.ok) throw new Error('Server error');

        const data = await res.json();
        setUsers(data);
      } catch {
        setError('Data ခေါ်လို့ မရပါဘူး (internet ကို စစ်ကြည့်ပါ)');
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  return (
    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
      {loading && <p className="text-sm text-slate-500">⏳ ခေါ်နေပါတယ်...</p>}

      {error && <p className="text-sm text-red-600">⚠️ {error}</p>}

      {!loading && !error && (
        <ul className="divide-y divide-slate-200 bg-white rounded-lg border border-slate-200 overflow-hidden">
          {users.map((user) => (
            <li key={user.id} className="p-3 text-sm">
              <span className="font-semibold text-slate-800">{user.name}</span>
              <span className="block text-xs text-slate-500">{user.email}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Lesson5() {
  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full">
          Beginner Level (အခြေခံအဆင့်)
        </span>
        <h2 className="text-2xl font-bold text-slate-900 mt-2">
          Lesson 5: Data ခေါ်ခြင်း (Fetching Data)
        </h2>
        <p className="text-slate-600 text-sm mt-1">
          Internet ပေါ်က data ကို ခေါ်ပြီး screen မှာ ဘယ်လိုပြမလဲ။
        </p>
      </div>

      {/* ၁။ ဘာလဲ */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-slate-900">၁။ ဘာကို လုပ်မှာလဲ?</h3>
        <p className="text-slate-700 leading-relaxed">
          Website အများစုက data ကို server ကနေ ခေါ်ပြီး ပြကြပါတယ်။ ဒီ lesson မှာ{' '}
          <code className="bg-slate-100 px-1 rounded font-mono text-sm font-bold">fetch</code> နဲ့ user စာရင်းကို
          ခေါ်ပြီး ပြပါမယ်။ Lesson 3 မှာ သင်ခဲ့တဲ့{' '}
          <code className="bg-slate-100 px-1 rounded font-mono text-sm font-bold">useEffect</code> ကို သုံးပါမယ်။
        </p>
      </div>

      {/* ၂။ State ၃ ခု */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-slate-900">၂။ State ၃ ခု လိုပါတယ်</h3>
        <p className="text-slate-700 text-sm leading-relaxed">
          Data ခေါ်တာက ချက်ချင်း မပြီးပါဘူး၊ အချိန်ယူရပါတယ်။ ဒါကြောင့် အခြေအနေ ၃ ခုကို မှတ်ထားရပါတယ်။
        </p>
        <div className="space-y-2 text-sm">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <code className="font-mono font-bold text-blue-600">users</code>
            <p className="text-slate-600 mt-1">ခေါ်ပြီးရလာတဲ့ data</p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <code className="font-mono font-bold text-blue-600">loading</code>
            <p className="text-slate-600 mt-1">ခေါ်နေဆဲလား (true / false)၊ ခေါ်နေတုန်း "ခေါ်နေပါတယ်..." လို့ ပြဖို့</p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <code className="font-mono font-bold text-blue-600">error</code>
            <p className="text-slate-600 mt-1">မအောင်မြင်ရင် ပြမယ့် စာသား</p>
          </div>
        </div>
      </div>

      {/* ၃။ အဆင့်များ */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-slate-900">၃။ အလုပ်လုပ်ပုံ အဆင့်ဆင့်</h3>
        <ol className="list-decimal list-inside text-slate-700 text-sm space-y-1 leading-relaxed">
          <li>Component ပထမဆုံးပြတယ် (loading = true ဖြစ်နေတယ်)</li>
          <li><code className="bg-slate-100 px-1 rounded font-mono">useEffect</code> က <code className="bg-slate-100 px-1 rounded font-mono">fetch</code> ကို စခေါ်တယ် (<code className="bg-slate-100 px-1 rounded font-mono">[ ]</code> အလွတ်မို့ တစ်ခါပဲ)</li>
          <li>Data ရရင် <code className="bg-slate-100 px-1 rounded font-mono">setUsers</code> နဲ့ သိမ်းတယ်</li>
          <li>ပြီးရင် <code className="bg-slate-100 px-1 rounded font-mono">setLoading(false)</code></li>
          <li>State ပြောင်းလို့ React က UI ကို ပြန်ဆွဲတယ်</li>
        </ol>
      </div>

      {/* ၄။ နမူနာ */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-slate-900">၄။ နမူနာ</h3>
        <p className="text-slate-700 text-sm leading-relaxed">
          ဒီ page ကို ဖွင့်တာနဲ့ အောက်က စာရင်းကို server ကနေ ခေါ်ထားတာပါ။
          Internet လိုပါတယ်။
        </p>

        <pre className="p-4 bg-slate-900 text-slate-100 rounded-lg text-sm font-mono overflow-x-auto leading-relaxed">
          {demoCode}
        </pre>

        <UserListDemo />
      </div>

      {/* အနှစ်ချုပ် */}
      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-900 space-y-1">
        <p className="font-bold">📌 မှတ်ထားရမယ့် အချက် ၃ ချက်</p>
        <p>၁။ Data ခေါ်တာကို useEffect ထဲမှာ ရေးပါ၊ [ ] အလွတ်ဆို တစ်ခါပဲ ခေါ်ပါမယ်</p>
        <p>၂။ data / loading / error ဆိုပြီး state ၃ ခု သုံးပါ</p>
        <p>၃။ loading ဆိုရင် စောင့်ခိုင်းတဲ့စာ၊ error ဆိုရင် error စာ၊ မဟုတ်ရင် data ကို ပြပါ</p>
      </div>
    </section>
  );
}