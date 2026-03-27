import './AmountFilter.css';

function AmountFilter() {
	return (
		<section className='amount-filter'>
			<label htmlFor='amount'>Filter here your transactions:</label>
			<input type='number' id='amount' placeholder='Enter minimum amount' />
		</section>
	);
}

export default AmountFilter;
