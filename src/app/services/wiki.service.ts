import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { DailyAchievementResponse, AchievementDetails } from '../models/achievement';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WikiService {
  

  constructor(private httpClient: HttpClient) { }

  public getTodayAchievements(): Observable<DailyAchievementResponse> {
    return this.httpClient.get<DailyAchievementResponse>('https://api.guildwars2.com/v2/achievements/daily');
  }

  public getTomorrowAchievements(): Observable<DailyAchievementResponse> {
    return this.httpClient.get<DailyAchievementResponse>('https://api.guildwars2.com/v2/achievements/daily/tomorrow');
  }

  public getAchievementsDetails(ids: number[]): Observable<AchievementDetails[]> {
    return this.httpClient.get<AchievementDetails[]>('https://api.guildwars2.com/v2/achievements?ids=' + ids.join(','));
  }
}
