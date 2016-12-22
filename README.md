# Angular 2 Dailymotion Component
Dailymotion iframe API integration. Use this Angular 2 component if you 
want to integrate and control the Dailymotion player.

Usage:
```
<dailymotionplayer
        [videoId]="id"
        [width]="'320px'"
        [height]="'280px'"
        (playerStream)="onReady($event, id)"
        >
</dailymotionplayer>
<input type="button" value="play" (click)="playVideo(id)">
<input type="button" value="pause" (click)="pauseVideo(id)">
```

Just copy the Dailymotion component to your app and implement it as seen
in app.component.html (don't forget to set a video id :) ).

Created with Angular 2 v2.2.1