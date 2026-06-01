import type { TransitionDirectionalAnimations } from "astro";

/**
 * Warcraft-3-style page transition descriptors for Astro's `transition:animate`.
 * The `name` of each animation maps to a @keyframes block in styles/transitions.css.
 *
 * The draft (Next.js + Animate.css) plays this sequentially: panels fly OUT, then the
 * new page bounces IN. We reproduce that with View Transitions by delaying the `new`
 * (bounce-in) animation until the `old` (fly-out) has finished. `fillMode: "both"` keeps
 * the incoming panel parked off-screen during the delay.
 *
 * Forwards and backwards navigation use the same choreography on purpose — the menu
 * always launches up and slams back down; the content always flies out to the right and
 * bounces back in from the right.
 */
const OUT = "0.5s"; // fly-out duration
const IN = "0.9s"; // bounce-in duration (the dramatic part)

const menuPair = {
  old: { name: "wc3-bounce-out-up", duration: OUT, fillMode: "both" },
  new: { name: "wc3-bounce-in-down", duration: IN, delay: OUT, fillMode: "both" },
};

const contentPair = {
  old: { name: "wc3-bounce-out-right", duration: OUT, fillMode: "both" },
  new: { name: "wc3-bounce-in-right", duration: IN, delay: OUT, fillMode: "both" },
};

export const menuBounce: TransitionDirectionalAnimations = {
  forwards: menuPair,
  backwards: menuPair,
};

export const contentBounce: TransitionDirectionalAnimations = {
  forwards: contentPair,
  backwards: contentPair,
};
