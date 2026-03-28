import type { Card } from '../types';
import { getCardColor } from '../utils/getCardColor';

type CardApi = Omit<Card, 'color'>;

export async function getCards(): Promise<Card[]> {
	const response = await fetch('/data/cards.json');

	if (!response.ok) {
		throw new Error('Failed to fetch cards');
	}

	const cards = (await response.json()) as CardApi[];

	return cards.map((card, index) => ({
		...card,
		color: getCardColor(index),
	}));
}
