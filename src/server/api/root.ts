
import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/user";
import { profileRouter } from "./routers/profile";
import { linksRouter } from "./routers/links";
import { searchRouter } from "./routers/search";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  // ЗДЕСЬ СОЗДАВАТЬ tRPC Рауты
  user: userRouter,
  profile: profileRouter,
  link: linksRouter,
  search: searchRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
