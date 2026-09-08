import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const MADAGASCAR_CENTER: [number, number] = [-18.7669, 46.8691];
const MADAGASCAR_GEOJSON_URL = 'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson';

function MadagascarBoundary() {
  const map = useMap();
  const [madagascarFeature, setMadagascarFeature] = useState<any>(null);

  useEffect(() => {
    let isCancelled = false;

    fetch(MADAGASCAR_GEOJSON_URL)
      .then((response) => response.json())
      .then((data) => {
        if (isCancelled) return;

        const feature = (data.features ?? []).find((item: any) => {
          const name = (item.properties?.ADMIN ?? item.properties?.name ?? item.properties?.NAME ?? '').toString().trim();
          return name.toLowerCase() === 'madagascar';
        });

        if (!feature) return;

        setMadagascarFeature(feature);

        const layer = L.geoJSON(feature);
        const bounds = layer.getBounds();

        if (bounds.isValid()) {
          map.fitBounds(bounds.pad(0.3));
        }
      })
      .catch(() => {
        if (!isCancelled) {
          map.setView(MADAGASCAR_CENTER, 6);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [map]);

  if (!madagascarFeature) return null;

  return <GeoJSON data={madagascarFeature} style={{ color: '#0f766e', weight: 2, fillColor: '#14b8a6', fillOpacity: 0.14 }} />;
}

function MapViewport({ chantiers }: { chantiers: { latitude: number; longitude: number }[] }) {
  const map = useMap();

  useEffect(() => {
    if (!chantiers.length) {
      map.setView(MADAGASCAR_CENTER, 6);
      return;
    }

    if (chantiers.length === 1) {
      map.setView([chantiers[0].latitude, chantiers[0].longitude], 9);
      return;
    }

    const bounds = L.latLngBounds(chantiers.map((chantier) => [chantier.latitude, chantier.longitude] as [number, number]));
    map.fitBounds(bounds, { padding: [30, 30] });
  }, [map, chantiers]);

  return null;
}

interface CarteChantiersProps {
  chantiers: {
    id?: string | number;
    nom: string;
    latitude: number;
    longitude: number;
    rayonToleranceM: number;
  }[];
}

export default function CarteChantiers({ chantiers }: CarteChantiersProps) {
  const center = chantiers.length > 0
    ? [chantiers[0].latitude, chantiers[0].longitude]
    : MADAGASCAR_CENTER;

  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-xl">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Carte des chantiers</h3>
          <p className="text-sm text-slate-500">Visualisez les chantiers et les zones de tolérance.</p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm">
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-emerald-50 px-3 py-2 text-slate-700">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Zone tolérance
          </div>
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-rose-50 px-3 py-2 text-slate-700">
            <span className="inline-block h-2.5 w-2.5 rounded-full border border-rose-500 bg-white" /> Hors zone
          </div>
        </div>
      </div>

      <div className="h-[520px] w-full overflow-hidden rounded-[20px] border border-slate-200">
        <MapContainer center={center as [number, number]} zoom={chantiers.length > 0 ? 8 : 6} scrollWheelZoom={false} className="h-full w-full">
          <MadagascarBoundary />
          <MapViewport chantiers={chantiers} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {chantiers.map((chantier) => (
            <React.Fragment key={String(chantier.id ?? `${chantier.latitude}-${chantier.longitude}`)}>
              <Marker position={[chantier.latitude, chantier.longitude]} icon={defaultIcon}>
                <Popup>
                  <div className="space-y-1 text-sm text-slate-900">
                    <p className="font-semibold">{chantier.nom}</p>
                    <p>Latitude: {chantier.latitude}</p>
                    <p>Longitude: {chantier.longitude}</p>
                    <p>Rayon tolérance: {chantier.rayonToleranceM} m</p>
                  </div>
                </Popup>
              </Marker>
              <Circle
                center={[chantier.latitude, chantier.longitude]}
                radius={chantier.rayonToleranceM}
                pathOptions={{ color: '#22c55e', fillColor: '#86efac', fillOpacity: 0.18 }}
              />
              <Circle
                center={[chantier.latitude, chantier.longitude]}
                radius={chantier.rayonToleranceM}
                pathOptions={{ color: '#ef4444', weight: 2, fillOpacity: 0, dashArray: '8 6' }}
              />
            </React.Fragment>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
