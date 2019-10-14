import { Component, OnInit, OnDestroy } from '@angular/core';
import { WikiService } from '../services/wiki.service';
import { AchievementDetails, Achievement } from '../models/achievement';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.scss']
})
export class DailyComponent implements OnInit, OnDestroy {
  public achievements: AchievementDetails[];
  public tomorrow: AchievementDetails[];
  public subs: Subscription[] = [];

  constructor(private wikiService: WikiService) { }

  ngOnInit(): void {
    this.downloadAchievements();
  }

  private downloadAchievements(): void {
    let filter = (arr: Achievement[]) => arr.filter(y=>y.level.max === 80).map(y=>y.id)

    var f2: Subscription;
    let f1 = this.wikiService.getTodayAchievements().subscribe(x => {
      let ids = filter(x.pve).concat(filter(x.wvw));
      f2 = this.wikiService.getAchievementsDetails(ids).subscribe(y=>{
        this.achievements = y;
      });
    });

    var f4: Subscription;
    let f3 = this.wikiService.getTomorrowAchievements().subscribe(x => {
      let ids = filter(x.pve).concat(filter(x.wvw));
      f2 = this.wikiService.getAchievementsDetails(ids).subscribe(y=>{
        this.tomorrow = y;
      });
    });

    this.subs.push(f1, f2, f3, f4);
  }

  ngOnDestroy(): void {
    this.subs.forEach(x=>x.unsubscribe());
  }

}
