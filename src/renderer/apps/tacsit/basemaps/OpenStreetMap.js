import Basemap from "./Basemap";
import OSMSource from "ol/source/OSM";

class OpenStreetMap extends Basemap {
	static getLabel() {
		return "Streets (OSM)";
	}

	static getSource() {
		return new OSMSource();
	}
}

export default OpenStreetMap;
