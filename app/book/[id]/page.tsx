"use client";

import { trpc } from "@/app/_trpc/client";
import PageLoading from "@/app/loading";
import { EventCard } from "@/components/EventCard";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function Book() {
  const params = useParams();
  const getEventQuery = trpc.events.getEvent.useQuery({
    id: params.id as string,
  });

  const [workshop, setWorkshop] = useState<string>("Зората");

  if (getEventQuery.isLoading) return <PageLoading />;
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-4xl p-5 flex flex-col gap-3">
        <h1 className="text-5xl font-extrabold text-center">Купи билети</h1>
        <hr />
        <br />
        <h3 className="text-2xl">
          Билети за <strong>събитието</strong>:{" "}
        </h3>
        <EventCard event={getEventQuery.data?.event as any} />
        <Link
          href="/events"
          className="w-full p-5 text-center bg-primary rounded-lg text-whity font-bold text-xl"
        >
          Избери друго
        </Link>
        <hr />
        <br />
        <h3 className="text-2xl">
          Избери <strong>работилница</strong>:{" "}
        </h3>
        <div>
          <select
            name="workshop"
            value={workshop}
            onChange={(e) => {
              setWorkshop(e.target.value);
            }}
          >
            <option value="Зората">Зората</option>
            <option value="Революцията">Революцията</option>
            <option value="В края на ретрото">В края на ретрото</option>
          </select>
        </div>
        <hr />
        <br />
        <h3 className="text-2xl">
          Брой <strong>билети</strong>:{" "}
        </h3>
        <div className="bg-base-200 rounded-lg text-white flex p-10 gap-20 max-sm:gap-5 justify-around">
          <div className="pr-8 border-r-4 rounded-sm">
            <FontAwesomeIcon size="10x" icon={faUser} />
          </div>
          <div>
            <span className="flex gap-3 h-12">
              <p className="text-2xl h-10 whitespace-nowrap">
                Билети за деца:{" "}
              </p>
              <input
                type="number"
                min="0"
                className="w-full bg-whity rounded text-primary border-primary border-2 p-2"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
