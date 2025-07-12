import { initContract } from "@ts-rest/core";
import { z } from "zod";

export const StarshipSchema = z.object({
  name: z.string(),
  model: z.string(),
  manufacturer: z.string(),
  crew: z.string(),
  passengers: z.string(),
  hyperdrive_rating: z.string(),
  url: z.string().optional(), 
});

const c = initContract();

export const starshipContract = c.router({
   getStarships: {
    method: "GET",
    path: "/starships", 
    query: z.object({
      page: z.number().int().positive(), 
      limit: z.coerce.number().default(10), 
    }),
    responses: {
      200: z.object({
        results: z.array(StarshipSchema), 
      }),
    },
  },

  getStarshipDetails: {
    method: "GET",
    path: "/starships/:id",
    pathParams: z.object({
      id: z.string(),
    }),
    responses: {
      200: z.object({
        result: StarshipSchema, 
      }),
    },
  },

  searchStarships: {
    method: "GET",
    path: "/starships",
    query: z.object({
      search: z.string().default(""),
    }),
    responses: {
      200: z.object({
        results: z.array(
          StarshipSchema.pick({ name: true, url: true }) 
        ),
      }),
    },
  },
});

export const contract = c.router({
  starships: starshipContract,
});