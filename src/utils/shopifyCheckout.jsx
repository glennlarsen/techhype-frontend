// utils/shopifyCheckout.js

async function createShopifyCheckout(cartItems) {
  console.log(cartItems);
  const lineItems = cartItems.map(item => ({
    variantId: item.variantId,
    quantity: item.quantity,
  }));

  // The rest of your function remains the same
  const query = `
    mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  // Prepare the variables
  const variables = {
    input: {
      lineItems: lineItems.map(lineItem => ({
        variantId: btoa(lineItem.variantId),
        quantity: lineItem.quantity,
      }))
    }
  };

  // Send the mutation to Shopify's GraphQL endpoint
  const response = await fetch('https://techhype-business-card.myshopify.com/api/2023-10/graphql.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': '5c08c7f290e432e9edf0d04e84ea329d',
    },
    body: JSON.stringify({
      query: query,
      variables: variables
    }),
  });

  const responseData = await response.json();
  // Error handling remains the same
  if (responseData.errors) {
    console.error('GraphQL errors:', responseData.errors);
    throw new Error('Failed to create checkout due to GraphQL errors.');
  }
  if (responseData.data.checkoutCreate.userErrors.length > 0) {
    console.error('Checkout creation user errors:', responseData.data.checkoutCreate.userErrors);
    // Log detailed error messages
    responseData.data.checkoutCreate.userErrors.forEach(error => {
      console.error(`${error.field}: ${error.message}`);
    });
    throw new Error('Failed to create checkout due to user errors.');
  }
  
  return responseData.data.checkoutCreate.checkout;
}


  
  export default createShopifyCheckout;