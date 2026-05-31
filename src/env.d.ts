/// <reference path="../.astro/types.d.ts" />

// @fontsource packages ship CSS but no type declarations for the bare
// side-effect import. Silence ts(2882) without affecting the runtime.
declare module "@fontsource/*";
