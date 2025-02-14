import { getProduct, getRecommendations } from "@/lib/shopify";
import { ProductHandle, RecommendedProductHandle } from "@/types/product";
import ProductDetail from "./components/ProductDetail";
import ImageGallery from "./components/ProductImage";
import ProductVariants from "./components/ProductVariants";
import { VariantProvider } from "./components/VariantContext";
import Image from "next/image";
import Link from "next/link";

type Response = {
  data: ProductHandle | null;
};

const removeEdgeAndNodes = ({ data }: Response) => {
  if (!data || !data.productByHandle) return null; // Handle missing product

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

  console.log(recommendedProducts, "recommendedProductssdsdsd");

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
                <Link
                  key={product.id}
                  href={`/products/${product.handle}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:-translate-y-1 transition-transform duration-200 cursor-pointer"
                >
                  <div className="relative aspect-square bg-gray-100">
                    <Image
                      src={product.images[0].url}
                      alt={product.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  <div className="p-4">
                    <h2 className="text-lg font-semibold mb-2 text-gray-800">
                      {product.title}
                    </h2>

                    <div className="flex justify-between items-center mt-4">
                      <span className="text-lg font-bold text-gray-900">
                        {formatPrice(
                          product.priceRange.minVariantPrice.amount,
                          product.priceRange.minVariantPrice.currencyCode
                        )}
                      </span>

                      <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors duration-200">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </VariantProvider>
  );
}
