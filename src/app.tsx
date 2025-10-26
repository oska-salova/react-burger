import { Provider } from 'react-redux';
import AppHeader from './components/app-header/app-header';
import { store } from './services/store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home';
import { AppRoutes } from './pages/config';
import OrderFeedPage from './pages/order-feed';
import ProfilePage from './pages/profile';
import NotFoundPage from './pages/not-found';

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<AppHeader />
				<main className="main">
					<div className="main-content">
						<Routes>
							<Route path={AppRoutes.Home} element={<HomePage />} />
							<Route path={AppRoutes.OrderFeed} element={<OrderFeedPage />} />
							<Route path={AppRoutes.Profile} element={<ProfilePage />} />
							<Route path={AppRoutes.NotFound} element={<NotFoundPage />} />
						</Routes>
					</div>
				</main>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
