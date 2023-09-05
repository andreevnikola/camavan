import { db } from "../_db/edgePrisma";

import dynamic from "next/dynamic";
import { EventCard } from "@/components/EventCard";
import { currentUser } from "@clerk/nextjs";

const MapWithNoSSR = dynamic(() => import("@/components/HistoryMap"), {
  ssr: false,
});

export default async function Events() {
  const clerkUser = await currentUser();
  const user = clerkUser
    ? await db.user.findUnique({
        where: {
          id: clerkUser?.id,
        },
      })
    : undefined;
  const events = await db.events.findMany();
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-2xl p-5 flex flex-col gap-3">
        <MapWithNoSSR />
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            isAdmin={user?.hasRole === "ADMIN"}
          />
        ))}
      </div>
    </div>
  );
}
