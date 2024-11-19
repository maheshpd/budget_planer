import { Component, inject, Input } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './income.component.html',
  styleUrl: './income.component.css',
})
export class IncomeComponent {
  @Input() masterId: number = 0;
  transcationObj: any = {
    transactionId: 0,
    userId: 0,
    categoryId: 0,
    amount: 0,
    date: '2024-11-18T07:01:55.980Z',
    purpose: '',
    transactionTypeId: 0,
  };

  masterService = inject(MasterService);
  categoryList:any[]=[];
  transcationList:any[]=[];

  constructor(){
    const loggedUser = sessionStorage.getItem('budgetUser');
    if(loggedUser != null) {
      this.transcationObj.userId = JSON.parse(loggedUser).userId
    }
  }

  openModel() {
    this.getCategoryByUser();
    const model = document.getElementById('myModal');
    if (model != null) {
      model.style.display = 'block';
    }
  }

  ngOnInit(): void {
    this.getAllTranscation();
      
  }

  getCategoryByUser(){
    this.masterService.getCategoryByUserId(this.transcationObj.userId).subscribe((res:any)=>{
        this.categoryList = res.data;
    })
  }

  onSave(){
    debugger;
    this.transcationObj.transacationTypeId = this.masterId;
      this.masterService.addNewTranscation(this.transcationObj).subscribe((res:any)=>{
        if(res.result) {
          alert('Item Added Success')
          this.getAllTranscation()
          this.closeModel();
        } else {
          alert(res.message)
        }
      })
  }

  getAllTranscation() {
    this.masterService.GetTranscationByTypeId(this.masterId,this.transcationObj.userId).subscribe((res:any)=>{
      this.transcationList = res.data
    })
  }

  closeModel() {
    const model = document.getElementById('myModal');
    if (model != null) {
      model.style.display = 'none';
    }
  }
}
