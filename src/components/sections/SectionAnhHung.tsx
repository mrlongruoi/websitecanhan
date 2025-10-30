import Link from "next/link";
import { defineQuery } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { LayoutTextFlip } from "../ui/layout-text-flip";
import { ProfileImage } from "./AnhHoSo";

const HERO_QUERY = defineQuery(`*[_id == "singleton-profile"][0]{
  firstName,
  lastName,
  headline,
  headlineStaticText,
  headlineAnimatedWords,
  headlineAnimationDuration,
  shortBio,
  email,
  phone,
  location,
  availability,
  socialLinks,
  yearsOfExperience,
  profileImage
}`);

const SectionAnhHung = async () => {
    const { data: profile } = await sanityFetch({ query: HERO_QUERY });

    if (!profile) {
        return null;
    }

    return (
        <section
            id="home"
            className=""
        >
            <div className="">
                <div className="">
                    <div className="">
                        {/* Text Content */}
                        <div className="">
                            <h1 className="">
                                {profile.firstName}{" "}
                                <span className="">{profile.lastName}</span>
                            </h1>
                            {profile.headlineStaticText &&
                                profile.headlineAnimatedWords &&
                                profile.headlineAnimatedWords.length > 0 ? (
                                <LayoutTextFlip
                                    text={profile.headlineStaticText}
                                    words={profile.headlineAnimatedWords}
                                    duration={profile.headlineAnimationDuration || 4000}
                                    className=""
                                />
                            ) : (
                                <p className="">
                                    {profile.headline}
                                </p>
                            )}
                            <p className="">
                                {profile.shortBio}
                            </p>

                            {profile.socialLinks && (
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
                                </div>
                            )}

                            <div className="">
                                {profile.email && (
                                    <div className="">
                                        <span>📧</span>
                                        <span className="">{profile.email}</span>
                                    </div>
                                )}
                                {profile.location && (
                                    <div className="">
                                        <span>📍</span>
                                        <span>{profile.location}</span>
                                    </div>
                                )}
                                {profile.availability && (
                                    <div className="">
                                        <span>✅</span>
                                        <span>{profile.availability}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Profile Image */}
                        {profile.profileImage && (                            
                            <ProfileImage
                                imageUrl={urlFor(profile.profileImage)
                                    .width(600)
                                    .height(600)
                                    .url()}
                                firstName={profile.firstName || ""}
                                lastName={profile.lastName || ""}
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SectionAnhHung
