import { collection } from '@laufire/utils';

const { collect, keys } = collection;

export default (config, one) => {
	const routes = collect(config.routes,
		(routeConfig) => one.parse(routeConfig));

	return (payload) => {
		const returned = routes[payload.route](payload);

		return returned[keys(returned).pop()];
	};
};
