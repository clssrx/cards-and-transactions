import './Dashboard.css';

//todo: improve imports
import CardsList from '../components/CardsList/CardsList';
import AmountFilter from '../components/AmountFilter/AmountFilter';
import TransactionsList from '../components/TransactionsList/TransactionsList';
import { useEffect, useState } from 'react';
import type { CardId, Transaction, Card } from '../types';
import { getCards } from '../services/cards.service';
import { getTransactions } from '../services/transactions.service';

function Dashboard() {
	const [cards, setCards] = useState<Card[]>([]);
	const [cardsLoading, setCardsLoading] = useState(true);
	const [cardsError, setCardsError] = useState<string | null>(null);

	const [selectedCardId, setSelectedCardId] = useState<CardId>('');

	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [transactionsLoading, setTransactionsLoading] = useState(true);
	const [transactionsError, setTransactionsError] = useState<string | null>(
		null,
	);

	const [inputValue, setInputValue] = useState<string>('');

	useEffect(() => {
		async function fetchCards() {
			try {
				setCardsLoading(true);
				setCardsError(null);

				const data = await getCards();
				setCards(data);

				if (data.length > 0) {
					setSelectedCardId(data[0].id); // Select the first card by default
				}
			} catch (error) {
				setCardsError((error as Error).message);
			} finally {
				setCardsLoading(false);
			}
		}

		fetchCards();
	}, []);

	useEffect(() => {
		async function fetchTransactions() {
			if (selectedCardId === '') return;

			//we could add a caching layer, saving transactionsPerCard -- Record<CardId, Transaction[]>

			try {
				setTransactionsLoading(true);
				setTransactionsError(null);

				const data = await getTransactions(selectedCardId);
				setTransactions(data);
			} catch (error) {
				setTransactionsError((error as Error).message);
			} finally {
				setTransactionsLoading(false);
			}
		}

		fetchTransactions();
	}, [selectedCardId]);

	function handleSelectedCard(cardId: CardId) {
		if (cardId == selectedCardId) return; //if card already selected does nothing, could add popup that says like 'you're already seeing the transaction for this card'

		setSelectedCardId(cardId);
		setInputValue('');
	}

	const selectedCard = cards.find((card) => card.id === selectedCardId);
	const selectedCardColor = selectedCard?.color ?? '#D64545';

	const filteredTransactions = transactions.filter((transaction) => {
		if (inputValue === '') return true;

		const parsedAmount = Number(inputValue);

		if (Number.isNaN(parsedAmount)) return true;

		return transaction.amount >= parsedAmount;
	});

	const hasFilteredTransactions = filteredTransactions.length > 0;

	return (
		<div>
			<header className='header'>
				<h1>Cards & Transactions</h1>
			</header>

			<main className='main'>
				{/* add loading and error state */}
				<CardsList
					cards={cards}
					selectedCardId={selectedCardId}
					handleSelectedCard={handleSelectedCard}
				/>
				<AmountFilter inputValue={inputValue} setInputValue={setInputValue} />

				{/* add loading and error state for fetching */}
				{hasFilteredTransactions ? (
					<TransactionsList
						transactions={filteredTransactions}
						backgroundColor={selectedCardColor}
					/>
				) : (
					<p>No transactions match the selected minimum amount.</p>
				)}
			</main>
		</div>
	);
}

export default Dashboard;
