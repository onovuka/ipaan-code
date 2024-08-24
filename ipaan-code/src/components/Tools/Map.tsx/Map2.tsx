import React, { useRef, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import geojsonData from '../../../data/updated_data.json'; // Adjust the path based on your file location
import L from 'leaflet'; // Import Leaflet to use its features

const MapComponent: React.FC = () => {
  // Create refs to store the map and GeoJSON layer
  const mapRef = useRef<L.Map | null>(null);
  const geojsonRef = useRef<L.GeoJSON | null>(null);

  // Function to determine color based on speed
  const getColor = (speed: number): string => {

    return speed > 250 ? '#800026' :
           speed > 200 ? '#BD0026' :
           speed > 150 ? '#E31A1C' :
           speed > 100 ? '#FC4E2A' :
           speed > 50  ? '#FD8D3C' :
           speed > 20  ? '#FEB24C' :
           speed > 10  ? '#FED976' :
                         '#FFEDA0';
  };

  // Function to style each feature
  const style = (feature: { properties: { speed: number; }; }): L.PathOptions => {
    const color = getColor(feature.properties.speed);

    return {
      fillColor: color,
      weight: 1,
      opacity: 1,
      color: 'white',
      dashArray: '',
      fillOpacity: 0.7
    };
  };

  // Function to handle mouseover event
  const highlightFeature = (e: L.LeafletEvent) => {
    const layer = e.target as L.GeoJSON;
    layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
    });
    if (geojsonRef.current) {
      geojsonRef.current.bringToFront();
    }
  };

  // Function to handle mouseout event
  const resetHighlight = (e: L.LeafletEvent) => {
    if (geojsonRef.current) {
      geojsonRef.current.resetStyle(e.target as L.GeoJSON);
    }
  };

  // Function to handle click event
  const zoomToFeature = (e: L.LeafletEvent) => {
    const map = e.target._map; // Access the map object
    map.fitBounds(e.target.getBounds());
  };

  // Function to apply event listeners to each feature
  const onEachFeature = (feature: any, layer: L.Layer) => {
    
    // Create the popup content
    const popupContent = `
      <div>
        <h3>${feature.properties.name || 'Feature'}</h3>
        <p>Average Download speed: ${feature.properties.speed} MBps</p>
      </div>
    `;
    // Bind popup and event listeners to each feature
    (layer as L.GeoJSON).bindPopup(popupContent);
    (layer as L.GeoJSON).on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
    });
  };

  // Function to create and add the legend
// Function to create and add the legend
const createLegend = (map: L.Map) => {
    const legend = new L.Control({ position: 'bottomright' });

    legend.onAdd = function () {
        const div = L.DomUtil.create('div', 'info legend');
        const grades = [0, 10, 20, 50, 100, 150, 200, 250];

        // Add CSS for the legend container
        div.style.backgroundColor = 'white';
        div.style.padding = '4px 6px'; // Reduced padding
        div.style.borderRadius = '3px'; // Reduced border-radius
        div.style.boxShadow = '0 0 3px rgba(0,0,0,0.3)'; // Reduced box-shadow

        // Loop through density intervals and generate a label with a colored square for each interval
        for (let i = 0; i < grades.length; i++) {
            const color = getColor(grades[i] + 1);

            div.innerHTML +=
                `<i style="background:${color}; width: 16px; height: 16px; border-radius: 50%; display: inline-block; margin-right: 6px;"></i> ` + // Smaller circle
                `${grades[i]}${grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+'}`;
        }

        return div;
    };

    legend.addTo(map);
};
  
  // Use effect to add the legend after the map is mounted
  useEffect(() => {
    if (mapRef.current) {
      createLegend(mapRef.current);
    }
  }, []);

  return (
    <MapContainer
      center={[0, 20]}
      zoom={3}
      style={{ height: '100%', width: '100%' }}
      whenReady={(map: { target: L.Map }) => { mapRef.current = map.target; }} // Set the map reference
    >
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <GeoJSON
        data={geojsonData as any}
        style={style}
        onEachFeature={onEachFeature}
        ref={geojsonRef} // Use the ref to store the GeoJSON layer
      />
    </MapContainer>
  );
};

export default MapComponent;
