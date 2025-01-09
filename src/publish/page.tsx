import React from "react";
import { Header } from "../layout";
import { Slider } from "../components";
import styles from "./page.module.sass";
import { Roboto } from "next/font/google";
import { isMobile } from "react-device-detect";

type Props = {};

const roboto = Roboto({
	subsets: ["latin"],
	weight: ["300", "400", "500", "700"],
});

const Page = (props: Props) => {
	return (
		<div className={styles.page}>
			<Header />
			<main className={isMobile ? roboto.className : ""}>
				<Slider />
			</main>
			<footer className={styles.footer}></footer>
		</div>
	);
};

export default Page;
