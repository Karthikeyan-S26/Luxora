import React from 'react';

interface LuxoraLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  badgeStyle?: 'none' | 'squircle' | 'circle';
  showWordmark?: boolean;
  showTagline?: boolean;
}

export function LuxoraLogo({
  className = '',
  size = 'md',
  badgeStyle = 'squircle',
  showWordmark = true,
  showTagline = false,
}: LuxoraLogoProps) {
  const sizeMap = {
    sm: { iconContainer: 'h-9 w-9 p-1.5', svg: 'h-6 w-6', text: 'text-lg', subtitle: 'text-[8px]' },
    md: { iconContainer: 'h-12 w-12 p-2', svg: 'h-8 w-8', text: 'text-2xl', subtitle: 'text-[9px]' },
    lg: { iconContainer: 'h-16 w-16 p-3', svg: 'h-10 w-10', text: 'text-3xl', subtitle: 'text-[10px]' },
    xl: { iconContainer: 'h-24 w-24 p-4', svg: 'h-16 w-16', text: 'text-5xl', subtitle: 'text-[12px]' },
  };

  const dimensions = sizeMap[size];

  const getBadgeClass = () => {
    if (badgeStyle === 'squircle') {
      return 'rounded-2xl bg-gradient-to-b from-[#1c1c1e] to-[#0c0c0e] border border-[#F5C754]/30 shadow-[0_4px_20px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(245,199,84,0.3)]';
    }
    if (badgeStyle === 'circle') {
      return 'rounded-full bg-gradient-to-b from-[#1c1c1e] to-[#0c0c0e] border border-[#F5C754]/30 shadow-[0_4px_20px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(245,199,84,0.3)]';
    }
    return '';
  };

  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      {/* Icon Badge Container */}
      <div className={`relative flex items-center justify-center ${dimensions.iconContainer} ${getBadgeClass()} shrink-0 transition-transform duration-300 hover:scale-105`}>
        {/* Luxora Emblem Vector SVG */}
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${dimensions.svg} drop-shadow-[0_2px_8px_rgba(245,199,84,0.4)]`}
        >
          <defs>
            {/* Rich 3D Gold Gradient matching exact reference image */}
            <linearGradient id="luxoraMetallicGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF4BC" />
              <stop offset="25%" stopColor="#F5C754" />
              <stop offset="60%" stopColor="#C9901C" />
              <stop offset="85%" stopColor="#8A5A00" />
              <stop offset="100%" stopColor="#F5C754" />
            </linearGradient>

            <linearGradient id="luxoraSparkleGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="40%" stopColor="#FFEAA5" />
              <stop offset="100%" stopColor="#D49B24" />
            </linearGradient>

            <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Elegant Serif 'L' Stem & Base */}
          <path
            d="M 33 18 C 30 18 26 19 24 20 L 25 24 C 28 23 31 23 35 23 V 68 C 35 73 38 76 46 76 H 58 C 63 76 67 74 69 70 L 71 72 C 68 77 61 80 52 80 C 37 80 32 73 32 63 V 23 C 28 23 25 23 23 24 L 24 20 C 26 19 30 18 33 18 Z"
            fill="url(#luxoraMetallicGold)"
            filter="url(#goldGlow)"
          />

          {/* Crescent Arch Sweeping Right & Up */}
          <path
            d="M 52 79 C 71 79 82 64 79 45 C 77 35 70 27 61 24 C 60 23 61 25 62 27 C 69 32 73 41 71 51 C 68 63 57 72 44 73 C 48 77 50 79 52 79 Z"
            fill="url(#luxoraMetallicGold)"
          />

          {/* 4-Point Sparkle Star inside Crescent Arch */}
          <path
            d="M 63 35 C 63 41 60 44 54 44 C 60 44 63 47 63 53 C 63 47 66 44 72 44 C 66 44 63 41 63 35 Z"
            fill="url(#luxoraSparkleGold)"
          />
        </svg>
      </div>

      {/* Wordmark & Subtitle */}
      {showWordmark && (
        <div className="flex flex-col">
          <span className={`font-black tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-[#FFF4BC] via-[#F5C754] to-[#C9901C] uppercase ${dimensions.text} font-serif drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]`}>
            LUXORA
          </span>

          {showTagline && (
            <div className="flex items-center gap-2 mt-1">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#F5C754]/50 to-transparent" />
              <svg width="8" height="8" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 5 0 C 5 3.5 3.5 5 0 5 C 3.5 5 5 6.5 5 10 C 5 6.5 6.5 5 10 5 C 6.5 5 5 3.5 5 0 Z" fill="#F5C754" />
              </svg>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#F5C754]/50 to-transparent" />
            </div>
          )}

          {showTagline && (
            <span className={`font-semibold tracking-[0.2em] text-[#F5C754]/90 uppercase ${dimensions.subtitle} text-center mt-1`}>
              ELEVATED LIVING. INTELLIGENT COMMERCE.
            </span>
          )}
        </div>
      )}
    </div>
  );
}
