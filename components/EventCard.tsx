"use client";

import {
  faCity,
  faCalendar,
  faBook,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { UploadButton } from "./uploadthing";
import { trpc } from "@/app/_trpc/client";
import { useMemo, useState } from "react";
import Image from "next/image";

export const EventCard = ({
  event,
  isAdmin,
}: {
  event: {
    id: string;
    title: string;
    description: string;
    starts_at: Date;
    ends_at: Date | null;
    address: string;
    city: string;
    coords: number[];
    gallery: string[];
  };
  isAdmin: boolean;
}) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const requestAddToGallery = trpc.events.saveToGallery.useMutation();
  const requestRemoveFromGallery = trpc.events.deleteFromGallery.useMutation();
  const requestDeleteEvent = trpc.events.deleteEvent.useMutation();
  // const state = useMemo(
  //   () =>
  //     new Date(event.ends_at!).getTime() > new Date().getTime() &&
  //     new Date(event.starts_at!).getTime() < new Date().getTime()
  //       ? "active"
  //       : new Date(event.ends_at!).getTime() < new Date().getTime()
  //       ? "past"
  //       : "future",
  //   []
  // );
  const state =
    new Date(event.ends_at!).getTime() > new Date().getTime() &&
    new Date(event.starts_at!).getTime() < new Date().getTime()
      ? "active"
      : new Date(event.ends_at!).getTime() < new Date().getTime()
      ? "past"
      : "future";
  if (isDeleted) return <></>;
  return (
    <div
      key={event.id}
      id={event.id}
      className={`rounded-lg shadow flex-col bg-base-200 text-white ${
        state === "past" ? "brightness-[0.85]" : ""
      }`}
    >
      <div className="w-full p-5 flex justify-between">
        <div className="flex flex-col gap-2 max-sm:gap-0">
          <div className="flex gap-2">
            <FontAwesomeIcon
              icon={faCity}
              size="3x"
              className="m-1 max-sm:w-11"
            />
            <div className="flex flex-col justify-center min-w-fit h-full max-w-fit">
              <span className="flex gap-2">
                {" "}
                <p className="w-fit text-xl font-bold leading-4">
                  {event.city}{" "}
                </p>
                <Image
                  width={30}
                  height={15}
                  src={`/images/caravan.png`}
                  alt="caravan"
                  style={{
                    filter: `brightness(${
                      state === "active"
                        ? "1.50"
                        : state === "past"
                        ? "0.75"
                        : "1"
                    })`,
                  }}
                />
              </span>
              <p className="w-fit">{event.address}</p>
            </div>
          </div>
          <span className="flex gap-2 justify-center items-center content-center">
            <FontAwesomeIcon icon={faCalendar} />
            <p className="w-fit text-sm">
              <strong>
                {new Date(event.starts_at!).toLocaleDateString("bg", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </strong>{" "}
              до{" "}
              <strong>
                {new Date(event.ends_at!).toLocaleDateString("bg", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </strong>
            </p>
          </span>
        </div>
        <div className="flex gap-2">
          {isAdmin && (
            <>
              <div className="flex cursor-pointer flex-col p-2 bg-primary justify-center gap-3 max-h-fit rounded active:brightness-125 max-sm:p-0.5">
                <UploadButton
                  endpoint="galleryPhotos"
                  onClientUploadComplete={async (res: any) => {
                    event.gallery!.push(res![0].url + "|" + res![0].key);
                    await requestAddToGallery.mutateAsync({
                      id: event.id,
                      url: res![0].url + "|" + res![0].key,
                    });
                  }}
                  onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                  }}
                />
                <p className="w-fit text-xs text-center max-sm:text-[0.6rem]">
                  Добави в галерия
                </p>
              </div>
              <a
                onClick={async () => {
                  const deleted = await requestDeleteEvent.mutateAsync({
                    id: event.id,
                  });
                  setIsDeleted(true);
                }}
                className="flex cursor-pointer flex-col p-2 bg-primary justify-center gap-3 max-h-fit rounded active:brightness-125 max-sm:p-0.5"
              >
                <FontAwesomeIcon size="2x" icon={faTrashCan} />
                <p className="w-fit text-xs text-center max-sm:text-[0.6rem]">
                  Изтрий
                </p>
              </a>
            </>
          )}
          <Link
            href={state !== "past" ? `/book` : ""}
            className="flex cursor-pointer flex-col p-2 bg-primary justify-center gap-3 max-h-fit rounded active:brightness-125 max-sm:p-0.5"
          >
            <FontAwesomeIcon size="2x" icon={faBook} />
            <p className="w-fit text-xs text-center max-sm:text-[0.6rem]">
              Запиши се
            </p>
          </Link>
        </div>
      </div>
      <div className="flex flex-col p-5 border-t">
        <div className="rounded-lg bg-base-100 p-3 text-black">
          <h1 className="text-center text-2xl font-bold">{event.title}</h1>
          <p className="text-contrasty">{event.description}</p>
          {event.gallery.length > 0 && (
            <div className="flex gap-2 mt-5 max-w-full overflow-auto">
              {event.gallery.map((img) => (
                <div
                  className="relative w-auto float-left h-52 flex shrink-0 grow-0"
                  key={img}
                >
                  <img
                    src={img.split("|")[0]}
                    alt="gallery image"
                    className="h-full w-auto"
                  />
                  {isAdmin && (
                    <button
                      className="bg-red-500 text-white rounded p-1 absolute top-1 left-1"
                      onClick={async () => {
                        event.gallery.splice(event.gallery.indexOf(img));
                        await requestRemoveFromGallery.mutateAsync({
                          id: event.id,
                          url: img,
                        });
                      }}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
