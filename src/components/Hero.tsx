import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import logoImage from '../assests/logo.png';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
  <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient and animated elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-amber-50 to-amber-100">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23f7fafc%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      </div>

      

      <div className={`text-center z-10 px-6 transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img 
            src={logoImage} 
            alt="Wedding Logo" 
            className="h-32 md:h-40 lg:h-56 animate-fade-in"
            style={{ animationDuration: '1.5s' }}
          />
        </div>
        
        {/* Main title */}
        <div className="mb-8">
          <h1 className="font-dancing text-5xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-[#d1a56b] via-[#b18339] to-[#d1a56b] mb-4 animate-shimmer">
            Hasini &amp; Sachin
          </h1>
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-[#b18339] to-transparent w-16"></div>
            <Heart className="text-[#b18339] animate-pulse" size={30} />
            <div className="h-px bg-gradient-to-r from-transparent via-[#b18339] to-transparent w-16"></div>
          </div>
        </div>

        {/* Event info */}
        <div className="max-w-xl mx-auto text-center">
          <div className="mb-8">
            <p className="font-great-vibes text-3xl md:text-4xl text-[#b18339] mb-3 leading-tight">
              We are getting married
            </p>
            <h3 className="font-semibold tracking-wide text-[#b18339] mb-2 text-lg md:text-xl">
              October 02, 2025
            </h3>
            <p className="text-[#c19452] text-sm md:text-base leading-relaxed">
              Thursday | 9:00 AM onwards
            </p>
          </div>
          <div className="h-px w-24 mx-auto mb-4 bg-gradient-to-r from-transparent via-[#b18339]/40 to-transparent" />
      
            <p className="text-sm  text-[#b18339]/80 mb-3">at</p>
            <h3 className="font-semibold tracking-wide text-[#b18339] mb-2 text-lg md:text-xl">
              Hotel Green Court
            </h3>
            <p className="text-[#c19452] text-sm md:text-base leading-relaxed">
              <span className="block">Grand Ballroom – 2nd Floor</span>
              <span className="block">Homagama</span>
            </p>
    
        </div>
        

  {/* Scroll indicator */}
  <div className="mt-10 md:mt-16 animate-bounce">
          <div className="w-6 h-10 border-2 border-amber-600 rounded-full mx-auto relative">
            <div className="w-1 h-2 bg-amber-600 rounded-full mx-auto mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;