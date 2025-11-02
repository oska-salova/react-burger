import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../services/store';
import { ReactElement, useEffect, useState } from 'react';
import { AppRoutes } from '../pages/config';
import { token } from '../model/token';
import { getUser } from '../services/user';

interface ProtectedRouteElementProps {
	element: ReactElement;
	needsAuth: boolean;
}

function ProtectedRouteElement({ element, needsAuth }: ProtectedRouteElementProps) {
	const dispatch = useAppDispatch();
	const isAuthenticated = useAppSelector(state => state.authReducer.isAuthenticated);
	const navigate = useNavigate();
	const [canProceedNavigation, setCanProceedNavigation] = useState(false);
	const accessToken = token.getAccessToken();
	const [isGetUserRequired, setIsGetUserRequired] = useState(false);
	const location = useLocation();
	const [rememberedPath, setRememberedPath] = useState<string | undefined>(undefined);

	useEffect(() => {
		if (needsAuth) {
			if (isAuthenticated) {
				setCanProceedNavigation(true);
			} else {
				if (accessToken) {
					setIsGetUserRequired(true);
				} else {
					setRememberedPath(location.pathname);
					navigate(AppRoutes.Login, { replace: true });
				}
			}
		} else {
			if (isAuthenticated) {
				navigate(rememberedPath ?? AppRoutes.Home, { replace: true });
			} else {
				if (accessToken) {
					setIsGetUserRequired(true);
				} else {
					setCanProceedNavigation(true);
				}
			}
		}
	}, [needsAuth, isAuthenticated, accessToken]);

	useEffect(() => {
		let controller: AbortController | null = null;
		if (isGetUserRequired) {
			controller = new AbortController();
			dispatch(getUser(undefined, { signal: controller.signal }));
		}
		return () => {
			controller?.abort();
		};
	}, [isGetUserRequired]);

	if (canProceedNavigation) {
		return element;
	}

	return <p className="text text_type_main-default">Loading...</p>;
}

export default ProtectedRouteElement;
