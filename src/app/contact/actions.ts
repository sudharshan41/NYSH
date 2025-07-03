"use server";

import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export type ContactFormState = {
  message: string;
  status: "success" | "error" | "idle";
};

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
      message: "Please correct the errors and try again.",
      status: "error",
    };
  }

  // Simulate sending an email
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  console.log("Form data submitted:", validatedFields.data);

  return {
    message: "Thank you for your message! We will get back to you soon.",
    status: "success",
  };
}
