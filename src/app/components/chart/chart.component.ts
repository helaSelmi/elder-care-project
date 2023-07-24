import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js'
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  // users: any;
  // role: any = [];
  // carers: any;
  // clients: any;
  // doughnutChartData: [66, 100]
  // doughnutChartLabels = ["Carers", "Clients"];
  // doughnutChartType = 'doughnut'
  confirmedClients:any=[];
  x:any;
  y:any;
  z:any;
  public doughnutChartLabels=['ConfirmedClient','ConfirmedCarer','ConfirmedAdmin' ];
   public doughnutChartData=[];
  public doughnutChartType='doughnut'

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getChartUsers().subscribe((data) => {
     
this.x=data.roleCounts.admin

this.y=data.roleCounts.client
this.z=data.roleCounts.Carer


    })

  
  }
  // usersChar(data: any) {
  //   var myChart = new Chart("canvas", {
  //     type: 'pie',
  //     data: {
  //       labels: ['Carer', 'client', 'admin'],
  //       datasets: [{
  //         label: '# of Votes',
  //         data: data,
  //         backgroundColor: [
  //           'rgba(255, 99, 132, 0.2)',
  //           'rgba(54, 162, 235, 0.2)',
  //           // 'rgba(255, 206, 86, 0.2)',
  //           // 'rgba(75, 192, 192, 0.2)',
  //           // 'rgba(153, 102, 255, 0.2)',
  //           // 'rgba(255, 159, 64, 0.2)'
  //         ],
  //         borderColor: [
  //           'rgba(255,99,132,1)',
  //           'rgba(54, 162, 235, 1)',
  //           // 'rgba(255, 206, 86, 1)',
  //           // 'rgba(75, 192, 192, 1)',
  //           // 'rgba(153, 102, 255, 1)',
  //           // 'rgba(255, 159, 64, 1)'
  //         ],
  //         borderWidth: 1
  //       }]
  //     },
  //   });
  // }


}
