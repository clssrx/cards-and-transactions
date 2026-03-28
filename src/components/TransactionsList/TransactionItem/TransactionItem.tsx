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
		<li
			key={transaction.id}
			className='transaction-item'
			style={{ background: backgroundColor }}
		>
			<p>{transaction.description}</p>
			<p>{transaction.amount}€</p>
		</li>
	);
}

export default TransactionItem;
