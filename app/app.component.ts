import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
    id = ''; // Id of dailymotion video

    // This is the "real" player we got via iframe api
    // all methods (i.e. "play()" or "pause()") are directly taken from the api
    private players: { [index: string]: string; } = {};

    constructor() {}

    // Set player as soon as it's ready/loaded.
    // Set one player per id to allow multiple players.
    onReady(player, id) {
        this.players[id] = player;
    }

    playVideo(id) {
        this.players[id].play();
    }

    pauseVideo(id) {
        this.players[id].pause();
    }
}
