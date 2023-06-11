import Basemap from "./Basemap";
import OSMSource from "ol/source/OSM";
import previewUrl from "./previews/streets-world.png";

class OpenStreetMap extends Basemap {
    
    static getPreview() {
        return previewUrl;
    }

	static getLabel() {
		return "Streets (OSM)";
	}

	static getSource() {
		return new OSMSource();
	}
}

export default OpenStreetMap;
