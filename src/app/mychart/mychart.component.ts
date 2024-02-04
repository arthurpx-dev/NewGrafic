// mychart.component.ts
import { Component, OnInit } from '@angular/core';
import { Chart, registerables, ChartType } from 'chart.js';
import { ServicesService } from '../services/services.service';
import { AuthService } from '../services/auth.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-mychart',
  templateUrl: './mychart.component.html',
  styleUrl: './mychart.component.scss',
})
export class MychartComponent implements OnInit {
  constructor(
    private service: ServicesService,
    public authService: AuthService,
    private autheticationService: AuthenticationService
  ) {}

  chartdata: any;
  data: any[] = [];
  doc1: any = [];
  doc2: any[] = [];

  private docAssAmounts: number[] = [];
  private docEnAmounts: number[] = [];

  get docAssinados(): number[] {
    return this.docAssAmounts;
  }

  get docEnviados(): number[] {
    return this.docEnAmounts;
  }

  get loggedInUser() {
    return this.authService.loggedInUser;
  }
  private filtrarDados(): void {
    for (let i = 0; i < this.data.length; i++) {
      const year = this.data[i];
      const docAssAmount = this.chartdata
        .filter((item: any) => item.year === year && item.colorcode === 'DOC_ASS')
        .reduce((total: number, item: any) => total + item.amount, 0);

      const docEnAmount = this.chartdata
        .filter((item: any) => item.year === year && item.colorcode !== 'DOC_ASS')
        .reduce((total: number, item: any) => total + item.amount, 0);

      this.docAssAmounts.push(docAssAmount);
      this.docEnAmounts.push(docEnAmount);
    }
  }

  ngOnInit(): void {
    if (this.authService.isUserAuthenticated()) {
      this.autheticationService.getUserSales().subscribe((result: any[]) => {
        this.chartdata = result;
        if (this.chartdata != null) {
          // Extrair anos únicos e ordená-los
          const uniqueYears: number[] = Array.from(
            new Set(this.chartdata.map((item: any) => item.year))
          );
          this.data = uniqueYears.sort((a, b) => a - b);

          // Usar o método privado para filtrar dados
          this.filtrarDados();

          console.log(this.docAssinados);
          console.log(this.docEnviados);

          this.RenderChart(this.data, this.docAssAmounts, this.docEnAmounts, 'bar', 'barchart');
        }
      });
    }
  }

  RenderChart(
    labeldata: any,
    colordata: any,
    colordata2: any,
    type: any,
    id: any
  ) {
    const myChart = new Chart(id, {
      type: type,
      data: {
        labels: labeldata,
        datasets: [
          {
            label: 'Documentos Assinados',
            data: colordata,
            backgroundColor: 'blue',
          },
          {
            label: 'Documentos Enviados',
            data: colordata2,
            backgroundColor: 'red',
          },
          {
            label: 'Line Dataset',
            data: [1000, 2000, 4000, 10000],
            type: 'line',
            order: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
