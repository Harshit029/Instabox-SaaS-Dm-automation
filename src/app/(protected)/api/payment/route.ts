import { stripe } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await currentUser();
  if (!user) return NextResponse.json({ status: 404 });

  const priceId = process.env.STRIPE_SUBSCRIPTION_PRICE_ID;
  
  // Validate environment variables
  if (!priceId) {
    return NextResponse.json(
      { error: "Stripe price ID not configured" },
      { status: 500 }
    );
  }

  // Get the base URL - use multiple fallback options
  const baseUrl = process.env.NEXT_PUBLIC_HOST_URL || 
                 process.env.VERCEL_URL || 
                 'http://localhost:3000';

  // Ensure the URL is properly formatted
  const formattedBaseUrl = baseUrl.startsWith('http') 
    ? baseUrl 
    : `https://${baseUrl}`;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${formattedBaseUrl}/payment?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${formattedBaseUrl}/payment?cancel=true`,
    });

    if (!session.url) {
      throw new Error("Failed to create Stripe session");
    }

    return NextResponse.json({
      status: 200,
      session_url: session.url,
    });
    
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}