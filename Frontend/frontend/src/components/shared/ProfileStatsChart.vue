<template>
  <div>
    <Pie :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { Pie } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

export default {
  name: 'ProfileStatsChart',
  components: { Pie },
  props: ['stats'],
  computed: {
    chartData() {
      return {
        labels: ['Létrehozott', 'Módosított', 'Kommentek', 'Értékelések'],
        datasets: [
          {
            label: 'Aktivitás',
            backgroundColor: ['#007bff', '#28a745', '#ffc107', '#dc3545'],
            data: [
              this.stats.letrehozott,
              this.stats.modositott,
              this.stats.kommentek,
              this.stats.ertekelesek
            ]
          }
        ]
      };
    },
    chartOptions() {
      return {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          },
          title: {
            display: true,
            text: 'Felhasználói aktivitás'
          }
        }
      };
    }
  }
};
</script>
