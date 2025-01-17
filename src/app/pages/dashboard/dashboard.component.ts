import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  masterService = inject(MasterService);

  fromDate:string ='';
  toDate:string = '';
  loggedUserId:number=0;
  dashBoardData:any;

  ngOnInit(): void {
    const loggedUser = sessionStorage.getItem('budgetUser');
    if(loggedUser != null) {
      this.loggedUserId = JSON.parse(loggedUser).userId;
    }
  }

  getDashboardData(){
    this.masterService.GetDashboardData(this.loggedUserId,this.fromDate,this.toDate).subscribe((res:any)=>{
      this.dashBoardData = res.data[0]
    })
  }

}
