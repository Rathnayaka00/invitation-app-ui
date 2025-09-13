import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-[#9f7433] to-[#b18339] text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col items-center text-center gap-3">
          <div className="flex items-center justify-center mb-2">
            <Heart className="w-6 h-6 mr-2" />
            <span className="ml-2 text-2xl md:text-3xl font-dancing">Hasini &amp; Sachin</span>
          </div>
          <p className="text-amber-100 text-sm leading-relaxed max-w-xl mb-4">
            Thank you for being part of our love story. Your presence will make our special day complete.
          </p>
        </div>

        {/* Divider */}
        <div >
          <div className="text-center">
            <p className="text-amber-100 text-xs">
               © 2025 All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;