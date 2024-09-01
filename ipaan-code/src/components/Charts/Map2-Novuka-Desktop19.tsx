import React, { useRef, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import geojsonData from '../../data/MapGeojson.json'; 
import L from 'leaflet'; 

const MapComponent: React.FC = () => {
  const mapRef = useRef<L.Map | null>(null);
  const geojsonRef = useRef<L.GeoJSON | null>(null);

  // setting the colour of speed ranges
  const getColor = (speed: number): string => {
    return speed > 50  ? '#800026' :
            speed > 40  ? '#BD0026' :
            speed > 30  ? '#E31A1C' :
            speed > 20  ? '#FC4E2A' :
            speed > 15  ? '#FD8D3C' :
            speed > 10  ? '#FEB24C' :
            speed > 5   ? '#FED976' :
                  '#FFEDA0';
  };

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


  const resetHighlight = (e: L.LeafletEvent) => {
    if (geojsonRef.current) {
      geojsonRef.current.resetStyle(e.target as L.GeoJSON);
    }
  };


  const onEachFeature = (feature: any, layer: L.Layer) => {
    const popupContent = `
      <div>
        <h3>${feature.properties.name || 'Feature'}</h3>
        <p>Average Download speed: ${feature.properties.speed} MBps</p>
      </div>
    `;

    (layer as L.GeoJSON).bindPopup(popupContent);
    (layer as L.GeoJSON).on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
    });
  };


  // Function to create and add the legend
  const createLegend = (map: L.Map) => {
    const legend = new L.Control({ position: 'bottomright' });

    legend.onAdd = function () {
        const div = L.DomUtil.create('div', 'info legend');
        const grades = [0, 5, 10, 15, 20, 30, 40, 50];

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
      whenReady={(map: { target: L.Map }) => { mapRef.current = map.target; }} 
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
