import Basemap from './Basemap';
import { Stamen } from 'ol/source';

class StamenTerrain extends Basemap {
    static getLabel() {
        return 'Terrain (World)';
    }

    static getSource() {
        return new Stamen({
            layer: 'terrain',
        });
    }
}

export default StamenTerrain;