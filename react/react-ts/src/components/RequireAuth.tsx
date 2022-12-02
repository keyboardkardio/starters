import { Navigate, useLocation } from 'react-router-dom';

interface IProps {
    children: React.ReactNode;
}

const RequireAuth = ({ children }: IProps) => {
    const location = useLocation();
    let authenticated: boolean;

    if (localStorage.getItem('token')) {
        authenticated = true;
    } else {
        authenticated = false;
    }

    if (authenticated) {
        return <>{children}</>;
    } else {
        return <Navigate state={{ from: location }} to='/login' />;
    }
};

export default RequireAuth;
