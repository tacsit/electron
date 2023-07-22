import DrawCircle from "./DrawCircle";
import DrawPolygon from "./DrawPolygon";
import EnableEditMode from "./EnableEditMode";
import { Type } from "react-feather";
import { Schematics, AreaCustom } from "@carbon/icons-react";

export default function MapDrawingToolsToolbar({ children }) {
	return (
		<div className="flex flex-col w-12 h-full bg-black border-l border-gray-700">
			<div className="relative">
				<EnableEditMode />
			</div>
			<div className="relative">
				<DrawCircle />
			</div>
			<div className="relative">
				<button
					className="flex items-center justify-center w-12 h-12 text-gray-400 border-b border-gray-700"
					title="Add text"
				>
					<Type className="w-5 h-5 stroke-current" />
				</button>
			</div>
			<div className="relative">
				<button
					className="flex items-center justify-center w-12 h-12 text-gray-400 border-b border-gray-700"
					title="Add rings"
				>
					<Schematics size={16} className="w-4 h-4 stroke-current" />
				</button>
			</div>
			<div className="relative">
				<DrawPolygon />
			</div>
			<div className="flex-1"></div>
		</div>
	);
}
