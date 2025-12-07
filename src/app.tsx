import AppHeader from './components/app-header/app-header';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './pages/home/home';
import { AppRoutes, ProfileRoutes } from './pages/config';
import OrderFeedPage from './pages/order/order-feed';
import ProfilePage from './pages/user/profile';
import NotFoundPage from './pages/not-found';
import LoginPage from './pages/auth/login';
import ForgotPasswordPage from './pages/auth/forgot-password';
import ResetPasswordPage from './pages/auth/reset-password';
import RegisterPage from './pages/auth/register';
import { useAppDispatch, useAppSelector } from './services/store';
import UserPage from './pages/user/user';
import OrderHistoryPage from './pages/order/order-history';
import { IngredientPage } from './pages/ingredient/ingredient';
import ProtectedRouteElement from './components/protected-route';
import { ReactElement, useEffect, useState } from 'react';
import { getUser } from './services/user';
import { token } from './model/token';
import { burgerConstructorSlice } from './services/burger/constructor';
import { orderSlice } from './services/order';
import Modal from './components/modal/modal';
import IngredientDetails from './components/burger-ingredients/ingredient-details/ingredient-details';
import { getIngredients } from './services/burger/ingredients';
import { OrderInfoPage } from './pages/order/order-info-page/order-info-page';
import OrderInfo from './components/order/order-info/order-info';

function App() {
	const location = useLocation();
	const dispatch = useAppDispatch();
	const userState = useAppSelector(state => state.userReducer);
	const accessToken = token.getAccessToken();
	const [isUserChecked, setIsUserChecked] = useState(false);
	const orderState = useAppSelector(state => state.orderReducer);
	const ingredients = useAppSelector(state => state.ingredientsReducer.ingredients);

	const getProtectedRouteElement = (element: ReactElement, needsAuth: boolean): ReactElement => {
		return <ProtectedRouteElement element={element} needsAuth={needsAuth} />;
	};

	useEffect(() => {
		let controller: AbortController | null;
		if (accessToken) {
			controller = new AbortController();
			dispatch(getUser(undefined, { signal: controller.signal }));
		} else {
			setIsUserChecked(true);
		}

		return () => {
			controller?.abort();
		};
	}, []);

	useEffect(() => {
		const controller = new AbortController();
		dispatch(getIngredients(undefined, { signal: controller.signal }));
		return () => {
			controller.abort();
		};
	}, [dispatch]);

	useEffect(() => {
		if (userState.error || userState.user) {
			setIsUserChecked(true);
		}
	}, [userState.error, userState.user]);

	useEffect(() => {
		if (orderState.preRegistration || orderState.registration) {
			// should not clear burger
		} else {
			dispatch(burgerConstructorSlice.actions.clear());
		}
	}, [location.pathname, orderState.registration, orderState.preRegistration]);

	useEffect(() => {
		if (orderState.error || orderState.registrationOrder) {
			dispatch(orderSlice.actions.reset());
		}
	}, [location.pathname]);

	if (!isUserChecked || !ingredients.length) {
		return <p className="text text_type_main-default">App data preparing...</p>;
	}

	const backgroundLocation = location.state?.backgroundLocation;

	return (
		<>
			<AppHeader />
			<main className="main">
				<Routes location={backgroundLocation || location}>
					<Route path={AppRoutes.Home} element={<HomePage />} />
					<Route path={AppRoutes.Ingredient} element={<IngredientPage />} />
					<Route path={AppRoutes.OrderFeed} element={<OrderFeedPage />} />
					<Route path={`${AppRoutes.OrderFeed}/:number`} element={<OrderInfoPage />} />
					<Route
						path={AppRoutes.Login}
						element={getProtectedRouteElement(<LoginPage />, false)}
					/>
					<Route
						path={AppRoutes.Register}
						element={getProtectedRouteElement(<RegisterPage />, false)}
					/>
					<Route
						path={AppRoutes.ForgotPassword}
						element={getProtectedRouteElement(<ForgotPasswordPage />, false)}
					/>
					<Route
						path={AppRoutes.ResetPassword}
						element={getProtectedRouteElement(<ResetPasswordPage />, false)}
					/>
					<Route
						path={AppRoutes.Profile}
						element={getProtectedRouteElement(<ProfilePage />, true)}
					>
						<Route index element={<UserPage />} />
						<Route path={ProfileRoutes.Orders} element={<OrderHistoryPage />} />
						<Route path={AppRoutes.NotFound} element={<NotFoundPage />} />
					</Route>
					<Route
						path={`${AppRoutes.Profile}/${ProfileRoutes.Orders}/:number`}
						element={<OrderInfoPage />}
					/>
					<Route path={AppRoutes.NotFound} element={<NotFoundPage />} />
				</Routes>
				{backgroundLocation && (
					<Routes>
						<Route
							path={AppRoutes.Ingredient}
							element={
								<Modal header="Детали ингредиента">
									<IngredientDetails />
								</Modal>
							}
						/>
						<Route
							path={`${AppRoutes.Profile}/${ProfileRoutes.Orders}/:number`}
							element={
								<Modal header={`#${location.state.orderNumber}`}>
									<OrderInfo orderNumber={location.state.orderNumber} />
								</Modal>
							}
						/>
						<Route
							path={`${AppRoutes.OrderFeed}/:number`}
							element={
								<Modal header={`#${location.state.orderNumber}`}>
									<OrderInfo orderNumber={location.state.orderNumber} />
								</Modal>
							}
						/>
					</Routes>
				)}
			</main>
		</>
	);
}

export default App;
