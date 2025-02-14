import { getCollection } from "@/lib/shopify";
import { CollectionHandle } from "@/types/collection";
import Image from "next/image";
import Link from "next/link";

const removeEdgeAndNodes = ({ data }: { data: CollectionHandle }) => {
  const collectionProducts = data.collectionByHandle.products.edges.map(
    ({ node }) => ({
      ...node,
      images: node.images.edges.map(({ node }) => node),
    })
  );

  return { ...data.collectionByHandle, products: collectionProducts };
};

const formatPrice = (amount: string, currencyCode: string | undefined) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currencyCode,
  }).format(parseFloat(amount));
};

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const collectionUnfiltered: { data: CollectionHandle } = await getCollection(
    slug
  );
  const collection = removeEdgeAndNodes(collectionUnfiltered);

  return (
    <div>
      <div className="relative h-40 md:h-60 lg:h-80 xl:h-[300px]">
        <div className="absolute z-10 h-full flex items-center justify-center w-full px-4">
          <span className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-wide drop-shadow-[2px_2px_0px_black] text-center">
            {collection.title}
          </span>
        </div>

        <Image
          src={collection.image.url}
          alt={collection.title}
          fill
          className="opacity-40 object-cover"
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {collection.products.map((product) => (
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
      </div>
    </div>
  );
}
