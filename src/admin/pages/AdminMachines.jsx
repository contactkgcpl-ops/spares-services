import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import {
  fetchMachines,
  fetchMachineCategories,
  createMachine,
  updateMachine,
  deleteMachine,
} from '../services/machineService';

export default function AdminMachines() {
  const [machines, setMachines] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMachine, setEditingMachine] = useState(null);
  const [deleteId, setDeleteId] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    machine_name: '',
    category_id: '',
    description: '',
    image_url: '',
    specifications: '',
  });
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      setError('');
      const [machData, catData] = await Promise.all([
        fetchMachines(),
        fetchMachineCategories(),
      ]);
      setMachines(machData);
      setCategories(catData);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load machines data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openAddModal = () => {
    setEditingMachine(null);
    setFormData({
      machine_name: '',
      category_id: categories[0]?.id || '',
      description: '',
      image_url: '',
      specifications: '[\n  "High Speed Automated Operation",\n  "Stainless Steel SS304 Construction"\n]',
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (machine) => {
    setEditingMachine(machine);
    setFormData({
      machine_name: machine.machine_name || '',
      category_id: machine.category_db_id || machine.category_id || '',
      description: machine.description || '',
      image_url: machine.image_url || machine.image || '',
      specifications: JSON.stringify(machine.specifications || [], null, 2),
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image_url: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!formData.machine_name.trim()) {
      setFormError('Machine Name is required');
      return;
    }
    if (!formData.category_id) {
      setFormError('Please select a valid Category');
      return;
    }

    let parsedSpecs = [];
    if (formData.specifications.trim()) {
      try {
        parsedSpecs = JSON.parse(formData.specifications);
      } catch (jsonErr) {
        setFormError('Specifications must be valid JSON array (e.g. ["Spec 1", "Spec 2"])');
        return;
      }
    }

    try {
      setSubmitting(true);
      const payload = {
        machine_name: formData.machine_name,
        category_id: formData.category_id,
        description: formData.description,
        image_url: formData.image_url,
        specifications: parsedSpecs,
      };

      if (editingMachine) {
        await updateMachine(editingMachine.id, payload);
      } else {
        await createMachine(payload);
      }

      setIsModalOpen(false);
      await loadData();
    } catch (err) {
      setFormError(err?.response?.data?.message || 'Failed to save machine');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteMachine(deleteId);
      setDeleteId('');
      await loadData();
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to delete machine');
    }
  };

  const filteredMachines = machines.filter((m) =>
    (m.machine_name || '').toLowerCase().includes(search.toLowerCase()) ||
    (m.category_name || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <Header title="Machine Machines Management" />
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
              Machine Machines ({filteredMachines.length})
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search machines..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[#f47c20] focus:outline-none"
            />
            <button
              onClick={openAddModal}
              className="rounded-lg bg-[#f47c20] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#dc6e19]"
            >
              + Add Machine
            </button>
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
                <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Image</th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Machine Name</th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Category</th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-4 py-10 text-center text-sm text-slate-500">Loading machines...</td>
                </tr>
              ) : filteredMachines.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-4 py-10 text-center text-sm text-slate-500">No machine machines found.</td>
                </tr>
              ) : (
                filteredMachines.map((item) => (
                  <tr key={item.id} className="hover:bg-[#f8fafc]">
                    <td className="px-4 py-3">
                      <img
                        src={item.image || item.image_url}
                        alt={item.machine_name}
                        className="h-12 w-12 rounded-lg object-cover border border-slate-200"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/60?text=Machine'; }}
                      />
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-slate-900">{item.machine_name}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                        {item.category_name || 'General'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => openEditModal(item)}
                          className="font-medium text-[#f47c20] hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteId(item.id)}
                          className="font-medium text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Machine Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              {editingMachine ? 'Edit Machine' : 'Add New Machine'}
            </h3>

            {formError && (
              <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Machine Name *</label>
                <input
                  type="text"
                  required
                  value={formData.machine_name}
                  onChange={(e) => setFormData({ ...formData, machine_name: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-[#f47c20] focus:outline-none"
                  placeholder="e.g. Automatic Cup Filling & Sealing Machine"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Category *</label>
                <select
                  value={formData.category_id}
                  onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-[#f47c20] focus:outline-none"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Description *</label>
                <textarea
                  rows="4"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-[#f47c20] focus:outline-none"
                  placeholder="Detailed description of machine capabilities and usage..."
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Machine Image *</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-xs text-slate-500 file:mr-4 file:rounded-lg file:border-0 file:bg-slate-100 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-slate-700 hover:file:bg-slate-200"
                />
                {formData.image_url && (
                  <img
                    src={formData.image_url}
                    alt="Preview"
                    className="mt-2 h-20 w-20 rounded-lg object-cover border border-slate-200"
                  />
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Specifications (JSON Array)</label>
                <textarea
                  rows="4"
                  value={formData.specifications}
                  onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
                  className="w-full font-mono text-xs rounded-lg border border-slate-300 px-3.5 py-2 focus:border-[#f47c20] focus:outline-none bg-slate-50"
                  placeholder='["Capacity: 1000 PPH", "Power: 5 kW"]'
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-lg bg-[#f47c20] px-5 py-2 text-sm font-semibold text-white hover:bg-[#dc6e19] disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : editingMachine ? 'Update Machine' : 'Create Machine'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteConfirmModal
        open={Boolean(deleteId)}
        onCancel={() => setDeleteId('')}
        onConfirm={handleDelete}
      />
    </div>
  );
}
