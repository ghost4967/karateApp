import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService, private themeService: NbThemeService) {
    this.themeService.changeTheme('corporate');
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
  }

}
