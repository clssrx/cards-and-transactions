const CARD_COLORS = ['#E6E1FF', '#E6F4EA'];

export function getCardColor(index: number): string {
	return CARD_COLORS[index % CARD_COLORS.length];
}
