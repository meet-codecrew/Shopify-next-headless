export type Product = {
  id: string;
  title: string;
  handle: string;
  priceRange: {
    maxVariantPrice?: {
      amount: string;
      currencyCode: string;
    };
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string | null;
      };
    }>;
  };
};

export type TransformedProduct = Omit<Product, "images"> & {
  images: Array<{ url: string; altText: string | null }>;
};

export type Products = {
  products: {
    edges: Array<{
      node: Product;
    }>;
  };
};

export type ProductVariant = {
  id: string;
  title: string;
  compareAtPrice: {
    amount: string;
    currencyCode: string;
  };
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: {
    amount: string;
    currencyCode: string;
  };
  image: {
    id: string;
    url: string;
  };
};

export type ProductHandle = {
  productByHandle: {
    id: string;
    title: string;
    description: string;
    handle: string;
    priceRange: {
      maxVariantPrice: {
        amount: string;
        currencyCode: string;
      };
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    seo: {
      title: string;
      description: string;
    };
    images: {
      edges: Array<{
        node: {
          id: string;
          url: string;
          altText: string | null;
        };
      }>;
    };
    variants: {
      edges: Array<{
        node: ProductVariant;
      }>;
    };
  };
};

export type RecommendedProductHandle = {
  productRecommendations: Array<{
    id: string;
    title: string;
    handle: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: Array<{
        node: {
          url: string;
          altText: string | null;
        };
      }>;
    };
  }>;
};
