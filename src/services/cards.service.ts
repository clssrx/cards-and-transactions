import type { Card } from '../types';

export async function getCards(): Promise<Card[]> {
	const response = await fetch('/data/cards.json');

	if (!response.ok) {
		throw new Error('Failed to fetch cards');
	}

	return response.json();
}
