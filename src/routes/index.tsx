import { createFileRoute } from "@tanstack/react-router";
import { Product } from "../Components/Product";
export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Product />;
}
