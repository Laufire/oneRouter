import one from '@laufire/one';

import oneRouter from '../src';

describe('oneRouter', () => {
	const core = one();
	const data = Symbol('someData');
	const path = 'somePath';
	const ctx = {
		data, path,
	};

	test('the handler is decided based on ctx.path'
	+ ' and is given the context as its only argument', () => {
		const mockRoute = jest.fn(() => ({}));

		const config = {
			routes: {
				[path]: () => mockRoute,
			},
		};

		const router = oneRouter(config, core);

		router({ ctx });

		expect(mockRoute).toBeCalledWith({ ctx });
	});

	test('the last value of the object, returned by the route handler is'
	+ ' returned as the result', () => {
		const firstValue = Symbol('firstValue');
		const lastValue = Symbol('secondValue');

		const config = {
			routes: {
				[path]: () => () => ({
					firstValue,
					lastValue,
				}),
			},
		};

		const router = oneRouter(config, core);
		const result = router({ ctx });

		expect(result).toEqual(lastValue);
	});
});
