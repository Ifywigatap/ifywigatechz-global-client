import { createContext, useContext, useReducer, useEffect, useCallback, useMemo } from "react";
import { cartService } from "../services/cart.js";

/**
 * @typedef {{id: string, qty: number, price: number}} CartItem 
 * @typedef {{items: CartItem[], cartLoading: boolean, actionLoading: Record<string, boolean>, error: string|null}} CartState
 */

const CartContext = createContext({});

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

const initialState = {
  items: [],
  cartLoading: true,
  actionLoading: {},
  error: null
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_ITEMS":
      return { ...state, items: action.payload, error: null, cartLoading: false };
    case "SET_CART_LOADING":
      return { ...state, cartLoading: action.payload };
    case "ADD_ITEM":
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, qty: item.qty + (action.payload.qty || 1) }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, qty: action.payload.qty || 1 }],
      };
    case "UPDATE_QTY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? { ...item, qty: action.payload.qty } : item
        ).filter((item) => item.qty > 0),
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    case "CLEAR_CART":
      return { ...state, items: [], error: null };
    case "SET_LOADING":
      return {
        ...state,
        actionLoading: { ...state.actionLoading, [action.payload.key]: action.payload.loading },
      };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Persistence
  useEffect(() => {
    const saved = localStorage.getItem("cart-items");
    if (saved) {
      try {
        dispatch({ type: "SET_ITEMS", payload: JSON.parse(saved) });
      } catch (e) {
        dispatch({ type: "SET_ITEMS", payload: [] });
      }
    } else {
      dispatch({ type: "SET_ITEMS", payload: [] });
    }
  }, []); 

  useEffect(() => {
    localStorage.setItem("cart-items", JSON.stringify(state.items));
  }, [state.items]);

  // Server sync
  const syncCart = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: { key: "global", loading: true } });
    try {
      const res = await cartService.getCart();
      dispatch({ type: "SET_ITEMS", payload: res.data?.items || [] });
    } catch (error) {
      // Production: silent fail with local fallback
      dispatch({ type: "SET_ERROR", payload: "Failed to sync cart" });
    } finally {
      dispatch({ type: "SET_LOADING", payload: { key: "global", loading: false } });
    }
  }, []);

  useEffect(() => {
    syncCart();
  }, [syncCart]);

  // Re-sync triggers
  useEffect(() => {
    const handleOnline = () => syncCart();
    const handleFocus = () => syncCart();
    window.addEventListener("online", handleOnline);
    window.addEventListener("focus", handleFocus);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("focus", handleFocus);
    };
  }, [syncCart]);

  const addToCart = useCallback(async (product) => {
    dispatch({ type: "SET_LOADING", payload: { key: "add", loading: true } });
    dispatch({ type: "ADD_ITEM", payload: product });
    try {
      await cartService.addToCart(product);
    } catch (error) {
      console.warn("[Cart] Server sync failed, cart saved locally.");
      syncCart(); // Rollback via sync
      return false;
    } finally {
      dispatch({ type: "SET_LOADING", payload: { key: "add", loading: false } });
    }
    return true;
  }, [syncCart]);

  const increaseQty = useCallback(async (id) => {
    const item = state.items.find((i) => i.id === id);
    if (!item) return;
    const newQty = item.qty + 1;
    dispatch({ type: "SET_LOADING", payload: { key: `qty-inc-${id}`, loading: true } });
    dispatch({ type: "UPDATE_QTY", payload: { id, qty: newQty } });
    try {
      await cartService.updateCartItem(id, newQty);
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Update failed" });
      syncCart();
    } finally {
      dispatch({ type: "SET_LOADING", payload: { key: `qty-inc-${id}`, loading: false } });
    }
  }, [state.items, syncCart]);

  const decreaseQty = useCallback(async (id) => {
    const item = state.items.find((i) => i.id === id);
    if (!item) return;
    if (item.qty <= 1) return removeFromCart(id);
    const newQty = item.qty - 1;
    dispatch({ type: "SET_LOADING", payload: { key: `qty-dec-${id}`, loading: true } });
    dispatch({ type: "UPDATE_QTY", payload: { id, qty: newQty } });
    try {
      await cartService.updateCartItem(id, newQty);
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Update failed" });
      syncCart();
    } finally {
      dispatch({ type: "SET_LOADING", payload: { key: `qty-dec-${id}`, loading: false } });
    }
  }, [state.items, syncCart]);

  const removeFromCart = useCallback(async (id) => {
    dispatch({ type: "SET_LOADING", payload: { key: `remove-${id}`, loading: true } });
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
    try {
      await cartService.removeFromCart(id);
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Remove failed" });
      syncCart();
    } finally {
      dispatch({ type: "SET_LOADING", payload: { key: `remove-${id}`, loading: false } });
    }
  }, [syncCart]);

  const clearCart = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: { key: "clear", loading: true } });
    dispatch({ type: "CLEAR_CART" });
    try {
      await cartService.clearCart();
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Clear failed" });
      syncCart();
    } finally {
      dispatch({ type: "SET_LOADING", payload: { key: "clear", loading: false } });
    }
  }, [syncCart]);

  const value = {
    cart: state.items,
    cartLoading: state.cartLoading || Object.values(state.actionLoading).some(Boolean),
    cartCount: useMemo(() => state.items.reduce((sum, item) => sum + item.qty, 0), [state.items]),
    cartTotal: useMemo(() => state.items.reduce((sum, item) => sum + (item.price * item.qty), 0), [state.items]),
    error: state.error,
    addToCart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
