

export interface Emitter {
  subscribe(callback:(data:Object)=>void):void;
}
