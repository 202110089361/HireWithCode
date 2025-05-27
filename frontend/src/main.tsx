import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root.tsx';
import './i18n/config';
import TanstackProvider from './providers/TanstackProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import WelcomePage from './routes/WelcomePage.tsx';
import InterviewGuidePage from './routes/InterviewGuidePage.tsx';
import AcceptChallengePage from './routes/AcceptChallengePage.tsx';
import CompleteChallengePage from './routes/CompleteChallengePage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <WelcomePage />,
      },
      {
        path: '/interview-guide',
        element: <InterviewGuidePage />,
      },
      {
        path: '/accept-challenge',
        element: <AcceptChallengePage />,
      },
      {
        path: '/complete-challenge',
        element: <CompleteChallengePage />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <TanstackProvider>
        <RouterProvider router={router} />
      </TanstackProvider>
    </QueryClientProvider>
  </StrictMode>,
);
