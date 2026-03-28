import './Dashboard.css';

//would be nice to change the imports to show only one time the name
import CardsList from '../components/CardsList/CardsList';
import AmountFilter from '../components/AmountFilter/AmountFilter';
import TransactionsList from '../components/TransactionsList/TransactionsList';
import { useEffect, useState } from 'react';
import type { CardId } from '../types';
import { useCards } from '../hooks/useCards';
import { useTransactions } from '../hooks/useTransactions';

function Dashboard() {
	const { cards, loading: cardsLoading, error: cardsError } = useCards();

	const [selectedCardId, setSelectedCardId] = useState<CardId>('');
	const [inputValue, setInputValue] = useState<string>('');

	useEffect(() => {
		if (!selectedCardId && cards.length > 0) {
			setSelectedCardId(cards[0].id);
		}
	}, [cards, selectedCardId]);

	const {
		transactions,
		loading: transactionsLoading,
		error: transactionsError,
	} = useTransactions(selectedCardId);

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

	return (
		<div>
			<header className='header'>
				<h1>Cards & Transactions</h1>
			</header>

			<main className='main'>
				{cardsLoading ? (
					<p>Loading cards...</p>
				) : cardsError ? (
					//could add retry button
					<p role='alert'>Failed to load cards: {cardsError}</p>
				) : (
					<CardsList
						cards={cards}
						selectedCardId={selectedCardId}
						handleSelectedCard={handleSelectedCard}
					/>
				)}

				<AmountFilter inputValue={inputValue} setInputValue={setInputValue} />

				{transactionsLoading ? (
					<p>Loading transactions...</p>
				) : transactionsError ? (
					<p role='alert'>Failed to load transactions: {transactionsError}</p>
				) : (
					<TransactionsList
						transactions={filteredTransactions}
						backgroundColor={selectedCardColor}
					/>
				)}
			</main>
		</div>
	);
}

export default Dashboard;
