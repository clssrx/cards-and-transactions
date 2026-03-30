import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { getCards } from '../../services/cards.service';
import { getTransactions } from '../../services/transactions.service';
import Dashboard from './Dashboard';

vi.mock('../../services/cards.service', () => ({
	getCards: vi.fn(),
}));

vi.mock('../../services/transactions.service', () => ({
	getTransactions: vi.fn(),
}));

const mockedGetCards = vi.mocked(getCards);
const mockedGetTransactions = vi.mocked(getTransactions);

describe('Dashboard', () => {
	beforeEach(() => {
		vi.clearAllMocks();

		mockedGetCards.mockResolvedValue([
			{
				id: 'lkmfkl-mlfkm-dlkfm',
				description: 'Private Card',
				color: '#5B4FE9',
			},
			{
				id: 'elek-n3lk-4m3lk4',
				description: 'Business Card',
				color: '#009E7A',
			},
		]);

		mockedGetTransactions.mockImplementation(async (cardId: string) => {
			if (cardId === 'lkmfkl-mlfkm-dlkfm') {
				return [
					{
						id: 'lkmlk-5kkm5-55gg',
						amount: 123.88,
						description: 'Food',
					},
					{
						id: '43mm3-lkm4-55gg',
						amount: 33.48,
						description: 'Snack',
					},
					{
						id: 'eefe-5kkm5-ffeefe',
						amount: 288.38,
						description: 'Tickets',
					},
				];
			}

			return [
				{
					id: 'lkmlk-5kkm5-55gg',
					amount: 21.88,
					description: 'T-Shirt',
				},
				{
					id: '43mm3-lkm4-55gg',
					amount: 533.48,
					description: 'Smart Phone',
				},
				{
					id: 'eefe-5kkm5-ffeefe',
					amount: 2.58,
					description: 'Chocolate Bar',
				},
				{
					id: '4332-5kkm5-ffeefe',
					amount: -100.0,
					description: 'Refund for Smart Phone',
				},
			];
		});
	});

	describe('when the user first loads the page', () => {
		it('renders cards and shows transaction for the default selected card', async () => {
			render(<Dashboard />);

			expect(await screen.findByText('Private Card')).toBeInTheDocument();
			expect(await screen.findByText('Business Card')).toBeInTheDocument();

			expect(await screen.findByText('Food')).toBeInTheDocument();
			expect(screen.getByText('Snack')).toBeInTheDocument();
			expect(screen.getByText('Tickets')).toBeInTheDocument();

			expect(screen.queryByText('T-shirt')).not.toBeInTheDocument();

			expect(mockedGetTransactions).toHaveBeenCalledWith('lkmfkl-mlfkm-dlkfm');
		});
	});

	describe('when the user enters a minimum amount', () => {
		it('filters transactions by minimum amount', async () => {
			render(<Dashboard />);

			await screen.findByText('Food');

			const input = screen.getByPlaceholderText(/enter minimum amount/i);
			fireEvent.change(input, { target: { value: '100' } });

			await waitFor(() => {
				expect(screen.getByText('Food')).toBeInTheDocument();
				expect(screen.getByText('Tickets')).toBeInTheDocument();
				expect(screen.queryByText('Snack')).not.toBeInTheDocument();
			});
		});

		describe('when no transactions match the minimum amount', () => {
			it('shows no transactions message', async () => {
				render(<Dashboard />);

				await screen.findByText('Food');

				const input = screen.getByPlaceholderText(/enter minimum amount/i);
				fireEvent.change(input, { target: { value: '1000' } });

				expect(
					await screen.findByText(
						/no transactions match the selected minimum amount/i,
					),
				).toBeInTheDocument();
			});
		});
	});

	describe('when the user switch card', () => {
		it('resets the filter', async () => {
			render(<Dashboard />);

			const foodTransaction = await screen.findByText('Food');

			expect(foodTransaction).toBeInTheDocument();

			const input = screen.getByPlaceholderText(/enter minimum amount/i);
			fireEvent.change(input, { target: { value: '200' } });

			await waitFor(() => {
				expect(screen.queryByText('Food')).not.toBeInTheDocument();
				expect(screen.getByText('Tickets')).toBeInTheDocument();
			});

			fireEvent.click(screen.getByRole('button', { name: /business card/i }));

			await waitFor(() => {
				expect(screen.getByText('T-Shirt')).toBeInTheDocument();
				expect(screen.getByText('Smart Phone')).toBeInTheDocument();
				expect(screen.getByText('Chocolate Bar')).toBeInTheDocument();
			});

			expect(screen.queryByText('Food')).not.toBeInTheDocument();
		});
	});

	describe('error and loading states', () => {
		describe('cards error/loading state', () => {
			describe('when cards fetching fails', () => {
				it('shows error state', async () => {
					mockedGetCards.mockRejectedValueOnce(
						new Error('Failed to fetch cards'),
					);

					render(<Dashboard />);

					expect(
						await screen.findByText(
							/failed to load cards: failed to fetch cards/i,
						),
					).toBeInTheDocument();
				});
			});

			describe('when cards are loading ', () => {
				it('shows loading state', () => {
					mockedGetCards.mockImplementation(() => new Promise(() => {}));

					render(<Dashboard />);

					expect(screen.getByText(/loading cards/i)).toBeInTheDocument();
				});
			});
		});

		describe('transactions error/loading state', () => {
			describe('when transactions fetching fails', () => {
				it('shows error state', async () => {
					mockedGetCards.mockResolvedValue([
						{
							id: 'lkmfkl-mlfkm-dlkfm',
							description: 'Private Card',
							color: '#5B4FE9',
						},
						{
							id: 'elek-n3lk-4m3lk4',
							description: 'Business Card',
							color: '#009E7A',
						},
					]);

					mockedGetTransactions.mockRejectedValueOnce(
						new Error('Failed to fetch transactions'),
					);

					render(<Dashboard />);

					expect(
						await screen.findByText(
							/Failed to load transactions: Failed to fetch transactions/i,
						),
					).toBeInTheDocument();
				});
			});

			describe('when transactions are loading ', () => {
				it('shows loading state', async () => {
					mockedGetCards.mockResolvedValue([
						{
							id: 'lkmfkl-mlfkm-dlkfm',
							description: 'Private Card',
							color: '#5B4FE9',
						},
						{
							id: 'elek-n3lk-4m3lk4',
							description: 'Business Card',
							color: '#009E7A',
						},
					]);

					mockedGetTransactions.mockImplementation(() => new Promise(() => {}));

					render(<Dashboard />);

					expect(
						await screen.findByText(/loading transactions/i),
					).toBeInTheDocument();
				});
			});
		});
	});
});
