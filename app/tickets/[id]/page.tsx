import { db } from "@/app/_db/edgePrisma";
import { Ticket } from "@/components/Ticket";
import { currentUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";

export default async function SpecificTicket({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const user = await currentUser();
  const ticket = await db.tickets.findUnique({
    where: {
      id: params.id as string,
    },
    select: {
      isPaid: true,
      paymentMethod: true,
      type: true,
      workshop: true,
      id: true,
      price: true,
      event: true,
      userId: true,
      isUsed: true,
    },
  });
  const userDb = user
    ? await db.user.findUnique({
        where: {
          id: user?.id,
        },
      })
    : undefined;
  if (ticket?.userId !== user?.id && userDb?.hasRole !== "ADMIN")
    return (
      <h1 className="text-red-600 text-4xl font-bold text-center">
        НЕ ПРИТЕЖАВАТЕ ТОЗИ БИЛЕТ
      </h1>
    );
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-4xl p-5 flex flex-col gap-3">
        {!ticket && (
          <h1 className="text-red-600 text-4xl font-bold text-center">
            НЯМА ТАКЪВ БИЛЕТ
          </h1>
        )}
        {ticket && <Ticket ticket={ticket as any} />}
      </div>
    </div>
  );
}
