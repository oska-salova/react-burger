export enum AppRoutes {
	Home = '/',
	Login = '/login',
	Register = '/register',
	ForgotPassword = '/forgot-password',
	ResetPassword = '/reset-password',
	Profile = '/profile',
	ProfileOrders = '/profile/orders',
	ProfileOrder = '/profile/orders/:id',
	ingredient = '/ingredients/:id',
	OrderFeed = '/feed',
	NotFound = '*',
}
