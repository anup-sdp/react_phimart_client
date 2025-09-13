import axios from "axios";

export default axios.create({
  //baseURL: "http://127.0.0.1:8000/api",
  baseURL: "https://drf-phimart.vercel.app/api",
});

// my drf app on vercel:  https://drf-phimart.vercel.app/api/

// http://127.0.0.1:8000/api/products2/product-list/
