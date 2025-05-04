import { authRouter } from "@/modules/auth/server/procedures";
import { createTRPCRouter } from "../init";
import { categoriesRouter } from "@/modules/categories/server/procedures";
import { productsRouter } from "@/modules/products/server/procedures";
import { tagsRouters } from "@/modules/tags/server/procedures";

export const appRouter = createTRPCRouter({
    auth: authRouter,
    tags: tagsRouters,
    products: productsRouter,
    categories: categoriesRouter,
})

export type AppRouter = typeof appRouter;