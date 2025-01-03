"use client";

// this is needed to avoid hydration errors due to different renders between client and server side
// (server side renders mobile veresion first resulting in two different rerenders, due to dynamically rendered fonts)
// see https://github.com/vercel/next.js/blob/e0022d56c14755178046b4b0f98f20880e0818bf/errors/react-hydration-error.mdx#L4

import dynamic from "next/dynamic";

export const Slider = dynamic(() => import("./Slider"), {
	ssr: false,
});
