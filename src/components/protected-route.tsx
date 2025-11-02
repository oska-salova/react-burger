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
	const user = useAppSelector(state => state.userReducer.user);
	const isUserLoading = useAppSelector(state => state.userReducer.pending);
	const userError = useAppSelector(state => state.userReducer.error);
	const navigate = useNavigate();
	const [canProceedNavigation, setCanProceedNavigation] = useState(false);
	const accessToken = localStorageUtils.getAccessToken();

	useEffect(() => {
		if (needsAuth) {
			if (accessToken) {
				if (user) {
					setCanProceedNavigation(true);
				} else {
					!isUserLoading && !userError && dispatch(getUser());
				}
			} else {
				navigate(AppRoutes.Login, { replace: true });
				return;
			}
		} else {
			if (accessToken) {
				if (user) {
					navigate(AppRoutes.Home, { replace: true });
					return;
				} else {
					!isUserLoading && !userError && dispatch(getUser());
				}
			} else {
				setCanProceedNavigation(true);
			}
		}
	}, [needsAuth, user, accessToken, isUserLoading]);

	if (canProceedNavigation) {
		return element;
	}

	if (userError) {
		return <p className="text text_type_main-default text_color_error">{userError}</p>;
	}

	return <p className="text text_type_main-default">Loading...</p>;
}

export default ProtectedRouteElement;
