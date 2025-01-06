"use client";
import { useEffect, useState } from "react";

import styles from "./Menu.module.sass";

export interface MenuProps {
	isMenuOpen: boolean;
	onClick: (slow?: string) => void;
}

export function Menu({ isMenuOpen, onClick }: MenuProps) {
	return (
		<div className={`${styles.menu} ${isMenuOpen && styles["is-active"]}`}>
			<ul>
				<h6>COMPLETELY</h6>
				<h6>USELESS</h6>
				<h6>MENU</h6>
				<li onClick={() => onClick("slow")}>
					<div className={styles.liInner}>Shop</div>
				</li>
				<li onClick={() => onClick("slow")}>
					<div className={styles.liInner}>Vote</div>
				</li>
				<li onClick={() => onClick("slow")}>
					<div className={styles.liInner}>Suggest</div>
				</li>
				<li onClick={() => onClick("slow")}>
					<div className={styles.liInner}>Publish</div>
				</li>
				<li onClick={() => onClick("slow")}>
					<div className={styles.liInner}>Gallery</div>
				</li>
				{/* TODO: ends with Useless Space Progam: https://useless.space |
      "We are too excited about this to even begin listing possibilities" */}
				<li onClick={() => onClick("slow")}>
					<div className={styles.liInner}>Roadmap</div>
				</li>
				<li onClick={() => onClick("slow")}>
					<div className={styles.liInner}>About</div>
				</li>
				{/* TODO: FAQ such as https://codeium.com/faq but useless, i.e.:
         // what is the meaning of life? 42. what is the meaning of the universe? 42
         // what is the meaning of everything? 42. what is the meaning of nothing? 42. */}
				<li onClick={() => onClick("slow")}>
					<div className={styles.liInner}>FAQ</div>
				</li>{" "}
			</ul>
		</div>
	);
}
