import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat'; // Import the Leaflet Heatmap plugin

// Define HeatData as an array of tuples with latitude, longitude, and intensity
type HeatData = [number, number, number][];

interface MapProps {
  heatData: HeatData;
}

function Map({ heatData }: MapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current) {
      // If map is already initialized, do nothing
      return;
    }

    // Initialize the map
    if (mapContainerRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView([0, 20], 3);

      // Add a tile layer to the map
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);

      // Directly use the heatData in the expected format
      const heat = L.heatLayer(heatData, {
        minOpacity: 0.6,
        maxZoom: 15,
        max: 150,
        radius: 15,
        blur: 15,
        gradient: {
          0.0: 'blue',
          0.33: 'cyan',
          0.67: 'lime',
          1.0: 'red'
        }
      }).addTo(mapRef.current);

      // You can also interact with the heatmap layer here if needed
    }

    // Cleanup on component unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [heatData]); // Re-run effect when heatData changes

  return <div ref={mapContainerRef} style={{ height: '500px', width: '100%' }}></div>;
}

export default Map;
