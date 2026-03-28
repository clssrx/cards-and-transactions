import { useEffect, useState } from 'react';
import type { Card } from '../types';
import { getCards } from '../services/cards.service';

export function useCards() {
	const [cards, setCards] = useState<Card[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchCards() {
			try {
				setLoading(true);
				setError(null);

				const data = await getCards();

				setCards(data);
			} catch (error) {
				setError(
					error instanceof Error ? error.message : 'Failed to fetch cards',
				);
			} finally {
				setLoading(false);
			}
		}

		fetchCards();
	}, []);

	return { cards, loading, error };
}
