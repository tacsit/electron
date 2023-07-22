import { useSessionStorage } from "usehooks-ts";
import { useEffect, useRef, useState } from "react";
import MapContext from "./../contexts/MapContext.jsx";
import { createTacsit } from "../apps/tacsit/Tacsit.js";
import SecondaryMapLayout from "../layouts/SecondaryMapLayout.jsx";
import SecondaryMapToolbar from "../components/SecondaryMapToolbar.jsx";

export default function SecondaryMap() {
	const mapRef = useRef(null);
	const [map, setMap] = useState(null);
	const [zoom, setZoom] = useSessionStorage("map::zoom", 2);
	const [center, setCenter] = useSessionStorage("map::center", [0, 0]);
	const [basemap, setBasemap] = useSessionStorage("map::basemap", "osm");

	useEffect(() => {
		let mapObj = createTacsit(mapRef.current);

		/**
		 * Set the initial map state
		 */
		mapObj.view.config({
			zoom: zoom,
			center: center,
		});

		mapObj.basemaps.config({
			default: basemap,
		});

		/**
		 * Keyboard shortcuts
		 */
		mapObj.keybindings.bind("ctrl+h", () => {
			mapObj.view.home();
		});

		/**
		 * Event listeners
		 */
		mapObj.on("basemaps:switched", (basemap) => {
			setBasemap(basemap.data);
		});

		mapObj.on("moveend", () => {
			setZoom(mapObj.getCurrentZoom());
			setCenter(mapObj.getCurrentCenter());
		});

		/**
		 * Mount the map
		 */
		mapObj.mount();

		setMap(mapObj);

		return () => mapObj.unmount();
	}, []);

	return (
		<MapContext.Provider value={map}>
			<SecondaryMapLayout>
				<div className="flex w-full h-full">
					<div ref={mapRef} id="map-container" className="w-full h-full"></div>
				</div>

				<SecondaryMapToolbar />
			</SecondaryMapLayout>
		</MapContext.Provider>
	);
}
