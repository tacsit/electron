import Basemap from './Basemap';
import { XYZ } from 'ol/source';
import previewUrl from './previews/world-satellite.png';

class Satellite extends Basemap {

    static getPreview() {
        return previewUrl;
    }

    static getLabel() {
        return 'Satellite';
    }

    static getSource() {
        return new XYZ({
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            maxZoom: 19
        });
    }
}

export default Satellite;