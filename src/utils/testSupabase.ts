import { supabase } from "@/integrations/supabase/client";

export const testSupabaseConnection = async () => {
  try {
    console.log('Testing Supabase connection...');
    
    // Test 1: Check if we can connect to Supabase
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    console.log('Auth test:', authError ? 'Failed' : 'Success');
    
    // Test 2: Check if we can access the products table (READ)
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .limit(1);
    
    console.log('Products table READ access:', productsError ? 'Failed' : 'Success');
    if (productsError) {
      console.error('Products table READ error:', productsError);
    }
    
    // Test 3: Check if we can INSERT into products table
    const testProduct = {
      name: 'TEST_PRODUCT_DELETE_ME',
      description: 'Test product for connection testing',
      price: 1.00,
      category: 'Other',
      stock: 1,
      image_url: null
    };
    
    const { data: insertData, error: insertError } = await supabase
      .from('products')
      .insert(testProduct)
      .select();
    
    console.log('Products table INSERT access:', insertError ? 'Failed' : 'Success');
    if (insertError) {
      console.error('Products table INSERT error:', insertError);
    } else {
      // Clean up test product
      if (insertData && insertData[0]) {
        await supabase
          .from('products')
          .delete()
          .eq('id', insertData[0].id);
        console.log('Test product cleaned up');
      }
    }
    
    // Test 4: Check storage buckets
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    console.log('Storage buckets:', bucketsError ? 'Failed' : 'Success');
    if (bucketsError) {
      console.error('Storage error:', bucketsError);
    } else {
      console.log('Available buckets:', buckets?.map(b => b.name));
    }
    
    return {
      auth: !authError,
      productsRead: !productsError,
      productsInsert: !insertError,
      storage: !bucketsError,
      buckets: buckets?.map(b => b.name) || [],
      errors: {
        auth: authError,
        productsRead: productsError,
        productsInsert: insertError,
        storage: bucketsError
      }
    };
  } catch (error) {
    console.error('Supabase connection test failed:', error);
    return {
      auth: false,
      productsRead: false,
      productsInsert: false,
      storage: false,
      buckets: [],
      errors: { general: error }
    };
  }
}; 