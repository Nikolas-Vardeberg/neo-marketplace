"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";


interface Props {
    category?: string;
}

export const ProductList = ({ category }: Props) => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.products.getMany.queryOptions({
        category
    }));

    return(
        <div>
            {JSON.stringify(data, undefined, 2)}
        </div>
    )
}

export const ProductListSkelton = () => {
    return(
        <p>
            Loading...
        </p>
    )
}

export default { ProductList, ProductListSkelton };