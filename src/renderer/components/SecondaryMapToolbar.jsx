import AnimateHome from "./AnimateHome.jsx";
import LayersSelector from "./LayersSelector.jsx";
import BasemapSelector from "./BasemapSelector.jsx";
import FiltersSelector from "./FiltersSelector.jsx";
import MouseCoordinatesContainer from "./MouseCoordinatesContainer.jsx";
import AdditionalWindowLauncher from "./AdditionalWindowLauncher.jsx";

export default function SecondaryMapToolbar() {
	return (
		<div className="flex items-center justify-between w-full h-12 border border-l-0 border-gray-700">
			{/* Todo: add the channels selector */}
			<div className="flex h-12"></div>

			<div className="flex h-12">
				<div className="relative sm:block hidden">
					<AnimateHome />
				</div>
                <div className="relative sm:block hidden">
                    <FiltersSelector />
                </div>
                <div className="relative sm:block hidden">
                    <LayersSelector />
                </div>
                <div className="relative sm:block hidden">
                    <BasemapSelector />
                </div>
                <div className="relative">
                    <MouseCoordinatesContainer />
                </div>
			</div>
		</div>
	);
}
