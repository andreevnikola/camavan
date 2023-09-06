"use client";
import { trpc } from "@/app/_trpc/client";
import { FormEvent, useEffect, useState } from "react";
import PageLoading from "@/app/loading";
import { Errors } from "./Errors";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
const MapWithNoSSR = dynamic(() => import("./MapForAddEvents"), {
  ssr: false,
});

export const CreateNewEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAdress] = useState("");
  const [city, setCity] = useState("");
  const [startsAt, setStartsAt] = useState("");
  const [endsAt, setEndsAt] = useState("");

  const [pinPoint, setPinPoint] = useState<[number, number]>([0, 0]);

  const setPinpointFromMarkerToNewEvent = (coords: [number, number]) => {
    setPinPoint(coords);
  };

  const requestDelivery = trpc.events.createEvent.useMutation();

  const saveEvent = (event: FormEvent) => {
    event.preventDefault();

    requestDelivery.mutate({
      description: description,
      ends_at: new Date(endsAt)?.toISOString(),
      starts_at: new Date(startsAt)?.toISOString(),
      city: city,
      address: address,
      title: title,
      coords: pinPoint,
    });
  };

  if (requestDelivery.isSuccess) {
    redirect("/events");
  }

  return (
    <>
      <form
        onSubmit={saveEvent}
        className="flex align-middle justify-center content-center items-center"
      >
        <div className="w-10/12 max-w-lg flex flex-col rounded-md gap-2 border relative">
          <div className="p-5">
            <h1 className="text-center text-2xl font-bold">Ново събитие</h1>
            <input
              type="text"
              placeholder="Въведе заглавиe на събитието"
              name="title"
              value={title}
              className="w-full"
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Въведе описание на събитието"
              className="w-full"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div>
              <label htmlFor="starts_at">Започва от: </label>
              <input
                id="starts_at"
                type="date"
                name="starts_at"
                value={startsAt}
                onChange={(e) => setStartsAt(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="ends_at">Завършва на: </label>
              <input
                id="ends_at"
                type="date"
                name="ends_at"
                value={endsAt}
                onChange={(e) => setEndsAt(e.target.value)}
              />
            </div>
            <input
              type="text"
              className="w-full"
              placeholder="Град: "
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              placeholder="Адрес на събитието"
              className="w-full"
              type="text"
              name="address"
              value={address}
              onChange={(e) => setAdress(e.target.value)}
            />
            <MapWithNoSSR setter={setPinpointFromMarkerToNewEvent} />
            <button className="w-full bg-primary">СЪЗДАЙ</button>
          </div>
          {requestDelivery.isLoading && <PageLoading />}
        </div>
      </form>
      <Errors errors={[requestDelivery.error?.message!]} />
    </>
  );
};
