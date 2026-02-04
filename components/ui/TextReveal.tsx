"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

interface TextRevealProps {
    children: string;
    className?: string; // For the container
    textClassName?: string; // For the text elements
    delay?: number;
    duration?: number;
    type?: "word" | "char";
    viewport?: { once?: boolean; margin?: string; amount?: "some" | "all" | number };
}

export function TextReveal({
    children,
    className = "",
    textClassName = "",
    delay = 0,
    duration = 0.8,
    type = "word",
    viewport = { once: true, margin: "-10%" },
}: TextRevealProps) {
    const ref = useRef(null);
    // @ts-expect-error: Margin string format is valid at runtime but strictly typed in some versions
    const isInView = useInView(ref, viewport);

    const container: Variants = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: type === "word" ? 0.1 : 0.03, delayChildren: delay * i },
        }),
    };

    const childVariant: Variants = {
        hidden: {
            y: "110%",
            transition: {
                ease: [0.455, 0.03, 0.515, 0.955],
                duration: 0.85,
            },
        },
        visible: {
            y: 0,
            transition: {
                ease: [0.16, 1, 0.3, 1], // Custom "Hypersmooth" easing
                duration: duration,
            },
        },
    };

    const items = type === "word" ? children.split(" ") : children.split("");

    return (
        <motion.span
            ref={ref}
            style={{ display: "inline-block", overflow: "hidden" }} // Contain the overflow
            variants={container}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={`${className}`}
        >
            {items.map((item, index) => (
                <span
                    key={index}
                    style={{
                        display: "inline-block",
                        overflow: "hidden", // Crucial for the "slide up" masking effect
                        verticalAlign: "top", // Prevent layout shifts
                        marginRight: type === "word" ? "0.25em" : "0",
                    }}
                >
                    <motion.span
                        variants={childVariant}
                        className={`inline-block ${textClassName}`}
                    >
                        {item === " " ? "\u00A0" : item}
                    </motion.span>
                </span>
            ))}
        </motion.span>
    );
}
