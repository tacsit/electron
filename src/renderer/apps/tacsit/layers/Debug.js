import Layer from './Layer';
import { XYZ, TileDebug } from 'ol/source';

class Debug extends Layer {
    static getLabel() {
        return 'Tile Debug Layer';
    }

    static getSource() {
        return new TileDebug();
    }
}

export default Debug;
