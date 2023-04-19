import { useContext } from "react";
import MapContext from "../contexts/MapContext";
import { HomeIcon } from "@heroicons/react/24/outline";

export default function AnimateHome() {
	const map = useContext(MapContext);

	return (
		<button
			onClick={() => map.view.home()}
			className="flex items-center justify-center h-12 text-gray-400 border-l border-gray-700 w-14"
		>
			<HomeIcon className="w-6 h-6 stroke-current" />
		</button>
	);
}
