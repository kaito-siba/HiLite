import { invoke } from "@tauri-apps/api/core";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { useShallow } from "zustand/shallow";

interface BearState {
	bears: number;
	increase: (by: number) => void;
	removeAll: () => void;
}

const useBearStore = create<BearState>()(
	devtools(
		persist(
			(set) => ({
				bears: 0,
				increase: (by) => set((state) => ({ bears: state.bears + by })),
				removeAll: () => set({ bears: 0 }),
			}),
			{
				name: "bear-storage",
			},
		),
	),
);

function App() {
	const [greetMsg, setGreetMsg] = useState("");
	const [name, setName] = useState("");
	const { bears, increasePopulation, removeAllBears } = useBearStore(
		useShallow((state) => ({
			bears: state.bears,
			increasePopulation: state.increase,
			removeAllBears: state.removeAll,
		})),
	);

	async function greet() {
		// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
		setGreetMsg(await invoke("greet", { name }));
	}

	return (
		<main className="container">
			<h1>Welcome to Tauri + React</h1>

			<div className="row">
				<a href="https://vite.dev" target="_blank" rel="noopener">
					<img src="/vite.svg" className="logo vite" alt="Vite logo" />
				</a>
				<a href="https://tauri.app" target="_blank" rel="noopener">
					<img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
				</a>
				<a href="https://react.dev" target="_blank" rel="noopener">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<p>Click on the Tauri, Vite, and React logos to learn more.</p>

			<form
				className="row"
				onSubmit={(e) => {
					e.preventDefault();
					greet();
				}}
			>
				<input
					id="greet-input"
					onChange={(e) => setName(e.currentTarget.value)}
					placeholder="Enter a name..."
				/>
				<button type="submit">Greet</button>
			</form>
			<p>{greetMsg}</p>

			<p>Bears: {bears}</p>

			<button type="button" onClick={() => increasePopulation(1)}>
				increase
			</button>
			<button type="button" onClick={removeAllBears}>
				remove
			</button>
		</main>
	);
}

export default App;
