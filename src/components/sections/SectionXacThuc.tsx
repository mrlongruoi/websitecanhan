import { IconExternalLink } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { defineQuery } from "next-sanity";
import { CometCard } from "@/components/ui/comet-card";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";

const CERTIFICATIONS_QUERY =
  defineQuery(`*[_type == "certification"] | order(issueDate desc){
  _id,
  name,
  issuer,
  issueDate,
  expiryDate,
  credentialId,
  credentialUrl,
  logo,
  description,
  skills[]->{name, category},
  order
}`);

export async function SectionXacThuc() {
  const { data: certifications } = await sanityFetch({
    query: CERTIFICATIONS_QUERY,
  });

  if (!certifications || certifications.length === 0) {
    return null;
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isExpired = (expiryDate: string | null | undefined) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  return (
    <section
      id="certifications"
      className=""
    >
      <div className="">
        <div className="">
          <h2 className="">
            Certifications
          </h2>
          <p className="">
            Professional credentials and certifications
          </p>
        </div>

        <div className="">
          <div className="">
            {certifications.map((cert) => (
              <CometCard
                key={cert._id ?? `${cert.issuer}-${cert.name}-${cert.issueDate}`}
                rotateDepth={8}
                translateDepth={10}
                className=""
              >
                {/* Outer Frame - Light Matting */}
                <div
                  className=""
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Inner Certificate - Dark Background */}
                  <div className="">
                    {/* Decorative Corner Frames - Top Left */}
                    <div className="">
                      <div className="" />
                      <div className="" />
                    </div>

                    {/* Decorative Corner Frames - Top Right */}
                    <div className="">
                      <div className="" />
                      <div className="" />
                    </div>

                    {/* Decorative Corner Frames - Bottom Left */}
                    <div className="">
                      <div className="" />
                      <div className="" />
                    </div>

                    {/* Decorative Corner Frames - Bottom Right */}
                    <div className="">
                      <div className="" />
                      <div className="" />
                    </div>

                    {/* Diamond Accents - Corners */}
                    <div className="" />
                    <div className="" />
                    <div className="" />
                    <div className="" />

                    <div className="">
                      {/* Date at Top */}
                      <div className="">
                        <p className="">
                          {cert.issueDate && formatDate(cert.issueDate)}
                        </p>
                      </div>

                      {/* Certificate Title - Small and Gold at top */}
                      <div className="">
                        <h4 className="">
                          CERTIFICATE
                        </h4>
                        <p className="">for</p>
                      </div>

                      {/* Certificate Name - Main Subject */}
                      <h3 className="">
                        {cert.name}
                      </h3>

                      {/* Description */}
                      {cert.description && (
                        <p className="">
                          {cert.description}
                        </p>
                      )}

                      {/* Logo Badge */}
                      {cert.logo && (
                        <div className="">
                          <div className="">
                            <div className="relative h-16 w-16">
                              <Image
                                src={urlFor(cert.logo)
                                  .width(64)
                                  .height(64)
                                  .url()}
                                alt={`${cert.name} badge`}
                                width={64}
                                height={64}
                                className="h-full w-full object-contain"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Issued By */}
                      <div className="">
                        <p className="">
                          {cert.issuer}
                        </p>
                      </div>

                      {/* Certificate Details */}
                      <div className="">
                        {/* Skills/Competencies */}
                        {cert.skills && cert.skills.length > 0 && (
                          <div className="">
                            <div className="">
                              {cert.skills.slice(0, 4).map((skill, idx) => {
                                const skillData =
                                  skill &&
                                    typeof skill === "object" &&
                                    "name" in skill
                                    ? skill
                                    : null;
                                return skillData?.name ? (
                                  <span
                                    key={`${cert.name}-skill-${idx}`}
                                    className=""
                                  >
                                    {skillData.name}
                                  </span>
                                ) : null;
                              })}
                            </div>
                          </div>
                        )}

                        {/* Expiry and Credential Info */}
                        <div className="">
                          {cert.expiryDate && (
                            <div className="">
                              <span className="">
                                Valid Until:{" "}
                              </span>
                              <span
                                className={
                                  isExpired(cert.expiryDate)
                                    ? ""
                                    : ""
                                }
                              >
                                {formatDate(cert.expiryDate)}
                                {isExpired(cert.expiryDate) && " (Expired)"}
                              </span>
                            </div>
                          )}
                          {cert.credentialId && (
                            <div className="">
                              <p className="">
                                Credential ID:
                              </p>
                              <p className="">
                                {cert.credentialId}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Verify Credential Button */}
                        {cert.credentialUrl && (
                          <div className="">
                            <Link
                              href={cert.credentialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className=""
                            >
                              Verify Credential
                              <IconExternalLink className="" />
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CometCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}