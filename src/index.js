import { collection } from '@laufire/utils';

const { collect, keys } = collection;

export default (config, one) => {
	const routes = collect(config.routes,
		(routeConfig) => one.parse(routeConfig));

	return ({ ctx }) => {
		const returned = routes[ctx.path]({ ctx });

		return returned[keys(returned).pop()];
	};
};
