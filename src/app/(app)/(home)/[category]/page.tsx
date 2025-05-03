import { ProductFilters } from "@/modules/products/ui/components/product-filter";
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
            <div className="px-4 lg:px-12 py-8 flex flex-col gap-4">
                <div className="grid gird-cols-1 lg:grid-cols-6 xl:grid-cols-8 gap-y-6 gap-x-12">
                    <div className="lg:col-span-2 xl:col-span-2">
                        <ProductFilters />
                    </div>
                    <div className="lg:col-span-4 xl:col-span-6">
                        <Suspense fallback={<ProductListSkelton />}>
                            <ProductList category={category} />
                        </Suspense>
                    </div>
                </div>
            </div>
           
        </HydrationBoundary>
    )
}