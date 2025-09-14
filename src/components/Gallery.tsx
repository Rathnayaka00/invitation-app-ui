import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Pic1 from '../assests/pic1.jpg';
import Pic2 from '../assests/pic2.jpg';
import Pic3 from '../assests/pic3.jpg';
import Pic4 from '../assests/pic4.jpg';


const Gallery = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Placeholder images - in a real app, these would be actual wedding photos
  const images = [
    {
      src: Pic2,
      alt: 'Hasini & Sachin - Pre-shoot 1'
    },
    {
      src: Pic4,
      alt: 'Hasini & Sachin - Pre-shoot 2'
    },
    {
      src: Pic1,
      alt: 'Hasini & Sachin - Pre-shoot 3'
    }
  ];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const openLightbox = (index: number) => {
    setCurrentImage(index);
    setIsLightboxOpen(true);
  };

  // Auto-advance carousel every 4 seconds; pause on hover or when lightbox is open
  useEffect(() => {
    if (isLightboxOpen || isHovered) return;
    const id = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(id);
  }, [isLightboxOpen, isHovered, images.length]);

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-white to-amber-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-dancing text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#d1a56b]  to-[#b18339] mb-4">
            Our Journey
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our journey together, captured in moments of pure love. So excited to share a glimpse of our pre-shoot photos.
          </p>
        </div>

        {/* Main carousel */}
        <div className="relative max-w-4xl mx-auto mb-12">
          <div
            className="relative overflow-hidden rounded-2xl shadow-2xl aspect-video"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              src={images[currentImage].src}
              alt={images[currentImage].alt}
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => openLightbox(currentImage)}
            />
            
            {/* Golden frame overlay */}
            <div className="absolute inset-0 border-4 border-amber-400/30 rounded-2xl pointer-events-none"></div>
            
            {/* Navigation arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="text-amber-600" size={24} />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="text-amber-600" size={24} />
            </button>
          </div>

          {/* Image counter */}
          <div className="text-center mt-4">
            <span className="text-gray-500 text-sm">
              {currentImage + 1} / {images.length}
            </span>
          </div>
        </div>

        {/* Lightbox */}
        {isLightboxOpen && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
            <div className="relative max-w-5xl max-h-5xl">
              <img
                src={images[currentImage].src}
                alt={images[currentImage].alt}
                className="max-w-full max-h-full object-contain"
              />
              
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 transition-all duration-300"
              >
                <X className="text-gray-800" size={24} />
              </button>
              
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 transition-all duration-300"
              >
                <ChevronLeft className="text-gray-800" size={24} />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 transition-all duration-300"
              >
                <ChevronRight className="text-gray-800" size={24} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;