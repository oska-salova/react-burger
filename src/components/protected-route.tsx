import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../services/store';
import { ReactElement, useEffect, useState } from 'react';
import { AppRoutes } from '../pages/config';
import { localStorageUtils } from '../model/local-storage';
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
	const accessToken = localStorageUtils.getAccessToken();
	const [isGetUserRequired, setIsGetUserRequired] = useState(false);

	useEffect(() => {
		if (needsAuth) {
			if (isAuthenticated) {
				setCanProceedNavigation(true);
			} else {
				if (accessToken) {
					setIsGetUserRequired(true);
				} else {
					navigate(AppRoutes.Login, { replace: true });
					return;
				}
			}
		} else {
			if (isAuthenticated) {
				navigate(AppRoutes.Home, { replace: true });
			} else {
				setCanProceedNavigation(true);
			}
		}
	}, [needsAuth, isAuthenticated, accessToken]);

	useEffect(() => {
		const controller = new AbortController();
		dispatch(getUser(undefined, { signal: controller.signal }));
		return () => {
			controller.abort();
		};
	}, [isGetUserRequired]);

	if (canProceedNavigation) {
		return element;
	}

	return <p className="text text_type_main-default">Loading...</p>;
}

export default ProtectedRouteElement;
