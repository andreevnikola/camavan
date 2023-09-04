import { z } from "zod";
import { adminProcedure, t } from "./trpc";
import { db } from "@/app/_db/edgePrisma";

export const eventsRouter = t.router({
  createEvent: adminProcedure
    .input(
      z.object({
        target_groups: z.array(
          z.enum(["PARENTS", "CHILDREN", "GRUICHO", "TEENS", "UNKNOWN"])
        ),
        title: z.string(),
        description: z.string(),
        markdown: z.null().or(z.string()),
        image_url: z.null().or(z.string()),
        starts_at: z.string(),
        ends_at: z.null().or(z.string()),
        location: z.null().or(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const event = await db.events.create({
        data: {
          ...input,
        },
      });
      return {};
    }),
});
