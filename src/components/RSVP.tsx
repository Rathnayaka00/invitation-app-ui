import { useState, useRef } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Send, CheckCircle, Heart, Users, User, ThumbsUp, ThumbsDown } from 'lucide-react';
import { createUser } from '../services/userService';

interface FormData {
  name: string;
  attendees: string;
  attendance: 'yes' | 'no' | '';
  message: string;
}

const RSVP = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    attendees: '1',
    attendance: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Compute attendee count for display (always a number; 0 if not attending)
  const attendeeCount = formData.attendance === 'yes'
    ? Math.max(1, parseInt(formData.attendees || '1', 10) || 1)
    : 0;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Open confirmation modal (validates first)
  const handleOpenConfirm = (e: FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (form && !form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setIsConfirmOpen(true);
  };

  // Final submit after confirmation
  const actuallySubmit = async () => {
    setIsConfirmOpen(false);
    setIsLoading(true);
    setError(null);
    
    try {
      // Prepare data for backend according to your API schema
      const userData = {
        name: formData.name.trim(),
        status: formData.attendance === 'yes' ? 1 : 0, // 1 for accept, 0 for decline
        count: formData.attendance === 'yes' ? attendeeCount : null,
        message: formData.message.trim() || null
      };

      // Submit to backend
      await createUser(userData);
      
      // Also save to localStorage as backup for offline viewing
      try {
        const entry = {
          name: formData.name.trim(),
          attendance: formData.attendance,
          attendees: attendeeCount,
          message: formData.message.trim(),
          submittedAt: new Date().toISOString(),
        };
        const existing = JSON.parse(localStorage.getItem('rsvps') || '[]');
        const list = Array.isArray(existing) ? existing : [];
        list.push(entry);
        localStorage.setItem('rsvps', JSON.stringify(list));
      } catch (_) {
        // ignore localStorage errors
      }
      
      setIsLoading(false);
      setIsSubmitted(true);
    } catch (error) {
      setIsLoading(false);
      setError(error instanceof Error ? error.message : 'Failed to submit RSVP. Please try again.');
      console.error('RSVP submission error:', error);
    }
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
              {/* Always show the attendee number after submit */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-800 mb-6">
                <Users size={18} />
                <span className="font-semibold">Attendees: {attendeeCount}</span>
              </div>
              <div className="flex justify-center space-x-2">
                <Heart className="text-[#b18339]  animate-pulse" size={20} />
                <Heart className="text-[#b18339]  animate-pulse" size={20} style={{ animationDelay: '0.5s' }} />
                <Heart className="text-[#b18339]  animate-pulse" size={20} style={{ animationDelay: '1s' }} />
              </div>
              {/* Keep contact numbers visible after submit */}
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
          <form ref={formRef} onSubmit={handleOpenConfirm} className="bg-white rounded-2xl p-6 md:p-10 shadow-xl">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}
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
                      <ThumbsUp className="mx-auto mb-1" size={24} />
                      <span className="font-medium text-base">Happily Accept</span>
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
                      <ThumbsDown className="mx-auto mb-1" size={24} />
                      <span className="font-medium text-base">With Regret Decline</span>
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
                    <input
                      type="number"
                      id="attendees"
                      name="attendees"
                      min={1}
                      max={20}
                      step={1}
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={formData.attendees}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                      placeholder="e.g., 1"
                      aria-describedby="attendees-help"
                    />
                  </div>
                  <p id="attendees-help" className="mt-1 text-xs text-gray-500">Enter total number coming with you.</p>
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
          {/* Confirmation Modal */}
          {isConfirmOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsConfirmOpen(false)} aria-hidden="true" />
              <div className="relative z-10 w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl border border-amber-100 overflow-hidden">
                <div className="px-6 pt-6 pb-4 bg-gradient-to-r from-amber-50 to-amber-100">
                  <h3 className="text-xl font-semibold text-amber-900">Confirm your details</h3>
                  <p className="text-sm text-amber-800 mt-1">Please review before sending. You can edit if something is wrong.</p>
                </div>
                <div className="px-6 py-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <User className="text-amber-600 mt-0.5" size={18} />
                    <div>
                      <p className="text-xs text-gray-500">Name</p>
                      <p className="text-gray-800 font-medium">{formData.name || '—'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    {formData.attendance === 'yes' ? (
                      <ThumbsUp className="text-amber-600 mt-0.5" size={18} />
                    ) : (
                      <ThumbsDown className="text-amber-600 mt-0.5" size={18} />
                    )}
                    <div>
                      <p className="text-xs text-gray-500">Attending</p>
                      <p className="text-gray-800 font-medium">{formData.attendance === 'yes' ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="text-amber-600 mt-0.5" size={18} />
                    <div>
                      <p className="text-xs text-gray-500">Number of Attendees</p>
                      <p className="text-gray-800 font-medium">{attendeeCount}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-amber-600 mt-0.5"><path d="M4.5 5.25c0-1.243 1.007-2.25 2.25-2.25h10.5c1.243 0 2.25 1.007 2.25 2.25v13.5a.75.75 0 01-1.2.6l-3.9-3.25H6.75a2.25 2.25 0 01-2.25-2.25V5.25z"/></svg>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Message</p>
                      <p className="text-gray-800 font-medium whitespace-pre-line break-words">{formData.message || '—'}</p>
                    </div>
                  </div>
                </div>
                <div className="px-6 pt-2 pb-6 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsConfirmOpen(false)}
                    className="flex-1 py-3 px-4 rounded-lg border border-amber-200 text-amber-800 hover:bg-amber-50 transition"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={actuallySubmit}
                    className="flex-1 py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-[#9f7433] to-[#b18339] hover:from-[#b18339] hover:to-[#8d652d] shadow"
                  >
                    Confirm & Send
                  </button>
                </div>
              </div>
            </div>
          )}
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