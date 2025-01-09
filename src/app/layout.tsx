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
	title: "Useless Stickers",
	description: "Let's stand together and be united by our Uselessness",
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
