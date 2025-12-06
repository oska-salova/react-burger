import {
	type ActionCreatorWithoutPayload,
	type ActionCreatorWithPayload,
	type Dispatch,
	type Middleware,
	type MiddlewareAPI,
	type UnknownAction,
} from '@reduxjs/toolkit';

import { RootState } from '../store';
import { refreshToken } from '../../net/api';
import { token } from '../../model/token';

type WebSocketActions<TReceiveMessage, TSendMessage> = {
	connect: ActionCreatorWithPayload<string>;
	disconnect: ActionCreatorWithoutPayload;
	sendMessage: ActionCreatorWithPayload<TSendMessage>;
	onConnected: ActionCreatorWithPayload<Event>;
	onDisconnected: ActionCreatorWithPayload<CloseEvent>;
	onMessageReceived: ActionCreatorWithPayload<TReceiveMessage>;
	onError: ActionCreatorWithPayload<Event>;
};

type WebSocketOptions = {
	withTokenRefresh: boolean;
};

export function createWebSocketMiddleware<TReceiveMessage, TSendMessage>(
	{
		connect,
		disconnect,
		sendMessage,
		onConnected,
		onDisconnected,
		onMessageReceived,
		onError,
	}: WebSocketActions<TReceiveMessage, TSendMessage>,
	{ withTokenRefresh }: WebSocketOptions,
): Middleware {
	let socket: WebSocket | null = null;
	let isConnected = false;
	let reconnectTimer: number;
	let url: string;

	return ((store: MiddlewareAPI<Dispatch<UnknownAction>, RootState>) =>
		(next: Dispatch<UnknownAction>) =>
		(action: UnknownAction) => {
			if (connect.match(action)) {
				if (socket !== null) {
					console.warn('WebSocket is already connected.');
					return;
				}

				url = action.payload;
				socket = new WebSocket(generateWSFullUrl(url, withTokenRefresh));
				isConnected = true;

				socket.onopen = event => {
					store.dispatch(onConnected(event));
				};

				socket.onclose = event => {
					store.dispatch(onDisconnected(event));
					socket = null;

					if (isConnected) {
						reconnectTimer = window.setTimeout(() => {
							store.dispatch(connect(url));
						}, 3000);
					}
				};

				socket.onmessage = event => {
					const data = JSON.parse(event.data);
					store.dispatch(onMessageReceived(data));

					if (withTokenRefresh && data.message === 'Invalid or missing token') {
						refreshToken().then(() => {
							store.dispatch(connect(generateWSFullUrl(url, withTokenRefresh)));
						});

						store.dispatch(disconnect());
					}
				};

				socket.onerror = event => {
					store.dispatch(onError(event));
				};
			}

			if (disconnect.match(action)) {
				clearTimeout(reconnectTimer);
				isConnected = false;

				if (socket) {
					socket.onopen = null;
					socket.onmessage = null;
					socket.onerror = null;
					socket.onclose = null;
					socket.close();
				}
				socket = null;
			}

			if (sendMessage.match(<TSendMessage>action)) {
				if (socket !== null && socket.readyState === WebSocket.OPEN) {
					socket.send(JSON.stringify(action.payload));
				} else {
					console.warn('WebSocket is not open. Cannot send message.');
				}
			}

			return next(action);
		}) as Middleware;
}

function generateWSFullUrl(url: string, withTokenRefresh: boolean): string {
	const wssUrl = new URL(url);

	if (withTokenRefresh) {
		const accessToken = token.getAccessToken() ?? '';
		wssUrl.searchParams.set('token', accessToken.replace('Bearer ', ''));
	}

	return wssUrl.toString();
}
