import { useState, useEffect, useCallback } from 'react';
import { MusicProvider } from './context/MusicContext';
import EnvelopeIntro from './components/EnvelopeIntro';
import FloatingControls from './components/FloatingControls';
import HeroCover from './components/HeroCover';
import WelcomeSection from './components/WelcomeSection';
import DateHighlight from './components/DateHighlight';
import PhotoBanner from './components/PhotoBanner';
import Countdown from './components/Countdown';
import VenuesSection from './components/VenuesSection';
import DressCode from './components/DressCode';
import PhotoGallery from './components/PhotoGallery';
import GiftRegistry from './components/GiftRegistry';
import RsvpForm from './components/RsvpForm';
import QrSection from './components/QrSection';
import Footer from './components/Footer';
import AdminGuestList from './components/AdminGuestList';
import { eventConfig } from './data/eventConfig';

function InvitationContent() {
  const [introDone, setIntroDone] = useState(
    () => sessionStorage.getItem('invboda-envelope-opened-v2') === 'true'
  );

  const handleIntroComplete = useCallback(() => setIntroDone(true), []);

  return (
    <>
      {!introDone && <EnvelopeIntro onComplete={handleIntroComplete} />}

      {introDone && (
        <div className="min-h-screen bg-ostion relative">
          <FloatingControls />

          <main className="relative pb-28">
            <HeroCover />
            <WelcomeSection />
            <DateHighlight />
            <PhotoBanner src={eventConfig.photos.banner1} alt="Marbella y Oscar" />
            <Countdown />
            <PhotoBanner src={eventConfig.photos.banner2} alt="Marbella y Oscar" />
            <VenuesSection />
            <DressCode />
            <PhotoGallery />
            <GiftRegistry />
            <RsvpForm />
            <QrSection />
            <Footer />
          </main>
        </div>
      )}
    </>
  );
}

function App() {
  const [isAdmin, setIsAdmin] = useState(() => window.location.hash === '#admin');

  useEffect(() => {
    const onHashChange = () => setIsAdmin(window.location.hash === '#admin');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  if (isAdmin) {
    return <AdminGuestList />;
  }

  return (
    <MusicProvider>
      <InvitationContent />
    </MusicProvider>
  );
}

export default App;
