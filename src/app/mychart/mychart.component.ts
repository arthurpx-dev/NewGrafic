
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ServicesService } from '../services/services.service';
import { AuthService } from '../services/auth.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-mychart',
  templateUrl: './mychart.component.html',
  styleUrls: ['./mychart.component.scss'],
})
export class MychartComponent implements OnInit {
  chartdata: any;
  data: number[] = [];
  doc1: any = [];
  doc2: any[] = [];

  private docAssAmounts: number[] = [];
  private docEnAmounts: number[] = [];

  constructor(
    private service: ServicesService,
    public authService: AuthService,
    private authenticationService: AuthenticationService
  ) {}

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
    this.data = this.data.map((year) => {
      const docAssAmount = this.chartdata
        .filter((item: any) => item.year === year && item.colorcode === 'DOC_ASS')
        .reduce((total: number, item: any) => total + item.amount, 0);

      const docEnAmount = this.chartdata
        .filter((item: any) => item.year === year && item.colorcode !== 'DOC_ASS')
        .reduce((total: number, item: any) => total + item.amount, 0);

      this.docAssAmounts.push(docAssAmount);
      this.docEnAmounts.push(docEnAmount);

      return year;
    });
  }

  ngOnInit(): void {
    if (this.authService.isUserAuthenticated()) {
      const loggedInUser = this.authenticationService.loggedInUser;

      if (loggedInUser) {
        this.service.getChartDataByUserId(loggedInUser.id).subscribe((result: any[]) => {
          this.chartdata = result;

          if (this.chartdata != null) {this.data = (Array.from(new Set(this.chartdata.map((item: any) => item.year))) as number[]).sort((a, b) => a - b);

            

            this.filtrarDados();

            console.log(this.docAssinados);
            console.log(this.docEnviados);

            this.RenderChart(
              this.data,
              this.docAssAmounts,
              this.docEnAmounts,
              'bar',
              'barchart'
            );
          }
        });
      }
    }
  }



  // ngOnInit(): void {
  //   if (this.authService.isUserAuthenticated()) {
  //     this.autheticationService.getUserSales().subscribe((result: any[]) => {
  //       this.chartdata = result;
  //       if (this.chartdata != null) {
  //         // Extrair anos únicos e ordená-los
  //         const uniqueYears: number[] = Array.from(
  //           new Set(this.chartdata.map((item: any) => item.year))
  //         );
  //         this.data = uniqueYears.sort((a, b) => a - b);

  //         // Usar o método privado para filtrar dados
  //         this.filtrarDados();

  //         console.log(this.docAssinados);
  //         console.log(this.docEnviados);

  //         this.RenderChart(this.data, this.docAssAmounts, this.docEnAmounts, 'bar', 'barchart');
  //       }
  //     });
  //   }
  // }

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
            order: 2,
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
