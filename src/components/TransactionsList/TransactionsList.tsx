import './TransactionsList.css';
import TransactionItem from './TransactionItem/TransactionItem';
import type { Transaction } from '../../types';

type TransactionsListProps = {
	transactions: Transaction[];
};

function TransactionsList({ transactions }: TransactionsListProps) {
	return (
		<section className='transactions-list-section'>
			<ul className='transactions-list'>
				{transactions.map((transactions) => (
					<TransactionItem transaction={transactions} />
				))}
			</ul>
		</section>
	);
}

export default TransactionsList;
