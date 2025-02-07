import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { FetchdriversService } from '../fetchdrivers.service';
import { Driver } from '../driver';

@Component({
  selector: 'app-standings-table',
  templateUrl: './standings-table.component.html',
  styleUrl: './standings-table.component.css'
})
export class StandingsTableComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'nationality', 'team', 'points'];
  drivers: Driver[] = [];
  sortedDrivers: Driver[] = [];  // Sorted list of drivers with positions
  dataSource = new MatTableDataSource<Driver>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Filter string
  filterValue: string = '';

  constructor(private fetchDrivers: FetchdriversService) {}

  ngOnInit(): void {
    this.fetchStandings('2024');
  }

  fetchStandings(year: string)
  {
    this.fetchDrivers.getStandings(year).subscribe(
      (drivers: Driver[]) => {
        console.log(drivers)
        this.drivers = drivers;
        this.dataSource = new MatTableDataSource(this.drivers);
        this.calculateDriverPositions();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        // Custom filter logic for driver name or team
        this.dataSource.filterPredicate = (driver: Driver, filter: string) => {
        const filterValue = filter.toLowerCase();
        const fullName = `${driver.first_name} ${driver.last_name}`.toLowerCase();
        return fullName.includes(filterValue) || driver.season_team_name.toLowerCase().includes(filterValue);
      };
      },
      (error) => {
        console.error('Error fetching standings:', error);
      }
    );
  }

  // Sort drivers by points and assign positions
  calculateDriverPositions(): void {
    // Sort drivers by season points in descending order
    this.sortedDrivers = [...this.drivers].sort((a, b) => b.season_points - a.season_points);

    // Assign position to each driver based on sorted order
    this.sortedDrivers.forEach((driver, index) => {
      driver.position = index + 1;  // Position starts from 1
    });
  }

  // Custom sorting logic
  sortData(sort: Sort): void {
    const data = this.drivers.slice(); // Create a copy of the data array

    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data; // If no sorting active, reset to default
      return;
    }

    // Sort logic for specific columns
    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'points':
          return this.compare(a.season_points, b.season_points, isAsc);
          case 'name':
            return this.compareNames(a.first_name, a.last_name, b.first_name, b.last_name, isAsc);
          case 'team':
            return this.compareStrings(a.season_team_name, b.season_team_name, isAsc);
        default:
          return 0;
      }
    });
  }

  // Compare function for sorting
  compare(a: number, b: number, isAsc: boolean): number {
    return (a - b) * (isAsc ? 1 : -1);
  }

  // Compare function for names (alphabetical)
  compareNames(firstNameA: string, lastNameA: string, firstNameB: string, lastNameB: string, isAsc: boolean): number {
    const nameA = `${firstNameA} ${lastNameA}`;
    const nameB = `${firstNameB} ${lastNameB}`;
    return this.compareStrings(nameA, nameB, isAsc);
  }

  // Compare function for strings (e.g., team names)
  compareStrings(a: string, b: string, isAsc: boolean): number {
    const comparison = a.localeCompare(b);
    return isAsc ? comparison : -comparison;
  }

  getRowClass(driver: any) {
    return driver.position % 2 === 0 ? 'even-row' : 'odd-row';
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
}
