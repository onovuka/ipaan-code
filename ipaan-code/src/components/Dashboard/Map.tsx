import sensors from "./sensors.json";
import { TileLayer, MapContainer, GeoJSON, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

L.Marker.prototype.options.icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
});

const center = { lat: 59.433421, lng: 24.75224 };

export default function Map() {
    function onEachFeature(feature: any, layer: L.Layer) {
        if (feature.properties) {
            const { popupContent } = feature.properties;
            layer.bindPopup(popupContent);
        }
    }
    return (
        <MapContainer
          className="h-full w-full"
          center={center}
          zoom={2}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[59.43046, 24.728563]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    );
}
