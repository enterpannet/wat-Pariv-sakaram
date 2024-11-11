
import { Outlet } from 'react-router-dom';
import Navbar from './components/NavBar';
export default function RootLayout() {

    return (
        <main className="mx-auto h-dynamic-screen ">
            <Navbar />
            <Outlet />
        </main>
    );
}
