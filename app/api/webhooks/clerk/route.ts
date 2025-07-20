import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { Webhook } from 'svix'

// You'll get this from Clerk Dashboard -> Webhooks
const webhookSecret: string = process.env.CLERK_WEBHOOK_SECRET || ''

async function handler(request: Request) {
  if (!webhookSecret) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Get the headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    })
  }

  // Get the body
  const payload = await request.text()

  // Create a new Svix instance with your secret.
  const wh = new Webhook(webhookSecret)

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(payload, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400,
    })
  }

  // Handle the webhook
  const eventType = evt.type

  if (eventType === 'user.created') {
    // Optional: Create user data record in your database
    console.log('User created:', evt.data.id)
    
    // Example: Create user preferences record
    // await prisma.userData.create({
    //   data: {
    //     clerkId: evt.data.id,
    //     preferences: {},
    //   },
    // })
  }

  if (eventType === 'user.updated') {
    console.log('User updated:', evt.data.id)
    // Handle user updates if needed
  }

  if (eventType === 'user.deleted') {
    console.log('User deleted:', evt.data.id)
    // Optional: Clean up user data from your database
    // await prisma.userData.delete({
    //   where: { clerkId: evt.data.id },
    // })
  }

  return new Response('', { status: 200 })
}

export const GET = handler
export const POST = handler
export const PUT = handler
