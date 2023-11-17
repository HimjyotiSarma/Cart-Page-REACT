import {
  CLEAR_CART,
  REMOVE,
  INCREASE,
  DECREASE,
  LOADING,
  DISPLAY_ITEMS,
} from './actions'

const reducer = (state, action) => {
  if (action.type == CLEAR_CART) {
    return { ...state, cart: new Map() }
  }
  if (action.type == REMOVE) {
    const newMap = new Map(state.cart)
    newMap.delete(action.payload.id)
    return { ...state, cart: newMap }
  }
  if (action.type == INCREASE) {
    const newMap = new Map(state.cart)
    const itemID = action.payload.id
    const Item = newMap.get(itemID)
    const newItem = { ...Item, amount: Item.amount + 1 }
    newMap.set(itemID, newItem)
    return { ...state, cart: newMap }
  }
  if (action.type == DECREASE) {
    const newMap = new Map(state.cart)
    const itemID = action.payload.id
    const Item = newMap.get(itemID)
    if (Item.amount == 1) {
      newMap.delete(itemID)
      return { ...state, cart: newMap }
    }
    const newItem = { ...Item, amount: Item.amount - 1 }
    newMap.set(itemID, newItem)
    return { ...state, cart: newMap }
  }
  if (action.type == LOADING) {
    return { ...state, isLoading: true }
  }
  if ((action.type = DISPLAY_ITEMS)) {
    const newCart = new Map(action.payload.cart.map((item) => [item.id, item]))
    return { ...state, isLoading: false, cart: newCart }
  }
  throw new Error(`No such action named : ${action.type} is found`)
}

export default reducer
