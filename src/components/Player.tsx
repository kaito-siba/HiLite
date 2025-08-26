import styles from "./Player.module.css";

export default function Player() {
	return (
		<section className={styles.root} aria-label="Player">
			<output className={styles.hud} aria-live="polite">
				<span className={styles.hudTitle}>HUD</span>
				<span className={styles.hudInfo}>00:00 / 00:00</span>
			</output>

			<div className={styles.videoArea}>
				<video className={styles.video} aria-label="Video" />
			</div>

			<fieldset className={styles.controls} aria-label="Controls">
				<span className={styles.controlPlaceholder}>Controls Placeholder</span>
			</fieldset>
		</section>
	);
}
