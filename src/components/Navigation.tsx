import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logoImage from '../assests/logo.png';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarEl = document.querySelector('nav') as HTMLElement | null;
      const navbarHeight = navbarEl?.offsetHeight ?? 96; // Use actual navbar height
      const elementPosition = element.offsetTop - navbarHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 h-10 md:h-14 ${
      isScrolled 
        ? 'bg-gradient-to-r from-amber-50 via-amber-100 to-amber-50 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        {/* Left: Logo */}
        <button onClick={() => scrollToSection('hero')} className="flex items-center gap-2">
          <img src={logoImage} alt="HS Logo" className="h-7 w-auto md:h-9 select-none" />
          <span className="hidden sm:block font-dancing text-xl text-[#b18339]">Hasini &amp; Sachin</span>
        </button>

        {/* Right: Nav (desktop) */}
        <div className="hidden md:flex items-center space-x-8">
          {[
            { name: 'Home', id: 'hero' },
            { name: 'Gallery', id: 'gallery' },
            { name: 'Details', id: 'details' },
            { name: 'RSVP', id: 'rsvp' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-sm font-medium transition-colors duration-300 ${
                isScrolled 
                ? 'text-amber-700 hover:text-amber-600 font-semibold' 
                : 'text-amber-800 hover:text-amber-700 font-semibold'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-amber-800 hover:text-amber-700"
          aria-label="Toggle menu"
          onClick={() => setIsOpen((v) => !v)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-amber-50/95 to-amber-100/95 backdrop-blur-sm shadow">
          <div className="container mx-auto px-6 py-3 flex flex-col space-y-2">
            {[
              { name: 'Home', id: 'hero' },
              { name: 'Gallery', id: 'gallery' },
              { name: 'Details', id: 'details' },
              { name: 'RSVP', id: 'rsvp' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-base text-left font-medium py-1 transition-colors duration-300 ${
                  isScrolled 
                  ? 'text-amber-700 hover:text-amber-600' 
                  : 'text-amber-800 hover:text-amber-700'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;