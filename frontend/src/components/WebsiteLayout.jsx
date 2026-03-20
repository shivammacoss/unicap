import { useState, useEffect } from 'react';
import Navigation from '../website/src/sections/Navigation';

export default function WebsiteLayout({ children }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-bluestone-dark text-white overflow-x-hidden">
      <Navigation scrollY={scrollY} />
      {children}
    </div>
  );
}
