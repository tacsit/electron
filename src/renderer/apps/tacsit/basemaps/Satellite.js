import Basemap from './Basemap';
import { XYZ } from 'ol/source';

class Satellite extends Basemap {
    static getLabel() {
        return 'Satellite (World)';
    }

    static getSource() {
        return new XYZ({
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            maxZoom: 19
        });
    }
}

export default Satellite;


// Path: src\renderer\apps\tacsit\basemaps\Basemap.js