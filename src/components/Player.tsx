import { useState } from "react";
import { pick_video } from "../core/platform";
import styles from "./Player.module.css";

export default function Player() {
	const [filePath, setFilePath] = useState<string | null>(null);
	const [videoSrc, setVideoSrc] = useState<string | null>(null);

	async function handleOpen() {
		const path = await pick_video();
		console.log(path);
		if (!path) return;
		try {
			const mod = await import("@tauri-apps/api/core");
			const url = mod.convertFileSrc(path);
			setVideoSrc(url);
		} catch {
			setVideoSrc(path);
		}
		setFilePath(path);
	}

	return (
		<section className={styles.root} aria-label="Player">
			<output className={styles.hud} aria-live="polite">
				<span className={styles.hudTitle}>
					{filePath ? basename(filePath) : "HUD"}
				</span>
				<span className={styles.hudInfo}>00:00 / 00:00</span>
			</output>

			<div className={styles.videoArea}>
				<video
					className={styles.video}
					aria-label="Video"
					src={videoSrc ?? undefined}
				/>
			</div>

			<fieldset className={styles.controls} aria-label="Controls">
				<button type="button" onClick={handleOpen} aria-label="Open Video">
					Open Video
				</button>
				<span className={styles.controlPlaceholder}>Controls Placeholder</span>
			</fieldset>
		</section>
	);
}

function basename(p: string): string {
	const parts = p.split(/[/\\]/);
	return parts[parts.length - 1] ?? p;
}
