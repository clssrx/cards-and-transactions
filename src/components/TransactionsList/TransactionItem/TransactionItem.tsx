import type { Transaction } from '../../../types';
import './TransactionItem.css';

type TransactionItemProps = {
	transaction: Transaction;
};

function TransactionItem({ transaction }: TransactionItemProps) {
	return (
		<li className='transaction-item'>
			<p>{transaction.description}</p>
			<p>{transaction.amount}€</p>
		</li>
	);
}

export default TransactionItem;
