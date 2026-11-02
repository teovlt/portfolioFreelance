import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface TypingAnimationProps {
  texts: string[];
  className?: string;
}

export function TypingAnimation({ texts, className = "" }: TypingAnimationProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const targetText = texts[currentTextIndex];

    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 2000);
      return () => clearTimeout(pauseTimeout);
    }

    if (!isDeleting && currentText === targetText) {
      setIsPaused(true);
      return;
    }

    if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setCurrentText((prev) => {
          if (isDeleting) {
            return prev.slice(0, -1);
          } else {
            return targetText.slice(0, prev.length + 1);
          }
        });
      },
      isDeleting ? 50 : 100,
    );

    return () => clearTimeout(timeout);
  }, [currentText, currentTextIndex, isDeleting, isPaused, texts, prefersReducedMotion]);

  // Screen readers get every phrase once instead of a word spelled out
  // letter by letter; reduced-motion visitors see the first one, still
  if (prefersReducedMotion) return <span className={className}>{texts[0]}</span>;

  return (
    <span className={className}>
      <span className="sr-only">{texts.join(", ")}</span>
      <span aria-hidden="true">
        {currentText}
        <span className="animate-pulse">|</span>
      </span>
    </span>
  );
}
