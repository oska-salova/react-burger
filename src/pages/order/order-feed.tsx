import OrderCards from '../../components/order/order-cards/order-cards';

function OrderFeedPage() {
	return (
		<>
			<p className="text text_type_main-default">Лента заказов</p>
			<OrderCards isHistory={false} />
		</>
	);
}

export default OrderFeedPage;
