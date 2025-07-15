import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ChartData, ChartOptions} from 'chart.js';
import {BaseChartDirective} from 'ng2-charts';
import {SpoofingAttemptService} from '../../service/spoofingAttemptService';
import {SpoofingAttempt} from '../../models/spoofingAttempt';

@Component({
  standalone: true,
  selector: 'app-bar-chart',
  imports: [
    BaseChartDirective
  ],
  templateUrl: './bar-chart.html',
  styleUrl: './bar-chart.scss'
})
export class BarChartComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() attempts: SpoofingAttempt[] = [];
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  // 1) Defino aqui o tipo literal 'bar'
  public barType: 'bar' = 'bar';

  public barLabels: string[] = [];
  public barData: ChartData<'bar'> = {
    labels: this.barLabels,
    datasets: [{
      label: 'Tentativas de Spoofing',
      data: [],
      backgroundColor: 'rgb(54,162,235)',
      borderColor: 'rgb(54,162,235)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(54,162,235,0.8)',
      hoverBorderColor: 'rgba(54,162,235,1)'
    }]
  };
  public barOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'rgb(255,255,255)',
          font: { size: 14, weight: 'bold' }
        }
      }
    },
    scales: {
      x: {
        title: { display: true, text: 'Data', color: 'rgb(255,255,255)', font: { size: 12 } },
        ticks: { color: 'rgb(255,255,255)' },
        grid: { color: 'rgba(255,255,255,0.13)' }
      },
      y: {
        title: { display: true, text: 'Total', color: 'rgb(255,255,255)', font: { size: 12 } },
        ticks: { stepSize: 1, callback: v => String(v), color: 'rgb(255,255,255)' },
        grid: { color: 'rgba(255,255,255,0.13)' }
      }
    }
  };

  ngOnInit(): void {
    this.generateLast7Days();
  }

  ngAfterViewInit(): void {
    this.updateChartData();
    this.chart?.update();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['attempts']) {
      this.updateChartData();
      this.chart?.update();
    }
  }

  private generateLast7Days(): void {
    const hoje = new Date();
    const labels: string[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(hoje);
      d.setDate(hoje.getDate() - i);
      labels.push(
        `${String(d.getDate()).padStart(2,'0')}/` +
        `${String(d.getMonth()+1).padStart(2,'0')}`
      );
    }
    this.barLabels.splice(0, this.barLabels.length, ...labels);
    this.barData.labels = this.barLabels;
  }

  private updateChartData(): void {
    const counts = this.barLabels.map(() => 0);
    this.attempts.forEach(att => {
      const d   = new Date(att.attemptDateHour);
      const key = `${String(d.getDate()).padStart(2,'0')}/` +
        `${String(d.getMonth()+1).padStart(2,'0')}`;
      const idx = this.barLabels.indexOf(key);
      if (idx >= 0) counts[idx]++;
    });
    this.barData.datasets[0].data = counts;
  }
}
