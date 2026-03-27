import type { Card } from '../../../types';
import './CardItem.css';

type CardItemProps = {
	card: Card;
};

function CardItem({ card }: CardItemProps) {
	return (
		<div className='card-item'>
			<h3>{card.description}</h3>
			<p>{card.id}</p>
		</div>
	);
}

export default CardItem;
