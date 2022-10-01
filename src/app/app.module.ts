import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { routing } from './app.routes';

import { AppComponent } from './app.component';
import { ListComponent, PinComponent, DailyComponent, WeeklyComponent, MonthlyComponent, OthersComponent, YearlyComponent, SearchComponent } from './components/list/list.component';
import { NullComponent, DetailComponent } from './components/detail/detail.component';
import { ChartComponent } from './components/chart/chart.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { QuestService } from './service/quest.service';
import { CategoryIconURLPipe, TermIconURLPipe, CompositionNamePipe, CompositionBannerURLPipe, BonusItemClassPipe, BonusItemIconURLPipe, BonusItemNamePipe, BonusItemQuantityPipe, BonusItemImprovementPipe } from './define/assets.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    PinComponent,
    DailyComponent,
    WeeklyComponent,
    MonthlyComponent,
    OthersComponent,
    YearlyComponent,
    SearchComponent,
    NullComponent,
    DetailComponent,
    ChartComponent,
    SearchFormComponent,
    CategoryIconURLPipe,
    TermIconURLPipe,
    CompositionNamePipe,
    CompositionBannerURLPipe,
    BonusItemClassPipe,
    BonusItemIconURLPipe,
    BonusItemNamePipe,
    BonusItemImprovementPipe,
    BonusItemQuantityPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    routing
  ],
  providers: [QuestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
