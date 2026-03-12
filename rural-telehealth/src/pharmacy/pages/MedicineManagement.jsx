import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Minus, Search, Pill, CheckCircle, X } from 'lucide-react';

const initialMedicines = [
  { id: 1, name: 'Paracetamol 500mg', category: 'Pain Relief', price: 12, quantity: 120 },
  { id: 2, name: 'Amoxicillin 500mg', category: 'Antibiotic', price: 45, quantity: 80 },
  { id: 3, name: 'Cetirizine 10mg', category: 'Allergy', price: 8, quantity: 200 },
  { id: 4, name: 'Metformin 500mg', category: 'Diabetes', price: 25, quantity: 0 },
  { id: 5, name: 'Amlodipine 5mg', category: 'Blood Pressure', price: 30, quantity: 50 },
];

const emptyForm = { name: '', category: '', price: '', quantity: '' };

const MedicineManagement = () => {
  const [medicines, setMedicines] = useState(initialMedicines);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = medicines.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const openAddForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (med) => {
    setForm({ name: med.name, category: med.category, price: String(med.price), quantity: String(med.quantity) });
    setEditingId(med.id);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const entry = {
      name: form.name,
      category: form.category,
      price: Number(form.price),
      quantity: Number(form.quantity),
    };

    if (editingId) {
      setMedicines((prev) => prev.map((m) => (m.id === editingId ? { ...m, ...entry } : m)));
    } else {
      setMedicines((prev) => [...prev, { ...entry, id: Date.now() }]);
    }
    closeForm();
  };

  const handleDelete = (id) => {
    setMedicines((prev) => prev.filter((m) => m.id !== id));
  };

  const adjustQuantity = (id, delta) => {
    setMedicines((prev) =>
      prev.map((m) => (m.id === id ? { ...m, quantity: Math.max(0, m.quantity + delta) } : m))
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Medicine Inventory</h2>
          <p className="text-slate-500 mt-1">Add, edit, remove medicines and manage stock.</p>
        </div>
        <button
          onClick={openAddForm}
          className="flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-bold transition-colors shadow-sm shrink-0"
        >
          <Plus size={20} /> Add Medicine
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input
          type="text"
          placeholder="Search by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 text-lg border-2 border-slate-200 rounded-xl focus:border-primary focus:outline-none transition-colors"
        />
      </div>

      {/* Add / Edit Form Modal */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border-2 border-primary/30 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-800">
              {editingId ? 'Edit Medicine' : 'Add New Medicine'}
            </h3>
            <button onClick={closeForm} className="text-slate-400 hover:text-slate-600 transition-colors">
              <X size={22} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              required
              placeholder="Medicine name"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-primary focus:outline-none transition-colors"
            />
            <input
              type="text"
              required
              placeholder="Category (e.g. Pain Relief)"
              value={form.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-primary focus:outline-none transition-colors"
            />
            <input
              type="number"
              required
              min="0"
              placeholder="Price (₹)"
              value={form.price}
              onChange={(e) => handleChange('price', e.target.value)}
              className="px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-primary focus:outline-none transition-colors"
            />
            <input
              type="number"
              required
              min="0"
              placeholder="Quantity"
              value={form.quantity}
              onChange={(e) => handleChange('quantity', e.target.value)}
              className="px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-primary focus:outline-none transition-colors"
            />
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-colors"
              >
                <CheckCircle size={20} /> {editingId ? 'Update Medicine' : 'Add Medicine'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Medicine List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <Pill size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-xl font-bold text-slate-800">No Medicines Found</h3>
          <p className="text-slate-500 mt-1">Try a different search or add a new medicine.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((med) => (
            <div
              key={med.id}
              className={`bg-white rounded-xl border shadow-sm p-5 flex flex-col md:flex-row md:items-center gap-4 ${
                med.quantity === 0 ? 'border-l-4 border-l-emergencyRed border-slate-200' : 'border-slate-200'
              }`}
            >
              {/* Medicine Info */}
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <div className={`p-3 rounded-full shrink-0 ${med.quantity > 0 ? 'bg-primary/10 text-primary' : 'bg-red-100 text-emergencyRed'}`}>
                  <Pill size={22} />
                </div>
                <div className="flex-1 min-w-0">
                  <strong className="text-lg text-slate-900 block">{med.name}</strong>
                  <span className="text-sm text-primary font-medium">{med.category}</span>
                  <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                    <span>₹{med.price}</span>
                    <span className={`font-bold ${med.quantity > 0 ? 'text-softGreen' : 'text-emergencyRed'}`}>
                      {med.quantity > 0 ? `${med.quantity} in stock` : 'Out of stock'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => adjustQuantity(med.id, -1)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-600 p-2.5 rounded-lg transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="w-12 text-center font-bold text-lg text-slate-800">{med.quantity}</span>
                <button
                  onClick={() => adjustQuantity(med.id, 1)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-600 p-2.5 rounded-lg transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>

              {/* Edit & Delete */}
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => openEditForm(med)}
                  className="bg-white hover:bg-slate-100 text-slate-600 px-4 py-2.5 rounded-lg font-bold border border-slate-200 transition-colors flex items-center gap-2"
                >
                  <Pencil size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(med.id)}
                  className="bg-white hover:bg-red-50 text-emergencyRed px-4 py-2.5 rounded-lg font-bold border border-slate-200 hover:border-red-300 transition-colors flex items-center gap-2"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MedicineManagement;
