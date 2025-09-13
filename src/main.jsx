// uses tailwind, daisyui, swiper carousel, axios
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './routes/AppRoutes.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>    
      <AppRoutes />
   </StrictMode>,
)

// https://reactrouter.com/start/declarative/installation
/*
ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
*/

// https://reactrouter.com/start/declarative/routing

/*
npm run dev
http://localhost:5173/
*/

// to do: now a user can review a product multiple times, restrict it to once. '
// in dashboard remove hard coded reviews, make them dynamic
// many more api endpoints left to implement