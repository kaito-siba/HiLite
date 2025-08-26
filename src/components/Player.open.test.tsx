import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import Player from "./Player";

// pick_video をモックし、ユーザーが動画を選択したと想定する
vi.mock("../core/platform", () => ({
	pick_video: vi.fn(),
}));

// convertFileSrc もモック（tauri環境依存を避ける）
vi.mock("@tauri-apps/api/core", () => ({
	convertFileSrc: (p: string) => `safe://${p}`,
}));

const { pick_video } = await import("../core/platform");

describe("Player: ファイル選択のUI連携", () => {
	beforeEach(() => {
		(pick_video as any).mockReset();
	});

	test("Open Video ボタンで選択して video.src が更新される", async () => {
		(pick_video as any).mockResolvedValueOnce("/tmp/sample.mp4");
		render(<Player />);

		const btn = screen.getByRole("button", { name: /open video/i });
		fireEvent.click(btn);

		// 非同期更新待ち
		const video = await screen.findByLabelText("Video");
		expect(video).toHaveAttribute("src", "safe:///tmp/sample.mp4");

		// HUD にファイル名が出る
		expect(screen.getByText("sample.mp4")).toBeInTheDocument();
	});
});
