import Basemap from './Basemap';
import { XYZ } from 'ol/source';

class Topographic extends Basemap {
    static getLabel() {
        return 'Topographic (World)';
    }

    static getSource() {
        return new XYZ({
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
            maxZoom: 23
        });
    }
}

export default Topographic;
