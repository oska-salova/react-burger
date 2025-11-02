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
import { Provider } from 'react-redux';
import { store } from './services/store';
import UserPage from './pages/user/user';
import OrderHistoryPage from './pages/order/order-history';
import OrderDetailsPage from './pages/order/order-details';
import { IngredientPage } from './pages/ingredient/ingredient';
import ProtectedRouteElement from './components/protected-route';
import { ReactElement } from 'react';

function App() {
	const location = useLocation();

	const getProtectedRouteElement = (element: ReactElement, needsAuth: boolean): ReactElement => {
		return <ProtectedRouteElement element={element} needsAuth={needsAuth} />;
	};
	return (
		<Provider store={store}>
			<AppHeader />
			<main className="main">
				<Routes>
					<Route path={AppRoutes.Home} element={<HomePage />} />
					<Route
						path={AppRoutes.Ingredient}
						element={location.state?.ingredientId ? <HomePage /> : <IngredientPage />}
					/>
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
						path={AppRoutes.OrderFeed}
						element={getProtectedRouteElement(<OrderFeedPage />, true)}
					/>
					<Route
						path={AppRoutes.Profile}
						element={getProtectedRouteElement(<ProfilePage />, true)}
					>
						<Route index element={<UserPage />} />
						<Route path={ProfileRoutes.Orders} element={<OrderHistoryPage />} />
						<Route
							path={`${ProfileRoutes.Orders}/:number`}
							element={<OrderDetailsPage />}
						/>
						<Route path={AppRoutes.NotFound} element={<NotFoundPage />} />
					</Route>
					<Route path={AppRoutes.NotFound} element={<NotFoundPage />} />
				</Routes>
			</main>
		</Provider>
	);
}

export default App;
