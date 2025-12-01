import { FC, memo } from 'react';
import styles from './ingredient-circle.module.css';

interface IngredientCircleProps {
	ingredientId: string;
	imageUrl: string;
	restAmount?: number;
}

const IngredientCircle: FC<IngredientCircleProps> = memo(
	({ ingredientId, imageUrl, restAmount }) => {
		return (
			<div className={styles.container}>
				<img src={imageUrl} alt={ingredientId} className={styles.icon} />
				{restAmount && (
					<p className={`text text_type_main-default ${styles.restAmount}`}>
						+{restAmount}
					</p>
				)}
			</div>
		);
	},
);

export default IngredientCircle;
