import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("order-confirmation", "routes/order-confirmation.tsx"),
] satisfies RouteConfig;
