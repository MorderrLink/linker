import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const searchRouter = createTRPCRouter({
    getSearched: publicProcedure
    .input(z.object({query: z.string()}))
    .query(async ({input: {query: query}, ctx}) => {
        if (query === "") return {groups: [], users: []}
        const searchedDataGroups = await ctx.db.linkGroup.findMany({where: {
            OR: [
                {
                    title: {
                        contains: query,
                        mode: "insensitive"
                    }
                },
                {
                    author: {
                        name: {
                            contains: query,
                            mode: "insensitive"
                        }
                    }
                }
            ]},
            select: {
                title: true,
                author: true,
                id: true,
            }
        })
        if (searchedDataGroups == undefined) {
            throw new Error("Data is undefined")
        }
        const searchedDataUsers = await ctx.db.user.findMany({where: {
            name: {
                contains: query,
                mode: "insensitive"
            }
        },
        select : {
            name: true,
            id: true,
            image: true,
        }        
        })
        if (searchedDataUsers == undefined) {
            throw new Error("Data is undefined")
        }

        const searchedData = {
            groups: searchedDataGroups,
            users: searchedDataUsers
        }
        return searchedData;
    })
})