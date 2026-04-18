import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";

import "./global.css";
import TestPage from "@/pages/TestPage";
import JSONValidatorTestPage from "@/pages/JSONValidatorTestPage";

import GamePage from "@/pages/GamePage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/test" element={<TestPage />} />
				<Route
					path="/json-validator-test"
					element={<JSONValidatorTestPage />}
				/>
				<Route path="/game" element={<GamePage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
