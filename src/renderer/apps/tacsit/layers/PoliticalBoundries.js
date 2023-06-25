import Layer from './Layer';
import { XYZ } from 'ol/source';

class PoliticalBoundaries extends Layer {
    
    static getDescription() {
        return 'A general reference map of political boundaries.'
    }

    static getLabel() {
        return 'Political Boundaries';
    }

    static getSource() {
        return new XYZ({
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
            maxZoom: 23,
        });
    }
}

export default PoliticalBoundaries;
