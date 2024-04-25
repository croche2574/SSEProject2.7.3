import React, { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { App } from './App'
import './styles.css'

document.addEventListener('DOMContentLoaded', function () {
    const ndRoot = document.getElementById('react-root')
    const root = createRoot(ndRoot)
    root.render(
        <StrictMode>
            <App />
        </StrictMode>
    )
})