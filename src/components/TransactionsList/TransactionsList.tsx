import './TransactionsList.css';
import TransactionItem from './TransactionItem/TransactionItem';

function TransactionsList() {
	return (
		<section className='transactions-list'>
			<TransactionItem />
			<TransactionItem />
			<TransactionItem />
		</section>
	);
}

export default TransactionsList;
