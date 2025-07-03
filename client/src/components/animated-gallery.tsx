import { motion } from 'framer-motion';

const galleryImages = [
  // Row 1 - Moving Right
  [
    { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', text: 'ADVENTURE' },
    { url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', text: 'URBAN' },
    { url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', text: 'OCEAN' },
    { url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', text: 'NATURE' },
    { url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', text: 'DESERT' },
    { url: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', text: 'SPACE' },
  ],
  // Row 2 - Moving Left
  [
    { url: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', text: 'VINTAGE' },
    { url: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', text: 'COFFEE' },
    { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', text: 'SUNSET' },
    { url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', text: 'FITNESS' },
    { url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', text: 'ART' },
    { url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', text: 'TRAVEL' },
  ],
];

export default function AnimatedGallery() {
  return (
    <section className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-6"
        >
          Amazing{' '}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            designs
          </span>{' '}
          created daily
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-slate-400 text-center max-w-2xl mx-auto"
        >
          Join thousands of creators making viral content with our text-behind-image tool
        </motion.p>
      </div>

      {/* Row 1 - Moving Right */}
      <div className="relative mb-8">
        <motion.div 
          className="flex space-x-6"
          animate={{ x: [0, -1920] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
        >
          {[...galleryImages[0], ...galleryImages[0]].map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-80 h-64 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden shadow-xl relative group"
            >
              <img 
                src={image.url} 
                alt={`${image.text} text design`} 
                className="w-full h-full object-cover transition-transform group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <span className="text-white text-4xl font-bold opacity-75 drop-shadow-lg">
                  {image.text}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Row 2 - Moving Left (Slower) */}
      <div className="relative mb-8">
        <motion.div 
          className="flex space-x-6"
          animate={{ x: [-1920, 0] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 15,
              ease: "linear",
            },
          }}
        >
          {[...galleryImages[1], ...galleryImages[1]].map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-80 h-64 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden shadow-xl relative group"
            >
              <img 
                src={image.url} 
                alt={`${image.text} text design`} 
                className="w-full h-full object-cover transition-transform group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <span className="text-white text-4xl font-bold opacity-75 drop-shadow-lg">
                  {image.text}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
