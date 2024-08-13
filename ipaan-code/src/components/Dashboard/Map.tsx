import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat'; // Import the Leaflet Heatmap plugin

interface requests {
  request: {
    filters: {
      countries: string[];
      cities: string[];
      isps: string[];
    };
    startDate: string;
    endDate: string;
  };
  shouldFetch: boolean;
  chartType: string;
}

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

      // Add the heatmap layer
      const heatLayer = L.heatLayer(heatData, {
        minOpacity: 0.6,
        maxZoom: 15,
        max: 200,
        radius: 15,
        blur: 15,
        gradient: {
          0.0: 'blue',
          0.33: 'cyan',
          0.67: 'lime',
          1.0: 'red'
        }
      }).addTo(mapRef.current);

      // Add a layer of circles with tooltips for each data point
      heatData.forEach(([lat, lng, intensity]) => {
        L.circle([lat, lng], {
          radius: 10, // Small radius, adjust as needed
          color: 'transparent', // No border
          fillOpacity: 0, // Transparent fill
        })
          .bindTooltip(`
            <div style="font-size: 0.875rem; padding: 0.5rem; background-color: white; border: 1px solid #ddd; border-radius: 0.25rem; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
              <b>Average Download Speed:</b> ${intensity.toFixed(2)} Mbps
            </div>
          `, { className: 'leaflet-tooltip-custom' })
          .addTo(mapRef.current);
      });
    }

    // Cleanup on component unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [heatData]);

  return (
    <div>
      <div ref={mapContainerRef} style={{ height: '500px', width: '100%' }}></div>
    </div>
  );
}

export default Map;
