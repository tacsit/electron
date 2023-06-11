import Basemap from './Basemap';
import { Stamen } from 'ol/source';
import previewUrl from "./previews/toner-world.png";

class StamenToner extends Basemap {

    static getPreview() {
        return previewUrl;
    }

    static getLabel() {
        return 'Black and White';
    }

    static getSource() {
        return new Stamen({
            layer: 'toner-lite',
        });
    }
}

export default StamenToner;