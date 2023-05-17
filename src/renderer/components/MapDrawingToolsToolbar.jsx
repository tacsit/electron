import { Type } from "react-feather";
import { Circle } from "react-feather";

export default function MapDrawingToolsToolbar({ children }) {
	return (
		<div className="flex flex-col w-12 h-full bg-black border-l border-gray-700">
			<div className="relative">
				<button
					className="flex items-center justify-center w-12 h-12 text-gray-400 border-b border-gray-700"
					title="Draw circle"
				>
					<Circle className="w-5 h-5 stroke-current" />
				</button>
			</div>
			<div className="relative">
				<button
					className="flex items-center justify-center w-12 h-12 text-gray-400 border-b border-gray-700"
					title="Add text"
				>
					<Type className="w-5 h-5 stroke-current" />
				</button>
			</div>
			<div className="flex-1"></div>
		</div>
	);
}
