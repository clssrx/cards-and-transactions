import './CardsList.css';
import CardItem from './CardItem/CardItem';
import type { Card, CardId } from '../../types';

type CardsListProps = {
	cards: Card[];
	selectedCardId: string | null;
	handleSelectedCard: (cardId: CardId) => void;
};

function CardsList({
	cards,
	selectedCardId,
	handleSelectedCard,
}: CardsListProps) {
	if (cards.length === 0) {
		return (
			<section className='card-list-section'>
				<p className='empty-state'>No cards available.</p>
			</section>
		);
	}

	return (
		<section className='card-list-section'>
			<ul className='cards-list'>
				{cards.map((card) => (
					<CardItem
						key={card.id}
						card={card}
						isSelected={selectedCardId == card.id}
						handleSelectedCard={handleSelectedCard}
						backgroundColor={card.color}
					/>
				))}
			</ul>
		</section>
	);
}

export default CardsList;
