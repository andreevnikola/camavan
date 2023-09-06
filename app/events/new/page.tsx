import { db } from "@/app/_db/edgePrisma";
import { CreateNewEvent } from "@/components/NewEvent";
import { currentUser } from "@clerk/nextjs";

export default async function NewEvent() {
  const clerkUser = (await currentUser()) || undefined;
  const user = clerkUser
    ? await db.user.findUnique({
        where: {
          id: clerkUser?.id,
        },
      })
    : undefined;

  if (user?.hasRole === "ADMIN") {
    return <CreateNewEvent />;
  } else {
    return <h1 className="text-red-600 text-2xl">НЯМАШ ДОСТЪП</h1>;
  }
}
