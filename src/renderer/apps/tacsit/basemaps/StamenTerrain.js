import Basemap from './Basemap';
import { Stamen } from 'ol/source';
import previewUrl from "./previews/terrain-world.png";

class StamenTerrain extends Basemap {

    static getPreview() {
        return previewUrl;
    }

    static getLabel() {
        return 'Terrain';
    }

    static getSource() {
        return new Stamen({
            layer: 'terrain',
        });
    }
}

export default StamenTerrain;