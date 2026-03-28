import type { Card, CardId } from '../../../types';
import './CardItem.css';

type CardItemProps = {
	card: Card;
	isSelected: boolean;
	handleSelectedCard: (cardId: CardId) => void;
};

function CardItem({ card, isSelected, handleSelectedCard }: CardItemProps) {
	return (
		<button
			type='button'
			className={`card-item ${isSelected ? 'selected' : ''}`}
			onClick={() => handleSelectedCard(card.id)}
			aria-pressed={isSelected}
		>
			<p>{card.description}</p>
			<p>{card.id}</p>
		</button>
	);
}

export default CardItem;
