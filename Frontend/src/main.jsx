import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import PathMapper from './pathMapper'



createRoot(document.getElementById('root')).render(
  <StrictMode>
   <PathMapper/>
  </StrictMode>
)
