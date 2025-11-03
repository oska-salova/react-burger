import { useParams } from 'react-router-dom';

function OrderDetailsPage() {
	const { number } = useParams();

	return (
		<section className="flex-center">
			<p className="text text_type_main-default">Order details page: {number}</p>
		</section>
	);
}

export default OrderDetailsPage;
