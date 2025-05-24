import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/footer';
import Header from '../components/header';

export default function Root() {
  const location = useLocation();
  const inviteCode = location.search
    ? new URLSearchParams(location.search).get('inviteCode')
    : '';
  if (inviteCode) {
    localStorage.setItem('inviteCode', inviteCode);
  }

  return (
    <main className="grow">
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
}
