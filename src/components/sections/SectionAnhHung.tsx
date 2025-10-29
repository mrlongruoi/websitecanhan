import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";

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
        <div>
            Anh Hùng Section
        </div>
    )
}

export default SectionAnhHung
