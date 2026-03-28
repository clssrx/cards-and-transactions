import type { Card, CardId } from '../../../types';
import './CardItem.css';

type CardItemProps = {
	card: Card;
	isSelected: boolean;
	handleSelectedCard: (cardId: CardId) => void;
	backgroundColor: string;
};

function CardItem({
	card,
	isSelected,
	handleSelectedCard,
	backgroundColor,
}: CardItemProps) {
	return (
		<li key={card.id}>
			<button
				type='button'
				className={`card-item ${isSelected ? 'selected' : ''}`}
				onClick={() => handleSelectedCard(card.id)}
				aria-pressed={isSelected}
				style={{ background: backgroundColor }}
			>
				<p className='card-item-title'>{card.description}</p>
				<p className='card-item-id'>{card.id}</p>
			</button>
		</li>
	);
}

export default CardItem;
