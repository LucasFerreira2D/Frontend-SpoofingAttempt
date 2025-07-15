import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {SpoofingAttempt} from '../../models/spoofingAttempt';
import {BaseChartDirective} from 'ng2-charts';
import {ChartData, ChartOptions, ChartType} from 'chart.js';
import {MatCard, MatCardTitle} from '@angular/material/card';

@Component({
  selector: 'app-radar-chart',
  imports: [
    MatCard,
    BaseChartDirective,
    MatCardTitle
  ],
  templateUrl: './radar-chart.html',
  styleUrl: './radar-chart.scss'
})
export class RadarChartComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() attempts: SpoofingAttempt[] = [];
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public radarType: 'radar' = 'radar';

  public radarLabels: string[] = [];
  public radarData: ChartData<'radar'> = {
    labels: this.radarLabels,
    datasets: [{
      label: 'Tentativas',
      data: [],
      backgroundColor: 'rgba(54,162,235,0.4)',
      borderColor: 'rgb(54,162,235)',
      pointBackgroundColor: 'rgb(54,162,235)'
    }]
  };
  public radarOptions: ChartOptions<'radar'> = {
    responsive: true,
    scales: {
      r: {
        angleLines: { color: 'rgba(255,255,255,0.2)' },
        grid:       { color: 'rgba(255,255,255,0.13)' },
        pointLabels:{ color: '#fff' },
        ticks:      { stepSize: 1, color: '#fff' }
      }
    },
    plugins: {
      legend: {
        labels: { color: '#fff' }
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
        `${String(d.getMonth() + 1).padStart(2,'0')}`
      );
    }
    this.radarLabels.splice(0, this.radarLabels.length, ...labels);
    this.radarData.labels = this.radarLabels;
  }

  private updateChartData(): void {
    const counts = this.radarLabels.map(() => 0);

    this.attempts.forEach(att => {
      const d   = new Date(att.attemptDateHour);
      const key = `${String(d.getDate()).padStart(2,'0')}/` +
        `${String(d.getMonth() + 1).padStart(2,'0')}`;
      const idx = this.radarLabels.indexOf(key);
      if (idx >= 0) counts[idx]++;
    });

    this.radarData.datasets[0].data = counts;
  }
}
