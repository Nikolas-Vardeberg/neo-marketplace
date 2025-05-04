import { ProductFilters } from "@/modules/products/ui/components/product-filter";
import {ProductList, ProductListSkelton} from "@/modules/products/ui/components/product-list";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import type { SearchParams } from "nuqs/server";
import { loadProductFilters } from "@/modules/products/search-params";
import ProductSort from "@/modules/products/ui/components/product-sort";
import ProductListView from "@/modules/products/ui/views/product-list-view";
import { DEFAULT_LIMIT } from "@/constants";

interface Props {
    params: Promise<{
        category: string;
    }>
    searchParams: Promise<SearchParams>;
}

export default async function Page({ params, searchParams }: Props) {
    const {category} = await params;
    const filters = await loadProductFilters(searchParams)

    const queryClient = getQueryClient();
    void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions({
        category,
        ...filters,
        limit: DEFAULT_LIMIT,
    }));

    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductListView category={category} />
        </HydrationBoundary>
    )
}