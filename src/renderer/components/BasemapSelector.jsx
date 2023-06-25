import { Dialog } from "@headlessui/react";
import MapContext from "../contexts/MapContext";
import { useContext, useEffect, useState } from "react";
import { ChevronUpIcon, MapIcon, CheckIcon } from "@heroicons/react/24/outline";

function getBasemapOptions(map) {
	const maps = map?.basemaps?.getBasemapsHandlersAndLabels();

	// Filter out the basemap under the key 'default'
	return maps
		? Object.keys(maps).reduce((acc, key) => {
				if (key !== "default") {
					acc[key] = maps[key];
				}
				return acc;
		  }, {})
		: null;
}

export default function BasemapSelector() {
	const map = useContext(MapContext);

	const [isOpen, setIsOpen] = useState(false);

	const [currentBasemap, setCurrentBasemap] = useState(
		map?.basemaps?.currentlySelectedBasemap
	);

	const [basemaps, setBasemaps] = useState(() => {
		return getBasemapOptions(map);
	});

	useEffect(() => {
		setCurrentBasemap(map?.basemaps?.currentlySelectedBasemap);
		setBasemaps(getBasemapOptions(map));

		map?.keybindings?.bind("ctrl+shift+b", () => {
			setIsOpen(true);
		});
	}, [map, isOpen]);

	const handleBasemapChange = (basemap) => {
		if (basemap === currentBasemap) {
			return;
		}

		setCurrentBasemap(basemap);

		map.basemaps.switchToBasemap(basemap);
	};

	return (
		<div>
			<button
				onClick={() => setIsOpen(true)}
				className="flex items-center justify-center h-12 px-3.5 space-x-1.5 text-gray-400 border-l border-gray-700 cursor-pointer"
			>
				<MapIcon className="w-6 h-6 text-gray-400 stroke-current" />
				<ChevronUpIcon
					className={`w-4 h-4 text-gray-400 stroke-current ${
						isOpen ? "rotate-180" : ""
					}`}
				/>
			</button>
			<Dialog open={isOpen} onClose={() => setIsOpen(false)}>
				<Dialog.Panel className="absolute top-0 bottom-0 my-12 text-gray-200 bg-black border-l border-gray-700 select-none right-12 w-80">
					<div className="h-12 px-4 py-3 text-gray-500 border-b border-gray-700">
						<Dialog.Title className="font-bold uppercase">
							Select a Basemap
						</Dialog.Title>
					</div>

					{basemaps ? (
						<ul className="text-base text-gray-500 divide-y divide-gray-700">
							{Object.entries(basemaps).map(([key, value]) => (
								<li key={key}>
									<button
										onClick={() => handleBasemapChange(key)}
										className="flex items-center justify-between w-full h-12 px-4 text-lg cursor-pointer select-none"
									>
										<div className="flex items-center space-x-3">
											{value.preview ? (
												<img
													preload="true"
													src={value.preview}
													className="h-6 mr-2 border border-gray-700 rounded aspect-video"
												/>
											) : (
												<></>
											)}
											<span>{value.label}</span>
										</div>
										{currentBasemap === key && (
											<CheckIcon
												title="Currently selected"
												className="w-4 h-4 text-gray-400 stroke-current"
											/>
										)}
									</button>
								</li>
							))}
						</ul>
					) : (
						<div className="px-4 py-2 text-base text-gray-500">
							No basemaps available.
						</div>
					)}
				</Dialog.Panel>
			</Dialog>
		</div>
	);
}
