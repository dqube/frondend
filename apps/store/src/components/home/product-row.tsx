import { ScrollArea, ScrollBar } from "@modernstores/ui";
import { ProductCard, type Product } from "./product-card";

interface ProductRowProps {
  products: Product[];
  onAddToCart?: (id: string, qty: number) => void;
}

export function ProductRow({ products, onAddToCart }: ProductRowProps) {
  return (
    <ScrollArea className="w-full">
      <div className="flex gap-4 pb-6 pt-2 px-1">
        {products.slice(0, 25).map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} className="min-w-[160px] w-[160px] sm:min-w-[180px] sm:w-[180px] shrink-0" />
        ))}
      </div>
      <ScrollBar orientation="horizontal" className="hidden" />
    </ScrollArea>
  );
}
