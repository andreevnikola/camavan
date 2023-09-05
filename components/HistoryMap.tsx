"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { ChangeView } from "./MapForAddEvents";
import { useEffect, useMemo, useState } from "react";
import PageLoading from "@/app/loading";
import { trpc } from "@/app/_trpc/client";

import L from "leaflet";
import "leaflet-routing-machine";
import Router from "next/router";
import { spawn } from "child_process";
import { EventCard } from "./EventCard";
import { motion } from "framer-motion";

const iconOldPoint = new L.Icon({
  iconUrl: "/images/caravan.png",
  iconRetinaUrl: "/images/caravan.png",
  iconSize: new L.Point(27, 20),
  className: "bg-transparent brightness-50",
  popupAnchor: [2, -40],
});

const iconFuturePoint = new L.Icon({
  iconUrl: "/images/caravan.png",
  iconRetinaUrl: "/images/caravan.png",
  iconSize: new L.Point(27, 20),
  className: "bg-transparent",
  popupAnchor: [2, -40],
});

const iconPoint = new L.Icon({
  iconUrl: "/images/caravan.png",
  iconRetinaUrl: "/images/caravan.png",
  iconSize: new L.Point(40, 30),
  className: "bg-transparent brightness-150",
  popupAnchor: [2, -40],
});

const hiddenIcon = new L.Icon({
  iconUrl: "/images/caravan.png",
  iconRetinaUrl: "/images/caravan.png",
  iconSize: new L.Point(10, 10),
  className: "bg-transparent hidden",
});

const HistoryPoint = ({
  event = undefined,
  setter = (id: string | null) => {},
}: {
  event:
    | {
        id: string;
        title: string;
        description: string;
        starts_at: string;
        ends_at: string | null;
        city: string;
        address: string;
        coords: number[];
      }
    | undefined;
  setter: (id: string | null) => void;
}) => {
  return (
    <>
      {new Date(event?.starts_at!).getTime() < new Date().getTime() &&
      new Date(event?.ends_at!).getTime() > new Date().getTime() ? (
        <Marker
          position={event!.coords as any}
          icon={iconPoint}
          eventHandlers={{
            click: (e) => {
              setter(event!.id);
            },
          }}
        />
      ) : new Date(event?.starts_at!).getTime() > new Date().getTime() ? (
        <Marker
          position={event!.coords as any}
          icon={iconFuturePoint}
          eventHandlers={{
            click: (e) => {
              setter(event!.id);
            },
          }}
        />
      ) : (
        <Marker
          position={event!.coords as any}
          icon={iconOldPoint}
          eventHandlers={{
            click: (e) => {
              setter(event!.id);
            },
          }}
        />
      )}
    </>
  );
};

const Routing = ({
  events = [],
  lineColor = "red",
  opacity = 1,
}: {
  lineColor: string;
  opacity: number;
  events:
    | {
        id: string;
        title: string;
        description: string;
        starts_at: string;
        ends_at: string | null;
        city: string;
        address: string;
        coords: number[];
      }[]
    | undefined;
}) => {
  let waypoints: L.Routing.Waypoint[] | L.LatLng[] | undefined = [];
  events?.map((event) => {
    waypoints!.push(L.latLng(event.coords[0], event.coords[1]) as any);
  });

  const map = useMap();

  useEffect(() => {
    const routingControl = L.Routing.control({
      waypoints: waypoints,
      waypointMode: "connect",
      show: false,
      lineOptions: {
        styles: [{ color: lineColor, opacity: opacity, weight: 5 }],
        extendToWaypoints: true,
        missingRouteTolerance: 0.5,
      },
      plan: L.Routing.plan(waypoints!, {
        createMarker: function (i, wp) {
          return L.marker(wp.latLng, {
            draggable: false,
            icon: hiddenIcon,
            opacity: 0,
          });
        },
        routeWhileDragging: true,
      }),
    }).addTo(map);
  }, []);

  return <></>;
};

export default function HistoryMap({
  lat = 42.515789616459884,
  lng = 25.21277851883607,
}) {
  const [geoData, setGeoData] = useState({
    lat: lat,
    lng: lng,
  });
  const center = [geoData.lat, geoData.lng];

  const requestDelivery = trpc.events.eventsHistory.useQuery();

  const events = useMemo(
    () =>
      requestDelivery.data?.events.sort((a, b) =>
        new Date(a.ends_at!).getTime() > new Date(b.ends_at!).getTime() ? 1 : -1
      ),
    [requestDelivery.isSuccess]
  );

  const [selected, setSelected] = useState<any>(null);

  const setSelectedState = (id: string | null) => {
    setSelected(events?.find((v) => v.id === id));
  };

  return (
    <>
      <div className={"-z-10 relative w-full " + selected ? "mb-0" : ""}>
        <div className="relative h-[250px]">
          {!requestDelivery.isLoading && (
            <MapContainer
              center={center as any}
              zoom={6.4}
              style={{ height: "250px" }}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <ChangeView coords={center as any} />
              <Routing
                opacity={0.3}
                lineColor="red"
                events={events?.filter(
                  (v) => new Date(v.starts_at!).getTime() < new Date().getTime()
                )}
              />
              <Routing
                opacity={0.75}
                lineColor="blue"
                events={events?.filter(
                  (v) => new Date(v.ends_at!).getTime() > new Date().getTime()
                )}
              />
              {events?.map((event) => (
                <HistoryPoint
                  key={event.id}
                  event={event}
                  setter={setSelectedState}
                />
              ))}
            </MapContainer>
          )}
          {requestDelivery.isLoading && <PageLoading />}
        </div>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="p-2 bg-slate-100 shadow-lg"
          >
            <EventCard isAdmin={false} event={selected} />
          </motion.div>
        )}
      </div>
    </>
  );
}
