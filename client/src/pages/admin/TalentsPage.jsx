import { useEffect, useState } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import API from '../../api/axios';

const TalentsPage = () => {
  const [talents, setTalents] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const loadTalents = async () => {
    try {
      const { data } = await API.get('/users/talents');
      setTalents(data);
    } catch {
      alert('Failed to load talents');
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line
  useEffect(() => { loadTalents(); }, []);

  const filtered = talents.filter((t) =>
    !search ||
    t.name?.toLowerCase().includes(search.toLowerCase()) ||
    t.email?.toLowerCase().includes(search.toLowerCase())
  );

  const thCls = 'text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.7px] whitespace-nowrap border-b border-border';
  const tdCls = 'px-5 py-4 border-b border-border align-middle';

  /* ── Search icon ── */
  const IconSearch = () => (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8.5" cy="8.5" r="5.5"/>
      <path d="M17 17l-4-4"/>
    </svg>
  );

  return (
    <div className="flex min-h-screen" style={{ background: '#050505' }}>
      <Sidebar />

      <main className="ml-[240px] flex-1 px-8 py-8" style={{ maxWidth: 'calc(100vw - 240px)' }}>

        {/* Header */}
        <div className="flex items-center justify-between mb-7 page-section">
          <div>
            <h1 className="font-display text-[22px] font-semibold tracking-tight"
              style={{ color: '#F0F0F0', fontFamily: 'Poppins, sans-serif' }}>
              Talents
            </h1>
            <p className="mt-0.5 text-[13px]" style={{ color: '#6B7280' }}>
              All registered talent users on the platform.
            </p>
          </div>

          <span className="text-[12px] px-3 py-1 rounded-full"
            style={{
              background: 'rgba(255,255,255,0.06)',
              color: '#6B7280',
              border: '1px solid rgba(255,255,255,0.09)',
              fontFamily: 'Inter, sans-serif',
            }}>
            {talents.length} {talents.length === 1 ? 'talent' : 'talents'}
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6 page-section">
          {[
            { label: 'Total Talents', value: talents.length,  colorClass: 'stat-card-default', valueColor: '#E5E2E1' },
          ].map(({ label, value, colorClass, valueColor }) => (
            <div key={label} className={`stat-card ${colorClass}`}>
              <span className="block text-[10.5px] font-semibold uppercase tracking-[0.08em] mb-3"
                style={{ color: '#4B5563', fontFamily: 'Inter, sans-serif' }}>
                {label}
              </span>
              <span className="block text-[32px] font-bold leading-none"
                style={{ color: valueColor, fontFamily: 'Poppins, sans-serif' }}>
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Table card */}
        <div className="tasks-container page-section">
          {/* Toolbar */}
          <div className="table-header-bar">
            <div className="flex items-center gap-2">
              <h2 className="text-[15px] font-semibold"
                style={{ color: '#E5E2E1', fontFamily: 'Poppins, sans-serif' }}>
                All Talents
              </h2>
              <span className="text-[11px] px-2 py-0.5 rounded-full"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  color: '#6B7280',
                  border: '1px solid rgba(255,255,255,0.09)',
                  fontFamily: 'Inter, sans-serif',
                }}>
                {filtered.length} {filtered.length === 1 ? 'user' : 'users'}
              </span>
            </div>

            {/* Search */}
            <div className="relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: '#4B5563' }}>
                <IconSearch />
              </span>
              <input
                type="text"
                placeholder="Search by name or email…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input-glass"
                style={{ minWidth: '220px' }}
              />
            </div>
          </div>

          {/* Table */}
          {loading ? (
            <div className="py-16 text-center text-[15px]" style={{ color: '#4B5563' }}>
              Loading…
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center text-[15px]" style={{ color: '#4B5563' }}>
              {search ? 'No talents match your search.' : 'No talent users registered yet.'}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <th className={thCls} style={{ color: '#4B5563' }}>#</th>
                    <th className={thCls} style={{ color: '#4B5563' }}>Name</th>
                    <th className={thCls} style={{ color: '#4B5563' }}>Email</th>
                    <th className={thCls} style={{ color: '#4B5563' }}>Role</th>
                    <th className={thCls} style={{ color: '#4B5563' }}>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((talent, idx) => (
                    <tr key={talent._id}
                      className="border-b border-border last:border-0 hover:bg-bg-hover transition-colors"
                      style={{ borderColor: 'rgba(255,255,255,0.06)' }}>

                      {/* Index */}
                      <td className={tdCls} style={{ color: '#4B5563', fontFamily: 'Inter, sans-serif' }}>
                        {idx + 1}
                      </td>

                      {/* Name + avatar */}
                      <td className={`${tdCls} whitespace-nowrap`}>
                        <div className="flex items-center gap-2.5">
                          <div className="w-[30px] h-[30px] rounded-full avatar-talent flex items-center justify-center text-[12px] font-bold text-white shrink-0">
                            {talent.name?.[0]?.toUpperCase() ?? '?'}
                          </div>
                          <span className="font-medium text-[13px]" style={{ color: '#E5E2E1', fontFamily: 'Inter, sans-serif' }}>
                            {talent.name}
                          </span>
                        </div>
                      </td>

                      {/* Email */}
                      <td className={tdCls} style={{ color: '#9CA3AF', fontFamily: 'Inter, sans-serif', fontSize: '13px' }}>
                        {talent.email}
                      </td>

                      {/* Role badge */}
                      <td className={tdCls}>
                        <span className="inline-block px-2.5 py-[3px] rounded-full text-[11px] font-semibold status-badge-Open">
                          {talent.role}
                        </span>
                      </td>

                      {/* Joined date */}
                      <td className={tdCls} style={{ color: '#6B7280', fontFamily: 'Inter, sans-serif', fontSize: '13px', whiteSpace: 'nowrap' }}>
                        {talent.createdAt
                          ? new Date(talent.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                          : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TalentsPage;
