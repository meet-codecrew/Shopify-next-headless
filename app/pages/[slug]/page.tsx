import { getPage } from "@/lib/shopify";
import { PageHandle } from "@/types/page";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const getPageData: { data: PageHandle } = await getPage(slug);
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {getPageData.data.pageByHandle.title}
      </h1>
      <div
        dangerouslySetInnerHTML={{ __html: getPageData.data.pageByHandle.body }}
      />
    </div>
  );
}
