import Image from 'next/image';

const Facilities = () => {
  const facilities = [
    {
      title: 'Main Training Ground',
      description: 'FIFA standard artificial turf with multiple training areas',
      image: '/images/facilities/football-pitch.jpg',
    },
    {
      title: 'Rest Space',
      description: 'Comfortable indoor facility for relaxation and recovery',
      image: '/images/facilities/indoors.jpg',
    },
    {
      title: 'Modern Gym Facility',
      description: 'Modern gym equipment for strength and conditioning',
      image: '/images/facilities/gym.jpg',
    },
    {
      title: 'Swimming Pool',
      description: '5m x 10m pool for swimming instruction and water safety',
      image: '/images/facilities/pool.jpg',
    },
  ];

  const scrollToCTA = () => {
    const ctaSection = document.getElementById('cta');
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-green-900 to-green-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white text-center mb-4">
          World-Class Facilities
        </h2>
        <p className="text-lg text-gray-200 text-center mb-12">
          Train in our state-of-the-art facilities at Mono Liza Sports Centre
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-xl bg-green-700 shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="aspect-w-16 aspect-h-9 relative">
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">{facility.title}</h3>
                <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  {facility.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="bg-green-700 rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-semibold text-white mb-4">Training Areas</h3>
            <p className="text-gray-200">Dedicated spaces for specific skill development, including technical training zones and tactical analysis areas.</p>
          </div>
          <div className="bg-green-700 rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-semibold text-white mb-4">Additional Amenities</h3>
            <p className="text-gray-200">Modern changing rooms and video analysis suite for comprehensive player development.</p>
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <button
            onClick={scrollToCTA}
            className="bg-white text-green-800 hover:bg-green-100 border-2 border-green-800 px-8 py-3 rounded-lg font-semibold text-lg shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Start Your Journey Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default Facilities;