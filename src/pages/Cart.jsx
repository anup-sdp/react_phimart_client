import { Suspense, useEffect, useState } from "react";
import useCartContext from "../hooks/useCartContext";
import CartItemList from "../components/cart/CartItemList";
import CartSummary from "../components/cart/CartSummary";

const Cart = () => {
  const {
    cart,
	cartId,
    loading,
    createOrGetCart,
    updateCartItemQuantity,
    deleteCartItems,
  } = useCartContext();

  const [localCart, setLocalCart] = useState(cart);

  useEffect(() => {
    if (!cart && !loading) createOrGetCart();
  }, [createOrGetCart, cart, loading]);

  useEffect(() => {
    setLocalCart(cart);
  }, [cart]);

  if (loading) return <p>Loading...</p>;
  if (!localCart) return <p>No Cart Found</p>;

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    const prevLocalCartCopy = localCart; // store a copy of localCart

    setLocalCart((prevLocalCart) => {
      const updatedItmes = prevLocalCart.items.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: newQuantity,
              total_price: item.product.price * newQuantity,
            }
          : item
      );

      return {
        ...prevLocalCart,
        items: updatedItmes,
        total_price: updatedItmes.reduce((sum, item) => sum + item.total_price, 0), // reduce
      };
    });

    try {
      await updateCartItemQuantity(itemId, newQuantity);
    } catch (error) {
      console.log(error);
      setLocalCart(prevLocalCartCopy); // Rollback to previous state if API fails
    }
  };

  const handleRemoveItem = async (itemId) => {
	//const prevLocalCartCopy = localCart; // store a copy of localCart
    setLocalCart((prevLocalCart) => {
      const updatedItems = prevLocalCart.items.filter(
        (item) => item.id != itemId
      );

      return {
        ...prevLocalCart,
        items: updatedItems,
        total_price: updatedItems.reduce((sum, item) => sum + item.total_price,0),        
      };
    });

    try {
      await deleteCartItems(itemId);
    } catch (error) {
      console.log(error);
	  //setLocalCart(prevLocalCartCopy); // Rollback to previous state if API fails
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Suspense fallback={<p>Loading...</p>}>
            <CartItemList
              items={localCart.items}
              handleUpdateQuantity={handleUpdateQuantity}
              handleRemoveItem={handleRemoveItem}
            />
          </Suspense>
        </div>
        <div>
          <CartSummary
            totalPrice={localCart.total_price}
            itemCount={localCart.items.length}
			cartId={cartId}
			createOrGetCart={createOrGetCart}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;

/*
react <Suspense> component:
it's a powerful feature for managing asynchronous operations (like data fetching or lazy loading) 
in a declarative way. It allows you to display a fallback UI while waiting for content to load.

<Suspense fallback={<LoadingComponent />}>
  <AsyncComponent />   // e.g., lazy-loaded or data-fetching component
</Suspense>

.reduce
*/

// react urls at: http://localhost:5173/dashboard/cart

/*
backend: get https://drf-phimart.vercel.app/api/carts/ with authorization
response:
{
    "count": 1,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": "2d17a210-14b4-467d-90b5-7e1c5cb5248b",
            "user": 6,
            "items": [
                {
                    "id": 2,
                    "product": {
                        "id": 1,
                        "name": "Smartphone",
                        "price": 213.8
                    },
                    "quantity": 1,
                    "total_price": 213.8
                },
                {
                    "id": 4,
                    "product": {
                        "id": 28,
                        "name": "Blender",
                        "price": 97.47
                    },
                    "quantity": 2,
                    "total_price": 194.94
                }
            ],
            "total_price": 408.74
        }
    ]
}
*/