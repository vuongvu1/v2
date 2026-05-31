import type { TransitionDirectionalAnimations } from "astro";

/**
 * Warcraft-3-style page transition descriptors for Astro's `transition:animate`.
 * The `name` of each animation maps to a @keyframes block in styles/transitions.css.
 *
 * Forwards and backwards navigation use the same choreography on purpose — the
 * menu always launches up and slams back down; the content always flies out and
 * bounces in from the right.
 */
const DURATION = "0.55s";
const EASE_OUT = "cubic-bezier(0.6, -0.28, 0.735, 0.045)"; // anticipate, then leave
const EASE_IN = "cubic-bezier(0.175, 0.885, 0.32, 1.275)"; // overshoot landing

const menuPair = {
  old: { name: "wc3-bounce-out-up", duration: DURATION, easing: EASE_OUT, fillMode: "both" },
  new: { name: "wc3-bounce-in-down", duration: DURATION, easing: EASE_IN, fillMode: "both" },
};

const contentPair = {
  old: { name: "wc3-bounce-out-right", duration: DURATION, easing: EASE_OUT, fillMode: "both" },
  new: { name: "wc3-bounce-in-right", duration: DURATION, easing: EASE_IN, fillMode: "both" },
};

export const menuBounce: TransitionDirectionalAnimations = {
  forwards: menuPair,
  backwards: menuPair,
};

export const contentBounce: TransitionDirectionalAnimations = {
  forwards: contentPair,
  backwards: contentPair,
};
