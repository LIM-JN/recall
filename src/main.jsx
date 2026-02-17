import { createRoot } from 'react-dom/client'
import './index.css'
import App from './component/App.jsx'
import { CookiesProvider } from 'react-cookie'
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')).render(
    <BrowserRouter basename="/recall">
        <CookiesProvider>
            <App/>
        </CookiesProvider>
    </BrowserRouter>
)
