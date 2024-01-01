import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const profileRouter = createTRPCRouter({
    getProfileByName: publicProcedure
    .input(z.object({name: z.string() || z.boolean()}))
    .query(async ({input: {name: name}, ctx}) => {
        if (name == "") return null
        const profile = await ctx.db.user.findFirst({
            where: {
            name: name
        }, select: {
            id: true,
            name: true,
            image: true,
            email: true,
            isAdmin: true,
            isProfilePrivate: true,
        }})
        if (profile === null) return
        return {
            id: profile.id,
            name: profile.name,
            image: profile.image,
            email: profile.email,
            isAdmin: profile.isAdmin,
            isProfilePrivate: profile.isProfilePrivate,
        }
    }),
})