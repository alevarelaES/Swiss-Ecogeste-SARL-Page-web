import { Link, useLocation } from 'react-router-dom';

interface NavLinkProps {
    to: string;
    children: React.ReactNode;
    className?: string; // Allow optional custom classes if needed, though we aim for consistency
}

const NavLink = ({ to, children, className = '' }: NavLinkProps) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            className={`hover:text-amber-400 transition-colors ${isActive ? 'text-amber-500' : ''} ${className}`}
        >
            {children}
        </Link>
    );
};

export default NavLink;
