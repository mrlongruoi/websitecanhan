"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
  companyLogo?: string;
};
export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, handleNext]);

  const getRotation = (index: number) => {
    // Deterministic rotation based on index to avoid hydration mismatch
    const rotations = [-10, -5, 0, 5, 10, -8, 8, -3, 3, -7];
    return rotations[index % rotations.length];
  };

  return (
    <div className="">
      <div className="">
        <div>
          <div className="">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.name}-${index}`}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: getRotation(index),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : getRotation(index),
                    zIndex: isActive(index)
                      ? 40
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: getRotation(index + 1),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className=""
                >
                  <Image
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className=""
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <div className="">
              <h3 className="">
                {testimonials[active].name}
              </h3>
              {testimonials[active].companyLogo && (
                <Image
                  src={testimonials[active].companyLogo}
                  alt="Company logo"
                  width={32}
                  height={32}
                  className=""
                />
              )}
            </div>
            <p className="">
              {testimonials[active].designation}
            </p>
            <motion.p className="">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={`${active}-word-${index}-${word}`}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className=""
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="">
            <button
              type="button"
              onClick={handlePrev}
              className=""
              aria-label="Previous testimonial"
            >
              <IconArrowLeft className="" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className=""
              aria-label="Next testimonial"
            >
              <IconArrowRight className="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};