import './AmountFilter.css';

type AmountFilterProps = {
	inputValue: string;
	setInputValue: (value: string) => void;
};

function AmountFilter({ inputValue, setInputValue }: AmountFilterProps) {
	return (
		<section className='amount-filter'>
			<label htmlFor='amount-filter'>Filter here your transactions:</label>
			<input
				type='text'
				inputMode='decimal'
				id='amount-filter'
				placeholder='Enter minimum amount'
				value={inputValue}
				maxLength={7}
				onChange={(e) => {
					const value = e.target.value;

					// allow only digits + optional decimal (with negative numbers)
					if (/^-?\d*\.?\d*$/.test(value)) {
						setInputValue(value);
					}
				}}
			/>
		</section>
	);
}

export default AmountFilter;
