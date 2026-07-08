import React, { useEffect, useRef, useState } from 'react';

// Dark mode style for the map
const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
  { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#263c3f" }] },
  { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#6b9a76" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#38414e" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#212a37" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#9ca5b3" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#746855" }] },
  { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#1f2835" }] },
  { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#f3d19c" }] },
  { featureType: "transit", elementType: "geometry", stylers: [{ color: "#2f3948" }] },
  { featureType: "transit.station", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#17263c" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#515c6d" }] },
  { featureType: "water", elementType: "labels.text.stroke", stylers: [{ color: "#17263c" }] },
];

// New custom "Silver" theme
const silverMapStyle = [
  { featureType: "administrative", elementType: "labels.text.fill", stylers: [{ color: "#444444" }] },
  { featureType: "landscape", elementType: "all", stylers: [{ color: "#f2f2f2" }] },
  { featureType: "poi", elementType: "all", stylers: [{ visibility: "off" }] },
  { featureType: "road", elementType: "all", stylers: [{ saturation: -100 }, { lightness: 45 }] },
  { featureType: "road.highway", elementType: "all", stylers: [{ visibility: "simplified" }] },
  { featureType: "road.arterial", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { featureType: "transit", elementType: "all", stylers: [{ visibility: "off" }] },
  { featureType: "water", elementType: "all", stylers: [{ color: "#46bcec" }, { visibility: "on" }] }
];

// A central place to hold all our themes
const mapThemes = {
  dark: darkMapStyle,
  silver: silverMapStyle,
  default: [], // An empty array means Google's default style
};

const GoogleMapEmbed = ({ apiKey, center, zoom, theme = 'default', markerIconUrl, scrollZoomEnabled = false }) => {
  const mapRef = useRef(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(!!(window.google && window.google.maps));

  // Effect to load the Google Maps script
  useEffect(() => {
    if (isScriptLoaded || !apiKey) return;

    const scriptId = 'google-maps-script';
    if (document.getElementById(scriptId)) {
      setIsScriptLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    script.onerror = () => console.error("Google Maps script failed to load.");
    document.head.appendChild(script);

  }, [apiKey, isScriptLoaded]);

  // Effect to initialize the map once the script is loaded
  useEffect(() => {
    if (isScriptLoaded && mapRef.current) {
      // Determine theme based on prop or system preference for dark mode
      const isDarkMode = document.documentElement.classList.contains('dark');
      const selectedThemeKey = theme === 'default' && isDarkMode ? 'dark' : theme;

      const map = new window.google.maps.Map(mapRef.current, {
        center: center,
        zoom: zoom,
        disableDefaultUI: true,
        styles: mapThemes[selectedThemeKey] || [], // Use the selected theme,
        scrollwheel: scrollZoomEnabled, // Enable/disable zoom on scroll
      });

      const markerOptions = {
        position: center,
        map: map,
        title: 'Our Location',
      };

      // If a custom marker URL is provided, add it to the marker options
      if (markerIconUrl) {
        markerOptions.icon = {
          url: markerIconUrl,
          scaledSize: new window.google.maps.Size(48, 48), // Adjust size as needed
        };
      }

      new window.google.maps.Marker(markerOptions);
    };
  }, [isScriptLoaded, center, zoom, theme, markerIconUrl, scrollZoomEnabled]); // Add dependencies

  return <div ref={mapRef} style={{ width: '100%', height: '100%', borderRadius: '1rem' }} aria-label="Google Map showing our location"></div>;
};

export default GoogleMapEmbed;