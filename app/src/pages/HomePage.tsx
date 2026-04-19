import { Button } from "@/components/ui/button";
import { IconChess, IconFolder, IconPlus } from "@tabler/icons-react";
import CreateVariantDialog from "@/features/variants/variantCreation/components/CreateVariantDialog";
import useCreateVariantDialogStore from "@/features/variants/variantCreation/stores/createVariantDialog";
import VariantListDialog from "@/features/variants/variantListing/components/VariantListDialog";
import useVariantListDialogStore from "@/features/variants/variantListing/stores/variantListDialog";

import { useNavigate } from "react-router-dom";


function HomePage() {
	const { openDialog: openCreateVariantDialog } =
		useCreateVariantDialogStore();
	const { openDialog: openVariantListDialog } = useVariantListDialogStore();

	const navigate = useNavigate();

	return (
		<>
			<div className="flex flex-col items-center justify-center w-full h-full gap-2 bg-linear-to-b from-white to-purple-400">
				<h1 className="text-6xl font-bold">Chess++</h1>
				<p>Create and play with your own custom chess pieces</p>

				<div className="flex flex-row gap-4">
					<Button onClick={openCreateVariantDialog} className="px-4">
						<IconPlus />
						Create variant
					</Button>
					<Button onClick={openVariantListDialog} className="px-4">
						<IconFolder />
						My variants
					</Button>
					<Button onClick={() => navigate("/game")} className="px-4">
					<IconChess />
					Play variant</Button><Button className="px-4">
						<IconChess />
						Play variant
					</Button>
				</div>
			</div>

			<CreateVariantDialog />
			<VariantListDialog />
		</>
	);
}

export default HomePage;
