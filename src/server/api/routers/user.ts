import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";



export const userRouter = createTRPCRouter({
    getUserByName: publicProcedure
    .input(z.object({name : z.string()}))
    .query(({input: {name: name}, ctx}) => {
        const user = ctx.db.user.findFirst({where: {
            name: name
        }})
        return user
    }),
    getUserById: publicProcedure
    .input(z.object({id : z.string()}))
    .query(({input: {id: id}, ctx}) => {
        const user = ctx.db.user.findFirst({where: {
            id: id
        }})
        return user
    }),
    changeName: protectedProcedure
    .input(z.object({username: z.string(), prevName: z.string()}))
    .mutation(async ({input: {username: newName, prevName: prevName}, ctx}) => {
        const user = await ctx.db.user.findUnique({where: {name: prevName}, select: {name: true}})
        if (user === null) return null
        await ctx.db.user.update({
            where: { name: user.name },
            data: { name: newName }
        })
        return `Username changed from ${prevName} to ${newName}`
    }),
    changePrivacy: protectedProcedure
    .input(z.object({userId: z.string(), isPrivate: z.boolean()}))
    .mutation( async ({input: {userId: userId, isPrivate: newPrivacy}, ctx}) => {
        const user = await ctx.db.user.findUnique({where: {id: userId}, select: {id: true, isProfilePrivate: true}})
        if (user === null) return null
        await ctx.db.user.update({
            where: {id: user.id},
            data: {isProfilePrivate: newPrivacy}
        })
    })
})