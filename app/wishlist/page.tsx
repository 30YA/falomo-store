import { Container } from "@/components/ui/container";
import { WishlistView } from "@/components/product/wishlist-view";

export const metadata = {
  title: "علاقه‌مندی‌ها",
};

export default function WishlistPage() {
  return (
    <Container className="py-6">
      <h1 className="mb-5 text-xl font-bold sm:text-2xl">علاقه‌مندی‌ها</h1>
      <WishlistView />
    </Container>
  );
}
