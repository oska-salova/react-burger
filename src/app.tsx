import { Provider } from 'react-redux';
import AppHeader from './components/app-header/app-header';
import { store } from './services/store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/home';
import { AppRoutes } from './pages/config';
import OrderFeedPage from './pages/order-feed';
import ProfilePage from './pages/profile';
import NotFoundPage from './pages/not-found';
import LoginPage from './pages/auth/login';
import ForgotPasswordPage from './pages/auth/forgot-password';
import ResetPasswordPage from './pages/auth/reset-password';
import RegisterPage from './pages/auth/register';

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<AppHeader />
				<main className="main">
					<Routes>
						<Route path={AppRoutes.Home} element={<HomePage />} />
						<Route path={AppRoutes.OrderFeed} element={<OrderFeedPage />} />
						<Route path={AppRoutes.Profile} element={<ProfilePage />} />
						<Route path={AppRoutes.NotFound} element={<NotFoundPage />} />
						<Route path={AppRoutes.Login} element={<LoginPage />} />
						<Route path={AppRoutes.Register} element={<RegisterPage />} />
						<Route path={AppRoutes.ForgotPassword} element={<ForgotPasswordPage />} />
						<Route path={AppRoutes.ResetPassword} element={<ResetPasswordPage />} />
					</Routes>
				</main>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
