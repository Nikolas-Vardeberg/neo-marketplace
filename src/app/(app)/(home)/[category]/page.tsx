import {ProductList, ProductListSkelton} from "@/modules/products/ui/components/product-list";
import { caller, getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { PathParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import { Suspense } from "react";

interface Props {
    params: Promise<{
        category: string;
    }>
}

export default async function Page({ params }: Props) {
    const {category} = await params;

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.products.getMany.queryOptions({
        category
    }));

    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<ProductListSkelton />}>
                <ProductList category={category} />
            </Suspense>
        </HydrationBoundary>
    )
}