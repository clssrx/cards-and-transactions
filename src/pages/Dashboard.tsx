import './Dashboard.css';

//todo: improve imports
import CardsList from '../components/CardsList/CardsList';
import AmountFilter from '../components/AmountFilter/AmountFilter';
import TransactionsList from '../components/TransactionsList/TransactionsList';
import { useEffect, useState } from 'react';
import type { Card } from '../types';
import { getCards } from '../services/cards.service';

function Dashboard() {
	const [cards, setCards] = useState<Card[]>([]);
	const [cardsLoading, setCardsLoading] = useState(true);
	const [cardsError, setCardsError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchCards() {
			try {
				setCardsLoading(true);
				setCardsError(null);

				const data = await getCards();
				setCards(data);
			} catch (error) {
				setCardsError((error as Error).message);
			} finally {
				setCardsLoading(false);
			}
		}

		fetchCards();
	}, []);

	console.log(cards);

	return (
		<div>
			<header className='header'>
				<h1>Cards & Transactions</h1>
			</header>

			<main className='main'>
				<CardsList cards={cards} />

				<AmountFilter />

				<TransactionsList />
			</main>
		</div>
	);
}

export default Dashboard;
