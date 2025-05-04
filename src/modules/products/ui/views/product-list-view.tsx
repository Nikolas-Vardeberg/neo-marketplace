import { Suspense } from "react";
import { ProductFilters } from "../components/product-filter";
import ProductSort from "../components/product-sort";
import { ProductList, ProductListSkelton } from "../components/product-list";

interface Props {
    category?: string;
}

export const ProductListView = ({ category }: Props) => {
    return(
        <div className="px-4 lg:px-12 py-8 flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-y-2 lg:gap-y-0 justify-between">
            <p className="text-2xl font-medium">Curated for you</p>
            <ProductSort />
        </div>
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
    )
}

export default ProductListView;