// Product type that matches our database schema
export interface DatabaseProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string | null;
  image_url: string | null;
  stock: number;
  created_at: string;
}

// Extended product type for UI components
export interface Product extends DatabaseProduct {
  // Add computed/default properties for UI
  rating: number;
  isNew: boolean;
  originalPrice?: string;
  // Keep image for backward compatibility
  image: string;
}

// Helper function to convert database product to UI product
export const mapDatabaseProductToProduct = (dbProduct: DatabaseProduct): Product => ({
  ...dbProduct,
  image: dbProduct.image_url || '',
  rating: 4, // Default rating
  isNew: new Date(dbProduct.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // New if created in last 30 days
  originalPrice: undefined // No original price by default
});
