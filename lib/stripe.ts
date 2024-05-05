import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_API_KEY!,{
    // apiVersion: '2022-11-15',
    apiVersion: "2024-04-10",
    typescript: true,
})