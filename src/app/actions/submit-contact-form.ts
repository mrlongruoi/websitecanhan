"use server";

import { serverClient } from "@/sanity/lib/serverClient";

export async function submitContactForm(formData: FormData) {
  try {
    const name = (formData.get("name") as string)?.trim() || "";
    const email = (formData.get("email") as string)?.trim() || "";
    const subject = (formData.get("subject") as string)?.trim() || "";
    const message = (formData.get("message") as string)?.trim() || "";

    // Validate the required fields
    if (!name || !email || !message) {
      return {
        success: false,
        error: "Please fill in all required fields",
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: "Please provide a valid email address",
      };
    }

    // Validate lengths
    if (
      name.length > 100 ||
      email.length > 254 ||
      (subject && subject.length > 200) ||
      message.length > 5000
    ) {
      return {
        success: false,
        error: "One or more fields exceed maximum length",
      };
    }

    // Create the document in Sanity
    const result = await serverClient.create({
      _type: "contact",
      name,
      email,
      subject,
      message,
      submittedAt: new Date().toISOString(),
      status: "new",
    });

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return {
      success: false,
      error: "Failed to submit the form. Please try again later.",
    };
  }
}
