import { useEffect, useState } from "react";
import OrderCard from "../components/orders/OrderCard";
import authApiClient from "../services/auth-api-client";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    //authApiClient.get("/orders/").then((res) => setOrders(res.data));
    authApiClient.get("/orders/").then((res) => setOrders(res?.data?.results)); // 
  }, []);

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await authApiClient.post(`/orders/${orderId}/cancel/`);
      console.log(response);
      if (response.status === 200) {
        setOrders((prevOrder) =>
          prevOrder.map((order) =>
            order.id === orderId ? { ...order, status: "Canceled" } : order
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Order Details</h1>
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} onCancel={handleCancelOrder} />
      ))}
    </div>
  );
};

export default Orders;

// http://localhost:5173/dashboard/orders

/*
get /orders/
sample response:

{
  "count": 0,
  "next": "string",
  "previous": "string",
  "results": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "user": 0,
      "status": "Not Paid",
      "total_price": 0,
      "created_at": "2025-09-08T06:00:33.617Z",
      "items": [
        {
          "id": 0,
          "product": {
            "id": 0,
            "name": "string",
            "price": 0
          },
          "price": 0,
          "quantity": 2,
          "total_price": 0
        }
      ]
    }
  ]
}
*/


/*
get https://drf-phimart.vercel.app/api/orders/ with authorization
responses:
{
    "count": 0,
    "next": null,
    "previous": null,
    "results": []
}

{
    "count": 1,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": "887ad2c9-3bb7-4a18-ae57-20a1201c08ef",
            "user": 6,
            "status": "Not Paid",
            "total_price": 408.74,
            "created_at": "2025-09-08T07:32:33.949085Z",
            "items": [
                {
                    "id": 1,
                    "product": {
                        "id": 1,
                        "name": "Smartphone",
                        "price": 213.8
                    },
                    "price": 213.8,
                    "quantity": 1,
                    "total_price": 213.8
                },
                {
                    "id": 2,
                    "product": {
                        "id": 28,
                        "name": "Blender",
                        "price": 97.47
                    },
                    "price": 97.47,
                    "quantity": 2,
                    "total_price": 194.94
                }
            ]
        }
    ]
}
*/