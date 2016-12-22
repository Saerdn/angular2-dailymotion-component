import {Injectable, EventEmitter} from '@angular/core';

@Injectable()
export class DailymotionApiService {
  public apiEmitter: EventEmitter = new EventEmitter<any>();

  constructor() { }

  /**
   * Load the Dailymotion iframe API into the DOM to get access.
   * Stream the DM object to inform all listeners when it's ready.
   */
  loadApi() {
      // TODO: API needs to be loaded only once (BUT: Player object listens to the emitted class!)
      let apiScriptTag = window.document.createElement("script");
      apiScriptTag.type = "text/javascript";
      apiScriptTag.src = "https://api.dmcdn.net/all.js";
      window.document.body.appendChild(apiScriptTag);

      // Stream the DM code (which contains the js dailymotion framework)
      window['dmAsyncInit'] = () => {
          // Emit the dailymotion player Object so it can be used by all subscribing players
          this.apiEmitter.emit(DM);
      };
  }

}
