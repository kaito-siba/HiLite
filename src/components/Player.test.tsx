import { render, screen, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Player from "./Player";

describe("Player skeleton", () => {
	test("セクションがPlayerとしてレンダリングされる", () => {
		render(<Player />);
		const root = screen.getByLabelText("Player");
		expect(root.tagName.toLowerCase()).toBe("section");
	});

	test("中央領域に空のvideo要素が存在する", () => {
		render(<Player />);
		const video = screen.getByLabelText("Video");
		expect(video.tagName.toLowerCase()).toBe("video");
		// ソース未設定（骨格段階）
		expect(video.getAttribute("src")).toBeNull();
	});

	test("上部に最小HUDがある (role=status)", () => {
		render(<Player />);
		const hud = screen.getByRole("status");
		expect(hud).toBeInTheDocument();
		const utils = within(hud);
		expect(utils.getByText(/hud/i)).toBeInTheDocument();
		expect(utils.getByText(/00:00/)).toBeInTheDocument();
	});

	test("下部にコントロール領域のプレースホルダがある", () => {
		render(<Player />);
		const controls = screen.getByRole("group", { name: /controls/i });
		expect(controls).toBeInTheDocument();
		expect(
			within(controls).getByText(/controls placeholder/i),
		).toBeInTheDocument();
	});
});
