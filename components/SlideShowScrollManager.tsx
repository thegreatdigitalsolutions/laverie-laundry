"use client";

import { useEffect, useRef } from "react";

export default function SlideShowScrollManager() {
  const isAnimatingRef = useRef(false);
  const touchStartYRef = useRef(0);
  const touchStartXRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const getPositions = () => {
      const hero = document.getElementById("hero");
      const about = document.getElementById("about");
      const outlets = document.getElementById("outlets");

      const scrollY = window.scrollY;
      const heroTop = 0;
      const aboutTop = about ? about.getBoundingClientRect().top + scrollY : window.innerHeight;
      const outletsTop = outlets
        ? outlets.getBoundingClientRect().top + scrollY - 70
        : aboutTop + window.innerHeight;

      return { heroTop, aboutTop, outletsTop };
    };

    // Frame-by-frame smooth slide transition that is completely immune to browser wheel aborts
    const animateScrollTo = (targetY: number, duration = 750) => {
      isAnimatingRef.current = true;
      const startY = window.scrollY;
      const distance = targetY - startY;

      if (Math.abs(distance) < 5) {
        isAnimatingRef.current = false;
        return;
      }

      let startTime: number | null = null;

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // easeInOutCubic: silky smooth acceleration and deceleration
        const ease =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        window.scrollTo(0, startY + distance * ease);

        if (elapsed < duration) {
          requestAnimationFrame(step);
        } else {
          window.scrollTo(0, targetY);
          setTimeout(() => {
            isAnimatingRef.current = false;
          }, 80);
        }
      };

      requestAnimationFrame(step);
    };

    // Listen for custom navigation events (e.g. clicking menu links or explore buttons)
    const handleNavBypass = () => {
      isAnimatingRef.current = true;
      setTimeout(() => {
        isAnimatingRef.current = false;
      }, 950);
    };
    window.addEventListener("laverie-nav-scroll", handleNavBypass);

    // Desktop MouseWheel & Trackpad Handler
    const handleWheel = (e: WheelEvent) => {
      // If currently animating a slide, block incoming wheel ticks to prevent skip
      if (isAnimatingRef.current) {
        e.preventDefault();
        return;
      }

      // Ignore micro-jitter on precision trackpads
      if (Math.abs(e.deltaY) < 14) return;

      const { heroTop, aboutTop, outletsTop } = getPositions();
      const currentY = window.scrollY;
      const margin = 60;

      // 1. IN HERO (Top of page)
      if (currentY <= margin) {
        if (e.deltaY > 0) {
          // Scrolling down from Hero -> slide immediately to About / Philosophy
          e.preventDefault();
          animateScrollTo(aboutTop);
        }
        return;
      }

      // 2. IN PHILOSOPHY / ABOUT
      if (currentY >= aboutTop - margin && currentY <= aboutTop + margin) {
        if (e.deltaY > 0) {
          // Scrolling down from Philosophy -> slide to Our Outlets
          e.preventDefault();
          animateScrollTo(outletsTop);
        } else if (e.deltaY < 0) {
          // Scrolling up from Philosophy -> slide back to Hero
          e.preventDefault();
          animateScrollTo(heroTop);
        }
        return;
      }

      // 3. IN-BETWEEN HERO AND PHILOSOPHY
      if (currentY > margin && currentY < aboutTop - margin) {
        e.preventDefault();
        if (e.deltaY > 0) {
          animateScrollTo(aboutTop);
        } else {
          animateScrollTo(heroTop);
        }
        return;
      }

      // 4. AT TOP OF OUTLETS, SCROLLING UP
      // "continue normal scroll when it reach our outlet, when scrolling up above our outlet, it will animate to our philosophy"
      if (currentY >= outletsTop - margin && currentY <= outletsTop + 50 && e.deltaY < 0) {
        e.preventDefault();
        animateScrollTo(aboutTop);
        return;
      }

      // 5. AT OUTLETS AND ALL SECTIONS BELOW
      // Normal native browser scrolling continues unrestricted!
    };

    // Mobile Touch Gesture Handlers
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      touchStartYRef.current = e.touches[0].clientY;
      touchStartXRef.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isAnimatingRef.current) return;
      if (e.changedTouches.length !== 1) return;

      const deltaY = touchStartYRef.current - e.changedTouches[0].clientY;
      const deltaX = touchStartXRef.current - e.changedTouches[0].clientX;

      // Ensure gesture is predominantly vertical
      if (Math.abs(deltaY) < 30 || Math.abs(deltaY) < Math.abs(deltaX)) return;

      const { heroTop, aboutTop, outletsTop } = getPositions();
      const currentY = window.scrollY;
      const margin = 60;

      // deltaY > 0: Swiping up (scrolling down)
      // deltaY < 0: Swiping down (scrolling up)

      if (currentY <= margin) {
        if (deltaY > 0) {
          animateScrollTo(aboutTop);
        }
        return;
      }

      if (currentY >= aboutTop - margin && currentY <= aboutTop + margin) {
        if (deltaY > 0) {
          animateScrollTo(outletsTop);
        } else {
          animateScrollTo(heroTop);
        }
        return;
      }

      if (currentY > margin && currentY < aboutTop - margin) {
        if (deltaY > 0) {
          animateScrollTo(aboutTop);
        } else {
          animateScrollTo(heroTop);
        }
        return;
      }

      if (currentY >= outletsTop - margin && currentY <= outletsTop + 60 && deltaY < 0) {
        animateScrollTo(aboutTop);
        return;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("laverie-nav-scroll", handleNavBypass);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return null;
}
