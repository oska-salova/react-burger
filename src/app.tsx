import AppHeader from './components/app-header/app-header';
import { Route, Routes } from 'react-router-dom';
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

function App() {
	return (
		<Provider store={store}>
			<AppHeader />
			<main className="main">
				<Routes>
					<Route path={AppRoutes.Home} element={<HomePage />} />
					<Route path={AppRoutes.Login} element={<LoginPage />} />
					<Route path={AppRoutes.Register} element={<RegisterPage />} />
					<Route path={AppRoutes.ForgotPassword} element={<ForgotPasswordPage />} />
					<Route path={AppRoutes.ResetPassword} element={<ResetPasswordPage />} />
					<Route path={AppRoutes.OrderFeed} element={<OrderFeedPage />} />
					<Route path={AppRoutes.Profile} element={<ProfilePage />}>
						<Route index element={<UserPage />} />
						<Route path={ProfileRoutes.Orders} element={<OrderHistoryPage />}>
							<Route path=":number" element={<OrderDetailsPage />} />
						</Route>
						<Route path={AppRoutes.NotFound} element={<NotFoundPage />} />
					</Route>
					<Route path={AppRoutes.NotFound} element={<NotFoundPage />} />
				</Routes>
			</main>
		</Provider>
	);
}

export default App;
