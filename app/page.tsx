import { getProducts } from "@/lib/shopify";
import { Products } from "@/types/product";
import Link from "next/link";
import ProductItem from "./components/ProductItem";

type Response = {
  data: Products;
};

const removeEdgeAndNodes = ({ data }: Response) => {
  return data.products.edges.map(({ node }) => ({
    ...node,
    images: node.images.edges.map(({ node }) => node),
  }));
};

export default async function Home() {
  const data: Response = await getProducts(4);
  const response = removeEdgeAndNodes(data);
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {response && (
        <>
          <h1 className="text-3xl font-bold my-8">Our Products</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {response.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <Link
              href={"/products"}
              className="py-2 px-3 font-semibold border hover:bg-white hover:text-black transition-color duration-300"
            >
              More products
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
