import './CardsList.css';
import CardItem from './CardItem/CardItem';
import type { Card } from '../../types';

type CardsListProps = {
	cards: Card[];
};

function CardsList({ cards }: CardsListProps) {
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
					<CardItem key={card.id} card={card} />
				))}
			</ul>
		</section>
	);
}

export default CardsList;
