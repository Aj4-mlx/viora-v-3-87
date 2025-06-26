// This script runs all the migrations in the supabase/migrations folder
// Run with: node scripts/run-migrations.js

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials. Please check your .env file.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runMigrations() {
    console.log('Running migrations...');

    const migrationsDir = path.join(__dirname, '..', 'supabase', 'migrations');

    // Get all migration files
    const migrationFiles = fs.readdirSync(migrationsDir)
        .filter(file => file.endsWith('.sql'))
        .sort(); // Sort to ensure migrations run in order

    console.log(`Found ${migrationFiles.length} migration files`);

    // Run each migration
    for (const file of migrationFiles) {
        console.log(`Running migration: ${file}`);

        const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');

        try {
            // Execute the SQL
            const { error } = await supabase.rpc('exec_sql', { sql });

            if (error) {
                console.error(`Error running migration ${file}:`, error);
                // Continue with other migrations
            } else {
                console.log(`Successfully ran migration: ${file}`);
            }
        } catch (err) {
            console.error(`Exception running migration ${file}:`, err);
            // Continue with other migrations
        }
    }

    console.log('Migrations completed');
}

runMigrations()
    .catch(err => {
        console.error('Unhandled error:', err);
    })
    .finally(() => {
        process.exit(0);
    });