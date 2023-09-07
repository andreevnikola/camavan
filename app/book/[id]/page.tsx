"use client";

import { trpc } from "@/app/_trpc/client";
import PageLoading from "@/app/loading";
import { EventCard } from "@/components/EventCard";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Workshops from "@/app/workshops/page";

export default function Book() {
  const params = useParams();
  const router = useRouter();
  const getEventQuery = trpc.events.getEvent.useQuery({
    id: params.id as string,
  });
  const buyTicketsQuery = trpc.tickets.buyTicket.useMutation();

  const [workshop, setWorkshop] = useState<string>("ZORATA");
  const [numberChildTickets, setNumberChildTickets] = useState<number>(0);
  const [numberAdultTickets, setNumberAdultTickets] = useState<number>(0);

  const price = numberChildTickets * 12 + numberAdultTickets * 18;

  if (getEventQuery.isLoading) return <PageLoading />;

  const buyTickets = async (e: any) => {
    e.preventDefault();
    const mutation = await buyTicketsQuery.mutateAsync({
      eventId: params.id as string,
      workshop: workshop as any,
      childTickets: numberChildTickets,
      adultTickets: numberAdultTickets,
    });
    router.push("/tickets");
  };

  return (
    <div className="w-full flex justify-center">
      <form
        className="relative w-full max-w-4xl p-5 flex flex-col gap-3"
        onSubmit={buyTickets}
      >
        {buyTicketsQuery.isLoading && <PageLoading />}
        {!buyTicketsQuery.isLoading && (
          <>
            <h1 className="text-5xl font-extrabold text-center">Купи билети</h1>
            <hr />
            <br />
            <h3 className="text-2xl">
              Билети за <strong>събитието</strong>:{" "}
            </h3>
            <EventCard event={getEventQuery.data?.event as any} />
            <Link
              href="/events"
              className="w-full p-5 text-center bg-base-200 rounded-lg text-whity font-bold text-xl"
            >
              Избери друго
            </Link>
            <hr />
            <br />
            {/* <div className="w-screen -translate-x-1/4">
              <Workshops />
            </div> */}
            <h3 className="text-2xl w-full">
              Избери <strong>работилница</strong>:{" "}
            </h3>
            <div>
              <select
                name="workshop"
                value={workshop}
                className="w-full"
                onChange={(e) => {
                  setWorkshop(e.target.value);
                }}
              >
                <option value="ZORATA">Зората</option>
                <option value="THE_REVOLUTION">Революцията</option>
                <option value="LATE">В края на ретрото</option>
                <option value="FAMILY">Семеен</option>
              </select>
            </div>
            <Link
              href="/workshops"
              className="w-full p-5 text-center bg-base-200 rounded-lg text-whity font-bold text-xl"
            >
              Виж работилници
            </Link>
            <hr />
            <br />
            <div className="bg-base-200 rounded-xl text-white flex p-10 pb-[75px] flex-col gap-5">
              <h3 className="text-3xl text-center">
                Брой <strong>билети</strong>
              </h3>
              <div className="flex flex-row gap-20 max-sm:gap-5 max-sm:flex-col justify-around">
                <div className="pr-8 border-r-4 rounded-sm max-sm:pr-0 max-sm:border-r-0 max-sm:justify-center max-sm:w-full flex">
                  <FontAwesomeIcon size="10x" icon={faUser} />
                </div>
                <div className="flex flex-col justify-center gap-2 w-full">
                  <span className="flex flex-row max-sm:flex-col gap-3 max-sm:gap-0 h-10 max-sm:h-7">
                    <p className="text-2xl whitespace-nowrap max-sm:text-base">
                      Билети за <strong>деца</strong>:{" "}
                    </p>
                    <div className="flex w-full gap-8 max-sm:gap-4">
                      <input
                        value={numberChildTickets}
                        onChange={(e) => {
                          setNumberChildTickets(parseInt(e.target.value));
                        }}
                        type="number"
                        min="0"
                        max="10"
                        className="w-full max-sm:h-9 bg-whity rounded text-primary border-primary border-2 p-2 font-bold"
                      />
                      <p className="w-fit float-right whitespace-nowrap text-2xl">
                        x <strong>12лв</strong>
                      </p>
                    </div>
                  </span>
                  <span className="flex flex-row max-sm:flex-col gap-3 max-sm:gap-0 h-10 max-sm:h-7 max-sm:mt-8">
                    <p className="text-2xl whitespace-nowrap max-sm:text-lg">
                      Билети за <strong>възрастни</strong>:{" "}
                    </p>
                    <div className="flex w-full gap-8 max-sm:gap-4">
                      <input
                        value={numberAdultTickets}
                        onChange={(e) => {
                          setNumberAdultTickets(parseInt(e.target.value));
                        }}
                        type="number"
                        min="1"
                        max="10"
                        className="w-full bg-whity rounded text-primary border-primary border-2 p-2 max-sm:h-9 font-bold"
                      />
                      <p className="w-fit float-right whitespace-nowrap text-2xl">
                        x <strong>18лв</strong>
                      </p>
                    </div>
                  </span>
                </div>
              </div>
            </div>
            <hr />
            <br />
            <hgroup>
              <h3 className="text-2xl text-center">
                Какво включва един <strong>билет</strong>:{" "}
              </h3>
              <p className="text-sm text-center text-contrasty">
                <strong>1 ПОСЕЩЕНИЕ</strong> за <strong>1 ЧОВЕК</strong> на{" "}
                <strong>1 WORKSHOP</strong> на{" "}
                <strong>1 ПРЕДВАРИТЕЛНО ОПРЕДЕЛЕНО СЪБИТИЕ</strong>
              </p>
            </hgroup>
            <hr />
            <br />
            <button className="bg-primary p-5 text-2xl font-bold rounded-lg text-white">
              {price} лв
            </button>
          </>
        )}
      </form>
    </div>
  );
}
