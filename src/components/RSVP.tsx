import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Send, CheckCircle, Heart, Users, User } from 'lucide-react';

interface FormData {
  name: string;
  attendees: string;
  attendance: 'yes' | 'no' | '';
  message: string;
}

const RSVP = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    attendees: '1',
    attendance: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <section id="rsvp" className="py-12 md:py-20 bg-gradient-to-b from-amber-50 to-amber-100">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div>
              <CheckCircle className="text-amber-500 mx-auto mb-6" size={64} />
              <h2 className="font-dancing text-4xl md:text-5xl text-gray-800 mb-4">
                Thank You!
              </h2>
              <p className="text-gray-600 mb-6">
                {formData.attendance === 'yes' 
                  ? `We're thrilled that you'll be joining us on our special day, ${formData.name}!`
                  : `Thank you for letting us know, ${formData.name}. We'll miss you on our special day.`
                }
              </p>
              <div className="flex justify-center space-x-2">
                <Heart className="text-[#b18339]  animate-pulse" size={20} />
                <Heart className="text-[#b18339]  animate-pulse" size={20} style={{ animationDelay: '0.5s' }} />
                <Heart className="text-[#b18339]  animate-pulse" size={20} style={{ animationDelay: '1s' }} />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="py-12 md:py-20 bg-gradient-to-r from-amber-50 to-amber-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="font-dancing text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#d1a56b] to-[#b18339] mb-4">
            RSVP
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Please let us know if you'll be joining us for our special celebration. Your presence would mean the world to us!
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-10 shadow-xl">
            <div className="space-y-6">
              {/* Name field */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* Attendance field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Will you be attending? *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className={`block relative cursor-pointer transition-all duration-300 ${
                    formData.attendance === 'yes' ? 'scale-105' : ''
                  }`}>
                    <input
                      type="radio"
                      name="attendance"
                      value="yes"
                      checked={formData.attendance === 'yes'}
                      onChange={handleInputChange}
                      className="sr-only"
                      required
                    />
                    <div className={`p-4 rounded-lg border-2 text-center transition-all duration-300 flex flex-col items-center justify-center min-h-[56px] ${
                      formData.attendance === 'yes'
                        ? 'border-amber-500 bg-amber-50 text-amber-700'
                        : 'border-gray-300 hover:border-amber-300'
                    }`}>
                      <CheckCircle className="mx-auto mb-1" size={24} />
                      <span className="font-medium text-base">Yes</span>
                    </div>
                  </label>

                  <label className={`block relative cursor-pointer transition-all duration-300 ${
                    formData.attendance === 'no' ? 'scale-105' : ''
                  }`}>
                    <input
                      type="radio"
                      name="attendance"
                      value="no"
                      checked={formData.attendance === 'no'}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className={`p-4 rounded-lg border-2 text-center transition-all duration-300 flex flex-col items-center justify-center min-h-[56px] ${
                      formData.attendance === 'no'
                        ? 'border-amber-500 bg-amber-50 text-amber-700'
                        : 'border-gray-300 hover:border-amber-300'
                    }`}>
                      <Heart className="mx-auto mb-1" size={24} />
                      <span className="font-medium text-base">Sorry</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Number of attendees - only show if attending */}
              {formData.attendance === 'yes' && (
                <div className="transition-all duration-500 ease-in-out">
                  <label htmlFor="attendees" className="block text-sm font-semibold text-gray-700 mb-2">
                    Number of Attendees *
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <select
                      id="attendees"
                      name="attendees"
                      value={formData.attendees}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                    >
                      {[...Array(6)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} {i === 0 ? 'person' : 'people'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Message field */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Special Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Share your wishes or any special requests..."
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#9f7433] to-[#b18339] hover:from-[#b18339] hover:to-[#8d652d]'
                } flex items-center justify-center space-x-2`}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Send RSVP</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer message */}
        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm mb-3">Can't fill out the form? Contact us directly:</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="tel:0771908356"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-800 hover:bg-amber-100 hover:shadow-sm transition-colors"
              aria-label="Call 0771908356"
            >
              {/* Phone icon inline via SVG to avoid extra imports */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M2.25 6.75c0-1.243 1.007-2.25 2.25-2.25h2.059c.95 0 1.774.64 2.026 1.558l.533 1.975a2.25 2.25 0 01-.52 2.088l-1.21 1.21a16.5 16.5 0 006.708 6.708l1.21-1.21a2.25 2.25 0 012.088-.52l1.975.533a2.25 2.25 0 011.558 2.026V19.5a2.25 2.25 0 01-2.25 2.25H18c-8.285 0-15-6.715-15-15v-.75z" />
              </svg>
            077 190 8356
            </a>
            <a
              href="tel:0766721005"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-800 hover:bg-amber-100 hover:shadow-sm transition-colors"
              aria-label="Call 0766721005"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M2.25 6.75c0-1.243 1.007-2.25 2.25-2.25h2.059c.95 0 1.774.64 2.026 1.558l.533 1.975a2.25 2.25 0 01-.52 2.088l-1.21 1.21a16.5 16.5 0 006.708 6.708l1.21-1.21a2.25 2.25 0 012.088-.52l1.975.533a2.25 2.25 0 011.558 2.026V19.5a2.25 2.25 0 01-2.25 2.25H18c-8.285 0-15-6.715-15-15v-.75z" />
              </svg>
              076 672 1005
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RSVP;