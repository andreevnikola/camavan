"use client";

import { faCity, faCalendar, faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { UploadButton } from "./uploadthing";
import { trpc } from "@/app/_trpc/client";

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
  const requestAddToGallery = trpc.events.saveToGallery.useMutation();
  const requestRemoveFromGallery = trpc.events.deleteFromGallery.useMutation();
  return (
    <div
      key={event.id}
      id={event.id}
      className="bg-base-200 rounded shadow flex-col"
    >
      <div className="w-full p-3 flex justify-between">
        <div className="flex flex-col gap-2 max-sm:gap-0">
          <div className="flex gap-2">
            <FontAwesomeIcon
              icon={faCity}
              size="3x"
              className="m-1 max-sm:w-11"
            />
            <div className="flex flex-col justify-center min-w-fit h-full max-w-fit">
              <p className="w-fit text-xl font-bold leading-4">{event.city}</p>
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
            <div className="flex cursor-pointer flex-col p-2 bg-base-100 justify-center gap-3 max-h-fit rounded active:brightness-125 max-sm:p-0.5">
              <UploadButton
                endpoint="galleryPhotos"
                onClientUploadComplete={(res) => {
                  requestAddToGallery.mutate({
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
          )}
          <Link
            href={`/book`}
            className="flex cursor-pointer flex-col p-2 bg-base-100 justify-center gap-3 max-h-fit rounded active:brightness-125 max-sm:p-0.5"
          >
            <FontAwesomeIcon size="2x" icon={faBook} />
            <p className="w-fit text-xs text-center max-sm:text-[0.6rem]">
              Запиши се
            </p>
          </Link>
        </div>
      </div>
      <div className="flex flex-col p-3 border-t">
        <h1 className="text-center text-lg font-bold">{event.title}</h1>
        <p className="text-contrasty">{event.description}</p>
        <div className="flex gap-2 w-full overflow-auto max-h-52">
          {event.gallery.map((img) => (
            <div className="relative" key={img}>
              <img
                src={img.split("|")[0]}
                alt="gallery image"
                className="w-auto h-full"
              />
              {isAdmin && (
                <button
                  className="bg-red-500 text-white rounded p-1 absolute top-1 left-1"
                  onClick={() => {
                    requestRemoveFromGallery.mutate({
                      id: event.id,
                      url: img,
                    });
                    requestAddToGallery.reset();
                  }}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
