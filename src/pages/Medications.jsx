import React, { useState, useEffect } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  X,
  AlertTriangle,
  Search,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import Modal from '../components/Modal';
import ProductCard from '../components/ProductCard';
import useMedications from '../hooks/useMedications';

const COLORS = ['#2563eb', '#1d4ed8', '#1e40af', '#1e3a8a', '#1c2d50'];

const Medications = () => {
  const { products, loading, error, addProduct, editProduct, deleteProduct } = useMedications();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    image: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Handle search and filtering
  useEffect(() => {
    if (products) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [products, searchTerm]);

  const handleAddNew = () => {
    setCurrentProduct(null);
    setFormData({
      name: '',
      description: '',
      category: '',
      price: '',
      stock: '',
      image: '',
    });
    setIsModalOpen(true);
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setFormData(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(productId);
      setCurrentPage(1); // Reset pagination after deletion
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentProduct) {
      await editProduct(currentProduct.id, formData);
    } else {
      await addProduct(formData);
    }
    setIsModalOpen(false);
    setCurrentPage(1); // Reset pagination after addition or update
  };

  const lowStockItems = filteredProducts.filter((product) => product.stock <= 30);

  const stockLevelData = filteredProducts.map((product) => ({
    name: product.name,
    stock: product.stock,
  }));

  const categoryStockData = filteredProducts.reduce((acc, product) => {
    const category = product.category || 'Uncategorized';
    if (!acc[category]) acc[category] = 0;
    acc[category] += product.stock;
    return acc;
  }, {});

  const pieChartData = Object.keys(categoryStockData).map((category) => ({
    name: category,
    value: categoryStockData[category],
  }));

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Medications</h1>
        <button
          onClick={handleAddNew}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Stock Level Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Stock Level Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stockLevelData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} />
              <Bar dataKey="stock" fill="url(#colorStock)" />
              <defs>
                <linearGradient id="colorStock" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0.8} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Stock by Category */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Stock by Category
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#2563eb"
                label
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Low Stock Alerts */}
      {lowStockItems.length > 0 && (
        <div className="mb-6 bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
          <div className="flex items-center mb-2">
            <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
            <h2 className="text-lg font-semibold text-red-700">Low Stock Alerts</h2>
          </div>
          <div className="space-y-2">
            {lowStockItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm"
              >
                <div>
                  <h3 className="font-medium text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.category}</p>
                </div>
                <span className="text-red-600 font-medium">{item.stock} units</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-l-md hover:bg-gray-300"
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-gray-100 text-gray-700">
          Page {currentPage}
        </span>
        <button
          disabled={currentItems.length < itemsPerPage}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-r-md hover:bg-gray-300"
        >
          Next
        </button>
      </div>

      {/* Modal for Adding/Editting Products */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {currentProduct ? 'Edit Medication' : 'Add Medication'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* Other form fields */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              {currentProduct ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Medications;