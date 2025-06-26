// This script can be used to seed the collections table with sample data
// Run with: node scripts/seed-collections.js

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials. Please check your .env file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const collections = [
  {
    name: 'Summer Essentials',
    description: 'Our Summer Essentials collection features light, vibrant pieces perfect for the season.',
    theme: 'Summer',
    image_url: 'https://images.unsplash.com/photo-1523268755815-fe7c372a0349?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'
  },
  {
    name: 'Elegant Evening',
    description: 'Sophisticated jewelry designed for special occasions and evening events.',
    theme: 'Elegance',
    image_url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'
  },
  {
    name: 'Minimalist',
    description: 'Clean, simple designs for everyday wear with a modern aesthetic.',
    theme: 'Minimalism',
    image_url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'
  },
  {
    name: 'Vintage Inspired',
    description: 'Timeless pieces inspired by classic designs from past eras.',
    theme: 'Vintage',
    image_url: 'https://images.unsplash.com/photo-1570891836654-32f91104c324?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'
  }
];

async function seedCollections() {
  console.log('Seeding collections...');
  
  // Insert collections
  const { data: collectionData, error: collectionError } = await supabase
    .from('collections')
    .insert(collections)
    .select();
  
  if (collectionError) {
    console.error('Error inserting collections:', collectionError);
    return;
  }
  
  console.log(`Inserted ${collectionData.length} collections`);
  
  // Get some products to associate with collections
  const { data: products, error: productsError } = await supabase
    .from('products')
    .select('id')
    .limit(20);
  
  if (productsError) {
    console.error('Error fetching products:', productsError);
    return;
  }
  
  if (!products || products.length === 0) {
    console.log('No products found to associate with collections');
    return;
  }
  
  console.log(`Found ${products.length} products to associate with collections`);
  
  // Create product-collection associations
  const productCollections = [];
  
  for (const collection of collectionData) {
    // Randomly associate some products with each collection
    for (const product of products) {
      if (Math.random() < 0.3) { // 30% chance to associate
        productCollections.push({
          product_id: product.id,
          collection_id: collection.id
        });
      }
    }
  }
  
  if (productCollections.length === 0) {
    console.log('No product-collection associations created');
    return;
  }
  
  // Insert product-collection associations
  const { data: pcData, error: pcError } = await supabase
    .from('product_collections')
    .insert(productCollections);
  
  if (pcError) {
    console.error('Error inserting product-collection associations:', pcError);
    return;
  }
  
  console.log(`Created ${productCollections.length} product-collection associations`);
  console.log('Seeding completed successfully!');
}

seedCollections()
  .catch(err => {
    console.error('Unhandled error:', err);
  })
  .finally(() => {
    process.exit(0);
  });