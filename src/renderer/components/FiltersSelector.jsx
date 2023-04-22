import { Dialog } from "@headlessui/react";
import MapContext from "../contexts/MapContext";
import { useContext, useEffect, useState } from "react";
import {
	ChevronUpIcon,
	AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";
import { useSessionStorage } from "usehooks-ts";

export default function LayersSelector() {
	const map = useContext(MapContext);
	const [isOpen, setIsOpen] = useState(false);
	const [brightness, setBrightness] = useSessionStorage("map::brightness", 100);
	const [blur, setBlur] = useSessionStorage("map::blur", 0);
	const [contrast, setContrast] = useSessionStorage("map::contrast", 100);
	const [grayscale, setGrayscale] = useSessionStorage("map::grayscale", 0);
	const [hue, setHue] = useSessionStorage("map::hue", 0);
	const [invert, setInvert] = useSessionStorage("map::invert", 0);
	const [saturation, setSaturation] = useSessionStorage("map::saturation", 100);
	const [sepia, setSepia] = useSessionStorage("map::sepia", 0);

	useEffect(() => {
		map?.filters?.setBrightness(brightness);
		map?.filters?.setBlur(blur);
		map?.filters?.setContrast(contrast);
		map?.filters?.setGrayscale(grayscale);
		map?.filters?.setHueRotate(hue);
		map?.filters?.setInvert(invert);
		map?.filters?.setSaturation(saturation);
		map?.filters?.setSepia(sepia);

		map?.keybindings?.bind("num_add", () => {
			setBrightness((brightness) => {
				let setting =
					parseInt(brightness) + 5 > 200 ? 200 : parseInt(brightness) + 5;

				map?.filters?.setBrightness(setting);

				return setting;
			});
		});

		map?.keybindings?.bind("num_subtract", () => {
			setBrightness((brightness) => {
				let setting =
					parseInt(brightness) - 5 < 5 ? 5 : parseInt(brightness) - 5;

				map?.filters?.setBrightness(setting);

				return setting;
			});
		});
	}, [map, brightness, blur, contrast, grayscale, hue, invert, saturation, sepia]);

	function handleFilterChange(key, value) {
		switch (key) {
			case "brightness":
				setBrightness(value);
				break;
			case "blur":
				setBlur(value);
				break;
			case "contrast":
				setContrast(value);
				break;
			case "grayscale":
				setGrayscale(value);
				break;
			case "hue":
				setHue(value);
				break;
			case "invert":
				setInvert(value);
				break;
			case "saturation":
				setSaturation(value);
				break;
			case "sepia":
				setSepia(value);
				break;
		}
	}

	function resetFilters() {
		setBrightness(100);
		setBlur(0);
		setContrast(100);
		setGrayscale(0);
		setHue(0);
		setInvert(0);
		setSaturation(100);
		setSepia(0);

		map?.filters?.resetFilters();
	}

	return (
		<div>
			<div
				onClick={() => setIsOpen(true)}
				className="flex items-center justify-center h-12 px-3.5 space-x-1.5 text-gray-400 border-l border-gray-700 cursor-pointer"
			>
				<AdjustmentsHorizontalIcon className="w-6 h-6 text-gray-400 stroke-current" />
				<ChevronUpIcon
					className={`w-4 h-4 text-gray-400 stroke-current ${
						isOpen ? "rotate-180" : ""
					}`}
				/>
			</div>
			<Dialog open={isOpen} onClose={() => setIsOpen(false)}>
				<Dialog.Panel className="absolute top-0 bottom-0 right-0 my-12 text-gray-200 bg-black border-l border-gray-700 select-none w-80">
					<div className="px-4 py-3 text-gray-500 border-b border-gray-700">
						<Dialog.Title className="flex items-center justify-between font-bold uppercase">
							<p>Map Style Filters</p>
							<button
								onClick={() => resetFilters()}
								type="button"
								className="p-1 px-2 text-sm rounded hover:bg-gray-900 hover:text-gray-400"
							>
								Reset
							</button>
						</Dialog.Title>
					</div>

					<div className="divide-y divide-gray-800">
						<div className="flex items-center justify-between px-4 py-3 space-x-2 text-sm text-gray-500 uppercase">
							<label htmlFor="brightness">Brightness</label>
							<input
								value={brightness}
								onChange={(event) =>
									handleFilterChange("brightness", event.target.value)
								}
								type="range"
								min="5"
								max="200"
								id="brightness"
							/>
						</div>

						<div className="flex items-center justify-between px-4 py-3 space-x-2 text-sm text-gray-500 uppercase">
							<label htmlFor="blur">Blur</label>
							<input
								value={blur}
								onChange={(event) =>
									handleFilterChange("blur", event.target.value)
								}
								type="range"
								min="0"
								max="100"
								id="blur"
							/>
						</div>

						<div className="flex items-center justify-between px-4 py-3 space-x-2 text-sm text-gray-500 uppercase">
							<label htmlFor="constrast">Constrast</label>
							<input
								value={contrast}
								onChange={(event) =>
									handleFilterChange("contrast", event.target.value)
								}
								type="range"
								min="5"
								max="200"
								id="constrast"
							/>
						</div>

						<div className="flex items-center justify-between px-4 py-3 space-x-2 text-sm text-gray-500 uppercase">
							<label htmlFor="grayscale">Grayscale</label>
							<input
								value={grayscale}
								onChange={(event) =>
									handleFilterChange("grayscale", event.target.value)
								}
								type="range"
								min="0"
								max="100"
								id="grayscale"
							/>
						</div>

						<div className="flex items-center justify-between px-4 py-3 space-x-2 text-sm text-gray-500 uppercase">
							<label htmlFor="hue">Hue Rotation</label>
							<input
								value={hue}
								onChange={(event) =>
									handleFilterChange("hue", event.target.value)
								}
								type="range"
								min="0"
								max="100"
								id="hue"
							/>
						</div>

						<div className="flex items-center justify-between px-4 py-3 space-x-2 text-sm text-gray-500 uppercase">
							<label htmlFor="invert">Color Inversion</label>
							<input
								value={invert}
								onChange={(event) =>
									handleFilterChange("invert", event.target.value)
								}
								type="range"
								min="0"
								max="100"
								id="invert"
							/>
						</div>

						<div className="flex items-center justify-between px-4 py-3 space-x-2 text-sm text-gray-500 uppercase">
							<label htmlFor="saturation">Saturation</label>
							<input
								value={saturation}
								onChange={(event) =>
									handleFilterChange("saturation", event.target.value)
								}
								type="range"
								min="0"
								max="200"
								id="saturation"
							/>
						</div>

						<div className="flex items-center justify-between px-4 py-3 space-x-2 text-sm text-gray-500 uppercase">
							<label htmlFor="sepia">Sepia</label>
							<input
								value={sepia}
								onChange={(event) =>
									handleFilterChange("sepia", event.target.value)
								}
								type="range"
								min="0"
								max="100"
								id="sepia"
							/>
						</div>
					</div>
				</Dialog.Panel>
			</Dialog>
		</div>
	);
}
