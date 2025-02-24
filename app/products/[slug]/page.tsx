import { getProduct, getRecommendations } from "@/lib/shopify";
import { ProductHandle, RecommendedProductHandle } from "@/types/product";
import ProductDetail from "./components/ProductDetail";
import ImageGallery from "./components/ProductImage";
import ProductVariants from "./components/ProductVariants";
import { VariantProvider } from "./components/VariantContext";
import ProductItem from "@/app/components/ProductItem";

type Response = {
  data: ProductHandle | null;
};

// export async function generateMetadata()

const removeEdgeAndNodes = ({ data }: Response) => {
  if (!data || !data.productByHandle) return null;

  const variant = data.productByHandle.variants.edges.map(({ node }) => node);
  const images = data.productByHandle.images.edges.map(({ node }) => node);

  return {
    ...data.productByHandle,
    images,
    variants: variant,
  };
};

const formatPrice = (amount: string, currencyCode: string) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currencyCode,
  }).format(parseFloat(amount));
};

const removeImageEdgeAndNodes = ({
  data,
}: {
  data: RecommendedProductHandle;
}) => {
  return data.productRecommendations.map((node) => ({
    ...node,
    images: node.images.edges.map(({ node }) => node),
  }));
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const productUnfiltered = await getProduct(slug);
  if (!productUnfiltered || !productUnfiltered.data?.productByHandle) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-4xl font-bold text-gray-400">
          404 - Product Not Found
        </h1>
      </div>
    );
  }

  const product = removeEdgeAndNodes(productUnfiltered);
  const recommendedUnfilterdProducts: {
    data: RecommendedProductHandle;
  } | null = product && (await getRecommendations(product.id));

  const recommendedProducts =
    recommendedUnfilterdProducts &&
    removeImageEdgeAndNodes(recommendedUnfilterdProducts);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-4xl font-bold text-gray-400">
          404 - Product Not Found
        </h1>
      </div>
    );
  }

  const initialPrice = formatPrice(
    product.priceRange.minVariantPrice.amount,
    product.priceRange.minVariantPrice.currencyCode
  );

  return (
    <VariantProvider>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ImageGallery images={product.images} />

          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-gray-200 mb-4">
              {product.title}
            </h1>

            <div className="mb-8">
              <p className="text-gray-300 leading-relaxed">
                {product.description}
              </p>
            </div>
            <div className="mb-8">
              <ProductVariants
                variants={product.variants}
                initialPrice={initialPrice}
              />
            </div>

            <ProductDetail product={product} />

            <div className="border-t border-gray-200 pt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-200">SKU</h3>
                  <p className="text-sm text-gray-400">
                    {product.variants[0]?.id.split("/").pop() ?? "N/A"}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-200">
                    Availability
                  </h3>
                  <p className="text-sm text-green-600">In Stock</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {recommendedProducts && (
          <>
            <h1 className="text-3xl font-bold my-8">Recommended Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recommendedProducts.slice(0, 4).map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </VariantProvider>
  );
}
