// Extend expect with jest-dom matchers for better DOM assertions
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// テスト毎にDOMをクリーンアップ
afterEach(() => {
	cleanup();
});
