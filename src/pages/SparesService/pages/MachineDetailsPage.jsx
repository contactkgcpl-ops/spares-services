import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchMachineBySlugOrId, submitMachineEnquiry, resolveMachineImage } from '../../../admin/services/machineService';
import { updateMachineDetailsSEO } from '../../../utils/seoHelper';

export default function MachineDetailsPage() {
  const { slug } = useParams();
  const [machine, setMachine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Inquiry Form Modal
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [inquirySubmitting, setInquirySubmitting] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState(false);
  const [inquiryError, setInquiryError] = useState('');

  useEffect(() => {
    const loadMachine = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await fetchMachineBySlugOrId(slug);
        let targetMachine = data;
        if (Array.isArray(data)) {
          targetMachine = data.find((m) => m.slug === slug || String(m.id) === slug) || data[0];
        }
        setMachine(targetMachine);
        if (targetMachine) {
          updateMachineDetailsSEO(targetMachine, slug);
        }
      } catch (err) {
        setError('Machine not found or failed to load.');
      } finally {
        setLoading(false);
      }
    };
    if (slug) {
      loadMachine();
    }
  }, [slug]);

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setInquiryError('');
    setInquirySuccess(false);

    try {
      setInquirySubmitting(true);
      await submitMachineEnquiry({
        fullName: inquiryForm.fullName,
        companyName: inquiryForm.companyName,
        email: inquiryForm.email,
        phone: inquiryForm.phone,
        subject: `Inquiry for Machine: ${machine?.machine_name || slug}`,
        message: inquiryForm.message,
      });
      setInquirySuccess(true);
      setInquiryForm({ fullName: '', companyName: '', email: '', phone: '', message: '' });
    } catch (err) {
      setInquiryError(err?.response?.data?.message || 'Failed to submit inquiry.');
    } finally {
      setInquirySubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="machine-detail-page-v2 flex items-center justify-center py-32 text-slate-500 font-semibold">
        Loading machine specifications...
      </div>
    );
  }

  if (error || !machine) {
    return (
      <div className="machine-detail-page-v2 py-32 text-center">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-4">Machine Not Found</h2>
        <p className="text-slate-600 mb-6">{error || 'The requested machine could not be found.'}</p>
        <Link
          to="/spares-service/machineries"
          className="rounded-lg bg-[#ff7a00] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#e56d00]"
        >
          ← Back to Machineries
        </Link>
      </div>
    );
  }

  return (
    <div className="machine-detail-page-v2">
      {/* HERO SECTION */}
      <div className="detail-hero">
        <div className="container">
          <span className="badge">{machine.category_name || 'Industrial Grade'}</span>
          <h1>{machine.machine_name}</h1>
        </div>
      </div>

      {/* DETAIL CONTENT */}
      <div className="detail-content">
        <div className="detail-grid">
          {/* MAIN LEFT COLUMN */}
          <div className="detail-main">
            {/* IMAGE CARD */}
            <div className="detail-image-card">
              <img
                src={resolveMachineImage(machine.image_url || machine.image)}
                alt={machine.machine_name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%23f1f5f9"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="bold" fill="%2364748b">Machine Image</text></svg>';
                }}
              />
            </div>

            {/* INFO CARD */}
            <div className="detail-info-card">
              <h3>Description & Technical Overview</h3>
              <p>{machine.description}</p>
            </div>
          </div>

          {/* SIDEBAR RIGHT COLUMN */}
          <div className="detail-sidebar">
            {/* SPECS CARD */}
            <div className="specs-card">
              <h3>Technical Specifications</h3>
              {Array.isArray(machine.specifications) && machine.specifications.length > 0 ? (
                <table className="specs-table">
                  <tbody>
                    {machine.specifications.map((spec, idx) => (
                      <tr key={idx}>
                        <td className="lbl">
                          {typeof spec === 'string' ? `Spec #${idx + 1}` : spec.key || spec.label || 'Parameter'}
                        </td>
                        <td className="val">
                          {typeof spec === 'string' ? spec : spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-xs text-slate-500">Standard industrial heavy-duty specifications apply.</p>
              )}
            </div>

            {/* CONTACT / QUOTE CARD */}
            <div className="contact-card-sidebar">
              <h3>Request Technical Quote</h3>
              <p>Contact our engineering experts for customized capacity and installation quotes.</p>
              <button
                type="button"
                onClick={() => setIsInquiryOpen(true)}
                className="sidebar-btn"
              >
                GET A QUOTE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Modal */}
      {isInquiryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl text-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <h3 className="text-lg font-extrabold text-slate-900">Machine Inquiry Form</h3>
              <button onClick={() => setIsInquiryOpen(false)} className="text-slate-400 hover:text-slate-700 font-bold">
                ✕
              </button>
            </div>

            {inquirySuccess ? (
              <div className="py-8 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 font-bold text-xl">
                  ✓
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Inquiry Submitted!</h4>
                <p className="text-xs text-slate-600 mb-6">
                  Thank you. Our engineering team will review your requirements for <strong>{machine.machine_name}</strong> and reply shortly.
                </p>
                <button
                  onClick={() => {
                    setIsInquiryOpen(false);
                    setInquirySuccess(false);
                  }}
                  className="rounded-lg bg-[#ff7a00] px-6 py-2.5 text-xs font-bold uppercase text-white hover:bg-[#e56d00]"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                {inquiryError && (
                  <div className="rounded-lg bg-red-50 p-3 text-xs text-red-700">
                    {inquiryError}
                  </div>
                )}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={inquiryForm.fullName}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, fullName: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-xs focus:border-[#ff7a00] focus:outline-none"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={inquiryForm.email}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-xs focus:border-[#ff7a00] focus:outline-none"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Phone / WhatsApp</label>
                  <input
                    type="text"
                    value={inquiryForm.phone}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-xs focus:border-[#ff7a00] focus:outline-none"
                    placeholder="+91 98987 27796"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Requirements *</label>
                  <textarea
                    rows="3"
                    required
                    value={inquiryForm.message}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-xs focus:border-[#ff7a00] focus:outline-none"
                    placeholder="Specify production capacity, bottle sizes, pouch types..."
                  ></textarea>
                </div>
                <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setIsInquiryOpen(false)}
                    className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={inquirySubmitting}
                    className="rounded-lg bg-[#ff7a00] px-5 py-2 text-xs font-bold uppercase text-white hover:bg-[#e56d00] disabled:opacity-50"
                  >
                    {inquirySubmitting ? 'Submitting...' : 'Submit Inquiry'}
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
