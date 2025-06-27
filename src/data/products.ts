
import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "1",
    name: "Celestial Diamond Ring",
    price: 24500,
    originalPrice: undefined,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    image_url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    category: "Rings",
    rating: 5,
    isNew: true,
    description: "Elegant diamond ring with celestial design",
    stock: 10,
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    name: "Vintage Pearl Necklace",
    price: 12000,
    originalPrice: "15000 EGP",
    image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
    image_url: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
    category: "Necklaces",
    rating: 5,
    isNew: false,
    description: "Classic vintage pearl necklace",
    stock: 5,
    created_at: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "3",
    name: "Rose Gold Bracelet",
    price: 8900,
    originalPrice: undefined,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    image_url: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    category: "Bracelets",
    rating: 4,
    isNew: true,
    description: "Beautiful rose gold bracelet",
    stock: 8,
    created_at: new Date().toISOString()
  },
  {
    id: "4",
    name: "Sapphire Drop Earrings",
    price: 16500,
    originalPrice: undefined,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
    image_url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
    category: "Earrings",
    rating: 5,
    isNew: false,
    description: "Stunning sapphire drop earrings",
    stock: 3,
    created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "5",
    name: "Classic Gold Chain",
    price: 19800,
    originalPrice: undefined,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2874&q=80",
    image_url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2874&q=80",
    category: "Necklaces",
    rating: 4,
    isNew: false,
    description: "Timeless classic gold chain",
    stock: 6,
    created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "6",
    name: "Emerald Statement Ring",
    price: 32000,
    originalPrice: undefined,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    image_url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    category: "Rings",
    rating: 5,
    isNew: true,
    description: "Bold emerald statement ring",
    stock: 2,
    created_at: new Date().toISOString()
  },
  {
    id: "7",
    name: "Diamond Tennis Bracelet",
    price: 45000,
    originalPrice: undefined,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    image_url: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    category: "Bracelets",
    rating: 5,
    isNew: true,
    description: "Luxury diamond tennis bracelet",
    stock: 1,
    created_at: new Date().toISOString()
  },
  {
    id: "8",
    name: "Pearl Stud Earrings",
    price: 6500,
    originalPrice: undefined,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
    image_url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
    category: "Earrings",
    rating: 4,
    isNew: false,
    description: "Classic pearl stud earrings",
    stock: 12,
    created_at: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export const searchProducts = (query: string): Product[] => {
  if (!query.trim()) return [];
  
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery) ||
    product.description?.toLowerCase().includes(lowercaseQuery)
  );
};
