// mychart.component.ts
import { Component, OnInit } from '@angular/core';
import { Chart, registerables, ChartType } from 'chart.js';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-mychart',
  templateUrl: './mychart.component.html',
  styleUrl: './mychart.component.scss', // Alterado para 'styleUrls'
})
export class MychartComponent implements OnInit {
  constructor(private service: ServicesService) {}

  chartdata: any;
  labeldata: any[] = [];
  realdata: any[] = [];
  colordata: any[] = [];

  ngOnInit(): void {
    this.service.Getchartinfo().subscribe((result) => {
      this.chartdata = result;
      if (this.chartdata != null) {
        for (let i = 0; i < this.chartdata.length; i++) {
          // console.log(this.chartdata[i]);
          this.labeldata.push(this.chartdata[i].year);
          this.realdata.push(this.chartdata[i].amount);
          this.colordata.push(this.chartdata[i].colorcode);
        }
        this.RenderChart(
          this.labeldata,
          this.realdata,
          this.colordata,
          'bar',
          'barchart'
        );
        this.RenderChart(
          this.labeldata,
          this.realdata,
          this.colordata,
          'pie',
          'piechart'
        );
        this.RenderChart(
          this.labeldata,
          this.realdata,
          this.colordata,
          'doughnut',
          'dochart'
        );
        this.RenderChart(
          this.labeldata,
          this.realdata,
          this.colordata,
          'polarArea',
          'pochart'
        );
        this.RenderChart(
          this.labeldata,
          this.realdata,
          this.colordata,
          'radar',
          'rochart'
        );
        this.RenderChart(
          this.labeldata,
          this.realdata,
          this.colordata,
          'Scatter',
          'Scattechart'
        );
      }
    });
  }

  RenderChart(
    labeldata: any,
    maindata: any,
    colordata: any,
    type: any,
    id: any
  ) {
    const myChart = new Chart(id, {
      type: type,
      data: {
        labels: labeldata,
        datasets: [
          {
            label: '# of Votes',
            data: maindata,
            backgroundColor: colordata,
            // backgroundColor: [
            //   'rgba(255,99,132,0.2)',
            //   'rgba(54,162,235,0.2)',
            //   'rgba(255,206,86,0.2)',
            //   'rgba(75,192,192,0.2)',
            //   'rgba(153,102,255,0.2)',
            //   'rgba(255,159,64,0.2)',
            // ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54,162,235,1)',
              'rgba(255,206,86,1)',
              'rgba(75,192,192,1)',
              'rgba(153,102,255,1)',
              'rgba(255,159,64,1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        // responsive: true,
        // maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
