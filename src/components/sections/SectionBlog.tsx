import Image from "next/image";
import Link from "next/link";
import { defineQuery } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";

const BLOG_QUERY = defineQuery(`*[_type == "blog"] | order(publishedAt desc){
  title,
  slug,
  excerpt,
  category,
  tags,
  publishedAt,
  readTime,
  featuredImage
}`);

export async function SectionBlog() {
  const { data: posts } = await sanityFetch({
    query: BLOG_QUERY,
  });

  if (!posts || posts.length === 0) {
    return null;
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section id="blog" className="">
      <div className="">
        <div className="">
          <h2 className="">
            Latest Blog Posts
          </h2>
          <p className="">
            Thoughts, tutorials, and insights
          </p>
        </div>

        <div className="">
          <div className="">
            {posts.map((post) => (
              <article
                key={post.slug?.current}
                className=""
              >
                {post.featuredImage && (
                  <div className="">
                    <Image
                      src={urlFor(post.featuredImage)
                        .width(600)
                        .height(400)
                        .url()}
                      alt={post.title || "Blog post"}
                      fill
                      className=""
                    />
                  </div>
                )}

                {/* Content */}
                <div className="">
                  <div className="">
                    {post.category && (
                      <span className="">
                        {post.category}
                      </span>
                    )}
                    <div className="">
                      {post.publishedAt && (
                        <span className="truncate">
                          {formatDate(post.publishedAt)}
                        </span>
                      )}
                      {post.readTime && (
                        <>
                          <span>•</span>
                          <span>{post.readTime} min read</span>
                        </>
                      )}
                    </div>
                  </div>

                  <h3 className="">
                    {post.title}
                  </h3>

                  <p className="">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="">
                      {post.tags.slice(0, 3).map((tag: string) => (
                        <span
                          key={`${post.slug?.current}-${tag}`}
                          className=""
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <Link
                    href={`/blog/${post.slug?.current}`}
                    className=""
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}