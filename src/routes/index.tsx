import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "../Components/Product";
export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ProductPage />;
}
