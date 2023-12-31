import { db } from "@/app/_db/edgePrisma";
import { currentUser } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const camavanRouter = {
  galleryPhotos: f({ image: { maxFileSize: "1MB" } })
    .middleware(async ({ req }) => {
      const clerkUser = (await currentUser()) || undefined;
      if (!clerkUser) throw new Error("Unauthorized");
      const user = await db.user.findUnique({
        where: {
          id: clerkUser?.id,
        },
      });
      console.log(user);
      if (user?.hasRole !== "ADMIN") throw new Error("Unauthorized");
      return {};
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("file url", file.url);
    }),
} satisfies FileRouter;

export type CamavanRouter = typeof camavanRouter;
