import { open } from "@tauri-apps/plugin-dialog";

/**
 * ユーザーに動画ファイルを1つ選択させ、そのファイルパスを返す。
 * キャンセル時は null を返す。
 * 対応拡張子: mp4, mov, webm
 */
export async function pick_video(): Promise<string | null> {
	const result = await open({
		multiple: false,
		directory: false,
		filters: [
			{
				name: "Video",
				extensions: ["mp4", "mov", "webm"],
			},
		],
	});

	if (result == null) return null;
	if (Array.isArray(result)) return result[0] ?? null;
	return result;
}
