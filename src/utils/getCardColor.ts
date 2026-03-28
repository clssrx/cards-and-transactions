const CARD_COLORS = ['#E6E1FF', '#E6F4EA']; // ideally the color should come from the backend or derived from the id

export function getCardColor(index: number): string {
	return CARD_COLORS[index % CARD_COLORS.length];
}
