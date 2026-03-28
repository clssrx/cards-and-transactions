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
