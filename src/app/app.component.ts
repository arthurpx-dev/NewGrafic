import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProdutividadeService } from './services/produtividade.service';
import Chart from 'chart.js/auto'; // Import only the Chart class
import { ChartData, ChartOptions } from 'chart.js'; // Import other types separately

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  ctx: any = null;

  data: ChartData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr'],
    datasets: [
      {
        label: 'Bar Dataset',
        data: [10, 20, 30, 40],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgb(0,0,128)',
        type: 'bar',
      },
      {
        label: 'Bar Dataset',
        data: [5, 15, 25, 35],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgb(22,34,254)',
        type: 'bar',
      },
      {
        label: 'Line Dataset',
        data: [13, 25, 35, 50],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'red',
        type: 'line',
      },
    ],
  };

  options: ChartOptions = {};

  mixedChart?: Chart;

  constructor(private produtividadeService: ProdutividadeService) {}

  ngOnInit(): void {
    this.carregarTarefas();
  }

  ngAfterViewInit(): void {
    this.ctx = document.getElementById('myChart');
    this.mixedChart = new Chart(this.ctx, {
      type: 'bar',
      data: this.data,
      options: this.options,
    });
  }

  carregarTarefas(): void {
    this.produtividadeService.obterTodasTarefas().subscribe((tarefas) => {
      console.log(tarefas);
    });
  }
}
