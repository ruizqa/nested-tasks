import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NestedComponentComponent } from './nested-component/nested-component.component';

@NgModule({
  declarations: [
    AppComponent,
    NestedComponentComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,
    FormsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule {
  title = 'app';
  constructor(private _httpService: HttpService){}
 }
