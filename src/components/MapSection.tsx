"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { Monument } from "@/lib/mockData";

/* ═══════════════════════════════════════════════════════════════════════════════
   MAP SECTION — Heritage Pulse
   Interactive Leaflet map centered on India with monument markers
═══════════════════════════════════════════════════════════════════════════════ */

// Lazy load map component to avoid SSR issues with Leaflet
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

// Category colors for markers
const CATEGORY_COLORS = {
  UNESCO: "#8B3A1F",    // Maroon
  Museum: "#D4AF37",    // Gold
  Fort: "#8B4513",      // Brown
  Temple: "#FF6B35",    // Saffron
  Palace: "#A84A2F",    // Light maroon
} as const;

interface MapSectionProps {
  markers: Monument[];
  onMarkerClick?: (monumentId: string) => void;
}

// Custom marker icon creator
function createCustomIcon(category: keyof typeof CATEGORY_COLORS) {
  if (typeof window === "undefined") return null;
  
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const L = require("leaflet");
  const color = CATEGORY_COLORS[category];
  
  const svgIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="32" height="48">
      <defs>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.3"/>
        </filter>
      </defs>
      <path fill="${color}" filter="url(#shadow)" d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24c0-6.6-5.4-12-12-12z"/>
      <circle cx="12" cy="12" r="5" fill="white"/>
      ${getCategorySymbol(category)}
    </svg>
  `;
  
  return L.divIcon({
    html: svgIcon,
    className: "custom-marker",
    iconSize: [32, 48],
    iconAnchor: [16, 48],
    popupAnchor: [0, -48],
  });
}

// Category-specific symbols for marker centers
function getCategorySymbol(category: string): string {
  switch (category) {
    case "UNESCO":
      return `<path fill="${CATEGORY_COLORS.UNESCO}" d="M12 8l1.5 3h3l-2.5 2 1 3-3-2-3 2 1-3-2.5-2h3z" transform="scale(0.6) translate(8, 8)"/>`;
    case "Museum":
      return `<rect x="9" y="10" width="6" height="4" fill="${CATEGORY_COLORS.Museum}" rx="0.5"/>`;
    case "Fort":
      return `<path fill="${CATEGORY_COLORS.Fort}" d="M8 13h8v1H8zM9 11h2v2H9zM13 11h2v2h-2z"/>`;
    case "Temple":
      return `<path fill="${CATEGORY_COLORS.Temple}" d="M12 8l-3 4v2h6v-2z"/>`;
    case "Palace":
      return `<path fill="${CATEGORY_COLORS.Palace}" d="M9 10h6v4H9zM11 8h2v2h-2z"/>`;
    default:
      return "";
  }
}

export default function MapSection({ markers, onMarkerClick }: MapSectionProps) {
  const [isClient, setIsClient] = useState(false);
  const [icons, setIcons] = useState<Record<string, unknown>>({});

  // Handle SSR
  useEffect(() => {
    setIsClient(true);
    
    // Import Leaflet CSS
    import("leaflet/dist/leaflet.css");
    
    // Create icons for each category
    const categoryIcons: Record<string, unknown> = {};
    Object.keys(CATEGORY_COLORS).forEach((category) => {
      const icon = createCustomIcon(category as keyof typeof CATEGORY_COLORS);
      if (icon) {
        categoryIcons[category] = icon;
      }
    });
    setIcons(categoryIcons);
  }, []);

  if (!isClient) {
    return (
      <section className="map-section">
        <div className="map-section__container container-heritage">
          <div className="map-section__header">
            <span className="map-section__tag">Interactive Discovery</span>
            <h2 className="map-section__title">
              Explore <span className="accent-underline">Heritage Sites</span>
            </h2>
            <p className="map-section__subtitle">
              Navigate through India&apos;s magnificent monuments, from UNESCO World Heritage Sites
              to hidden architectural gems across the country.
            </p>
          </div>
          <div className="map-section__loading">
            <div className="map-section__loading-spinner" />
            <span>Loading map...</span>
          </div>
        </div>
        <style jsx>{mapStyles}</style>
      </section>
    );
  }

  return (
    <section className="map-section">
      <div className="map-section__container container-heritage">
        {/* Header */}
        <div className="map-section__header">
          <span className="map-section__tag">Interactive Discovery</span>
          <h2 className="map-section__title">
            Explore <span className="accent-underline">Heritage Sites</span>
          </h2>
          <p className="map-section__subtitle">
            Navigate through India&apos;s magnificent monuments, from UNESCO World Heritage Sites
            to hidden architectural gems across the country.
          </p>
        </div>

        {/* Legend */}
        <div className="map-section__legend">
          {Object.entries(CATEGORY_COLORS).map(([category, color]) => (
            <div key={category} className="map-section__legend-item">
              <span
                className="map-section__legend-dot"
                style={{ backgroundColor: color }}
              />
              <span>{category}</span>
            </div>
          ))}
        </div>

        {/* Map */}
        <div className="map-section__map-wrapper">
          <MapContainer
            center={[20.5937, 78.9629]}
            zoom={5}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
            className="map-section__leaflet"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers.map((monument) => (
              <Marker
                key={monument.id}
                position={[monument.lat, monument.lng]}
                icon={icons[monument.category] as L.DivIcon | undefined}
                eventHandlers={{
                  click: () => onMarkerClick?.(monument.id),
                }}
              >
                <Popup>
                  <div className="map-popup">
                    <div className="map-popup__image-wrapper">
                      <img
                        src={monument.image}
                        alt={monument.name}
                        className="map-popup__image"
                      />
                      <span
                        className="map-popup__category"
                        style={{ backgroundColor: CATEGORY_COLORS[monument.category] }}
                      >
                        {monument.category}
                      </span>
                    </div>
                    <div className="map-popup__content">
                      <h3 className="map-popup__title">{monument.name}</h3>
                      <p className="map-popup__location">
                        {monument.city}, {monument.state}
                      </p>
                      <p className="map-popup__description">
                        {monument.description.split(".")[0]}.
                      </p>
                      <Link
                        href={`/monument/${monument.id}`}
                        className="map-popup__link"
                      >
                        View Details
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Mobile hint */}
        <p className="map-section__hint">
          Tap markers to explore • Pinch to zoom
        </p>
      </div>

      <style jsx>{mapStyles}</style>
      <style jsx global>{`
        .map-section__leaflet {
          border-radius: 16px;
          z-index: 1;
        }
        
        .map-section__leaflet .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
        }
        
        .map-section__leaflet .leaflet-control-zoom a {
          background: white !important;
          color: #5A4D3B !important;
          width: 36px !important;
          height: 36px !important;
          line-height: 36px !important;
          font-size: 18px !important;
        }
        
        .map-section__leaflet .leaflet-control-zoom a:hover {
          background: #FAF3E8 !important;
          color: #8B3A1F !important;
        }
        
        .custom-marker {
          background: none !important;
          border: none !important;
        }
        
        .leaflet-popup-content-wrapper {
          padding: 0 !important;
          border-radius: 12px !important;
          overflow: hidden !important;
          box-shadow: 0 8px 32px rgba(44, 36, 22, 0.2) !important;
        }
        
        .leaflet-popup-content {
          margin: 0 !important;
          width: 280px !important;
        }
        
        .leaflet-popup-tip {
          background: white !important;
        }
        
        .map-popup {
          font-family: var(--font-body);
        }
        
        .map-popup__image-wrapper {
          position: relative;
          width: 100%;
          height: 140px;
          overflow: hidden;
        }
        
        .map-popup__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .map-popup__category {
          position: absolute;
          top: 8px;
          right: 8px;
          padding: 4px 10px;
          font-size: 11px;
          font-weight: 600;
          color: white;
          border-radius: 100px;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }
        
        .map-popup__content {
          padding: 16px;
        }
        
        .map-popup__title {
          font-family: var(--font-heading);
          font-size: 16px;
          font-weight: 600;
          color: #2C2416;
          margin: 0 0 4px;
          line-height: 1.3;
        }
        
        .map-popup__location {
          font-size: 13px;
          color: #8B7D68;
          margin: 0 0 8px;
        }
        
        .map-popup__description {
          font-size: 13px;
          color: #5A4D3B;
          line-height: 1.5;
          margin: 0 0 12px;
        }
        
        .map-popup__link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 600;
          color: #8B3A1F;
          text-decoration: none;
          transition: gap 0.2s;
        }
        
        .map-popup__link:hover {
          gap: 10px;
        }
      `}</style>
    </section>
  );
}

const mapStyles = `
  .map-section {
    padding: 80px 0;
    background: linear-gradient(180deg, transparent 0%, rgba(245, 230, 211, 0.3) 100%);
  }

  .map-section__container {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .map-section__header {
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
  }

  .map-section__tag {
    display: inline-block;
    padding: 6px 14px;
    background: rgba(212, 175, 55, 0.15);
    color: #B8962E;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    border-radius: 100px;
    margin-bottom: 16px;
  }

  .map-section__title {
    font-family: var(--font-heading);
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: 700;
    color: #2C2416;
    margin: 0 0 16px;
    line-height: 1.2;
  }

  .map-section__subtitle {
    font-size: 1rem;
    color: #5A4D3B;
    line-height: 1.7;
    margin: 0;
  }

  .map-section__legend {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px 24px;
  }

  .map-section__legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: #5A4D3B;
  }

  .map-section__legend-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }

  .map-section__map-wrapper {
    height: 500px;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 
      0 4px 24px rgba(44, 36, 22, 0.1),
      0 0 0 1px rgba(139, 58, 31, 0.1);
  }

  @media (max-width: 768px) {
    .map-section__map-wrapper {
      height: 400px;
    }
  }

  .map-section__loading {
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    background: #FAF3E8;
    border-radius: 16px;
    color: #8B7D68;
    font-size: 14px;
  }

  .map-section__loading-spinner {
    width: 32px;
    height: 32px;
    border: 3px solid #E0D5C7;
    border-top-color: #8B3A1F;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .map-section__hint {
    text-align: center;
    font-size: 13px;
    color: #8B7D68;
    margin: 0;
  }

  @media (min-width: 769px) {
    .map-section__hint {
      display: none;
    }
  }
`;
