import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { DailymotionApiService } from "./dailymotion-api.service";
import { Dailymotionplayer } from "./Dailymotionplayer";

@Component({
    selector: 'dailymotionplayer',
    templateUrl: './dailymotionplayer.component.html',
    providers: [Dailymotionplayer]
})
export class DailymotionplayerComponent implements OnInit {
    @Input() videoId: string = '';
    @Input() height: number;
    @Input() width: number;

    // Used to send/emit an instance of the player "out of this component"
    // so that other components can take control of the player.
    @Output() playerStream = new EventEmitter();

    @ViewChild('playercontainer') private playercontainer: ElementRef;

    constructor(
        private dailymotionService: DailymotionApiService,
        private dailymotionPlayer: Dailymotionplayer
    ) { }

    ngOnInit() {
        // Get original div and set a unique ID for it.
        // That is important when working with multiple players
        let elementId = this.dailymotionPlayer.generateUUID();
        this.playercontainer.nativeElement.setAttribute('id', elementId);

        console.log(elementId);

        // Define configuration for the player
        let playerConfig = {
            elementId: elementId,
            width: this.width,
            height: this.height,
            videoId: this.videoId,
            playerStream: this.playerStream
        };

        this.dailymotionService.loadApi();

        this.dailymotionPlayer.load(playerConfig);
    }

}
