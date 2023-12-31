import { db } from "@/app/_db/edgePrisma";
import { CreateNewEvent } from "@/components/NewEvent";
import { currentUser } from "@clerk/nextjs";

export default async function NewEvent() {
  const clerkUser = await currentUser();
  console.log(clerkUser);
  const user = await db.user.findUnique({
    where: {
      id: clerkUser?.id,
    },
  });
  console.log(user);
  if (user?.hasRole === "ADMIN") {
    return <CreateNewEvent />;
  } else {
    return <h1 className="text-red-600 text-2xl">НЯМАШ ДОСТЪП</h1>;
  }
}
