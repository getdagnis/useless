import "../styles/globals.sass";
import "../styles/variables.sass";

export const metadata = {
	title: "Useless Stickers",
	description: "Let's stand together and be united by our Uselessness",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
