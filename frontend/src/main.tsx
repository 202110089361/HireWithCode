import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root.tsx';
import './i18n/config';
import TanstackProvider from './providers/TanstackProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from './routes/homePage.tsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    //errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 1000,
    },
  },
});


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <TanstackProvider>

          <RouterProvider router={router} />

      </TanstackProvider>
    </QueryClientProvider>
  </StrictMode>,
);
