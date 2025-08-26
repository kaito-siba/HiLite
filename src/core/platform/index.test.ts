import { beforeEach, describe, expect, test, vi } from "vitest";

// モジュールモック: @tauri-apps/api/dialog を mock
const openMock = vi.fn();
vi.mock("@tauri-apps/plugin-dialog", () => ({
	open: (...args: unknown[]) => openMock(...args),
}));

import { pick_video } from "./index";

describe("pick_video", () => {
	beforeEach(() => {
		openMock.mockReset();
	});

	test("キャンセル時は null を返す", async () => {
		openMock.mockResolvedValueOnce(null);
		await expect(pick_video()).resolves.toBeNull();
	});

	test("単一パス文字列を返す", async () => {
		openMock.mockResolvedValueOnce("/path/to/video.mp4");
		await expect(pick_video()).resolves.toBe("/path/to/video.mp4");
	});

	test("配列が返っても先頭を返す（multiple:false の防衛）", async () => {
		openMock.mockResolvedValueOnce(["/a.mov", "/b.webm"]);
		await expect(pick_video()).resolves.toBe("/a.mov");
	});

	test("拡張子フィルタが mp4/mov/webm で設定される", async () => {
		openMock.mockResolvedValueOnce(null);
		await pick_video();
		expect(openMock).toHaveBeenCalledTimes(1);
		const [options] = openMock.mock.calls[0];
		expect(options).toMatchObject({ multiple: false, directory: false });
		expect(options.filters?.[0]?.extensions).toEqual(["mp4", "mov", "webm"]);
	});
});
