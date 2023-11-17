import { createContext, useContext, useEffect, useReducer } from 'react'
import cartItems from './data'
import { getTotals } from './utils'
import {
  CLEAR_CART,
  REMOVE,
  INCREASE,
  DECREASE,
  LOADING,
  DISPLAY_ITEMS,
} from './actions'

import reducer from './reducer'

export const AppContext = createContext()

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export const AppProvider = ({ children }) => {
  const initialState = {
    isLoading: false,
    cart: new Map(),
  }

  const clearCart = () => {
    dispatch({ type: CLEAR_CART })
  }
  const removeItem = (id) => {
    dispatch({ type: REMOVE, payload: { id } })
  }
  const increaseCart = (id) => {
    dispatch({ type: INCREASE, payload: { id } })
  }
  const decreaseCart = (id) => {
    dispatch({ type: DECREASE, payload: { id } })
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const { totalAmount, totalItems } = getTotals(state.cart)
  const url = 'https://www.course-api.com/react-useReducer-cart-project'

  const fetchData = async () => {
    dispatch({ type: LOADING })
    const response = await fetch(url)
    const cart = await response.json()
    console.log(cart)
    dispatch({ type: DISPLAY_ITEMS, payload: { cart: cart } })
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        increaseCart,
        decreaseCart,
        totalAmount,
        totalItems,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
