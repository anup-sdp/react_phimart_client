// uses tailwind, daisyui, swiper carousel, axios
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './routes/AppRoutes.jsx'

/* 
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
*/

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