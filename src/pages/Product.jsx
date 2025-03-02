import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Download } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'ACTIPP 40 mg',
    description: 'Pantoprazole 40 mg gastro-resistant tablets',
    category: 'Gastroenterology',
    image: '/assets/products/actipp-40.jpg',
    details: [
      'Treatment of acid-related disorders',
      'Once daily dosing',
      'High bioavailability',
      'Well-tolerated safety profile'
    ]
  },
  {
    id: 2,
    name: 'ACTIPP 20 mg',
    description: 'Pantoprazole 20 mg gastro-resistant tablets',
    category: 'Gastroenterology',
    image: '/assets/products/actipp-20.jpg',
    details: [
      'Treatment of mild acid reflux',
      'Once daily dosing',
      'High bioavailability',
      'Well-tolerated safety profile'
    ]
  },
  {
    id: 3,
    name: 'Cardiocine 100 mg',
    description: 'Acetylsalicylic acid 100 mg tablets',
    category: 'Cardiology',
    image: '/assets/products/cardiocine.jpg',
    details: [
      'Prevention of cardiovascular events',
      'Once daily dosing',
      'Enteric-coated formulation',
      'Proven efficacy profile'
    ]
  },
  {
    id: 4,
    name: 'NeuroPain Relief',
    description: 'Advanced pain management solution',
    category: 'Neurology',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    details: [
      'Targeted pain relief',
      'Rapid onset of action',
      'Extended release formula',
      'Minimal side effects'
    ]
  },
  {
    id: 5,
    name: 'RespiClear',
    description: 'Respiratory care solution',
    category: 'Pulmonology',
    image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    details: [
      'Bronchodilator action',
      'Quick symptom relief',
      '24-hour effectiveness',
      'Easy-to-use inhaler device'
    ]
  }
];

const Product = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Our Products
            </h1>
            <p className="text-xl text-gray-600">
              Innovative pharmaceutical solutions for better healthcare
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {products.map((product) => (
              <div 
                key={product.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="aspect-w-16 aspect-h-9 relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/800x600?text=Product+Image';
                    }}
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-primary-500 text-white text-sm font-medium rounded-full">
                      {product.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {product.description}
                  </p>
                  <div className="space-y-2">
                    {product.details.map((detail, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-primary-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-600">{detail}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <button className="w-full px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Need More Information?
            </h2>
            <p className="text-gray-600 mb-8">
              Contact our team for detailed product information, pricing, and availability.
            </p>
            <button className="inline-flex items-center justify-center px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
              Contact Sales Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Product;