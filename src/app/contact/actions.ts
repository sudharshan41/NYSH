"use server";

import { z } from "zod";
import { Resend } from "resend";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export type ContactFormState = {
  message: string;
  status: "success" | "error" | "idle";
};

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {

  const validatedFields = contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      message: "Thank you for your message! We will get back to you soon.",
      status: "success",
    };
  }

  const { name, email, message } = validatedFields.data;

  // We'll try to send the email, but we won't let the user know if it fails.
  try {
    if (!process.env.RESEND_API_KEY) {
       console.error("Could not send email. The RESEND_API_KEY is not configured.");
    } else {
        const { error } = await resend.emails.send({
        from: 'Community Hub <onboarding@resend.dev>',
        to: ['nethajiyuvasene@gmail.com'],
        subject: `New Contact Form Submission from ${name}`,
        reply_to: email,
        html: `
            <p>You have received a new message from your website's contact form.</p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `
        });

        if (error) {
            console.error("Resend error:", error);
        }
    }
  } catch (e) {
    console.error("Failed to send email:", e);
  }

  // Always return a success message to the user
  return {
    message: "Thank you for your message! We will get back to you soon.",
    status: "success",
  };
}
