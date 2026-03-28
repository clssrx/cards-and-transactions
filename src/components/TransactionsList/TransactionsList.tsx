import './TransactionsList.css';
import TransactionItem from './TransactionItem/TransactionItem';
import type { Transaction } from '../../types';

type TransactionsListProps = {
	transactions: Transaction[];
	backgroundColor: string;
};

function TransactionsList({
	transactions,
	backgroundColor,
}: TransactionsListProps) {
	return (
		<section className='transactions-list-section'>
			<ul className='transactions-list'>
				{transactions.map((transactions) => (
					<TransactionItem
						transaction={transactions}
						backgroundColor={backgroundColor}
						key={transactions.id}
					/>
				))}
			</ul>
		</section>
	);
}

export default TransactionsList;
