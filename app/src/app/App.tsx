import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";

import "./global.css";
import VariantEditorPage from "@/pages/VariantEditorPage";
import { TooltipProvider } from "@/components/ui/tooltip";

function App() {
	return (
		<BrowserRouter>
			<TooltipProvider>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route
						path="/variant-editor/:variantId"
						element={<VariantEditorPage />}
					/>
				</Routes>
			</TooltipProvider>
		</BrowserRouter>
	);
}

export default App;
