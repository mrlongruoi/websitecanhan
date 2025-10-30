import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";

const ABOUT_QUERY = defineQuery(`*[_id == "singleton-profile"][0]{
  firstName,
  lastName,
  fullBio,
  yearsOfExperience,
  stats,
  email,
  phone,
  location
}`);

export async function SectionGioiThieu() {
  const { data: profile } = await sanityFetch({ query: ABOUT_QUERY });

  if (!profile) {
    return null;
  }

  return (
    <section id="about" className="">
      <div className="">
        <div className="">
          <h2 className="">About Me</h2>
          <p className="">Get to know me better</p>
        </div>

        <div className="">
          {profile.fullBio && (
            <PortableText
              value={profile.fullBio}
              components={{
                block: {
                  normal: ({ children }) => (
                    <p className="">
                      {children}
                    </p>
                  ),
                  h2: ({ children }) => (
                    <h2 className="">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="">
                      {children}
                    </h3>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="">
                      {children}
                    </blockquote>
                  ),
                },
                marks: {
                  strong: ({ children }) => (
                    <strong className="">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => <em className="">{children}</em>,
                  link: ({ children, value }) => {
                    const href = value?.href || "";
                    const isExternal = href.startsWith("http");
                    return (
                      <Link
                        href={href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className=""
                      >
                        {children}
                      </Link>
                    );
                  },
                },
                list: {
                  bullet: ({ children }) => (
                    <ul className="">
                      {children}
                    </ul>
                  ),
                  number: ({ children }) => (
                    <ol className="">
                      {children}
                    </ol>
                  ),
                },
              }}
            />
          )}
        </div>

        {/* Stats from CMS */}
        {profile.stats && profile.stats.length > 0 && (
          <div className="">
            <div className="">
              {profile.stats.map((stat, idx) => (
                <div
                  key={`${stat.label}-${idx}`}
                  className=""
                >
                  <div className="">
                    {stat.value}
                  </div>
                  <div className="">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}