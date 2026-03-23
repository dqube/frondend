"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ─── Fix default marker icons in Next.js ──────────────────────────────────────

const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const selectedIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [30, 49],
  iconAnchor: [15, 49],
  popupAnchor: [1, -40],
  shadowSize: [49, 49],
  className: "selected-marker",
});

L.Marker.prototype.options.icon = defaultIcon;

// ─── Types ────────────────────────────────────────────────────────────────────

interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  lat: number;
  lng: number;
  isOpen: boolean;
}

interface StoreMapProps {
  stores: Store[];
  selectedId: string;
  onSelectStore: (id: string) => void;
}

// ─── Fly to selected marker ──────────────────────────────────────────────────

function FlyToSelected({ stores, selectedId }: { stores: Store[]; selectedId: string }) {
  const map = useMap();
  const prevId = useRef(selectedId);

  useEffect(() => {
    if (selectedId !== prevId.current) {
      const store = stores.find((s) => s.id === selectedId);
      if (store) {
        map.flyTo([store.lat, store.lng], 14, { duration: 0.8 });
      }
      prevId.current = selectedId;
    }
  }, [selectedId, stores, map]);

  return null;
}

// ─── Map component ────────────────────────────────────────────────────────────

export default function StoreMap({ stores, selectedId, onSelectStore }: StoreMapProps) {
  // Center the map to show all stores
  const center: [number, number] = [4.2105, 101.9758];

  return (
    <div className="relative">
      <MapContainer
        center={center}
        zoom={6}
        scrollWheelZoom={true}
        className="z-0 h-[300px] w-full sm:h-[400px] lg:h-[450px]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FlyToSelected stores={stores} selectedId={selectedId} />
        {stores.map((store) => (
          <Marker
            key={store.id}
            position={[store.lat, store.lng]}
            icon={store.id === selectedId ? selectedIcon : defaultIcon}
            eventHandlers={{
              click: () => onSelectStore(store.id),
            }}
          >
            <Popup>
              <div className="min-w-[160px]">
                <p className="text-sm font-bold">{store.name}</p>
                <p className="mt-1 text-xs text-gray-600">
                  {store.address}, {store.city}
                </p>
                <span
                  className={`mt-1.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    store.isOpen
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {store.isOpen ? "Open" : "Closed"}
                </span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
