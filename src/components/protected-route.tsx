import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../services/store';
import { ReactElement, useEffect, useState } from 'react';
import { AppRoutes } from '../pages/config';

interface ProtectedRouteElementProps {
	element: ReactElement;
	needsAuth: boolean;
}

function ProtectedRouteElement({ element, needsAuth }: ProtectedRouteElementProps) {
	const isAuthenticated = useAppSelector(state => state.authReducer.isAuthenticated);
	const navigate = useNavigate();
	const [canProceedNavigation, setCanProceedNavigation] = useState(false);
	const location = useLocation();
	const [rememberedPath, setRememberedPath] = useState<string | undefined>(undefined);

	useEffect(() => {
		if (needsAuth) {
			if (isAuthenticated) {
				setCanProceedNavigation(true);
			} else {
				setRememberedPath(location.pathname);
				navigate(AppRoutes.Login, { replace: true });
			}
		} else {
			if (isAuthenticated) {
				navigate(rememberedPath ?? AppRoutes.Home, { replace: true });
			} else {
				setCanProceedNavigation(true);
			}
		}
	}, [needsAuth, isAuthenticated]);

	if (canProceedNavigation) {
		return element;
	}

	return <p className="text text_type_main-default">Protected route checking...</p>;
}

export default ProtectedRouteElement;
