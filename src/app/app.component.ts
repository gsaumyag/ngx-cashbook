import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface Entry {
  id?: Number
  title: String
  timestamp: Date
  type: Number
  amount: Number
}

export class CashbookService {
  amount: Number = 0

  records: any = []

  total: any = 0

  constructor(){

    let sample_cashin = {
      id: 1,
      title: "Foo Bar Foo",
      timestamp: new Date(),
      type: 1,
      amount: 100
    }

    let sample_cashout = {
      id: 2,
      title: "Foo",
      timestamp: new Date(),
      type: 0,
      amount: 20
    }

    this.add(sample_cashin)
    this.add(sample_cashout)
  }

  add(entry: Entry){
    entry["id"] = this.records.length+1
    this.records.push(entry)
    this.cal();
  }

  cal(){
    this.total = 0
    for (var e of this.records){
      if (e.type==1){
        this.total += e.amount
      }else{
        this.total -= e.amount
      }
    }
  }
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CashbookService]
})
export class AppComponent implements OnInit{
  // your code here
  constructor(private cashbookService : CashbookService){}

  inputAmount : any = 0;
  inputTitle : string = 'foo';
  showModel : boolean = false;
  records: any = this.cashbookService.records;
  amount: any = this.cashbookService.amount;
  total: any = this.cashbookService.total;


  ngOnInit()
  {
    //Demo
  }

  cashIn()
  {
    let sample_cashin = {
      id: this.records.length+1,
      title: this.inputTitle,
      timestamp: new Date(),
      type: 1,
      amount: this.inputAmount
    }
    this.records.push(sample_cashin);
    this.total = this.total + this.inputAmount;
  }

  cashOut()
  {
    let sample_cashout = {
      id: this.records.length+1,
      title: this.inputTitle,
      timestamp: new Date(),
      type: 0,
      amount: this.inputAmount
    }
    this.records.push(sample_cashout);
    this.total = this.total - this.inputAmount;
  }
}
