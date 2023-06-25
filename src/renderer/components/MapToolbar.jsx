import AnimateHome from "./AnimateHome.jsx";
import LayersSelector from "./LayersSelector.jsx";
import BasemapSelector from "./BasemapSelector.jsx";
import FiltersSelector from "./FiltersSelector.jsx";
import MouseCoordinatesContainer from "./MouseCoordinatesContainer.jsx";

export default function MapToolbar({ children }) {
	return (
		<div className="flex items-center justify-between w-full h-12 border border-l-0 border-gray-700">
			{/* Todo */}
			<div className="flex h-12"></div>

			<div className="flex h-12">
				<div className="relative">
					<AnimateHome />
				</div>
                <div className="relative">
                    <FiltersSelector />
                </div>
                <div className="relative">
                    <LayersSelector />
                </div>
                <div className="relative">
                    <BasemapSelector />
                </div>
                <div className="relative">
                    <MouseCoordinatesContainer />
                </div>
			</div>
		</div>
	);
}
