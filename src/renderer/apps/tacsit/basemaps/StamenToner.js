import Basemap from './Basemap';
import { Stamen } from 'ol/source';

class StamenToner extends Basemap {
    static getLabel() {
        return 'Toner (World)';
    }

    static getSource() {
        return new Stamen({
            layer: 'toner-lite',
        });
    }
}

export default StamenToner;