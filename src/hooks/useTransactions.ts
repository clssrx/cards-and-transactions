import { useEffect, useState } from 'react';
import type { CardId, Transaction } from '../types';
import { getTransactions } from '../services/transactions.service';

export function useTransactions(selectedCardId: CardId) {
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!selectedCardId) {
			setTransactions([]);
			setLoading(false);
			return;
		}

		async function fetchTransactions() {
			//could add a caching layer, saving transactionsPerCard -- Record<CardId, Transaction[]>
			//if they didnt update

			try {
				setLoading(true);
				setError(null);

				const data = await getTransactions(selectedCardId);
				setTransactions(data);
			} catch (error) {
				setError(
					error instanceof Error
						? error.message
						: 'Failed to fetch transactions',
				);
			} finally {
				setLoading(false);
			}
		}

		fetchTransactions();
	}, [selectedCardId]);

	return { transactions, loading, error };
}
