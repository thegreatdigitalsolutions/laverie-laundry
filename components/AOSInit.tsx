"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AOSInit() {
  useEffect(() => {
    // 1. Initialize AOS
    AOS.init({
      duration: 850,
      easing: "ease-out-cubic",
      once: false,
      offset: 40,
    });

    // 2. Observer to guarantee that elements entering the viewport get .aos-animate
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("aos-animate");
          } else {
            // Re-animate when scrolling back
            const rect = entry.target.getBoundingClientRect();
            if (rect.top > window.innerHeight) {
              entry.target.classList.remove("aos-animate");
            }
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -20px 0px",
      }
    );

    const observeAll = () => {
      const elements = document.querySelectorAll("[data-aos]");
      elements.forEach((el) => {
        // If already in viewport on initial load, animate immediately
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add("aos-animate");
        }
        observer.observe(el);
      });
      AOS.refresh();
    };

    observeAll();

    const timer1 = setTimeout(observeAll, 150);
    const timer2 = setTimeout(observeAll, 500);

    const handleResize = () => {
      AOS.refresh();
      observeAll();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return null;
}
