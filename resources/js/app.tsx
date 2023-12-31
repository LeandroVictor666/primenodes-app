import './bootstrap';
import "../css/styles.module.css";
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
const appName = 'PrimeNodes-App';

createInertiaApp({
    title: (title) => `${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/Application.tsx`, import.meta.glob('./Pages/Application.tsx')),
    setup({ el, App, props }) {
        console.log("PROPS-> ",props.initialPage.props.AccountInformations);
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
