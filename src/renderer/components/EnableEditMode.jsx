import MapContext from "../contexts/MapContext";
import { useContext, useEffect, useState } from "react";
import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/24/outline";

export default function EnableEditMode() {
	const map = useContext(MapContext);

	const [editMode, setEditMode] = useState(false);

	useEffect(() => {
		if (!map) return;

		map.on("features:modify:disabled", () => {
			setEditMode(false);
		});
		map.on("features:modify:enabled", () => {
			setEditMode(true);
		});

		if (editMode) {
			map.features.enableModifyInteraction();
		} else {
			map.features.disableModifyInteraction();
		}
	}, [editMode, map]);

	return (
		<button
			onClick={() => setEditMode(!editMode)}
			title={
				editMode
					? "Disable editing mode (Ctrl+E)"
					: "Enable editing mode (Ctrl+E)"
			}
			className="flex items-center justify-center w-12 h-12 text-gray-400 border-b border-gray-700"
		>
			{editMode ? (
				<LockOpenIcon className="w-5 h-5 stroke-current" />
			) : (
				<LockClosedIcon className="w-5 h-5 stroke-current" />
			)}
		</button>
	);
}
