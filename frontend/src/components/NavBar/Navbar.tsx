// frontend/src/components/NavBar/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { logout } from '../../redux/slices/authSlice';

interface NavLink {
    label: string;
    to: string;
}

interface NavbarProps {
    links: NavLink[];
    logo?: string;
    title?: string;
}

const Navbar: React.FC<NavbarProps> = ({ links, logo, title }) => {
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const userId = useAppSelector((state) => state.auth.userId);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                {logo && <img src={logo} alt="Logo" className="navbar-logo" />}
                {title && <h1 className="navbar-title">{title}</h1>}
            </div>
            <ul className="navbar-links">
                {links.map((link, index) => (
                    <li key={index}>
                        <Link to={link.to} className="navbar-link">
                            {link.label}
                        </Link>
                    </li>
                ))}
                {isLoggedIn && (
                    <>
                        <li>
                            <span className="navbar-user-id">Usuario ID: {userId}</span>
                        </li>
                        <li>
                            <button onClick={handleLogout} className="navbar-logout">
                                Logout
                            </button>
                        </li>
                    </>
                )}
                {!isLoggedIn && (
                    <li>
                        <Link to="/login" className="navbar-link">
                            Login
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
