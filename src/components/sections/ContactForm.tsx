"use client";

import { useState, useTransition } from "react";
import { submitContactForm } from "@/app/actions/submit-contact-form";

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    startTransition(async () => {
      const result = await submitContactForm(formData);

      if (result.success) {
        setStatus({
          type: "success",
          message: "Thank you! Your message has been sent successfully.",
        });
        // Reset the form
        (e.target as HTMLFormElement).reset();
        // Clear success message after 5 seconds
        setTimeout(() => {
          setStatus({ type: null, message: "" });
        }, 5000);
      } else {
        setStatus({
          type: "error",
          message: result.error || "Something went wrong. Please try again.",
        });
      }
    });
  };

  return (
    <div className="">
      <h3 className="">
        Send a Message
      </h3>

      {status.type && (
        <div
          className={`p-4 rounded-lg mb-4 text-sm ${
            status.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {status.message}
        </div>
      )}

      <form className="" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="name"
            className=""
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className=""
            placeholder="Your name"
            required
            disabled={isPending}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className=""
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className=""
            placeholder="your.email@example.com"
            required
            disabled={isPending}
          />
        </div>

        <div>
          <label
            htmlFor="subject"
            className=""
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className=""
            placeholder="What's this about?"
            required
            disabled={isPending}
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className=""
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className=""
            placeholder="Tell me about your project..."
            required
            disabled={isPending}
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className=""
        >
          {isPending ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}