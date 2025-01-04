import React from "react";

import styles from "./Pagination.module.sass";

export interface PaginationProps {
	countOfPages: number;
	activePage: number;
	onClick: (page: number) => void;
}

export const Pagination = ({ countOfPages, activePage, onClick }: PaginationProps) => {
	return (
		<div>
			<ul className={styles.pagination}>
				{Array.from({ length: countOfPages }, (_, index) => (
					<li
						key={index}
						className={index === activePage ? styles.active : ""}
						onClick={() => onClick(index)}
						data-testid={`pagination-item-${index}`}
					></li>
				))}
			</ul>
		</div>
	);
};
