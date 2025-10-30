import { IconExternalLink, IconStar } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { defineQuery } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";

const ACHIEVEMENTS_QUERY =
  defineQuery(`*[_type == "achievement"] | order(date desc){
  title,
  type,
  issuer,
  date,
  description,
  image,
  url,
  featured,
  order
}`);

export async function SectionThanhTich() {
  const { data: achievements } = await sanityFetch({
    query: ACHIEVEMENTS_QUERY,
  });

  if (!achievements || achievements.length === 0) {
    return null;
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  const getTypeColor = (type: string | null | undefined) => {
    if (!type) return "bg-gray-500/10 text-gray-500";
    const colors: Record<string, string> = {
      award: "bg-yellow-500/10 text-yellow-500",
      hackathon: "bg-purple-500/10 text-purple-500",
      publication: "bg-blue-500/10 text-blue-500",
      speaking: "bg-green-500/10 text-green-500",
      "open-source": "bg-orange-500/10 text-orange-500",
      milestone: "bg-pink-500/10 text-pink-500",
      recognition: "bg-cyan-500/10 text-cyan-500",
      other: "bg-gray-500/10 text-gray-500",
    };
    return colors[type] || colors.other;
  };

  const getTypeLabel = (type: string | null | undefined) => {
    if (!type) return "Achievement";
    const labels: Record<string, string> = {
      award: "Award",
      hackathon: "Hackathon Win",
      publication: "Publication",
      speaking: "Speaking",
      "open-source": "Open Source",
      milestone: "Milestone",
      recognition: "Recognition",
      other: "Other",
    };
    return labels[type] || "Achievement";
  };

  // Separate featured and regular achievements
  const featured = achievements.filter((a) => a.featured);
  const regular = achievements.filter((a) => !a.featured);

  return (
    <section id="achievements" className="">
      <div className="">
        <div className="">
          <h2 className="">
            Achievements & Awards
          </h2>
          <p className="">
            Milestones and recognitions
          </p>
        </div>

        {/* Featured Achievements */}
        {featured.length > 0 && (
          <div className="">
            <h3 className="">
              <IconStar className="" />
              Featured Achievements
            </h3>
            <div className="">
              <div className="">
                {featured.map((achievement) => (
                  <div
                    key={`${achievement.title}-${achievement.date}`}
                    className=""
                  >
                    {achievement.image && (
                      <div className="relative h-48 w-full">
                        <Image
                          src={urlFor(achievement.image)
                            .width(400)
                            .height(200)
                            .url()}
                          alt={achievement.title || "Achievement"}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div className="">
                      {achievement.type && (
                        <span
                          className={` ${getTypeColor(
                            achievement.type,
                          )}`}
                        >
                          {getTypeLabel(achievement.type)}
                        </span>
                      )}
                      {achievement.date && (
                        <span className="">
                          {formatDate(achievement.date)}
                        </span>
                      )}
                    </div>

                    <h4 className="">
                      {achievement.title}
                    </h4>
                    {achievement.issuer && (
                      <p className="">
                        {achievement.issuer}
                      </p>
                    )}
                    {achievement.description && (
                      <p className="">
                        {achievement.description}
                      </p>
                    )}

                    {achievement.url && (
                      <Link
                        href={achievement.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className=""
                      >
                        Learn More
                        <IconExternalLink className="" />
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Regular Achievements */}
        {regular.length > 0 && (
          <div>
            {featured.length > 0 && (
              <h3 className="">All Achievements</h3>
            )}
            <div className="">
              <div className="">
                {regular.map((achievement) => (
                  <div
                    key={`${achievement.title}-${achievement.date}`}
                    className=""
                  >
                    {achievement.image && (
                      <div className="relative h-40 w-full">
                        <Image
                          src={urlFor(achievement.image)
                            .width(300)
                            .height(128)
                            .url()}
                          alt={achievement.title || "Achievement"}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div className="">
                      <div className="">
                        {achievement.type && (
                          <span
                            className={` ${getTypeColor(
                              achievement.type,
                            )}`}
                          >
                            {getTypeLabel(achievement.type)}
                          </span>
                        )}
                      </div>

                      <h4 className="">
                        {achievement.title}
                      </h4>
                      {achievement.issuer && (
                        <p className="">
                          {achievement.issuer}
                        </p>
                      )}
                      {achievement.date && (
                        <p className="">
                          {formatDate(achievement.date)}
                        </p>
                      )}
                      {achievement.description && (
                        <p className="">
                          {achievement.description}
                        </p>
                      )}
                    </div>

                    {achievement.url && (
                      <Link
                        href={achievement.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className=""
                      >
                        Learn More
                        <IconExternalLink className="" />
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}