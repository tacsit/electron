import { Menu } from "@headlessui/react";
import MapContext from "../contexts/MapContext";
import { useContext, useEffect, useState } from "react";
import { ChevronUpIcon, MapIcon, CheckIcon } from "@heroicons/react/24/outline";

export default function BasemapSelector() {
	const map = useContext(MapContext);

	let [currentBasemap, setCurrentBasemap] = useState();
	let [basemaps, setBasemaps] = useState();

	useEffect(() => {
		setCurrentBasemap(map?.basemaps?.currentlySelectedBasemap);

		let maps = map?.basemaps?.getBasemapsHandlersAndLabels();

		// filter out the basemap under the key 'default'
		if (maps == null) return;

		maps = Object.keys(maps).reduce((acc, key) => {
			if (key !== "default") {
				acc[key] = maps[key];
			}
			return acc;
		}, {});

		setBasemaps(maps);
	}, [map]);

	const handleBasemapChange = (basemap) => {
        setCurrentBasemap(basemap);
        
		map.basemaps.switchToBasemap(basemap);
	};

	return (
		<Menu as="div" className="relative">
			<Menu.Button>
				<div className="flex items-center justify-center h-12 px-3.5 space-x-1.5 text-gray-400 border-l border-gray-700">
					<MapIcon className="w-6 h-6 text-gray-400 stroke-current" />
					<ChevronUpIcon className="w-4 h-4 text-gray-400 stroke-current ui-open:rotate-180" />
				</div>
			</Menu.Button>
			<Menu.Items className="absolute top-0 right-0 z-50 w-52 text-white -translate-y-full bg-black border border-b-0 border-gray-700 divide-y divide-gray-700 pt-0.5">
				<Menu.Item disabled>
					<p className="px-2.5 py-1.5 select-none mb-0.5 flex items-center uppercase text-gray-500 text-sm">
						Basemaps
					</p>
				</Menu.Item>
				{Object.entries(basemaps != null ? basemaps : {}).map(
					([key, value]) => (
						<Menu.Item key={key}>
							<button
								onClick={() => handleBasemapChange(key)}
								className="px-2.5 py-1.5 select-none mb-0.5 text-gray-500 text-sm cursor-pointer w-full flex items-center justify-between"
							>
								<span>{value}</span>
								{currentBasemap === key && (
                                    <CheckIcon className="w-4 h-4 text-gray-400 stroke-current" />
								)}
							</button>
						</Menu.Item>
					)
				)}
			</Menu.Items>
		</Menu>
	);
}
