import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./global.css";
import TestPage from "@/pages/TestPage";
import JSONValidatorTestPage from "@/pages/JSONValidatorTestPage";
import VariantEditorPage from "@/pages/VariantEditorPage";
import { TooltipProvider } from "@/components/ui/tooltip";
import HomePage from "@/pages/HomePage";

function App() {
	return (
		<TooltipProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route
						path="/variants/:variantId"
						element={<VariantEditorPage />}
					/>
					<Route path="/test" element={<TestPage />} />
					<Route
						path="/json-validator-test"
						element={<JSONValidatorTestPage />}
					/>
				</Routes>
			</BrowserRouter>
		</TooltipProvider>
	);
}

export default App;
