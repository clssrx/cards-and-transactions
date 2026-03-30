import type { Transaction } from '../../../types';
import './TransactionItem.css';

type TransactionItemProps = {
	transaction: Transaction;
	backgroundColor: string;
};

function TransactionItem({
	transaction,
	backgroundColor,
}: TransactionItemProps) {
	return (
		<li className='transaction-item' style={{ background: backgroundColor }}>
			<span className='transaction-description'>{transaction.description}</span>
			<span className='transaction-amount'>{transaction.amount} €</span>
		</li>
	);
}

export default TransactionItem;
