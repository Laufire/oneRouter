import one from '@laufire/one';

import oneRouter from '../src';

describe('oneRouter', () => {
	const core = one();
	const data = Symbol('someData');
	const route = 'someRoute';
	const payload = {
		data, route,
	};

	test('the handler is decided based on the the payloads'
	+ ' and is given the payload as its only argument', () => {
		const mockRoute = jest.fn(() => ({}));

		const config = {
			routes: {
				[route]: () => mockRoute,
			},
		};

		const router = oneRouter(config, core);

		router(payload);

		expect(mockRoute).toBeCalledWith(payload);
	});

	test('the last value of the object, returned by the route is'
	+ ' returned as the result', () => {
		const firstValue = Symbol('firstValue');
		const lastValue = Symbol('secondValue');

		const config = {
			routes: {
				[route]: () => () => ({
					firstValue,
					lastValue,
				}),
			},
		};

		const router = oneRouter(config, core);
		const result = router(payload);

		expect(result).toEqual(lastValue);
	});
});
