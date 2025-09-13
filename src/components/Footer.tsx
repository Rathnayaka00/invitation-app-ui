import { Phone} from 'lucide-react';
import logoImage from '../assests/logo.png';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-[#9f7433] to-[#b18339] text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Couple Info */}
          <div>
            <div className="flex items-center justify-center md:justify-start mb-4">
              <img src={logoImage} alt="HS Logo" className="h-7 w-auto md:h-9 select-none" />
              <span className="text-2xl font-dancing">Hasini & Sachin</span>
            </div>
            <p className="text-amber-100 text-sm leading-relaxed">
              Thank you for being part of our love story. Your presence will make our special day complete.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-2 text-sm text-amber-100">
              <p className="flex items-center justify-center md:justify-start">
                <Phone className="w-4 h-4 mr-2" />
               Hasini : +94 76 672 1005
              </p>
              <p className="flex items-center justify-center md:justify-start">
                <Phone className="w-4 h-4 mr-2" />
               Sachin : +94 77 190 8356
              </p>
            </div>
          </div>

          {/* Event Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Wedding Day</h4>
            <div className="space-y-2 text-sm text-amber-100">
              <p>Thursday, October 02, 2025</p>
              <p>9:00 AM onwards</p>
              <p>Hotel Green Court</p>
              <p>Grand Ballroom - 2nd Floor</p>
              <p>Homagam,Sri Lanka</p>
            
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-amber-700 mt-8 pt-8">
          <div className="text-center">
            <p className="text-amber-200 text-sm mb-4">
              "Love is not just looking at each other, it's looking in the same direction together"
            </p>
            <p className="text-amber-300 text-xs">
              © 2025 Hasini & Sachin Wedding. Made with ❤️ for our special day.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;