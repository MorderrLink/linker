import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const linksRouter = createTRPCRouter({
    createLinksGroup: protectedProcedure
    .input(z.object({title: z.string(), authorId: z.string()}))
    .mutation( async ({input: {title: title, authorId: authorId}, ctx}) => {
        const linksGroup = await ctx.db.linkGroup.create({ data: {title: title, authorId: authorId}, select: {id: true}})
        return linksGroup
    }),
    addLinkToGroup: protectedProcedure
    .input(z.object({url: z.string(), groupId: z.string(), iconPath: z.string()}))
    .mutation( async ({input: {url: url, groupId: groupId, iconPath: iconPath}, ctx}) => {
        const link = await ctx.db.link.create({data: { url: url, groupId: groupId, iconPath: iconPath }})
        return link
    }),
    getByAuthorId: publicProcedure
    .input(z.object({id: z.string()}))
    .query( async ({input: {id: id}, ctx}) => {
        if (id === "") return
        const groups = await ctx.db.linkGroup.findMany({where: { authorId: id }, select: {links: true, title: true, id:true, authorId:true}})
        return groups
    }),
    getGroupById: publicProcedure
    .input(z.object({id: z.string(), authorId: z.string()}))
    .query( async ({input: {id: id, authorId: authorId}, ctx}) => {
        if (authorId === "") return
        const group = await ctx.db.linkGroup.findFirst({where: {id: id, authorId:authorId}, select: {title:true, links:true}})
        return group
    }),
    deleteGroupById: protectedProcedure
    .input(z.object({id: z.string()}))
    .mutation( async ({input: {id: id}, ctx}) => {
        const deletion = await ctx.db.linkGroup.delete({where : {
            id: id
        }})
        return "Group was deleted"
    }),
})