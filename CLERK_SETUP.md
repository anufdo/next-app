# Clerk Authentication Setup

This app now uses Clerk for authentication instead of Auth.js. Follow these steps to complete the setup:

## 1. Create a Clerk Account

1. Go to [https://clerk.com](https://clerk.com) and sign up for a free account
2. Create a new application
3. Choose your preferred sign-in methods (email, social providers, etc.)

## 2. Get Your Clerk Keys

From your Clerk Dashboard:

1. Go to **API Keys** in the sidebar
2. Copy your **Publishable Key** and **Secret Key**
3. Update your `.env.local` file:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
CLERK_SECRET_KEY=sk_test_your_actual_secret_here
```

## 3. Optional: Set Up Webhooks

If you want to sync user data with your database:

1. In Clerk Dashboard, go to **Webhooks**
2. Create a new webhook endpoint: `https://yourdomain.com/api/webhooks/clerk`
3. Select the events you want to listen to (user.created, user.updated, user.deleted)
4. Copy the **Signing Secret** and add it to `.env.local`:

```bash
CLERK_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

## 4. Customize (Optional)

You can customize the appearance and behavior of Clerk components:

- **Appearance**: Customize colors, fonts, and layout in Clerk Dashboard → **Customization**
- **URLs**: Update redirect URLs in your `.env.local` if needed
- **Social Providers**: Add Google, GitHub, etc. in Clerk Dashboard → **User & Authentication** → **Social Connections**

## 5. Start Development

```bash
npm run dev
```

Your app is now using Clerk for authentication! 

## Key Changes Made

- ✅ Removed Auth.js dependencies and configuration
- ✅ Added Clerk provider and components
- ✅ Updated middleware for Clerk route protection
- ✅ Replaced login/register pages with Clerk components
- ✅ Updated Navigation to use Clerk's UserButton
- ✅ Modified profile and home pages to use Clerk user data
- ✅ Simplified database schema (Clerk manages users)
- ✅ Added webhook endpoint for user sync (optional)

## Available Routes

- `/` - Protected dashboard (requires sign-in)
- `/sign-in` - Clerk sign-in page
- `/sign-up` - Clerk sign-up page  
- `/profile` - User profile page
- `/api/webhooks/clerk` - Webhook endpoint for user events

## Learn More

- [Clerk Documentation](https://clerk.com/docs)
- [Clerk Next.js Quickstart](https://clerk.com/docs/quickstarts/nextjs)
- [Clerk Components](https://clerk.com/docs/components/overview)
