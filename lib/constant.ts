export const GET_PRODUCTS_QUERY = `
    query Products($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
`;

export const GET_PRODUCT_QUERY = `
    query productByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        description
        handle
        priceRange {
          maxVariantPrice {
            amount
            currencyCode
          }
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 10){
          edges{
            node{
              id
              url
              altText
            }
          }
        }
        seo {
          description
          title
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              compareAtPrice{
                amount
                currencyCode
              }
    		      price {
                amount
                currencyCode
              }
              selectedOptions {
                name
                value
              }
              image {
                id
                url
              }
            }
          }
        }
      }
    }
`;

export const GET_PRODUCT_RECOMMENDATIONS_QUERY = `
query productRecommendations($productId: ID!) {
  productRecommendations(productId: $productId) {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 1) {
      edges {
        node {
          url
          altText
        }
      }
    }
  }
}
`;

export const GET_MENU_QUERY = `
query getMenu($handle: String!) {
  menu(handle: $handle) {
    id
    items {
      id
      title
      url
      items {
        id
        title
        url
        items {
          id
          title
          url
        }
      }
    }
  }
}
`;

export const GET_STORE_DETAILS_QUERY = `
query getShopDetails {  
    shop {
      name
      description
    }
  }
`;

export const GET_COLLECTIONS_QUERY = `
query Collections($first: Int!) {
  collections(first: $first) {
    edges {
      node {
        id
        title
        description
        handle
        image {
          id
          url
        }
      }
    }
  }
}
`

export const GET_COLLECTION_QUERY = `
query Collection($handle: String!, $first: Int!) {
  collectionByHandle(handle: $handle) {
    id
    title
    description
    image {
      id
      url
      altText
    }
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
}
`

export const GET_PRODUCT_BY_ID = `
`

export const GET_PAGE = `
query getPageByHandle($handle: String!) {
  pageByHandle(handle: $handle) {
    id
    title
    body
    handle
    createdAt
    updatedAt
  }
}
` 