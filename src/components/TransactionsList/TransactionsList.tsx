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
		<ul className='transactions-list'>
			{transactions.map((transaction) => (
				<TransactionItem
					transaction={transaction}
					backgroundColor={backgroundColor}
					key={transaction.id}
				/>
			))}
		</ul>
	);
}

export default TransactionsList;
