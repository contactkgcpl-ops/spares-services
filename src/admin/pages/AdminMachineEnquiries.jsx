import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { fetchMachineEnquiries } from '../services/machineService';

export default function AdminMachineEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  useEffect(() => {
    const loadEnquiries = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await fetchMachineEnquiries();
        setEnquiries(data);
      } catch (err) {
        setError(err?.response?.data?.message || 'Failed to load machine enquiries');
      } finally {
        setLoading(false);
      }
    };
    loadEnquiries();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header title="Machine Enquiries" />
      <div className="p-6 py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/admin/dashboard"
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:border-[#f47c20] hover:text-[#f47c20]"
            >
              ← Back to Dashboard
            </Link>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">
              Machine Customer Enquiries ({enquiries.length})
            </h2>
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-[#f8fafc]">
              <tr>
                <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Date</th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Customer Name</th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Contact</th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Subject</th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-4 py-10 text-center text-sm text-slate-500">Loading enquiries...</td>
                </tr>
              ) : enquiries.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-10 text-center text-sm text-slate-500">No machine enquiries submitted yet.</td>
                </tr>
              ) : (
                enquiries.map((item) => (
                  <tr key={item.id} className="hover:bg-[#f8fafc]">
                    <td className="px-4 py-3 text-xs text-slate-500">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-900">
                      {item.full_name}
                      {item.company_name && (
                        <span className="block text-xs font-normal text-slate-500">{item.company_name}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-600">
                      <div>{item.email}</div>
                      {item.phone && <div className="text-slate-400">{item.phone}</div>}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700 font-medium">{item.subject}</td>
                    <td className="px-4 py-3 text-sm">
                      <button
                        onClick={() => setSelectedEnquiry(item)}
                        className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 hover:bg-[#f47c20] hover:text-white transition-colors"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <h3 className="text-lg font-bold text-slate-900">Enquiry Details</h3>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-bold text-slate-500 text-xs block uppercase">From</span>
                <p className="font-semibold text-slate-900">{selectedEnquiry.full_name} ({selectedEnquiry.email})</p>
                {selectedEnquiry.company_name && <p className="text-xs text-slate-600">Company: {selectedEnquiry.company_name}</p>}
                {selectedEnquiry.phone && <p className="text-xs text-slate-600">Phone: {selectedEnquiry.phone}</p>}
              </div>
              <div>
                <span className="font-bold text-slate-500 text-xs block uppercase">Subject</span>
                <p className="font-semibold text-slate-900">{selectedEnquiry.subject}</p>
              </div>
              <div>
                <span className="font-bold text-slate-500 text-xs block uppercase mb-1">Message</span>
                <div className="rounded-lg bg-slate-50 p-3 text-slate-700 whitespace-pre-wrap border border-slate-200">
                  {selectedEnquiry.message}
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="rounded-lg bg-[#f47c20] px-4 py-2 text-sm font-semibold text-white hover:bg-[#dc6e19]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
