import Link from "next/link";
import { defineQuery } from "next-sanity";
import WorldMapDemo from "@/components/world-map-demo";
import { sanityFetch } from "@/sanity/lib/live";
import { ContactForm } from "./ContactForm";

const PROFILE_QUERY = defineQuery(`*[_id == "singleton-profile"][0]{
  email,
  phone,
  location,
  socialLinks
}`);

export async function SectionLienHe() {
  const { data: profile } = await sanityFetch({ query: PROFILE_QUERY });

  if (!profile) {
    return null;
  }

  return (
    <section id="contact" className="">
      <WorldMapDemo />

      <div className="">
        <div className="">
          <h2 className="">Get In Touch</h2>
          <p className="">
            Wherever you are in the world, let&apos;s work together on your next
            project.
          </p>
        </div>

        <div className="">
          <div className="">
            {/* Contact Info */}
            <div className="">
              <h3 className="">
                Contact Information
              </h3>

              {profile.email && (
                <div className="">
                  <div className="">
                    <span className="">📧</span>
                  </div>
                  <div className="">
                    <h4 className="">
                      Email
                    </h4>
                    <Link
                      href={`mailto:${profile.email}`}
                      className=""
                    >
                      {profile.email}
                    </Link>
                  </div>
                </div>
              )}

              {profile.phone && (
                <div className="">
                  <div className="">
                    <span className="">📱</span>
                  </div>
                  <div className="">
                    <h4 className="">
                      Phone
                    </h4>
                    <Link
                      href={`tel:${profile.phone}`}
                      className=""
                    >
                      {profile.phone}
                    </Link>
                  </div>
                </div>
              )}

              {profile.location && (
                <div className="">
                  <div className="">
                    <span className="">📍</span>
                  </div>
                  <div className="">
                    <h4 className="">
                      Location
                    </h4>
                    <p className="">
                      {profile.location}
                    </p>
                  </div>
                </div>
              )}

              {profile.socialLinks && (
                <div className="">
                  <h4 className="">
                    Follow Me
                  </h4>
                  <div className="">
                    {profile.socialLinks.github && (
                      <Link
                        href={profile.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className=""
                      >
                        GitHub
                      </Link>
                    )}
                    {profile.socialLinks.linkedin && (
                      <Link
                        href={profile.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className=""
                      >
                        LinkedIn
                      </Link>
                    )}
                    {profile.socialLinks.twitter && (
                      <Link
                        href={profile.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className=""
                      >
                        Twitter
                      </Link>
                    )}
                    {profile.socialLinks.website && (
                      <Link
                        href={profile.socialLinks.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className=""
                      >
                        Website
                      </Link>
                    )}
                    {profile.socialLinks.medium && (
                      <Link
                        href={profile.socialLinks.medium}
                        target="_blank"
                        rel="noopener noreferrer"
                        className=""
                      >
                        Medium
                      </Link>
                    )}
                    {profile.socialLinks.devto && (
                      <Link
                        href={profile.socialLinks.devto}
                        target="_blank"
                        rel="noopener noreferrer"
                        className=""
                      >
                        Dev.to
                      </Link>
                    )}
                    {profile.socialLinks.youtube && (
                      <Link
                        href={profile.socialLinks.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className=""
                      >
                        YouTube
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}