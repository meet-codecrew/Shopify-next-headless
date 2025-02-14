import { getCollections } from "@/lib/shopify";
import { Collections } from "@/types/collection";
import Image from "next/image";
import Link from "next/link";

const removeEdgeAndNodes = ({ data }: { data: Collections }) => {
  return data.collections.edges.map(({ node }) => ({
    ...node,
    images: node.image,
  }));
};

export default async function all() {
  const allCollectiosUnfiltered: { data: Collections } = await getCollections();
  const allCollectios = removeEdgeAndNodes(allCollectiosUnfiltered);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Collections</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {allCollectios &&
          allCollectios.map((collection) => (
            <Link
              key={collection.id}
              href={`collections/${collection.handle}`}
              className="group rounded overflow-hidden relative hover:-translate-y-1 transition-all duration-200"
            >
              <div className="absolute font-semibold opacity-0 group-hover:opacity-100 text-2xl bottom-3 left-4 z-10 transition-opacity duration-300">
                {collection.title}
              </div>
              <div className="bg-black">
              <Image
                className="opacity-100 group-hover:opacity-55 transition-opacity duration-300"
                src={collection.images.url}
                alt={collection.title}
                width={800}
                height={800}
                />
                </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
