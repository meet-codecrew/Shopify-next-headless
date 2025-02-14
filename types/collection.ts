import { Products } from "./product";

export type Collections = {
  collections: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        description: string;
        handle: string;
        image: {
          id: string;
          url: string;
        };
      };
    }>;
  };
};

export type CollectionHandle = {
  collectionByHandle: {
    id: string;
    title: string;
    description: string;
    handle: string;
    image: {
      id: string;
      url: string;
    };
    products: Products["products"];
  };
};
