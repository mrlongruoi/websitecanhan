import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { defineQuery } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";

const EXPERIENCE_QUERY =
  defineQuery(`*[_type == "experience"] | order(startDate desc){
  company,
  position,
  employmentType,
  location,
  startDate,
  endDate,
  current,
  description,
  responsibilities,
  achievements,
  technologies[]->{name, category},
  companyLogo,
  companyWebsite
}`);

export async function SectionKinhNgiem() {
  const { data: experiences } = await sanityFetch({ query: EXPERIENCE_QUERY });

  if (!experiences || experiences.length === 0) {
    return null;
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <section id="experience" className="">
      <div className="">
        <div className="">
          <h2 className="">
            Work Experience
          </h2>
          <p className="">
            My professional journey
          </p>
        </div>

        <div className="">
          {experiences.map((exp) => {
            let endText: string;
            if (exp.current) {
              endText = "Present";
            } else if (exp.endDate) {
              endText = formatDate(exp.endDate);
            } else {
              endText = "N/A";
            }

            return (
              <div
                key={`${exp.company}-${exp.position}-${exp.startDate}`}
                className=""
              >
                {/* Timeline dot */}
                <div className="" />

                <div className="">
                  <div className="">
                    {exp.companyLogo && (
                      <div className="">
                        <Image
                          src={urlFor(exp.companyLogo).width(64).height(64).url()}
                          alt={`${exp.company} company logo`}
                          fill
                          className=""
                        />
                      </div>
                    )}

                    <div className="">
                      <h3 className="">
                        {exp.position}
                      </h3>
                      <div className="">
                        <p className="">
                          {exp.company}
                        </p>
                        {exp.employmentType && (
                          <>
                            <span className="">•</span>
                            <span className="">
                              {exp.employmentType}
                            </span>
                          </>
                        )}
                      </div>
                      <div className="">
                        <span>
                          {exp.startDate && formatDate(exp.startDate)} -{" "}
                          {endText}
                        </span>
                        {exp.location && (
                          <>
                            <span>•</span>
                            <span className="">{exp.location}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {exp.description && (
                    <div className="">
                      <PortableText value={exp.description} />
                    </div>
                  )}

                  {exp.responsibilities && exp.responsibilities.length > 0 && (
                    <div className="">
                      <h4 className="">
                        Key Responsibilities:
                      </h4>
                      <ul className="">
                        {exp.responsibilities.map((resp, idx) => (
                          <li key={`${exp.company}-resp-${idx}`}>{resp}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {exp.achievements && exp.achievements.length > 0 && (
                    <div className="">
                      <h4 className="">
                        Achievements:
                      </h4>
                      <ul className="">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={`${exp.company}-achievement-${idx}`}>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="">
                      {exp.technologies.map((tech, techIdx) => {
                        const techData =
                          tech && typeof tech === "object" && "name" in tech
                            ? tech
                            : null;
                        return techData?.name ? (
                          <span
                            key={`${exp.company}-tech-${techIdx}`}
                            className=""
                          >
                            {techData.name}
                          </span>
                        ) : null;
                      })}
                    </div>
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