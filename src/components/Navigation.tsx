import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logoImage from '../assests/logo.png';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

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
          <button
            onClick={() => navigate('/admin')}
            className={`text-sm font-semibold px-3 py-1.5 rounded-lg border transition-colors duration-300 ${
              isScrolled ? 'border-amber-300 text-amber-800 hover:bg-amber-100' : 'border-amber-300 text-amber-900 hover:bg-amber-100'
            }`}
          >
            Login
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-amber-800 hover:text-amber-700"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((v) => !v)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile compact dropdown menu */}
      {isOpen && (
        <>
          {/* Invisible backdrop to close when clicking outside */}
          <div
            className="fixed inset-0 z-[45] md:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          {/* Dropdown panel anchored below navbar */}
          <div className="md:hidden absolute right-4 top-full mt-2 z-[50] w-64 rounded-2xl border border-amber-100 shadow-xl overflow-hidden bg-gradient-to-b from-amber-50 to-amber-100">
            <div className="py-2">
              {[
                { name: 'Home', id: 'hero' },
                { name: 'Gallery', id: 'gallery' },
                { name: 'Details', id: 'details' },
                { name: 'RSVP', id: 'rsvp' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-3 text-[15px] font-medium text-amber-800 hover:bg-amber-100/70"
                  role="menuitem"
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => { setIsOpen(false); navigate('/admin'); }}
                className="block w-full text-left px-4 py-3 text-[15px] font-semibold text-amber-900 hover:bg-amber-100/70"
                role="menuitem"
              >
                Login
              </button>
            </div>
            <div className="border-t border-amber-200/70" />
            <div className="p-3">
              <button
                onClick={() => scrollToSection('rsvp')}
                className="w-full py-3 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-[#9f7433] to-[#b18339] hover:from-[#b18339] hover:to-[#8d652d] shadow"
              >
                Send RSVP
              </button>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navigation;