import Basemap from './Basemap';
import { XYZ } from 'ol/source';
import previewUrl from './previews/world-satellite.png';

class Testing extends Basemap {

    static getPreview() {
        return previewUrl;
    }

    static getLabel() {
        return 'Testing';
    }

    static getSource() {
        let key = import.meta.env.RENDERER_VITE_ARC_GIS_TOKEN
        console.log(key)
        return new XYZ({
            url: 'https://ibasemaps-api.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}?token=' + key,
            maxZoom: 19
        });
    }
}

export default Testing;