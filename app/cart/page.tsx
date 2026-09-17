import { Container } from "@/components/ui/container";
import { CartView } from "@/components/cart/cart-view";

export const metadata = {
  title: "سبد خرید",
};

export default function CartPage() {
  return (
    <Container className="py-6">
      <CartView />
    </Container>
  );
}
