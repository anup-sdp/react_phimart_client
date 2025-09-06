// src/hooks/useCart.js
import { useCallback, useEffect, useRef, useState } from "react";
import authApiClient from "../services/auth-api-client";

const useCart = () => {
  const [authToken] = useState(
    () => JSON.parse(localStorage.getItem("authTokens"))?.access || null
  );
  const [cart, setCart] = useState(null);
  const [cartId, setCartId] = useState(() => localStorage.getItem("cartId"));
  const [loading, setLoading] = useState(false);
  const isRunningRef = useRef(false);

  // helper: fetch cart by id and set state; returns response data or null
  const fetchCartById = useCallback(
    async (id) => {
      if (!id) return null;
      try {
        const res = await authApiClient.get(`/carts/${id}/`);
        setCart(res.data);
        return res.data;
      } catch (err) {
        if (err.response?.status === 404) {
          // stale cart id
          localStorage.removeItem("cartId");
          setCartId(null);
          setCart(null);
          return null;
        }
        console.error("fetchCartById error:", err);
        return null;
      }
    },
    []
  );

  // create or get cart (idempotent)
  const createOrGetCart = useCallback(async () => {  // useCallback
    if (isRunningRef.current) return;
    isRunningRef.current = true;
    setLoading(true);

    try {
      // If we have a cartId, try to fetch it first
      if (cartId) {
        const existing = await fetchCartById(cartId);
        if (existing) return existing; // success
        // fallthrough if stale/404 (fetchCartById already cleaned up)
      }

      // Ask backend to create or return existing one
      const response = await authApiClient.post("/carts/"); // ----------- error ?
      const data = response.data;
      if (data?.id) {
        localStorage.setItem("cartId", data.id);
        setCartId(data.id);
      }
      setCart(data);
      return data;
    } catch (error) {
      console.error("createOrGetCart error:", error);
      return null;
    } finally {
      isRunningRef.current = false;
      setLoading(false);
    }
  }, [cartId, fetchCartById, authToken]);

  // Add item: ensure cart exists, then post and refresh cart state
  const AddCartItems = useCallback(
    async (product_id, quantity) => {
      setLoading(true);
      try {
        if (!cartId) {
          const newCart = await createOrGetCart();
          if (newCart?.id) {
            // createOrGetCart already set cartId and cart
          } else {
            throw new Error("Unable to create or retrieve cart");
          }
        }

        const response = await authApiClient.post(`/carts/${cartId}/items/`, {
          product_id,
          quantity,
        });

        // after mutating, re-fetch the whole cart (robust)
        await fetchCartById(localStorage.getItem("cartId"));
        return response.data;
      } catch (error) {
        console.error("Error adding Items", error);
      } finally {
        setLoading(false);
      }
    },
    [cartId, createOrGetCart, fetchCartById]
  );

  // Update Item quantity -> patch and refresh cart
  const updateCartItemQuantity = useCallback(
    async (itemId, quantity) => {
      try {
        await authApiClient.patch(`/carts/${cartId}/items/${itemId}/`, {
          quantity,
        });
        // refresh cart
        await fetchCartById(cartId);
      } catch (error) {
        console.error("Error updating cart items", error);
      }
    },
    [cartId, fetchCartById]
  );

  // Delete Cart Item -> delete and refresh cart
  const deleteCartItems = useCallback(
    async (itemId) => {
      try {
        await authApiClient.delete(`/carts/${cartId}/items/${itemId}/`);
        // refresh cart
        await fetchCartById(cartId);
      } catch (error) {
        console.error("Error deleting cart item", error);
      }
    },
    [cartId, fetchCartById]
  );

  // initialize once (do NOT include cartId in deps)
  useEffect(() => {
    const initializeCart = async () => {
      setLoading(true);
      await createOrGetCart(); // ----------- error ?
      setLoading(false);
    };
    initializeCart(); // ----------- error ?
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createOrGetCart]);



  return {
    cart,
    loading,
    createOrGetCart,
    AddCartItems,
    updateCartItemQuantity,
    deleteCartItems,
  };
};

export default useCart;

// product detail: http://localhost:5173/shop/1

/*
useCallback
*/