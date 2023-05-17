import { Dialog } from "@headlessui/react";
import MapContext from "../contexts/MapContext";
import { useContext, useEffect, useState } from "react";
import {
	ChevronUpIcon,
	Square3Stack3DIcon,
	CheckIcon,
} from "@heroicons/react/24/outline";
import { useSessionStorage } from "usehooks-ts";

export default function LayersSelector() {
	const map = useContext(MapContext);

	const [isOpen, setIsOpen] = useState(false);

	let [layers, setLayers] = useState(() => {
		return {};
	});

	const [activeLayers, setActiveLayers] = useSessionStorage(
		"map::activeLayers",
		() => {
			return [];
		}
	);

	useEffect(() => {
		setActiveLayers(map?.layers?.getActiveLayers());
		setLayers(map?.layers?.getLayerHandlersAndLabels());

        map?.keybindings?.bind("ctrl+shift+l", () => {
            setIsOpen(true);
        });

	}, [map, isOpen]);

	const handleLayerChange = (layer) => {
		map.layers.toggle(layer);

		setActiveLayers(map.layers.getActiveLayers());
	};

	return (
		<div>
			<button
				onClick={() => setIsOpen(true)}
				className="flex items-center justify-center h-12 px-3.5 space-x-1.5 text-gray-400 border-l border-gray-700 cursor-pointer"
			>
				<Square3Stack3DIcon className="w-6 h-6 text-gray-400 stroke-current" />
				<ChevronUpIcon
					className={`w-4 h-4 text-gray-400 stroke-current ${
						isOpen ? "rotate-180" : ""
					}`}
				/>
			</button>
			<Dialog open={isOpen} onClose={() => setIsOpen(false)}>
				<Dialog.Panel className="absolute top-0 bottom-0 my-12 text-gray-200 bg-black border-l border-gray-700 select-none right-12 w-80">
					<div className="px-4 py-3 text-gray-500 border-b border-gray-700">
						<Dialog.Title className="font-bold uppercase">
							Select Layers
						</Dialog.Title>
					</div>

					{layers ? (
						<ul className="text-base text-gray-500 divide-y divide-gray-700">
							{Object.entries(layers).map(([key, value]) => (
								<li key={key}>
									<button
										onClick={() => handleLayerChange(key)}
										className="flex items-center justify-between w-full px-4 py-2 text-lg cursor-pointer select-none"
									>
										<span>{value}</span>
										{activeLayers.indexOf(key) >= 0 && (
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
							No layers available.
						</div>
					)}
				</Dialog.Panel>
			</Dialog>
		</div>
	);
}
