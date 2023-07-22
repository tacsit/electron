import { AreaCustom } from "@carbon/icons-react";
import MapContext from "../contexts/MapContext";
import { useContext, useEffect, useState } from "react";

export default function DrawPolygon() {
	const map = useContext(MapContext);

	const [drawMode, setDrawMode] = useState(false);

	useEffect(() => {
		if (!map) return;

		if (drawMode) {
			map.features.startDrawing('polygon')
		} else {
			map.features.stopDrawing();
		}

        map.on("features:drawend", (e) => {
            setDrawMode(false);
        });
	}, [drawMode, map]);

	return (
		<button
            onClick={() => setDrawMode(!drawMode)}
			className="flex items-center justify-center w-12 h-12 text-gray-400 border-b border-gray-700"
			title={drawMode ? "Cancel polygon" : "Draw polygon"}
		>
			<AreaCustom className="w-5 h-5 stroke-current" />
		</button>
	);
}
