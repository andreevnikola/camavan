"use client";

import {
  faCashRegister,
  faCommentDollar,
  faLocationDot,
  faMarker,
  faSackDollar,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QRCodeSVG } from "qrcode.react";
import {
  PaymentMehods,
  TicketType,
  Workshops,
  Events,
} from "@prisma/client/edge";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";

const workshopToTitle = new Map([
  ["ZORATA", "Зората"],
  ["THE_REVOLUTION", "Революцията"],
  ["LATE", "Края на ретрото"],
  ["FAMILY", "Семеен"],
]);

const workshopToUrl = new Map([
  ["ZORATA", "the-beginning"],
  ["THE_REVOLUTION", "the-revolution"],
  ["LATE", "the-end-of-revolution"],
  ["FAMILY", "family-workshop"],
]);

export const Ticket = ({
  ticket,
}: {
  ticket: {
    type: TicketType;
    workshop: Workshops;
    price: number;
    isPaid: boolean;
    isUsed: boolean;
    paymentMethod: PaymentMehods;
    id: string;
    event: Events;
    userId?: string;
  };
}) => {
  const router = useRouter();
  const user = trpc.user.readUser.useQuery();
  const updateTicketRequest = trpc.tickets.validateTicket.useMutation();

  console.log(ticket.isUsed);

  return (
    <div
      className={`flex gap-4 h-fit flex-row bg-base-200 rounded-xl p-7 max-sm:flex-col ${
        ticket.isUsed ? "brightness-50" : ""
      }`}
    >
      <QRCodeSVG
        value={`${process.env.NEXT_PUBLIC_APP_URL}/tickets/${ticket.id}`}
        className="h-52 w-80 relative sm:-bottom-7 max-sm:-bottom-3 max-sm:-left-5 rounded-xl"
      />
      <div className="flex flex-col w-full">
        <div className="flex justify-between flex-col h-full">
          <hgroup>
            <Link href={`/workshops/${workshopToUrl.get(ticket.workshop)}`}>
              <h1 className="text-center text-5xl font-bold w-full relative">
                {workshopToTitle.get(ticket.workshop)}
              </h1>
            </Link>
            <p className="text-center">
              работилница за{" "}
              <strong>{ticket.type === "CHILD" ? "деца" : "въздрастни"}</strong>
            </p>
          </hgroup>
          <div className="flex flex-col gap-5">
            <div className="flex gap-2 w-full justify-between">
              <div className="flex gap-2 align-middle content-center">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  size="3x"
                  className="pt-0.5"
                />
                <hgroup>
                  <h1 className="text-center text-3xl max-sm:text-[1.2rem] font-bold">
                    {ticket.event.city}
                  </h1>
                  <p className="text-center text-md max-sm:text-sm text-md">
                    {ticket.event.address}
                  </p>
                </hgroup>
              </div>
              <div className="flex flex-col pt-2 text-md max-sm:pt-2.5 max-sm:text-sm">
                <p className="w-fit">
                  от{" "}
                  <strong>
                    {new Date(ticket.event.starts_at!).toLocaleDateString(
                      "bg",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </strong>
                </p>
                <p className="w-fit">
                  до{" "}
                  <strong>
                    {new Date(ticket.event.ends_at!).toLocaleDateString("bg", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </strong>
                </p>
              </div>
            </div>
            <div className="flex gap-2 w-full justify-between">
              <div className="flex gap-2 align-middle content-center">
                <FontAwesomeIcon
                  icon={faSackDollar}
                  size="3x"
                  className="pt-0.5"
                />
                <hgroup>
                  <h1 className="text-center text-2xl max-sm:text-[1.2rem] font-extrabold">
                    {ticket.paymentMethod === "CASH" ? "НАЛОЖЕН" : "КАРТА"}
                  </h1>
                  <p className="text-center max-sm:text-sm text-md">
                    {ticket.paymentMethod === "CASH"
                      ? "Платеж на място"
                      : "Онлайн плащане"}
                  </p>
                </hgroup>
              </div>
              <div className="flex flex-col pt-2">
                <p className="w-fit text-4xl max-sm:text-3xl">
                  <strong>{ticket.price}</strong> лв
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <hgroup className="w-full flex flex-grow flex-col">
              <h2 className="text-lg font-bold">{ticket.event.title}</h2>
              <p>{ticket.event.description}</p>
            </hgroup>
            <div className="flex gap-1">
              <div className="flex flex-col bg-primary p-1 text-whity rounded">
                <FontAwesomeIcon
                  icon={ticket.isPaid ? faCashRegister : faCommentDollar}
                  size="2x"
                />
                <p className="w-fit text-xs font-bold">
                  {ticket.isPaid ? "Платено" : "Очакване"}
                </p>
              </div>
              {user?.data?.user?.hasRole === "ADMIN" && !ticket.isUsed && (
                <button
                  disabled={ticket.isUsed}
                  className="flex flex-col bg-primary p-1 text-whity rounded"
                  onClick={async () => {
                    const ret = await updateTicketRequest.mutateAsync({
                      id: ticket.id,
                    });
                    router.push("/");
                  }}
                >
                  <FontAwesomeIcon icon={faThumbsUp} size="2x" />
                  <p className="w-fit text-xs font-bold">Валидирай</p>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
