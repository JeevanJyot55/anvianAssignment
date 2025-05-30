import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';


const container = document.getElementById('root');
if (!container) throw new Error("#root missing!");

createRoot(container).render(<App />);