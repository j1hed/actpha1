import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  {
    image: '/assets/slide1.jpg',
    title: 'Innovative Healthcare Solutions',
    description: 'Advancing healthcare through quality pharmaceutical products'
  },
  {
    image: '/assets/slide2.jpg',
    title: 'Quality Pharmaceutical Products',
    description: 'Committed to excellence in healthcare delivery'
  }
];

const Home = () => {
  console.log('Home component rendering'); // Debug log

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Slider */}
      <section className="relative h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="relative h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-25">
                <div className="container mx-auto px-4 h-full flex items-center">
                  <div className="max-w-3xl text-white">
                    <h1 className="text-5xl font-bold mb-6 opacity-100">
                      {slide.title}
                    </h1>
                    <p className="text-xl mb-8 opacity-100">
                      {slide.description}
                    </p>
                    <div className="flex gap-4">
                      <Link
                        to="/products"
                        className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all shadow-lg hover:shadow-xl"
                      >
                        Explore Products
                      </Link>
                      <Link
                        to="/about"
                        className="px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-primary-500 transition-all"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* Slider Navigation */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-all">
              <div className="text-4xl font-bold text-primary-500 mb-2">25+</div>
              <div className="text-gray-600">Years of Excellence</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-all">
              <div className="text-4xl font-bold text-primary-500 mb-2">50+</div>
              <div className="text-gray-600">Trusted Products</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-all">
              <div className="text-4xl font-bold text-primary-500 mb-2">100%</div>
              <div className="text-gray-600">Quality Commitment</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Featured Products</h2>
            <p className="text-gray-600">Discover our range of high-quality pharmaceutical solutions.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">ACTIPP 40 mg</h3>
              <p className="text-gray-600 mb-4">Pantoprazole 40 mg gastro-resistant tablets</p>
              <Link to="/products" className="text-primary-500 hover:text-primary-600 font-medium">
                Learn More →
              </Link>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Cardiocine 100 mg</h3>
              <p className="text-gray-600 mb-4">Acetylsalicylic acid 100 mg tablets</p>
              <Link to="/products" className="text-primary-500 hover:text-primary-600 font-medium">
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
              <p className="text-gray-600">We're here to help. Reach out to us for any inquiries.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-all">
                <div className="text-4xl mb-4">📞</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h4>
                <span className="text-gray-600">+216 71 432 144</span>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-all">
                <div className="text-4xl mb-4">✉️</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h4>
                <span className="text-gray-600">contact@actpharma-sa.com</span>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-all">
                <div className="text-4xl mb-4">📍</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Visit Us</h4>
                <span className="text-gray-600">Rue du Lac Victoria, Les Berges du Lac, Tunis</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
