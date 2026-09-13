import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: '/images/**',
        search: '',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    // Qualité des images servies (défaut : 75)
    qualities: [60, 75, 85],
    // Tailles de rendu utilisées par next/image pour générer les srcset
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Durée de mise en cache des images optimisées (en secondes)
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 jours
  },
};

export default nextConfig;