import {Component} from '@angular/core';
import { filter } from 'rxjs/operators';
import {Event, NavigationEnd, Router, RouterLink, RouterOutlet} from '@angular/router';
import {CommonModule} from "@angular/common";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, NgbModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'wellness-tracker';

  currentRoute: string = '/dashboard';

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event: Event | NavigationEnd): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.url;
    });
  }


  isActive(route: string): boolean {
    return this.currentRoute === route;
  }

}
