import { IconAward, IconCalendar, IconExternalLink } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { defineQuery } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";

const EDUCATION_QUERY =
  defineQuery(`*[_type == "education"] | order(endDate desc, startDate desc){
  institution,
  degree,
  fieldOfStudy,
  startDate,
  endDate,
  current,
  gpa,
  description,
  achievements,
  logo,
  website,
  order
}`);

export async function SectionGiaoDuc() {
  const { data: education } = await sanityFetch({ query: EDUCATION_QUERY });

  if (!education || education.length === 0) {
    return null;
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <section
      id="education"
      className=""
    >
      {/* Section-wide Dotted Glow Background */}
      {/* <DottedGlowBackground
        className="pointer-events-none opacity-30 dark:opacity-50 mask-radial-to-75% mask-radial-at-bottom"
        opacity={0.5}
        gap={10}
        radius={3.5}
        colorLightVar="--color-neutral-400"
        glowColorLightVar="--color-primary"
        colorDarkVar="--color-neutral-600"
        glowColorDarkVar="--color-primary"
        backgroundOpacity={0}
        speedMin={0.2}
        speedMax={0.8}
        speedScale={1.2}
      /> */}

      <div className="">
        <div className="">
          <h2 className="">Education</h2>
          <p className="">
            My academic background
          </p>
        </div>

        <div className="">
          {education.map((edu) => {
            let endText: string;
            if (edu.current) {
              endText = "Present";
            } else if (edu.endDate) {
              endText = formatDate(edu.endDate);
            } else {
              endText = "N/A";
            }

            return (
              <div
                key={`${edu.institution}-${edu.degree}-${edu.startDate}`}
                className=""
              >
                {/* Accent gradient bar */}
                <div className="" />

                <div className="">
                  {/* Header with logo and basic info */}
                  <div className="">
                    {edu.logo && (
                      <div className="">
                        <Image
                          src={urlFor(edu.logo).width(64).height(64).url()}
                          alt={`${edu.institution} logo`}
                          fill
                          className=""
                        />
                      </div>
                    )}

                    <div className="">
                      <h3 className="">
                        {edu.degree}
                      </h3>
                      <p className="">
                        {edu.institution}
                      </p>
                      {edu.fieldOfStudy && (
                        <p className="">
                          {edu.fieldOfStudy}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Date and GPA badges */}
                  <div className="">
                    <div className="">
                      <IconCalendar className="" />
                      <span>
                        {edu.startDate && formatDate(edu.startDate)} - {endText}
                      </span>
                    </div>
                    {edu.gpa && (
                      <div className="">
                        <IconAward className="" />
                        <span>GPA: {edu.gpa}</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  {edu.description && (
                    <p className="">
                      {edu.description}
                    </p>
                  )}

                  {/* Achievements */}
                  {edu.achievements && edu.achievements.length > 0 && (
                    <div className="">
                      <h4 className="">
                        <IconAward className="" />
                        Achievements & Honors
                      </h4>
                      <ul className="">
                        {edu.achievements.map((achievement, idx) => (
                          <li
                            key={`${edu.institution}-achievement-${idx}`}
                            className=""
                          >
                            <span className="">▸</span>
                            <span className="">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Website link */}
                  {edu.website && (
                    <Link
                      href={edu.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className=""
                    >
                      Visit Website
                      <IconExternalLink className="" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}