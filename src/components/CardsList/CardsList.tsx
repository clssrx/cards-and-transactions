import './CardsList.css';
import CardItem from './CardItem/CardItem';
import type { Card, CardId } from '../../types';

type CardsListProps = {
	cards: Card[];
	selectedCardId: CardId | null;
	handleSelectedCard: (cardId: CardId) => void;
};

function CardsList({
	cards,
	selectedCardId,
	handleSelectedCard,
}: CardsListProps) {
	if (cards.length === 0) {
		return (
			<p className='empty-state' role='status'>
				No cards available.
			</p>
		);
	}

	return (
		<ul className='cards-list'>
			{cards.map((card) => (
				<CardItem
					key={card.id}
					card={card}
					isSelected={selectedCardId === card.id}
					handleSelectedCard={handleSelectedCard}
					backgroundColor={card.color}
				/>
			))}
		</ul>
	);
}

export default CardsList;
