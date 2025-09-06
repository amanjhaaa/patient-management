import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() title = '';
  @Input() userName = '';
  @Output() logout = new EventEmitter<void>();

  currentTitle = '';

  constructor(private router: Router, private route: ActivatedRoute, private location: Location) {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        let r = this.route;
        while (r.firstChild) {
          r = r.firstChild;
        }
        this.currentTitle = (r.snapshot.data && r.snapshot.data['title']) || this.title || '';
      });
  }

  onLogout() {
    this.logout.emit();
  }

  goBack() {
    this.location.back();
  }
}