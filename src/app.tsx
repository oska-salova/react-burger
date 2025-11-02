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

function App() {
	const location = useLocation();
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
						element={
							<ProtectedRouteElement element={<LoginPage />} needsAuth={false} />
						}
					/>
					<Route
						path={AppRoutes.Register}
						element={
							<ProtectedRouteElement element={<RegisterPage />} needsAuth={false} />
						}
					/>
					<Route
						path={AppRoutes.ForgotPassword}
						element={
							<ProtectedRouteElement
								element={<ForgotPasswordPage />}
								needsAuth={false}
							/>
						}
					/>
					<Route
						path={AppRoutes.ResetPassword}
						element={
							<ProtectedRouteElement
								element={<ResetPasswordPage />}
								needsAuth={false}
							/>
						}
					/>
					<Route path={AppRoutes.OrderFeed} element={<OrderFeedPage />} />
					<Route
						path={AppRoutes.Profile}
						element={
							<ProtectedRouteElement element={<ProfilePage />} needsAuth={true} />
						}
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
