export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  description: string;
  categoryId: string;
  category?: Category;
  images: ProductImage[];
  variants: ProductVariant[];
  tags: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  stockQuantity: number;
  unit: string;
  attributes: Record<string, string>;
}

export interface ProductImage {
  id: string;
  url: string;
  altText?: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId?: string;
  imageUrl?: string;
  sortOrder: number;
}
