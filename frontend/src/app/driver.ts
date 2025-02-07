export class Driver {
    constructor(
      public position: number,
      public driver_uuid: string,
      public first_name: string,
      public last_name: string,
      public driver_country_code: string,
      public season_team_name: string,
      public season_points: number
    ) {}
  
    getfullName(): string {
      return `${this.first_name} ${this.last_name}`;
    }
  }
  