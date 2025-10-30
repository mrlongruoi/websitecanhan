import { defineQuery } from "next-sanity";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";

const TESTIMONIALS_QUERY =
    defineQuery(`*[_type == "testimonial" && featured == true] | order(order asc){
  name,
  position,
  company,
  testimonial,
  rating,
  date,
  avatar,
  companyLogo,
  linkedinUrl
}`);

export async function SectionChungThuc() {
    const { data: testimonials } = await sanityFetch({
        query: TESTIMONIALS_QUERY,
    });

    if (!testimonials || testimonials.length === 0) {
        return null;
    }

    // Map Sanity testimonials to AnimatedTestimonials format
      const formattedTestimonials = testimonials.map((testimonial) => ({
        quote: testimonial.testimonial || "",
        name: testimonial.name || "Anonymous",
        designation: testimonial.company
          ? `${testimonial.position} at ${testimonial.company}`
          : testimonial.position || "",
        // Use avatar for the main image
        src: testimonial.avatar
          ? urlFor(testimonial.avatar).width(500).height(500).url()
          : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=500&auto=format&fit=crop",
        // Pass company logo separately to show next to name
        companyLogo: testimonial.companyLogo
          ? urlFor(testimonial.companyLogo).width(32).height(32).url()
          : undefined,
      }));

    return (
        <section id="testimonials" className="">
            <div className="">
                <div className="">
                    <h2 className="">
                        Client Testimonials
                    </h2>
                    <p className="">
                        What people say about working with me
                    </p>
                </div>

                <AnimatedTestimonials
                    testimonials={formattedTestimonials}
                    autoplay={true}
                />
            </div>
        </section>
    );
}