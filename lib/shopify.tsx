import {
  GET_COLLECTION_QUERY,
  GET_COLLECTIONS_QUERY,
  GET_MENU_QUERY,
  GET_PAGE,
  GET_PRODUCT_QUERY,
  GET_PRODUCT_RECOMMENDATIONS_QUERY,
  GET_PRODUCTS_QUERY,
  GET_STORE_DETAILS_QUERY,
} from "./constant";
import {
  ProductHandle,
  Products,
  RecommendedProductHandle
} from "@/types/product";
import { Menus } from "@/types/menu";
import { QueryOptions, ShopDetails, ShopifyConfig } from "@/types/shopify";
import { CollectionHandle, Collections } from "@/types/collection";
import { PageHandle } from "@/types/page";

export class ShopifyClient {
  private config: ShopifyConfig;

  constructor(config: ShopifyConfig) {
    this.config = {
      apiVersion: "2024-10",
      ...config,
    };
  }

  async fetch<T>(
    query: string,
    options: QueryOptions = {}
  ): Promise<{ data: T; errors?: Error[] }> {
    const { variables = {}, cache = "no-cache" } = options;

    try {
      const response = await fetch(
        `https://${this.config.storeUrl}/api/${this.config.apiVersion}/graphql.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token":
              this.config.storefrontAccessToken,
          },
          body: JSON.stringify({
            query,
            variables,
          }),
          cache,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.errors) {
        console.error("Shopify API Errors:", result.errors);
      }

      return result;
    } catch (error) {
      console.error("Shopify fetch error:", error);
      throw error;
    }
  }
}

export const shopify = new ShopifyClient({
  storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
  storeUrl: process.env.SHOPIFY_STORE_DOMAIN!,
});

export async function getProducts(first: number = 10) {
  const query = GET_PRODUCTS_QUERY;

  return shopify.fetch<Products>(query, {
    variables: { first },
  });
}

export async function getProduct(handle: string) {
  const query = GET_PRODUCT_QUERY;

  return shopify.fetch<ProductHandle>(query, {
    variables: { handle },
  });
}

export async function getMenu(handle: string): Promise<{ data: Menus }> {
  const query = GET_MENU_QUERY;

  return shopify.fetch<Menus>(query, {
    variables: { handle },
  });
}
export async function getShopDetails(): Promise<{ data: ShopDetails }> {
  const query = GET_STORE_DETAILS_QUERY;

  return shopify.fetch<ShopDetails>(query);
}

export async function getRecommendations(
  id: string | null
): Promise<{ data: RecommendedProductHandle }> {
  const query = GET_PRODUCT_RECOMMENDATIONS_QUERY;

  return shopify.fetch<RecommendedProductHandle>(query, {
    variables: { productId: id },
  });
}

export async function getCollections(
  first: number = 10
): Promise<{ data: Collections }> {
  const query = GET_COLLECTIONS_QUERY;

  return shopify.fetch<Collections>(query, {
    variables: { first },
  });
}

export async function getCollection(
  handle: string,
  first: number = 10
): Promise<{ data: CollectionHandle }> {
  const query = GET_COLLECTION_QUERY;

  return shopify.fetch<CollectionHandle>(query, {
    variables: { handle, first },
  });
}

export async function getPage(handle: string): Promise<{ data: PageHandle }> {
  const query = GET_PAGE;

  return shopify.fetch<PageHandle>(query, {
    variables: { handle },
  });
}
