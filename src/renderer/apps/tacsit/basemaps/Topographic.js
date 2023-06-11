import Basemap from './Basemap';
import { XYZ } from 'ol/source';
import previewUrl from "./previews/topo-world.png";

class Topographic extends Basemap {

    static getPreview() {
        return previewUrl;
    }

    static getLabel() {
        return 'Topographic (ESRI)';
    }

    static getSource() {
        return new XYZ({
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
            maxZoom: 23
        });
    }
}

export default Topographic;
