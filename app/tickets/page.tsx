import { currentUser } from "@clerk/nextjs";
import { db } from "../_db/edgePrisma";
import { Ticket } from "@/components/Ticket";

export default async function Tickets() {
  const user = await currentUser();
  const tickets = await db.tickets.findMany({
    where: {
      userId: user?.id || "",
    },
    select: {
      isPaid: true,
      paymentMethod: true,
      type: true,
      workshop: true,
      id: true,
      price: true,
      isUsed: true,
      event: true,
    },
  });
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-4xl p-5 flex flex-col gap-3">
        {tickets.length < 1 && (
          <h1 className="text-red-600 text-4xl font-bold text-center">
            НЯМАТЕ ЗАКУПУВАНИ БИЛЕТИ
          </h1>
        )}
        {tickets.map((ticket) => (
          <Ticket key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
}
