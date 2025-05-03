import "server-only";

import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import React, { cache } from "react";
import { createTRPCContext } from "./init"
import { makeQueryClient } from "./query-client";
import { appRouter } from "./routers/_app";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export const getQueryClient = cache(makeQueryClient);
export const trpc = createTRPCOptionsProxy({
    ctx: createTRPCContext,
    router: appRouter,
    queryClient: getQueryClient,
})