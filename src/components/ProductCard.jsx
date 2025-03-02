import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import './ProductCard.css';


const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <div className="relative bg-white rounded-lg shadow-md transition-transform transform-gpu hover:shadow-xl hover:-translate-y-1 max-w-[300px] w-full overflow-hidden">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <img
          src={product.image_url || 'https://via.placeholder.com/400x300?text=Product+Image'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=Product+Image';
          }}
        />
        {/* Stock Alert Badge */}
        {product.stock <= 30 && (
          <span className="absolute top-2 right-2 bg-gradient-to-r from-danger-600 to-danger-700 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center justify-center shadow-sm">
            <span className="mr-1">!</span>Low Stock
          </span>
        )}
      </div>

      {/* Details Section */}
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {product.description || 'No description available.'}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-primary-600 text-lg font-medium">
            ${Number(product.price).toFixed(2)}
          </span>
          <span
            className={`text-sm font-medium ${
              product.stock <= 30 ? 'text-danger-600' : 'text-gray-600'
            }`}
            title={product.stock <= 30 ? 'Low stock alert' : ''}
          >
            {product.stock} in stock
          </span>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="absolute bottom-2 right-2 flex gap-2 z-10">
        <button
          className="rounded-full p-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md hover:shadow-lg transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          onClick={() => onEdit(product)}
          title="Edit Product"
        >
          <Pencil size={20} className="stroke-white" />
        </button>
        <button
          className="rounded-full p-2 bg-gradient-to-r from-danger-500 to-danger-600 text-white shadow-md hover:shadow-lg transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-danger-500 focus:ring-offset-2"
          onClick={() => onDelete(product.id)}
          title="Delete Product"
        >
          <Trash2 size={20} className="stroke-white" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;