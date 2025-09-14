import Hero from './components/Hero';
import Gallery from './components/Gallery';
import RSVP from './components/RSVP';
import EventDetails from './components/EventDetails';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Gallery />
      <EventDetails />
      <RSVP />
      <Footer />
    </div>
  );
}

export default App;