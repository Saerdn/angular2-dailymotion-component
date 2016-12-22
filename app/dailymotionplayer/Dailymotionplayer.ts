/**
 * Class representing the Dailymotion player.
 */

import { NgZone, Injectable } from "@angular/core";
import { PlayerConfig } from "./playerconfig.interface";
import { DailymotionApiService } from "./dailymotion-api.service";

@Injectable()
export class Dailymotionplayer {
    private defaultWidth: number = 320;
    private defaultHeight: number = 240;

    constructor( private zone: NgZone, private dailmyotionApiService: DailymotionApiService ) {}

    /**
     * (Wrapper function to) Load a new player using the dailymotion JS api
     */
    load( playerConfig: PlayerConfig ) {
        // Subscribe to the emitter who emits the window.DM OBJECT AS SOON AS IT IS LOADED/AVAILABLE.
        // "data = window.DM" => We actually don't need to use it here, just make sure the function is called AFTER
        // the OBJECT is available
        this.dailmyotionApiService.apiEmitter.subscribe(
            data => {
                // Using this.zone.run() causes Angular to perform change detection which will update the view
                this.zone.run(() => this.newPlayer( playerConfig ) );
            }
        );
    }

    /**
     * For cleaner code: load new DM player within that private function.
     * See https://developer.dailymotion.com/tools/sdks for documentation
     */
    private newPlayer(playerConfig: PlayerConfig) {
        let player = new window.DM.player(playerConfig.elementId, {
           width: playerConfig.width || this.defaultWidth,
           height: playerConfig.height || this.defaultHeight,
           video: playerConfig.videoId,
           params : {
               'autoplay' : false,
           }
        });

        // Emit player only after the API is really really _really_ ready
        player.addEventListener('apiready', function() {
            playerConfig.playerStream.emit(player);
        });

    }

    /**
     * Generate a unique ID.
     * It's needed when working with multiple players.
     * Source: http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript/8809472#8809472
     *
     * @return {string}
     */
    generateUUID () {
        var d = new Date().getTime();
        if(window.performance && typeof window.performance.now === "function"){
            d += performance.now(); //use high-precision timer if available
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });

        return uuid;
    }
}