import OrderCards from '../../components/order/order-cards/order-cards';

function OrderHistoryPage() {
	return (
		<section className="flex-center">
			{/* <p className="text text_type_main-default">Order history page</p> */}
			<div className="">
				<OrderCards isHistory={true} />
			</div>
		</section>
	);
}

export default OrderHistoryPage;
