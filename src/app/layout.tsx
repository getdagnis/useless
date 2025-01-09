import "../styles/globals.sass";
import "../styles/variables.sass";
import { Header } from "../layout";
import { Roboto } from "next/font/google";
import { isMobile } from "react-device-detect";

const roboto = Roboto({
	subsets: ["latin"],
	weight: ["300", "400", "500", "700"],
});

export const metadata = {
	title: "Completely Useless Stickers | Enhance your life with Complete Uselessness",
	description:
		"Let's stand together and be united by our Uselessness. Embrace the absurd with our collection of utterly useless, purposefully pointless stickers and decals.",
	keywords: [
		"useless stickers",
		"pointless decals",
		"absurd stickers",
		"meaningless designs",
		"purposefully useless",
		"completely pointless art",
		"useless collectibles",
		"absurd stickers",
		"anti-utility stickers",
		"purposeless designs",
		"ironic sticker collection",
		"meaninglessly awesome",
		"confusing stickers",
	],
	openGraph: {
		title: "Useless Stickers | Completely Pointless Sticker Collection",
		description:
			"Join the movement of embracing Uselessness. Collect stickers that serve absolutely no purpose other than being perfectly pointless.",
		url: "https://useless-stickers.vercel.app", // TODO: Add real domain
		siteName: "Completely Useless Stickers",
		images: [
			{
				url: "/og-image.jpg", // TODO: Add OG image
				width: 1200,
				height: 630,
				alt: "Completely Useless Sticker Collection",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Useless Stickers | Completely Pointless Sticker Collection",
		description:
			"Join the movement of embracing uselessness. Collect stickers that serve absolutely no purpose other than being perfectly pointless.",
		images: ["/twitter-image.jpg"], // TODO: Add Twitter card image
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	verification: {
		google: "your-google-verification-code", // TODO: Add Google Search Console verification code
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<div className="page">
					<Header />
					<main className={isMobile ? roboto.className : ""}>{children}</main>
					<footer></footer>
				</div>
			</body>
		</html>
	);
}
