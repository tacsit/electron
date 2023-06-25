import Layer from './Layer';
import { XYZ, TileDebug } from 'ol/source';

class Debug extends Layer {

    static getDescription() {
        return 'A layer that shows the tile grid for debugging purposes.'
    }

    static getLabel() {
        return 'Tile Debug Layer';
    }

    static getSource() {
        return new TileDebug();
    }
}

export default Debug;
