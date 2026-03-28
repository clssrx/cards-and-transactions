import type { CardId, Transaction, TransactionsByCardId } from '../types';

export async function getTransactions(cardId: CardId): Promise<Transaction[]> {
	const response = await fetch('/data/transactions.json');

	if (!response.ok) {
		throw new Error('Failed to load transactions');
	}

	const allTransactions = (await response.json()) as TransactionsByCardId;

	return allTransactions[cardId] || [];
}
