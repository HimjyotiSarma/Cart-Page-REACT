export const getTotals = (cart) => {
  let totalAmount = 0
  let totalItems = 0
  for (let { id, price, amount } of cart.values()) {
    totalItems += amount
    totalAmount = totalItems * price
  }
  return { totalAmount, totalItems }
}
