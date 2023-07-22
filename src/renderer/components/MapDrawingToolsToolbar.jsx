import { useContext, useState } from "react";
import MapContext from "../contexts/MapContext";
import { Circle, Type, Target, Lock, Unlock } from "react-feather";
import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/24/outline";

export default function MapDrawingToolsToolbar({ children }) {
	const map = useContext(MapContext);
	const [editMode, setEditMode] = useState(false);

	return (
		<div className="flex flex-col w-12 h-full bg-black border-l border-gray-700">
			<div className="relative">
				<button
					onClick={() => setEditMode(!editMode)}
					title={
						editMode
							? "Disable editing mode"
							: "Enable editing mode"
					}
					className="flex items-center justify-center w-12 h-12 text-gray-400 border-b border-gray-700"
				>
					{editMode ? (
						<LockOpenIcon className="w-5 h-5 stroke-current" />
					) : (
						<LockClosedIcon className="w-5 h-5 stroke-current" />
					)}
				</button>
			</div>
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
			<div className="relative">
				<button
					onClick={() => {
						console.log(map);
					}}
					className="flex items-center justify-center w-12 h-12 text-gray-400 border-b border-gray-700"
					title="Add rings"
				>
					<Target className="w-5 h-5 stroke-current" />
				</button>
			</div>
			<div className="flex-1"></div>
		</div>
	);
}
