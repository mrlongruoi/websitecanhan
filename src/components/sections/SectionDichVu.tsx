import { PortableText } from "@portabletext/react";
import { IconCheck } from "@tabler/icons-react";
import { Star } from "lucide-react";
import Image from "next/image";
import { defineQuery } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";

const SERVICES_QUERY =
    defineQuery(`*[_type == "service"] | order(order asc, _createdAt desc){
  title,
  slug,
  icon,
  shortDescription,
  fullDescription,
  features,
  technologies[]->{name, category},
  deliverables,
  pricing,
  timeline,
  featured,
  order
}`);

export async function SectionDichVu() {
    const { data: services } = await sanityFetch({ query: SERVICES_QUERY });

    if (!services || services.length === 0) {
        return null;
    }

    const formatPrice = (pricing: {
        startingPrice?: number;
        priceType?: string;
        description?: string;
    }) => {
        if (!pricing) return null;

        const { startingPrice, priceType, description } = pricing;

        const priceTypeLabels: Record<string, string> = {
            hourly: "/hour",
            project: "/project",
            monthly: "/month",
            custom: "",
        };

        if (priceType === "custom") {
            return <span className="">Custom Quote</span>;
        }

        return (
            <div>
                {startingPrice && (
                    <span className="">
                        ${startingPrice.toLocaleString()}
                        {priceType && priceTypeLabels[priceType]}
                    </span>
                )}
                {description && (
                    <p className="">{description}</p>
                )}
            </div>
        );
    };

    // Separate featured and regular services
    const featured = services.filter((s) => s.featured);
    const regular = services.filter((s) => !s.featured);

    return (
        <section id="services" className="">
            <div className="">
                <div className="">
                    <h2 className="">Services</h2>
                    <p className="">What I can do for you</p>
                </div>

                {/* Featured Services */}
                {featured.length > 0 && (
                    <div className="">
                        <h3 className="">
                            <Star className="" />
                            Featured Services
                        </h3>
                        <div className="">
                            <div className="">
                                {featured.map((service) => (
                                    <div
                                        key={service.slug?.current || service.title}
                                        className=""
                                    >
                                        {service.icon && (
                                            <div className="relative h-16 w-16">
                                                <Image
                                                    src={urlFor(service.icon).width(64).height(64).url()}
                                                    alt={service.title || "Service"}
                                                    width={64}
                                                    height={64}
                                                    className="h-full w-full object-contain"
                                                />
                                            </div>
                                        )}

                                        <h3 className="">
                                            {service.title}
                                        </h3>

                                        {service.shortDescription && (
                                            <p className="">
                                                {service.shortDescription}
                                            </p>
                                        )}

                                        {service.fullDescription && (
                                            <div className="">
                                                <PortableText value={service.fullDescription} />
                                            </div>
                                        )}

                                        {service.features && service.features.length > 0 && (
                                            <div className="">
                                                <h4 className="">
                                                    Key Features:
                                                </h4>
                                                <ul className="space-y-2">
                                                    {service.features.map((feature, idx) => (
                                                        <li
                                                            key={`${service.title}-feature-${idx}`}
                                                            className=""
                                                        >
                                                            <IconCheck className="" />
                                                            <span className="">
                                                                {feature}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        <div className="">
                                            {service.pricing && (
                                                <div>
                                                    <p className="">
                                                        Pricing
                                                    </p>
                                                    {formatPrice(service.pricing)}
                                                </div>
                                            )}
                                            {service.timeline && (
                                                <div>
                                                    <p className="">
                                                        Timeline
                                                    </p>
                                                    <p className="">
                                                        {service.timeline}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {service.technologies &&
                                            service.technologies.length > 0 && (
                                                <div className="">
                                                    {service.technologies.map((tech, idx) => {
                                                        const techData =
                                                            tech && typeof tech === "object" && "name" in tech
                                                                ? tech
                                                                : null;
                                                        return techData?.name ? (
                                                            <span
                                                                key={`${service.title}-tech-${idx}`}
                                                                className=""
                                                            >
                                                                {techData.name}
                                                            </span>
                                                        ) : null;
                                                    })}
                                                </div>
                                            )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Regular Services */}
                {regular.length > 0 && (
                    <div>
                        {featured.length > 0 && (
                            <h3 className="">All Services</h3>
                        )}
                        <div className="">
                            <div className="">
                                {regular.map((service) => (
                                    <div
                                        key={service.slug?.current || service.title}
                                        className=""
                                    >
                                        {service.icon && (
                                            <div className="relative h-12 w-12">
                                                <Image
                                                    src={urlFor(service.icon).width(48).height(48).url()}
                                                    alt={service.title || "Service"}
                                                    width={48}
                                                    height={48}
                                                    className="h-full w-full object-contain"
                                                />
                                            </div>
                                        )}

                                        <h3 className="">
                                            {service.title}
                                        </h3>

                                        {service.shortDescription && (
                                            <p className="">
                                                {service.shortDescription}
                                            </p>
                                        )}

                                        {service.features && service.features.length > 0 && (
                                            <ul className="">
                                                {service.features.slice(0, 3).map((feature, idx) => (
                                                    <li
                                                        key={`${service.title}-feature-${idx}`}
                                                        className=""
                                                    >
                                                        <IconCheck className="" />
                                                        <span className="">
                                                            {feature}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        <div className="">
                                            {service.pricing && (
                                                <div className="">
                                                    {formatPrice(service.pricing)}
                                                </div>
                                            )}
                                            {service.timeline && (
                                                <p className="">
                                                    ⏱️ {service.timeline}
                                                </p>
                                            )}
                                        </div>
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