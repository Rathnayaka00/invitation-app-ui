import { useEffect, useMemo, useState } from 'react';
import { Lock, LogOut, Users, ThumbsUp, ThumbsDown } from 'lucide-react';

interface RsvpEntry {
  name: string;
  attendance: 'yes' | 'no' | '';
  attendees: number;
  message: string;
  submittedAt: string; // ISO
}

const PASSCODE_KEY = '1234';
const DEFAULT_HINT = 'Hint: Ask the couple for the admin passcode';

const Admin = () => {
  const [isAuthed, setIsAuthed] = useState<boolean>(() => localStorage.getItem(PASSCODE_KEY) === '1');
  const [pass, setPass] = useState('');

  const data: RsvpEntry[] = useMemo(() => {
    try {
      const raw = localStorage.getItem('rsvps');
      const arr = JSON.parse(raw || '[]');
      if (!Array.isArray(arr)) return [];
      return arr as RsvpEntry[];
    } catch {
      return [];
    }
  }, [isAuthed]);

  const totals = useMemo(() => {
    const yes = data.filter(d => d.attendance === 'yes');
    const no = data.filter(d => d.attendance === 'no');
    const count = yes.reduce((sum, d) => sum + (Number(d.attendees) || 0), 0);
    return { yes: yes.length, no: no.length, totalAttendees: count };
  }, [data]);

  useEffect(() => {
    // Recompute on storage changes from other tabs
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'rsvps') {
        // trigger re-read via isAuthed dependency flip
        setIsAuthed(v => v);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const tryLogin = () => {
    // Simple passcode: last names initials + date (example). Replace as needed.
    const expected = 'HS-1010'; // TODO: customize or move to .env if backend added
    if (pass.trim() === expected) {
      localStorage.setItem(PASSCODE_KEY, '1');
      setIsAuthed(true);
    } else {
      alert('Incorrect passcode');
    }
  };

  const logout = () => {
    localStorage.removeItem(PASSCODE_KEY);
    setIsAuthed(false);
  };

  return (
    <section id="admin" className="py-12 md:py-20 ">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-dancing text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#d1a56b] to-[#b18339] mb-3 md:mb-4">
            Admin
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            View RSVP responses (local only)
          </p>
        </div>

        {!isAuthed ? (
          <div className="max-w-md mx-auto bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-amber-100/60">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="text-amber-600" size={20} />
              <h3 className="text-lg font-semibold text-gray-800">Passcode Required</h3>
            </div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Enter passcode</label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder={DEFAULT_HINT}
            />
            <button
              onClick={tryLogin}
              className="mt-4 w-full py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-[#9f7433] to-[#b18339] hover:from-[#b18339] hover:to-[#8d652d] shadow"
            >
              Login
            </button>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {/* Summary chips */}
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-xl border border-amber-100/60 mb-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap items-center gap-2 md:gap-3">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-800">
                    <ThumbsUp size={18} />
                    <span className="font-semibold">Yes: {totals.yes}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-800">
                    <ThumbsDown size={18} />
                    <span className="font-semibold">No: {totals.no}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-800">
                    <Users size={18} />
                    <span className="font-semibold">Attendees: {totals.totalAttendees}</span>
                  </div>
                </div>
                <button onClick={logout} className="self-start md:self-auto text-amber-700 hover:text-amber-800 inline-flex items-center gap-1">
                  <LogOut size={18} /> Logout
                </button>
              </div>
            </div>

            {/* Mobile list (cards) */}
            <div className="md:hidden space-y-3">
              {data.length === 0 ? (
                <div className="text-center text-gray-500 py-6 bg-white rounded-2xl shadow-sm border border-amber-100/60">No RSVPs yet</div>
              ) : (
                data.slice().reverse().map((row, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-4 shadow-sm border border-amber-100/60">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-base font-semibold text-gray-800 break-words">{row.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{new Date(row.submittedAt).toLocaleString()}</p>
                      </div>
                      <div className={`px-2.5 py-1 rounded-full text-xs font-semibold ${row.attendance === 'yes' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-700'}`}>
                        {row.attendance === 'yes' ? 'Yes' : 'No'}
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-500">People</div>
                      <div className="text-gray-800">{row.attendees}</div>
                    </div>
                    {row.message && (
                      <div className="mt-3">
                        <div className="text-gray-500 text-sm">Message</div>
                        <div className="text-gray-800 whitespace-pre-line break-words">{row.message}</div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Desktop table */}
            <div className="hidden md:block bg-white rounded-2xl shadow-xl border border-amber-100/60 overflow-hidden">
              <div className="max-h-[420px] overflow-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-amber-50 text-amber-900">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold">Name</th>
                      <th className="text-left px-4 py-3 font-semibold">Attending</th>
                      <th className="text-left px-4 py-3 font-semibold">People</th>
                      <th className="text-left px-4 py-3 font-semibold">Message</th>
                      <th className="text-left px-4 py-3 font-semibold">Submitted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center text-gray-500 py-6">No RSVPs yet</td>
                      </tr>
                    ) : (
                      data.slice().reverse().map((row, idx) => (
                        <tr key={idx} className="border-t border-amber-100/70">
                          <td className="px-4 py-3 text-gray-800 break-words">{row.name}</td>
                          <td className="px-4 py-3">{row.attendance === 'yes' ? 'Yes' : 'No'}</td>
                          <td className="px-4 py-3">{row.attendees}</td>
                          <td className="px-4 py-3 text-gray-700 whitespace-pre-line break-words">{row.message || '—'}</td>
                          <td className="px-4 py-3 text-gray-500">{new Date(row.submittedAt).toLocaleString()}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Admin;
