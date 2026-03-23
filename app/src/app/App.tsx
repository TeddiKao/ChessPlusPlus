import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";

import "./global.css";
import VariantEditorPage from "@/pages/VariantEditorPage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route
					path="/variants/:variantId"
					element={<VariantEditorPage />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
