import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";

import "./global.css";
import { useEffect } from "react";
import useVariantsStore from "@/features/variants/common/stores/variantsStore";

function App() {
	const { resetHydrationState } = useVariantsStore();

	useEffect(() => {
		return () => {
			resetHydrationState();
		};
	}, [resetHydrationState]);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
