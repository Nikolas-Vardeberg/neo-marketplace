
import type { AppRouter } from "@/trpc/routers/_app"
import { inferProcedureOutput } from "@trpc/server"

export type ProductsGetManyOutput = inferProcedureOutput<AppRouter>["products"]["getMany"]; 