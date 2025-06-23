
import { supabase } from "@/integrations/supabase/client";

// This is a utility function to create an admin user for testing
// In a real application, you would handle password hashing properly
export const createAdminUser = async (email: string) => {
  try {
    const { data, error } = await supabase
      .from('admins')
      .insert({
        email: email,
        password_hash: 'demo_password', // In real app, this would be properly hashed
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating admin user:', error);
      return { error: error.message };
    }

    console.log('Admin user created:', data);
    return { data };
  } catch (error) {
    console.error('Error creating admin user:', error);
    return { error: 'Failed to create admin user' };
  }
};

// Usage: createAdminUser('admin@example.com')
