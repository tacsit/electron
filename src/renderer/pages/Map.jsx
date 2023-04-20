import { useSessionStorage } from "usehooks-ts";
import { useEffect, useRef, useState } from "react";
import AppLayout from "./../layouts/AppLayout.jsx";
import MapContext from "./../contexts/MapContext.jsx";
import { createTacsit } from "../apps/tacsit/Tacsit.js";
import MapToolbar from "./../components/MapToolbar.jsx";

export default function Map() {
	const mapRef = useRef(null);
	const [map, setMap] = useState(null);
	const [zoom, setZoom] = useSessionStorage("map::zoom", 2);
	const [center, setCenter] = useSessionStorage("map::center", [0, 0]);
	const [basemap, setBasemap] = useSessionStorage("map::basemap", "osm");
	const [brightness, setBrightness] = useSessionStorage("map::brightness", 1);

	useEffect(() => {
		let mapObj = createTacsit(mapRef.current);

		mapObj.keybindings.bind("ctrl+h", () => {
			mapObj.view.home();
		});

		mapObj.keybindings.bind("num_add", () => {
			setBrightness((brightness) => {
				let setting = brightness + 0.1 > 2 ? 2 : brightness + 0.1;

				mapObj.emit("brightness:increase", setting);

				return setting;
			});
		});

		mapObj.keybindings.bind("num_subtract", () => {
			setBrightness((brightness) => {
				let setting = brightness - 0.1 < 0.1 ? 0.1 : brightness - 0.1;

				mapObj.emit("brightness:decrease", setting);

				return setting;
			});
		});

		mapObj.view.config({
			zoom: zoom,
			center: center,
		});

		mapObj.basemaps.config({
			default: basemap,
		});

		mapObj.on("basemaps:switched", (basemap) => {
			setBasemap(basemap.data);
		});

		mapObj.on("moveend", () => {
			setZoom(mapObj.getCurrentZoom());
			setCenter(mapObj.getCurrentCenter());
		});

		mapObj.mount();

		setMap(mapObj);

		return () => mapObj.unmount();
	}, []);

	return (
		<MapContext.Provider value={map}>
			<AppLayout>
				<div
					className="w-full h-full"
					style={{ filter: `brightness(${brightness})` }}
				>
					<div ref={mapRef} id="map-container" className="w-full h-full"></div>
				</div>

				<MapToolbar />
			</AppLayout>
		</MapContext.Provider>
	);
}
