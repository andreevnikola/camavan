import { eventsRouter } from "./events";
import { t } from "./trpc";
import { userRouter } from "./user";

export const appRouter = t.router({
  user: userRouter,
  events: eventsRouter,
});

export type AppRouter = typeof appRouter;
