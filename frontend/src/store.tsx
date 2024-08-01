import React from "react";
import { Cart, CartItem } from "./types/cart";

type AppState = {
  mode: string;
  cart: Cart;
};

const initialState: AppState = {
  mode: localStorage.getItem("mode")
    ? localStorage.getItem("mode")!
    : window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
  cart: {
    cartItems: localStorage.getItem("cartItem")
      ? JSON.parse(localStorage.getItem("cartItem")!)
      : [],
    paymentMethod: localStorage.getItem("paymentMethod")
      ? localStorage.getItem("paymentMethod")!
      : "PayPal",
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  },
};

type Action =
  | { type: "SWITCH_MODE" }
  | { type: "CART_ADD_ITEM"; payload: CartItem };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SWITCH_MODE":
      return { ...state, mode: state.mode === "dark" ? "light" : "dark" };

    case "CART_ADD_ITEM": {
      const newItem = action.payload;
      const existingItem = state.cart.cartItems.find(
        (item: CartItem) => item.id === newItem.id,
      );
      const cartItems = existingItem
        ? state.cart.cartItems.map((item: CartItem) =>
            item.id === existingItem.id ? newItem : item,
          )
        : { ...state.cart.cartItems, newItem };

      localStorage.setItem("cartItem", JSON.stringify(cartItems));

      return { ...state, cart: { ...state.cart, cartItems } };
    }

    default:
      return state;
  }
}

const defaultDispatch: React.Dispatch<Action> = () => initialState;

const Store = React.createContext({
  state: initialState,
  dispatch: defaultDispatch,
});

function StoreProvider(props: React.PropsWithChildren<{}>) {
  const [state, dispatch] = React.useReducer<React.Reducer<AppState, Action>>(
    reducer,
    initialState,
  );

  return <Store.Provider value={{ state, dispatch }} {...props} />;
}

export { Store, StoreProvider };
