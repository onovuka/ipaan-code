import React, { useRef, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import geojsonData from '../../data/MapGeojson.json';
import L from 'leaflet';

const MapComponent: React.FC = () => {

  const mapRef = useRef<L.Map | null>(null);
  const geojsonRef = useRef<L.GeoJSON | null>(null);

  const getColor = (speed: number): string => {
    return speed > 50 ? '#800026' :
           speed > 40 ? '#BD0026' :
           speed > 30 ? '#E31A1C' :
           speed > 20 ? '#FC4E2A' :
           speed > 15 ? '#FD8D3C' :
           speed > 10 ? '#FEB24C' :
           speed > 5  ? '#FED976' :
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
      fillOpacity: 0.7,
    };
  };

  const highlightFeature = (e: L.LeafletEvent) => {
    const layer = e.target as L.GeoJSON;
    layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7,
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

  const createLegend = (map: L.Map) => {
    let existingLegend = document.querySelector('.info.legend');
    if (existingLegend) {
      existingLegend.remove();
    }
  
    const legend = new L.Control({ position: 'bottomright' });
  
    legend.onAdd = function () {
      const div = L.DomUtil.create('div', 'info legend');
      const grades = [0, 5, 10, 15, 20, 30, 40, 50];
      div.style.backgroundColor = 'white';
      div.style.padding = '4px 6px';
      div.style.borderRadius = '3px';
      div.style.boxShadow = '0 0 3px rgba(0,0,0,0.3)';
  
      for (let i = 0; i < grades.length; i++) {
        const color = getColor(grades[i] + 1);
        div.innerHTML +=
          `<i style="background:${color}; width: 16px; height: 16px; border-radius: 50%; display: inline-block; margin-right: 6px;"></i> ` +
          `${grades[i]}${grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+'}`;
      }
  
      return div;
    };
  
    legend.addTo(map);
  };

  const MapEffect = () => {
    const map = useMap();
    useEffect(() => {
      if (map) {
        mapRef.current = map;
        createLegend(map);
      }
    }, [map]);

    return null;
  };

  return (
    <MapContainer
      center={[0, 20]}
      zoom={3}
      style={{ height: '100%', width: '100%' }}
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
        ref={geojsonRef}
      />
      <MapEffect /> {/* Add the MapEffect here */}
    </MapContainer>
  );
};

export default MapComponent;
