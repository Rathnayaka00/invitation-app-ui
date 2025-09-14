import { Calendar, Clock, MapPin, Navigation } from 'lucide-react';

const EventDetails = () => {
  const openMap = () => {
    // Open Google Maps with the venue location
    const address = "Hotel Green Court, Grand Ballroom, Homagama, Sri Lanka";
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(mapUrl, '_blank');
  };

  return (
    <section id="details" className="py-10 md:py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="font-dancing text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#d1a56b] to-[#b18339] mb-3 md:mb-4">
            Event Details
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            All the important information you need to join us on our special day
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center space-y-12 md:space-y-16">
            {/* Event Information */}
            <div className="w-full">
              <div className="relative max-w-3xl mx-auto bg-gradient-to-br from-amber-50 via-amber-50 to-amber-100 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-xl border border-amber-100/60">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-[#d1a56b]/10 to-transparent pointer-events-none" />
                <div className="relative">
                  <div className="space-y-6 md:space-y-8">
                    <div className="flex items-center space-x-4 md:space-x-5">
                      <div className="bg-amber-100/80 backdrop-blur rounded-full p-3 md:p-4 shadow-inner">
                        <Calendar className="text-amber-600" size={22} />
                      </div>
                      <div>
                        <p className="text-gray-700 font-semibold">Thursday, October 2, 2025</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 md:space-x-5">
                      <div className="bg-amber-100/80 backdrop-blur rounded-full p-3 md:p-4 shadow-inner">
                        <Clock className="text-amber-600" size={22} />
                      </div>
                      <div>
                        <p className="text-gray-700 font-semibold">From 9:00 AM onwards</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 md:space-x-5">
                      <div className="bg-amber-100/80 backdrop-blur rounded-full p-3 md:p-4 shadow-inner">
                        <MapPin className="text-amber-600" size={22} />
                      </div>
                      <div>
                        <p className="text-gray-700 font-semibold text-base md:text-lg">Hotel Green Court</p>
                        <p className="text-gray-600">Grand Ballroom - 2nd Floor</p>
                        <p className="text-gray-500">Homagama, Sri Lanka</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={openMap}
                    className="w-full mt-8 md:mt-12 bg-gradient-to-r from-[#9f7433] to-[#b18339] hover:from-[#b18339] hover:to-[#8d652d] text-white font-semibold py-3 px-6 md:py-4 md:px-8 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-amber-200/60 hover:shadow-2xl transform hover:scale-105"
                  >
                    <Navigation size={22} />
                    <span className="tracking-wide">Get Directions</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            {/* <div className="w-full">
              <div className="relative max-w-3xl mx-auto bg-gradient-to-br from-amber-100 via-amber-50 to-amber-50 rounded-3xl p-10 md:p-14 shadow-xl border border-amber-100/60">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-[#b18339]/10 to-transparent pointer-events-none" />
                <div className="relative">
                  <h3 className="font-great-vibes text-4xl md:text-5xl text-[#b18339] mb-10 text-center drop-shadow-sm">
                    Contact Us
                  </h3>
                  <div className="flex flex-col md:flex-row md:items-stretch md:justify-center gap-10">
                    <div className="text-center flex-1">
                      <div className="bg-amber-100/80 backdrop-blur rounded-full p-4 w-fit mx-auto mb-4 shadow-inner">
                        <Phone className="text-amber-600" size={24} />
                      </div>
                      <h4 className="font-semibold text-[#6b4a17] mb-1 tracking-wide uppercase text-xs">Hasini</h4>
                      <p className="text-gray-600 text-sm font-medium">+94 77 123 4567</p>
                    </div>
                    <div className="text-center flex-1">
                      <div className="bg-amber-100/80 backdrop-blur rounded-full p-4 w-fit mx-auto mb-4 shadow-inner">
                        <Phone className="text-amber-600" size={24} />
                      </div>
                      <h4 className="font-semibold text-[#6b4a17] mb-1 tracking-wide uppercase text-xs">Sachin</h4>
                      <p className="text-gray-600 text-sm font-medium">+94 77 765 4321</p>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;