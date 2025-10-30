import Image from "next/image";
import Link from "next/link";
import { defineQuery } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";

const PROJECTS_QUERY =
  defineQuery(`*[_type == "project" && featured == true] | order(order asc)[0...6]{
  title,
  slug,
  tagline,
  category,
  liveUrl,
  githubUrl,
  coverImage,
  technologies[]->{name, category, color}
}`);

export async function SectionDuAn() {
  const { data: projects } = await sanityFetch({ query: PROJECTS_QUERY });

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section id="projects" className="">
      <div className="">
        <div className="">
          <h2 className="">
            Featured Projects
          </h2>
          <p className="">Some of my best work</p>
        </div>

        <div className="">
          <div className="">
            {projects.map((project) => (
              <div
                key={project.slug?.current}
                className=""
              >
                {/* Project Image */}
                {project.coverImage && (
                  <div className="relative aspect-3/2 overflow-hidden">
                    <Image
                      src={urlFor(project.coverImage)
                        .width(600)
                        .height(400)
                        .url()}
                      alt={project.title || "Project image"}
                      fill
                      className=""
                    />
                    {/* Glass overlay that fades on hover */}
                    <div className="" />
                  </div>
                )}

                {/* Project Content */}
                <div className="">
                  <div>
                    <div className="">
                      {project.category && (
                        <span className="">
                          {project.category}
                        </span>
                      )}
                    </div>
                    <h3 className="">
                      {project.title || "Untitled Project"}
                    </h3>
                    <p className="">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="">
                      {project.technologies.slice(0, 4).map((tech, idx) => {
                        const techData =
                          tech && typeof tech === "object" && "name" in tech
                            ? tech
                            : null;
                        return techData?.name ? (
                          <span
                            key={`${project.slug?.current}-tech-${idx}`}
                            className=""
                          >
                            {techData.name}
                          </span>
                        ) : null;
                      })}
                      {project.technologies.length > 4 && (
                        <span className="">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="">
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className=""
                      >
                        Live Demo
                      </Link>
                    )}
                    {project.githubUrl && (
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className=""
                      >
                        GitHub
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}