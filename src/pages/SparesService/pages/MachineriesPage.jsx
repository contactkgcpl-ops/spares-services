import { useEffect, useState, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import {
  fetchMachines,
  fetchMachineCategories,
  fetchMachineSubcategories,
  submitMachineEnquiry,
} from '../../../admin/services/machineService';

const MACHINES_PER_PAGE = 9;

export default function MachineriesPage() {
  const [machines, setMachines] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [sortBy, setSortBy] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);

  // Quote Modal State
  const [quoteMachine, setQuoteMachine] = useState(null);
  const [quoteForm, setQuoteForm] = useState({ fullName: '', email: '', phone: '', companyName: '', message: '' });
  const [quoteSubmitting, setQuoteSubmitting] = useState(false);
  const [quoteSuccess, setQuoteSuccess] = useState(false);
  const [quoteError, setQuoteError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError('');
        const [machData, catData, subCatData] = await Promise.all([
          fetchMachines(),
          fetchMachineCategories(),
          fetchMachineSubcategories(),
        ]);
        setMachines(machData);
        setCategories(catData);
        setSubcategories(subCatData);
      } catch (err) {
        setError('Failed to load machineries data.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const toggleSubcategory = (subName) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subName) ? prev.filter((name) => name !== subName) : [...prev, subName]
    );
  };

  const filteredMachines = useMemo(() => {
    let results = [...machines];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (m) =>
          (m.machine_name || '').toLowerCase().includes(q) ||
          (m.description || '').toLowerCase().includes(q)
      );
    }

    if (selectedSubcategories.length > 0) {
      results = results.filter(
        (m) =>
          selectedSubcategories.includes(m.subcategory) ||
          selectedSubcategories.includes(m.subcategory_name)
      );
    }

    if (sortBy === 'name-asc') {
      results.sort((a, b) => (a.machine_name || '').localeCompare(b.machine_name || ''));
    } else if (sortBy === 'name-desc') {
      results.sort((a, b) => (b.machine_name || '').localeCompare(a.machine_name || ''));
    }

    return results;
  }, [machines, searchQuery, selectedSubcategories, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredMachines.length / MACHINES_PER_PAGE));
  const visibleMachines = useMemo(() => {
    const startIndex = (currentPage - 1) * MACHINES_PER_PAGE;
    return filteredMachines.slice(startIndex, startIndex + MACHINES_PER_PAGE);
  }, [filteredMachines, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedSubcategories, sortBy]);

  // Group subcategories by category
  const categoryGroups = useMemo(() => {
    return categories.map((cat) => ({
      ...cat,
      subcategories: subcategories.filter(
        (sub) => sub.category_id === cat.id || sub.category_name === cat.name
      ),
    }));
  }, [categories, subcategories]);

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    setQuoteError('');
    setQuoteSuccess(false);

    try {
      setQuoteSubmitting(true);
      await submitMachineEnquiry({
        fullName: quoteForm.fullName,
        companyName: quoteForm.companyName,
        email: quoteForm.email,
        phone: quoteForm.phone,
        subject: `Quote Request: ${quoteMachine?.machine_name || 'Machinery'}`,
        message: quoteForm.message,
      });
      setQuoteSuccess(true);
      setQuoteForm({ fullName: '', email: '', phone: '', companyName: '', message: '' });
    } catch (err) {
      setQuoteError(err?.response?.data?.message || 'Failed to submit quote request.');
    } finally {
      setQuoteSubmitting(false);
    }
  };

  return (
    <div className="machineries-page-v2">
      {/* SECTION HEADER */}
      <div className="mach-section-header">
        <div className="mach-section-left">
          <span className="mach-section-badge">← PRODUCTS</span>
          <h2>Processing &amp; Packaging Machinery</h2>
        </div>
        <p className="mach-section-desc">
          From turnkey plant setups to individual machine procurement, Salvin offers robust, low-maintenance equipment engineered for 24/7 production-line demands.
        </p>
      </div>

      {/* MAIN CONTENT LAYOUT */}
      <div className="mach-content">
        {/* SIDEBAR */}
        <aside className="mach-sidebar">
          <h3 className="mach-sidebar-title">Categories</h3>

          {categoryGroups.map((cat) => (
            <div key={cat.id || cat.name} className="mb-4">
              <h4 className="mach-sidebar-group">{cat.name}</h4>
              {cat.subcategories.length > 0 ? (
                cat.subcategories.map((sub) => (
                  <label key={sub.id || sub.name} className="mach-checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedSubcategories.includes(sub.name)}
                      onChange={() => toggleSubcategory(sub.name)}
                    />
                    {sub.name}
                  </label>
                ))
              ) : (
                <label className="mach-checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedSubcategories.includes(cat.name)}
                    onChange={() => toggleSubcategory(cat.name)}
                  />
                  {cat.name} Machinery
                </label>
              )}
            </div>
          ))}
        </aside>

        {/* RESULTS GRID */}
        <div className="mach-results">
          {/* TOOLBAR */}
          <div className="mach-toolbar">
            <div className="mach-search-wrap">
              <span className="mach-search-icon">🔍</span>
              <input
                className="mach-search"
                type="text"
                placeholder="Search machinery..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="mach-sort-wrap">
              <label>Sort By</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="default">Default</option>
                <option value="name-asc">Name A–Z</option>
                <option value="name-desc">Name Z–A</option>
              </select>
            </div>
          </div>

          {/* RESULTS HEADER */}
          <div className="mach-results-header">
            <h3>
              Filtered Machinery <span className="mach-count">{filteredMachines.length} Results</span>
            </h3>
            <span className="mach-page-count">
              Page {currentPage} of {totalPages}
            </span>
          </div>

          {loading ? (
            <div className="py-20 text-center text-slate-500 font-semibold">Loading machinery catalog...</div>
          ) : error ? (
            <div className="py-20 text-center text-red-500 font-semibold">{error}</div>
          ) : visibleMachines.length === 0 ? (
            <div className="py-20 text-center text-slate-500 font-semibold">
              No machinery found matching your selection.
            </div>
          ) : (
            <div className="mach-grid">
              {visibleMachines.map((machine) => {
                const slug = machine.slug || String(machine.machine_name || '').toLowerCase().replace(/\s+/g, '-');
                const categoryTag = machine.category_name || 'PACKAGING';
                const subcategoryTag = machine.subcategory_name || machine.subcategory || 'EQUIPMENT';

                return (
                  <article key={machine.id || machine.machine_id} className="mach-card">
                    <NavLink to={`/spares-service/machineries/${slug}`} className="mach-card-img">
                      <img
                        src={machine.image || machine.image_url}
                        alt={machine.machine_name}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/350x250?text=Machine';
                        }}
                      />
                    </NavLink>
                    <div className="mach-card-body">
                      <div className="mach-card-tags">
                        <span className="mach-tag orange">{categoryTag}</span>
                        <span className="mach-tag blue">{subcategoryTag}</span>
                      </div>
                      <NavLink to={`/spares-service/machineries/${slug}`}>
                        <h4 className="mach-card-title">{machine.machine_name}</h4>
                      </NavLink>
                      <p className="mach-card-desc">{machine.description}</p>
                      <div className="mach-card-actions">
                        <button
                          type="button"
                          onClick={() => setQuoteMachine(machine)}
                          className="mach-btn quote"
                        >
                          GET A QUOTE
                        </button>
                        <NavLink to={`/spares-service/machineries/${slug}`} className="mach-btn view">
                          VIEW MORE
                        </NavLink>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* PAGINATION */}
          {totalPages > 1 && (
            <nav className="mach-pagination" aria-label="Machinery pages">
              <button
                type="button"
                className="mach-page-btn"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  className={`mach-page-num${page === currentPage ? ' active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                className="mach-page-btn"
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </nav>
          )}
        </div>
      </div>

      {/* Quote Request Modal */}
      {quoteMachine && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <h3 className="text-lg font-extrabold text-slate-900">
                Request Quote: {quoteMachine.machine_name}
              </h3>
              <button onClick={() => setQuoteMachine(null)} className="text-slate-400 hover:text-slate-700 font-bold">
                ✕
              </button>
            </div>

            {quoteSuccess ? (
              <div className="py-6 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 font-bold text-xl">
                  ✓
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Quote Request Sent!</h4>
                <p className="text-xs text-slate-600 mb-6">
                  Our sales engineering team will reach out to you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setQuoteMachine(null);
                    setQuoteSuccess(false);
                  }}
                  className="rounded-lg bg-[#ff7a00] px-6 py-2.5 text-xs font-bold uppercase text-white hover:bg-[#e56d00]"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="space-y-3.5">
                {quoteError && (
                  <div className="rounded-lg bg-red-50 p-3 text-xs text-red-700">
                    {quoteError}
                  </div>
                )}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={quoteForm.fullName}
                    onChange={(e) => setQuoteForm({ ...quoteForm, fullName: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-xs focus:border-[#ff7a00] focus:outline-none"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={quoteForm.email}
                    onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-xs focus:border-[#ff7a00] focus:outline-none"
                    placeholder="name@company.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Phone / WhatsApp</label>
                  <input
                    type="text"
                    value={quoteForm.phone}
                    onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-xs focus:border-[#ff7a00] focus:outline-none"
                    placeholder="+91 98987 27796"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Specific Requirements *</label>
                  <textarea
                    rows="3"
                    required
                    value={quoteForm.message}
                    onChange={(e) => setQuoteForm({ ...quoteForm, message: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-xs focus:border-[#ff7a00] focus:outline-none"
                    placeholder="Mention production capacity, product type, packaging material..."
                  ></textarea>
                </div>
                <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setQuoteMachine(null)}
                    className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={quoteSubmitting}
                    className="rounded-lg bg-[#ff7a00] px-5 py-2 text-xs font-bold uppercase text-white hover:bg-[#e56d00] disabled:opacity-50"
                  >
                    {quoteSubmitting ? 'Sending...' : 'Submit Quote Request'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
