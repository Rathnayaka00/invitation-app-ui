import { useEffect, useMemo, useState } from 'react';
import { Lock, LogOut, Users, ThumbsUp, ThumbsDown } from 'lucide-react';
import { adminLogin, saveToken, removeToken, isAuthenticated } from '../services/authService';
import { getAllUsers, User } from '../services/userService';

interface RsvpEntry {
  name: string;
  attendance: 'yes' | 'no' | '';
  attendees: number;
  message: string;
  submittedAt: string; // ISO
}

const DEFAULT_HINT = 'Enter admin passcode (e.g., admin123)';

const Admin = () => {
  const [isAuthed, setIsAuthed] = useState<boolean>(() => isAuthenticated());
  const [pass, setPass] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [usersError, setUsersError] = useState<string | null>(null);

  // Calculate totals from backend users data
  const totals = useMemo(() => {
    const yes = users.filter(u => u.status === 1);
    const no = users.filter(u => u.status === 0);
    const count = yes.reduce((sum, u) => sum + (u.count || 0), 0);
    return { yes: yes.length, no: no.length, totalAttendees: count };
  }, [users]);

  // Load users when authenticated
  useEffect(() => {
    if (isAuthed) {
      fetchUsers();
    }
  }, [isAuthed]);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    setUsersError(null);
    try {
      const fetchedUsers = await getAllUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      setUsersError(error instanceof Error ? error.message : 'Failed to load users');
      console.error('Error fetching users:', error);
    } finally {
      setLoadingUsers(false);
    }
  };

  const tryLogin = async () => {
    if (!pass.trim()) return;
    
    setIsLoggingIn(true);
    setLoginError(null);
    
    try {
      const response = await adminLogin(pass.trim());
      saveToken(response.access_token);
      setIsAuthed(true);
      setPass('');
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : 'Invalid passcode');
      console.error('Login error:', error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const logout = () => {
    removeToken();
    setIsAuthed(false);
    setUsers([]);
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
            {loginError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">{loginError}</p>
              </div>
            )}
            <label className="block text-sm font-medium text-gray-700 mb-2">Enter passcode</label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && tryLogin()}
              disabled={isLoggingIn}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:bg-gray-100"
              placeholder={DEFAULT_HINT}
            />
            <button
              onClick={tryLogin}
              disabled={isLoggingIn || !pass.trim()}
              className="mt-4 w-full py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-[#9f7433] to-[#b18339] hover:from-[#b18339] hover:to-[#8d652d] shadow disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoggingIn ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Logging in...
                </>
              ) : (
                'Login'
              )}
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
                    <span className="font-semibold">Yes: {loadingUsers ? '...' : totals.yes}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-800">
                    <ThumbsDown size={18} />
                    <span className="font-semibold">No: {loadingUsers ? '...' : totals.no}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-800">
                    <Users size={18} />
                    <span className="font-semibold">Attendees: {loadingUsers ? '...' : totals.totalAttendees}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={fetchUsers} 
                    disabled={loadingUsers}
                    className="text-amber-700 hover:text-amber-800 text-sm underline disabled:opacity-50"
                  >
                    {loadingUsers ? 'Refreshing...' : 'Refresh'}
                  </button>
                  <button onClick={logout} className="text-amber-700 hover:text-amber-800 inline-flex items-center gap-1">
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              </div>
            </div>

            {usersError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">{usersError}</p>
              </div>
            )}

            {/* Mobile list (cards) */}
            <div className="md:hidden space-y-3">
              {loadingUsers ? (
                <div className="text-center text-gray-500 py-6 bg-white rounded-2xl shadow-sm border border-amber-100/60">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-500 mx-auto mb-2"></div>
                  Loading RSVPs...
                </div>
              ) : users.length === 0 ? (
                <div className="text-center text-gray-500 py-6 bg-white rounded-2xl shadow-sm border border-amber-100/60">No RSVPs yet</div>
              ) : (
                users.slice().reverse().map((user, idx) => (
                  <div key={user.id || idx} className="bg-white rounded-2xl p-4 shadow-sm border border-amber-100/60">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-base font-semibold text-gray-800 break-words">{user.name}</p>
                      </div>
                      <div className={`px-2.5 py-1 rounded-full text-xs font-semibold ${user.status === 1 ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-700'}`}>
                        {user.status === 1 ? 'Yes' : 'No'}
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-500">People</div>
                      <div className="text-gray-800">{user.count || 0}</div>
                    </div>
                    {user.message && (
                      <div className="mt-3">
                        <div className="text-gray-500 text-sm">Message</div>
                        <div className="text-gray-800 whitespace-pre-line break-words">{user.message}</div>
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
                    </tr>
                  </thead>
                  <tbody>
                    {loadingUsers ? (
                      <tr>
                        <td colSpan={4} className="text-center text-gray-500 py-6">
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-amber-500 mr-2"></div>
                            Loading RSVPs...
                          </div>
                        </td>
                      </tr>
                    ) : users.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="text-center text-gray-500 py-6">No RSVPs yet</td>
                      </tr>
                    ) : (
                      users.slice().reverse().map((user, idx) => (
                        <tr key={user.id || idx} className="border-t border-amber-100/70">
                          <td className="px-4 py-3 text-gray-800 break-words">{user.name}</td>
                          <td className="px-4 py-3">{user.status === 1 ? 'Yes' : 'No'}</td>
                          <td className="px-4 py-3">{user.count || 0}</td>
                          <td className="px-4 py-3 text-gray-700 whitespace-pre-line break-words">{user.message || '—'}</td>
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
