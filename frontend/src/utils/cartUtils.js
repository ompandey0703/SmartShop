export const calculatePrices = (cartItems) => {
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * (item.qty || 1),
    0
  );
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Number((itemsPrice * 0.18).toFixed(2));
  const totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2));
  return { itemsPrice, shippingPrice, taxPrice, totalPrice };
};

export const updateCart = (state) => {
  const prices = calculatePrices(state.cartItems);
  state.itemsPrice = prices.itemsPrice;
  state.shippingPrice = prices.shippingPrice;
  state.taxPrice = prices.taxPrice;
  state.totalPrice = prices.totalPrice;

  localStorage.setItem(
    "cart",
    JSON.stringify({
      cartItems: state.cartItems,
      itemsPrice: state.itemsPrice,
      shippingPrice: state.shippingPrice,
      taxPrice: state.taxPrice,
      totalPrice: state.totalPrice,
    })
  );
};
