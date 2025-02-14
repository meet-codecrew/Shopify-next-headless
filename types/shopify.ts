export type ShopifyConfig = {
  storefrontAccessToken: string;
  storeUrl: string;
  apiVersion?: string;
};

export type QueryOptions = {
  variables?: Record<string, any>;
  cache?: RequestCache;
};

export type ShopDetails = {
  shop: {
    name: string;
    email: string;
    description: string;
    currencyCode: string;
  };
};
