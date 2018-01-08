import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule  } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';

import { HttpModule } from '@angular/http';

import { ServerService } from './server.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [     
    BrowserModule,
    ReactiveFormsModule,
    ChartsModule,
    HttpModule
  ],
  providers: [ServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
