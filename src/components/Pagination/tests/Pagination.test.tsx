import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Pagination } from "../Pagination";
import { describe, expect, test } from "@jest/globals";

describe("<Pagination />", () => {
	test("should call onClick function when a pagination testem is clicked", () => {
		const onClickMock = jest.fn();
		const { getByTestId } = render(
			<Pagination countOfPages={3} activePage={0} onClick={onClickMock} />
		);

		fireEvent.click(getByTestId("pagination-testem-1"));

		expect(onClickMock).toHaveBeenCalledWith(1);
	});

	describe("should render the correct number of pagination testems", () => {
		const { getAllByTestId } = render(
			<Pagination countOfPages={3} activePage={0} onClick={() => {}} />
		);

		const paginationtestems = getAllByTestId("pagination-testem");

		expect(paginationtestems.length).toBe(3);
	});

	describe("should render the active pagination testem wtesth the correct class", () => {
		const { getByTestId } = render(
			<Pagination countOfPages={3} activePage={1} onClick={() => {}} />
		);

		const activePaginationtestem = getByTestId("pagination-testem-0");

		expect(activePaginationtestem.classList.contains("active")).toBe(true);
	});
});
