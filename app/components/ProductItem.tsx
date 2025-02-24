import Image from "next/image";
import Link from "next/link";

//@ts-ignore
export default function ProductItem({ product }: { product }) {
  const formatPrice = (amount: string, currencyCode: string) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currencyCode,
    }).format(parseFloat(amount));
  };
  return (
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
  );
}
