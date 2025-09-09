import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),          // maps to "/"
  route("auth", "routes/auth.tsx"),  // maps to "/auth"
] satisfies RouteConfig;
