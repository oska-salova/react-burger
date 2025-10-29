export enum AppRoutes {
	Home = '/',
	Login = '/login',
	Register = '/register',
	ForgotPassword = '/forgot-password',
	ResetPassword = '/reset-password',
	Profile = '/profile',
	Ingredient = '/ingredients/:id',
	OrderFeed = '/feed',
	NotFound = '*',
}

export enum ProfileRoutes {
	User = '',
	Orders = 'orders',
}
