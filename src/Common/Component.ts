
import {Event} from './Event';

export interface Component {
    getName():string;
    describe():Object;
    onEvent(event:Event):void;
}
