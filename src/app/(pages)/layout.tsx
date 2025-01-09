import styles from "./styles.module.sass";

export default function PagesLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="pages-layout">
			<div className="content">
				<div className={styles.pagesContainer}>{children}</div>
			</div>
		</div>
	);
}
