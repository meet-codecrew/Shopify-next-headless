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