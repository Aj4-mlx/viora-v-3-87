# Viora Jewelry E-commerce Website

## Project info

**URL**: https://lovable.dev/projects/3943a5ef-76ee-4f60-81d9-651c8b25460d

## Database Setup

This project uses Supabase as the backend. To set up the database:

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Copy your Supabase URL and anon key to a `.env` file:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

3. Run the setup script to create the necessary tables and seed the database:

```sh
node scripts/setup-database.js
```

This script will:
- Run all migrations in the `supabase/migrations` folder
- Seed the database with sample collections and associate them with products

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/3943a5ef-76ee-4f60-81d9-651c8b25460d) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase (Authentication, Database, Storage)

## Features

- **Authentication**: Email/password, Google, and Facebook sign-in
- **Product Browsing**: Browse products by category, collection, or search
- **Shopping Cart**: Add, remove, and update quantities of products
- **Checkout**: Complete checkout with multiple payment options
- **Order Tracking**: Track order status and history
- **User Account**: View and manage account details, orders, and addresses
- **Collections**: Browse curated collections of products
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Payment Methods

The following payment methods are supported:

- Cash on Delivery
- Credit/Debit Card
- Instapay
- Vodafone Cash
- Fawry

## Shipping

Shipping is calculated based on:

- Shipping provider (Bosta, Aramex)
- Delivery location (governorate)
- Order total (free shipping over 1,000 EGP)

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/3943a5ef-76ee-4f60-81d9-651c8b25460d) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
