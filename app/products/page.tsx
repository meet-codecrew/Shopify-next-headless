import { getProducts } from "@/lib/shopify";
import { Products } from "@/types/product";
import ProductItem from "../components/ProductItem";

type Response = {
  data: Products;
};

const removeEdgeAndNodes = ({ data }: Response) => {
  return data.products.edges.map(({ node }) => ({
    ...node,
    images: node.images.edges.map(({ node }) => node),
  }));
};

export default async function ProductListing() {
  const data: Response = await getProducts(30);
  const response = removeEdgeAndNodes(data);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {response.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
