import React from 'react';

const teamMembers = [
  {
    name: 'Dr. Sarah Johnson',
    role: 'Chief Executive Officer',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80',
    bio: 'With over 15 years of experience in pharmaceutical leadership, Dr. Johnson drives our vision for innovative healthcare solutions.'
  },
  {
    name: 'Dr. Michael Chen',
    role: 'Head of Research & Development',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80',
    bio: 'Leading our R&D initiatives, Dr. Chen brings cutting-edge pharmaceutical research to life with his extensive background in drug development.'
  },
  {
    name: 'Dr. Emma Martinez',
    role: 'Chief Medical Officer',
    image: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80',
    bio: 'Dr. Martinez ensures our products meet the highest medical standards while focusing on patient safety and efficacy.'
  }
];

const milestones = [
  {
    year: '1998',
    title: 'Company Founded',
    description: 'ACT Pharma was established with a vision to revolutionize healthcare.'
  },
  {
    year: '2005',
    title: 'International Expansion',
    description: 'Expanded operations to multiple countries across North Africa.'
  },
  {
    year: '2012',
    title: 'Research Innovation',
    description: 'Opened state-of-the-art R&D facility in Tunis.'
  },
  {
    year: '2023',
    title: 'Digital Transformation',
    description: 'Implemented cutting-edge technology across all operations.'
  }
];

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white py-24">
        <div className="absolute inset-0 bg-blue-700 opacity-90"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              About ACT Pharma
            </h1>
            <p className="text-xl text-blue-100">
              Leading the way in pharmaceutical innovation and healthcare solutions since 1998
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-blue-50 to-transparent"></div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all border-t-4 border-blue-500">
              <h2 className="text-2xl font-bold text-blue-800 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To provide high-quality, innovative pharmaceutical solutions that improve 
                people's lives while maintaining the highest standards of safety and efficacy.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all border-t-4 border-blue-500">
              <h2 className="text-2xl font-bold text-blue-800 mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                To be a leading global pharmaceutical company recognized for our commitment 
                to innovation, quality, and patient care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">Our Core Values</h2>
            <p className="text-gray-600">The principles that guide everything we do</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-blue-800 mb-3 text-center">Quality</h3>
              <p className="text-gray-600 text-center">
                Maintaining the highest standards in all our products and processes.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-blue-800 mb-3 text-center">Innovation</h3>
              <p className="text-gray-600 text-center">
                Continuously seeking new ways to improve healthcare solutions.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-blue-800 mb-3 text-center">Integrity</h3>
              <p className="text-gray-600 text-center">
                Operating with transparency and ethical principles in all we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">Our Journey</h2>
            <p className="text-gray-600">Milestones that shaped our success</p>
          </div>
          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start mb-8 last:mb-0">
                <div className="flex-shrink-0 w-24 text-right mr-8">
                  <span className="text-blue-600 font-bold">{milestone.year}</span>
                </div>
                <div className="flex-grow bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-blue-500">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">Our Leadership Team</h2>
            <p className="text-gray-600">Meet the experts behind our success</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all text-center group">
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transform transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-blue-600 bg-opacity-0 group-hover:bg-opacity-20 transition-opacity"></div>
                </div>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">{member.name}</h3>
                <p className="text-blue-600 mb-4">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
            <p className="text-blue-100 mb-8">
              We're always looking for talented individuals who share our passion for innovation
              and commitment to improving healthcare.
            </p>
            <button className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold shadow-lg hover:shadow-xl">
              View Career Opportunities
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;