import { createContext, useContext, useEffect, useReducer, ReactNode } from 'react';
import { Cart, CartItem, Product } from '@/types';

type CartState = {
  cart: Cart;
  isCartOpen: boolean;
};

type CartAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: { productId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' };

const initialState: CartState = {
  cart: {
    items: [],
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,
  },
  isCartOpen: false,
};

const calculateCartTotals = (items: CartItem[]): Omit<Cart, 'items'> => {
  const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.2;
  const total = subtotal + shipping + tax;

  return {
    subtotal,
    shipping,
    tax,
    total,
  };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.cart.items.findIndex(item => item.productId === product.id);

      let updatedItems: CartItem[];

      if (existingItemIndex >= 0) {
        updatedItems = [...state.cart.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
      } else {
        updatedItems = [
          ...state.cart.items,
          { productId: product.id, product, quantity },
        ];
      }

      const totals = calculateCartTotals(updatedItems);

      return {
        ...state,
        cart: {
          items: updatedItems,
          ...totals,
        },
      };
    }

    case 'REMOVE_FROM_CART': {
      const updatedItems = state.cart.items.filter(item => item.productId !== action.payload.productId);
      const totals = calculateCartTotals(updatedItems);

      return {
        ...state,
        cart: {
          items: updatedItems,
          ...totals,
        },
      };
    }

    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_FROM_CART', payload: { productId } });
      }

      const updatedItems = state.cart.items.map(item => {
        if (item.productId === productId) {
          return { ...item, quantity };
        }
        return item;
      });

      const totals = calculateCartTotals(updatedItems);

      return {
        ...state,
        cart: {
          items: updatedItems,
          ...totals,
        },
      };
    }

    case 'CLEAR_CART': {
      return {
        ...state,
        cart: {
          items: [],
          subtotal: 0,
          shipping: 0,
          tax: 0,
          total: 0,
        },
      };
    }

    case 'TOGGLE_CART': {
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      };
    }

    default:
      return state;
  }
};

type CartContextType = {
  cart: Cart;
  isCartOpen: boolean;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('izishop-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        parsedCart.items.forEach((item: CartItem) => {
          dispatch({
            type: 'ADD_TO_CART',
            payload: { product: item.product, quantity: item.quantity },
          });
        });
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('izishop-cart', JSON.stringify(state.cart));
  }, [state.cart]);

  const addToCart = (product: Product, quantity: number) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productId } });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        isCartOpen: state.isCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};