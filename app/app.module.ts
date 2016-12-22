import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

import { DailymotionplayerComponent } from './dailymotionplayer/dailymotionplayer.component';
import { DailymotionApiService } from "./dailymotionplayer/dailymotion-api.service";

@NgModule({
  declarations: [
    AppComponent,
    DailymotionplayerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [DailymotionApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
