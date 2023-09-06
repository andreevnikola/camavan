import { db } from "../_db/edgePrisma";

import dynamic from "next/dynamic";
import { EventCard } from "@/components/EventCard";
import { currentUser } from "@clerk/nextjs";

const MapWithNoSSR = dynamic(() => import("@/components/HistoryMap"), {
  ssr: false,
});

export default async function Events() {
  const clerkUser = (await currentUser()) || undefined;
  let user: any = undefined;
  if (clerkUser)
    user = await db.user.findUnique({
      where: {
        id: clerkUser?.id,
      },
    });
  const events = await db.events.findMany();
  events.sort(
    (a, b) => new Date(b.ends_at!).getTime() - new Date(a.ends_at!).getTime()
  );
  let pastEvents: any = [];
  let activeEvents: any = [];
  let futureEvents: any = [];

  events.forEach((event) => {
    if (
      new Date(event.ends_at!).getTime() > new Date().getTime() &&
      new Date(event.starts_at!).getTime() < new Date().getTime()
    ) {
      activeEvents.push(event);
      return;
    }
    if (new Date(event.ends_at!).getTime() < new Date().getTime()) {
      pastEvents.push(event);
      return;
    }
    futureEvents.push(event);
  });
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-4xl p-5 flex flex-col gap-3">
        <MapWithNoSSR />
        {activeEvents ? (
          <>
            <h1 className="font-bold text-2xl">Актвни събития</h1>
            {activeEvents.map((event: any) => (
              <EventCard
                key={event.id}
                event={event}
                isAdmin={user?.hasRole === "ADMIN"}
              />
            ))}
          </>
        ) : (
          <></>
        )}
        {futureEvents ? (
          <>
            <hr />
            <br />
            <h1 className="font-bold text-2xl">Бъдещи събития</h1>
            {futureEvents.map((event: any) => (
              <EventCard
                key={event.id}
                event={event}
                isAdmin={user?.hasRole === "ADMIN"}
              />
            ))}
          </>
        ) : (
          <></>
        )}
        {pastEvents ? (
          <>
            <hr />
            <br />
            <h1 className="font-bold text-2xl">Минали събития</h1>
            {pastEvents.map((event: any) => (
              <EventCard
                key={event.id}
                event={event}
                isAdmin={user?.hasRole === "ADMIN"}
              />
            ))}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
