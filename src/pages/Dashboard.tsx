import './Dashboard.css';

//todo: improve imports
import CardsList from '../components/CardsList/CardsList';
import AmountFilter from '../components/AmountFilter/AmountFilter';

function Dashboard() {
	return (
		<div>
			<header className='header'>
				<h1>Cards & Transactions</h1>
			</header>

			<main className='main'>
				<CardsList />

				<AmountFilter />

				{/* TransactionsList widget */}
			</main>
		</div>
	);
}

export default Dashboard;
