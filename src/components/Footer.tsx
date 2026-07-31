import safeSpaceLogo from '@assets/WhatsApp_Image_2026-06-21_at_19.47.03_(1)_1785498945838.jpeg';
import bfsLogo from '@assets/WhatsApp_Image_2026-06-21_at_18.53.38-removebg-preview_1785498945842.png';

export default function Footer() {
  return (
    <footer className="py-12 sm:py-16" style={{ backgroundColor: 'var(--brand-deep)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logos */}
        <div className="flex items-center justify-center gap-6 mb-8 flex-wrap">
          <img
            src={safeSpaceLogo}
            alt="Safe Space logo"
            className="h-16 w-16 object-contain rounded-lg"
          />
          <div className="w-px h-12" style={{ backgroundColor: 'rgba(217, 164, 65, 0.3)' }} />
          <img
            src={bfsLogo}
            alt="Born From School logo"
            className="h-16 w-16 object-contain"
          />
        </div>

        {/* Brand name and tagline */}
        <div className="text-center mb-6">
          <h3 className="text-3xl font-bold mb-3" style={{ color: 'var(--brand-gold)' }}>
            SAFE SPACE
          </h3>
          <p className="text-lg sm:text-xl font-serif italic max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--brand-paper)' }}>
            « Bien dans sa tête, bien dans son corps, maître de son avenir. »
          </p>
        </div>

        {/* Competition note */}
        <div className="text-center mb-8">
          <p className="text-sm" style={{ color: 'var(--brand-paper)', opacity: 0.75 }}>
            Safe Space est un projet soumis au concours <span className="font-semibold" style={{ color: 'var(--brand-gold)' }}>Born From School</span> — Projet social 2026
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px mb-8" style={{ backgroundColor: 'rgba(217, 164, 65, 0.2)' }} />

        {/* Copyright */}
        <div className="text-center text-sm" style={{ color: 'var(--brand-paper)', opacity: 0.6 }}>
          © 2026 Safe Space · Born From School
        </div>
      </div>
    </footer>
  );
}
