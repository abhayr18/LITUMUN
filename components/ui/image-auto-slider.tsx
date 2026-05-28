import React from 'react';

interface ImageAutoSliderProps {
  images?: { url: string; title: string }[];
  onImageClick?: (image: { url: string; title: string }) => void;
}

export const Component = ({ images = [], onImageClick }: ImageAutoSliderProps) => {
  if (!images || images.length === 0) return null;

  const imageUrls = images.map(img => img.url);
  const duplicatedImages = [...imageUrls, ...imageUrls];

  return (
    <>
      <style>{`
        html, body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .infinite-scroll {
          animation: scroll-right 40s linear infinite;
        }

        .scroll-container {
          mask: linear-gradient(
            90deg,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          -webkit-mask: linear-gradient(
            90deg,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }

        .image-item {
          transition: transform 0.3s ease, filter 0.3s ease;
        }

        .image-item:hover {
          transform: scale(1.05);
          filter: brightness(1.1);
        }
      `}</style>
      
      <div className="w-full relative overflow-hidden flex items-center justify-center py-4">
        {/* Scrolling images container */}
        <div className="relative z-10 w-full flex items-center justify-center">
          <div className="scroll-container w-full max-w-7xl">
            <div className="infinite-scroll flex gap-6 w-max">
              {duplicatedImages.map((image, index) => {
                const originalIndex = index % images.length;
                const originalItem = images[originalIndex];
                return (
                  <div
                    key={index}
                    onClick={() => onImageClick && onImageClick(originalItem)}
                    className="image-item flex-shrink-0 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-xl overflow-hidden shadow-2xl border border-[#b8975a]/25 cursor-pointer"
                  >
                    <img
                      src={image}
                      alt={originalItem?.title || `Gallery image ${originalIndex + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

