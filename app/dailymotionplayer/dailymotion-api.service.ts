import {Injectable, EventEmitter} from '@angular/core';

@Injectable()
export class DailymotionApiService {
    private iframeScriptId: string = "dm-iframe-api";
    public apiEmitter: EventEmitter = new EventEmitter<any>();

    constructor() { }

    /**
    * Load the Dailymotion iframe API into the DOM to get access.
    * Stream the DM object to inform all listeners when it's ready.
    */
    loadApi() {
      // Load API only once
      if( window.document.getElementById(this.iframeScriptId) == null ) {
          // Create scripte element and load API
          let apiScriptTag = window.document.createElement("script");
          apiScriptTag.type = "text/javascript";
          apiScriptTag.src = "https://api.dmcdn.net/all.js";
          apiScriptTag.id = this.iframeScriptId;
          window.document.body.appendChild(apiScriptTag);

      }

      // Stream the DM code (which contains the js dailymotion framework)
      // Notice: DM needs to be initialized WITHIN the scope of dmAsyncInit
      window['dmAsyncInit'] = () => {
          // Emit the dailymotion player Object so it can be used by all subscribing players
          this.apiEmitter.emit(DM);
      };
}

}
