import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import Stripe from "stripe";
import { getStudentByClerkId } from "@workspace/sanity-utils/groq/student/getStudentByClerkId";
import { createEnrollment } from "@workspace/sanity-utils/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16" as Stripe.LatestApiVersion,
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get("stripe-signature");

    if (!signature) {
      return new NextResponse("No signature found", { status: 400 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error(`Webhook signature verification failed: ${errorMessage}`);

      return new NextResponse(`Webhook Error: ${errorMessage}`, {
        status: 400,
      });
    }

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Get the courseId and userId from the metadata
      const courseId = session.metadata?.courseId;
      const userId = session.metadata?.userId;

      if (!courseId || !userId) {
        console.log("Missing metadata in checkout session:", session.id);
        return new NextResponse(null, { status: 200 }); // Return 200 to acknowledge receipt
      }

      const student = await getStudentByClerkId(userId);

      if (!student?.data) {
        console.log("Student not found for clerkId:", userId);
        return new NextResponse(null, { status: 200 }); // Return 200 to acknowledge receipt
      }

      // Guard against missing amount_total (can be null/undefined for free/$0 sessions)
      const rawAmountTotal = session.amount_total;

      if (rawAmountTotal == null) {
        console.log(
          "Stripe checkout session has no amount_total; treating as $0 payment",
          {
            sessionId: session.id,
            courseId,
            userId,
          }
        );
      }

      const amount = (rawAmountTotal ?? 0) / 100; // Convert from cents to dollars

      // Create an enrollment record in Sanity (idempotent by paymentId + student + course)
      const enrollment = await createEnrollment({
        studentId: student.data._id,
        courseId,
        paymentId: session.id,
        amount,
      });

      console.log("Enrollment ensured (created or existing):", {
        enrollmentId: enrollment?._id,
        studentId: student.data._id,
        courseId,
        paymentId: session.id,
      });

      // Revalidate relevant pages to show enrollment status
      revalidatePath("/courses/[slug]", "page");
      revalidatePath("/dashboard", "layout");
      revalidatePath("/my-courses", "page");

      return new NextResponse(null, { status: 200 });
    }

    // Acknowledge receipt of other event types
    console.log("Received webhook event:", event.type);
    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error("Error in webhook handler:", error);
    return new NextResponse("Webhook handler failed", { status: 500 });
  }
}