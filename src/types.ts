export type CardId = string;
export type TransactionId = string;

export interface Card {
	id: CardId;
	description: string;
	color?: string;
}

export type Transaction = {
	id: TransactionId;
	amount: number;
	description: string;
};

export type TransactionsByCardId = Record<CardId, Transaction[]>;
