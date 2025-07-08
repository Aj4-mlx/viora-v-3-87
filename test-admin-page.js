// Simple test script to verify admin page functionality
// Run this in the browser console on your admin page

async function testAdminPage() {
  console.log('🧪 Testing Admin Page Functionality...');
  
  try {
    // Test 1: Check if Supabase client is available
    if (typeof window.supabase === 'undefined') {
      console.log('❌ Supabase client not found');
      return;
    }
    console.log('✅ Supabase client available');
    
    // Test 2: Test database connection
    const { data: products, error: productsError } = await window.supabase
      .from('products')
      .select('*')
      .limit(1);
    
    if (productsError) {
      console.log('❌ Database connection failed:', productsError.message);
      return;
    }
    console.log('✅ Database connection successful');
    
    // Test 3: Test storage access
    const { data: buckets, error: bucketsError } = await window.supabase.storage.listBuckets();
    
    if (bucketsError) {
      console.log('❌ Storage access failed:', bucketsError.message);
      return;
    }
    console.log('✅ Storage access successful');
    console.log('📦 Available buckets:', buckets.map(b => b.name));
    
    // Test 4: Test product insertion (with cleanup)
    const testProduct = {
      name: 'TEST_PRODUCT_' + Date.now(),
      description: 'Test product for functionality testing',
      price: 1.00,
      category: 'Other',
      stock: 1,
      image_url: null
    };
    
    const { data: insertData, error: insertError } = await window.supabase
      .from('products')
      .insert(testProduct)
      .select();
    
    if (insertError) {
      console.log('❌ Product insertion failed:', insertError.message);
      return;
    }
    console.log('✅ Product insertion successful');
    
    // Clean up test product
    if (insertData && insertData[0]) {
      await window.supabase
        .from('products')
        .delete()
        .eq('id', insertData[0].id);
      console.log('🧹 Test product cleaned up');
    }
    
    console.log('🎉 All tests passed! Admin page should work correctly.');
    
  } catch (error) {
    console.log('❌ Test failed:', error);
  }
}

// Run the test
testAdminPage(); 