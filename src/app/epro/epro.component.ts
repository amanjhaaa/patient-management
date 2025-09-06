import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-epro',
  imports: [CommonModule],
  templateUrl: './epro.component.html',
  styleUrl: './epro.component.css'
})
export class EproComponent implements OnInit {
  patientId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.patientId = params.get('patientId') || null;
      console.log('Patient ID received:', this.patientId);
    });
  }
}
