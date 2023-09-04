"use client";
import { trpc } from "@/app/_trpc/client";
import { FormEvent, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import PageLoading from "@/app/loading";
import { Errors } from "./Errors";

export const CreateNewEvent = () => {
  const [md, setMd] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [locaion, setLocaion] = useState("");
  const [startsAt, setStartsAt] = useState("");
  const [endsAt, setEndsAt] = useState("");

  // const [errors, setErrors] = useAtom(errorsAtom);
  // setErrors(["NIGGA", "NIGGA 2"]);

  const requestDelivery = trpc.events.createEvent.useMutation();
  const saveEvent = (event: FormEvent) => {
    event.preventDefault();
    requestDelivery.mutate({
      description: description,
      ends_at: new Date(endsAt).toISOString(),
      starts_at: new Date(startsAt).toISOString(),
      image_url: null,
      location: locaion,
      markdown: md,
      target_groups: ["CHILDREN"],
      title: title,
    });
  };

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
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Въведе описание на събитието"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="text"
              placeholder="MarkDown контент свързан със страницата"
              name="markdown"
              value={md}
              onChange={(e) => setMd(e.target.value)}
            />
            <ReactMarkdown>{md}</ReactMarkdown>
            <div>
              <label htmlFor="starts_at">Започва от: </label>
              <input
                id="starts_at"
                type="datetime-local"
                name="starts_at"
                value={startsAt}
                onChange={(e) => setStartsAt(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="ends_at">Започва от: </label>
              <input
                id="ends_at"
                type="datetime-local"
                name="ends_at"
                value={endsAt}
                onChange={(e) => setEndsAt(e.target.value)}
              />
            </div>
            <input
              placeholder="локация на събитието"
              type="text"
              name="location"
              value={locaion}
              onChange={(e) => setLocaion(e.target.value)}
            />
            <button className="w-full bg-primary">СЪЗДАЙ</button>
          </div>
          {requestDelivery.isLoading && <PageLoading />}
        </div>
      </form>
      <Errors errors={[requestDelivery.error?.message!]} />
    </>
  );
};
