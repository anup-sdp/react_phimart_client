import axios from "axios";

export default axios.create({
  baseURL: "https://drf-phimart.vercel.app/api",
  //baseURL: "http://127.0.0.1:8000/api",
});

// my drf app on vercel:  https://drf-phimart.vercel.app/api/

// http://127.0.0.1:8000/api/products2/product-list/
