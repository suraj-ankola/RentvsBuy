import { Component, ViewChild, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ServerService } from './server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;


  constructor(private serverService: ServerService){}

  servers : any[] = [{CityName : 0,Pincode : 0,PropertyCost : 0,LoanAmount : 0,LoanInterest : 0,RentPaid : 0}];

  city:string;
  pin:number;
  tax:number[]=[10,20,30];

  // Paymatrix rent vs buy suggests message
  msg_year: number=9;
  firstDecision: string = "Rent";
  secondDecision: string = "Buy";


  CP  :number = 5000000; 
  LA  :number = 3500000; 
  LI_P:number = 9;//Percentage
  LY  :number = 10; 
  RP  :number = 15000;  
  RA_P:number = 3;//Percentage
  PA_P:number = 3;//Percentage
  MA  :number = 2000; 
  SD  :number = 100000;  
  PT_P:number = 1.25;//Percentage
  SR_P:number = 4;//Percentage
  IT_P:number = 20;//Percentage
  GI  :number = 2 / 100;//Percentage    

  LI  :number = 0;
  RA  :number = 0;
  PA  :number = 0;
  PT  :number = 0;
  SR  :number = 0;
  IT  :number = 0;

  YY  :number[]=[];
  MM  :number[]=[];

  DPA01  :number=0;
  EMI02  :number=0;
  HOV03  :number[]=[];
  PRE04  :number[]=[];
  PPD05  :number[]=[];
  IPD06  :number[]=[];
  DPR07  :number[]=[];
  ECR08  :number[]=[];
  MAS09  :number[]=[];
  PAS10  :number[]=[];
  ITS11  :number[]=[];
  BTC12  :number[]=[];
  RAS13  :number[]=[];
  ISD14  :number[]=[];
  DSL15  :number[]=[];
  SWR16  :number[]=[];
  BOR17  :number[]=[];
  SWB18  :number[]=[];

  // lineChart
  public currentTime = new Date();

  public  year = this.currentTime.getFullYear();

  public lineChartData:Array<any> = [  
  {data: [421912,846973,1275566,1708117,2145089,2586993,3034387,3487887,3948166,4415960], label: 'Rent'},  
  {data: [319180,661758,1029763,1425415,1851135,2309569,2803607,3336408,3911421,4532416], label: 'Buy'} ];


  public lineChartLabels:number[] = [2017,2018,2019,2020,2021,2022,2023,2024,2025,2026];

  public lineChartOptions:any = {responsive: true};

  public lineChartColors:Array<any> = [
  { // Blue Rent
    backgroundColor: 'rgba(0,113,188,0.1)',
    borderColor: 'rgba(0,113,188,1)',
    pointBackgroundColor: 'rgba(0,113,188,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(0,113,188,1)'    
  },
  { // Green Buy
    backgroundColor: 'rgba(18,153,29,0.1)',
    borderColor: 'rgba(18,153,29,1)',
    pointBackgroundColor: 'rgba(18,153,29,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(18,153,29,1)'
  }
  ];
  public lineChartLegend:boolean = true;

  public lineChartType:string = 'line';


  leftUserInput: FormGroup;
  rightUserInput: FormGroup;

  ngOnInit(){
    this.leftUserInput = new FormGroup({
      'cityname' : new FormControl(null, [Validators.required, Validators.minLength(2),Validators.pattern('[A-Za-z]+')]),
      'pincode' : new FormControl(null, [Validators.required,Validators.pattern('^[1-9][0-9]{5}$'), Validators.minLength(6), Validators.maxLength(6)]),
      'propertyCost' : new FormControl(null, [Validators.required, Validators.min(500000), Validators.max(100000000)]),
      'loanAmount' : new FormControl(null, [Validators.required, Validators.min(50000), Validators.max(100000000)]),
      'loanInterest' : new FormControl(null, [Validators.required,Validators.min(7), Validators.max(15)]),
      'loanTerm' : new FormControl(null, [Validators.required, Validators.min(5), Validators.max(35)]),
      'rentPaid' : new FormControl(null, [Validators.required, Validators.min(1000), Validators.max(2000000)])
    });

    this.rightUserInput = new FormGroup({
      'rentalappreciation' : new FormControl(null, Validators.required),
      'propertyappreciation' : new FormControl(null, Validators.required),
      'montlymtance' : new FormControl(null, [Validators.required, Validators.min(1000), Validators.max(2000000)]),
      'securitydeposit' : new FormControl(null, [Validators.required, Validators.min(1000), Validators.max(2000000)]),
      'propertytax' : new FormControl(null, [Validators.required, Validators.min(0), Validators.max(10)]),
      'savingsrate' : new FormControl(null, [Validators.required, Validators.min(4), Validators.max(50)]),
      'incometax' : new FormControl(null, Validators.required)
    });

    this.percentage_convert();
    this.LI = this.LI_P / 100;  this.date_initialize();
    this.DPA01_function();    this.EMI02_function();    this.HOV03_function();    this.PRE04_function();    this.PPD05_function();
    this.IPD06_function();    this.DPR07_function();    this.ECR08_function();    this.MAS09_function();    this.PAS10_function();
    this.ITS11_function();    this.BTC12_function();    this.RAS13_function();    this.ISD14_function();    this.DSL15_function();
  

  }
   onSubmit(){

  }

  form_function(){

    this.servers.push({
      CityName : this.city,
      Pincode : this.pin,
      PropertyCost : this.CP,
      LoanAmount : this.LA,
      LoanInterest : this.LI_P,
      RentPaid : this.RP
    });

    // Http request
    this.serverService.storeServers(this.servers).subscribe(
      // (response) => console.log(response),
      // (error) => console.log(error)
      );
    
    this.LI = this.LI_P / 100;  this.date_initialize();
    this.DPA01_function();    this.EMI02_function();    this.HOV03_function();    this.PRE04_function();    this.PPD05_function();
    this.IPD06_function();    this.DPR07_function();    this.ECR08_function();    this.MAS09_function();    this.PAS10_function();
    this.ITS11_function();    this.BTC12_function();    this.RAS13_function();    this.ISD14_function();    this.DSL15_function();
    this.SWR16_function();    this.BOR17_function();    this.SWB18_function();
  }

  RA_function(){
    this.RA = this.RA_P / 100;
    this.RAS13_function();    this.SWR16_function();    this.BOR17_function();    this.SWB18_function();
  }

  PA_function(){
    this.PA = this.PA_P / 100;
    this.HOV03_function();    this.ECR08_function();    this.PAS10_function();    this.ITS11_function();    this.BTC12_function();    
    this.SWR16_function();    this.BOR17_function();    this.SWB18_function();
  }

  MA_function(){
    this.MAS09_function();    this.BTC12_function();    this.SWR16_function();    this.BOR17_function();    this.SWB18_function();
  }

  SD_function(){
    this.ISD14_function();    this.SWR16_function();    this.BOR17_function();    this.SWB18_function();
  }

  PT_function(){
    this.PT = this.PT_P / 100;
    this.PAS10_function();    this.ITS11_function();    this.BTC12_function();    this.SWR16_function();    this.BOR17_function();    
    this.SWB18_function();
  }

  SR_function(){
    this.SR = this.SR_P / 100;
    this.ISD14_function();    this.DSL15_function();    this.SWR16_function();    this.BOR17_function();    this.SWB18_function();
  }

  IT_function(){
    this.IT = this.IT_P / 100;
    this.ITS11_function();    this.BTC12_function();    this.SWR16_function();    this.BOR17_function();    this.SWB18_function();
  }

  percentage_convert(){
    this.LI = this.LI_P / 100;    this.RA = this.RA_P / 100;    this.PA = this.PA_P / 100;    this.PT = this.PT_P / 100;
    this.SR = this.SR_P / 100;    this.IT = this.IT_P / 100;
  }

  date_initialize(){for(let i=0; i<=this.LY;i++){this.YY[i]=i;this.MM[i]=i*12;}}

  DPA01_function(){this.DPA01=this.CP - this.LA;}
  EMI02_function(){this.EMI02=this.LA/((1-(Math.pow(1+(this.LI/12),-this.LY*12)))/(this.LI/12));}
  HOV03_function(){this.HOV03[0]=this.CP;for(let i=1;i<=this.LY;i++){this.HOV03[i]=this.CP*(Math.pow((1+this.PA),this.YY[i]))}}  
  PRE04_function(){for(let i=1;i<=this.LY;i++){this.PRE04[i]=this.EMI02*(1-(Math.pow(1+(this.LI/12),-((this.LY*12)-this.MM[i]))))/(this.LI/12);}} 
  PPD05_function(){for(let i=1;i<=this.LY;i++){this.PPD05[i]=this.LA-this.PRE04[i];}}
  IPD06_function(){for(let i=1;i<=this.LY;i++){this.IPD06[i]=(this.EMI02*this.MM[i])-this.PPD05[i];}}
  DPR07_function(){for(let i=1;i<=this.LY;i++){this.DPR07[i]=this.LA-this.PPD05[i];} }
  ECR08_function(){for(let i=1;i<=this.LY;i++){this.ECR08[i]=this.HOV03[i]-this.DPR07[i]-this.DPA01;}}
  MAS09_function(){this.MAS09[0]=0; for(let i=1;i<=this.LY;i++){this.MAS09[i]=this.MAS09[i-1]+(this.MA*(Math.pow((1+this.GI),this.YY[i-1]))*12);}}
  PAS10_function(){this.PAS10[0]=0; for(let i=1;i<=this.LY;i++){this.PAS10[i]=this.PAS10[i-1]+(this.HOV03[i-1]*this.PT);}}
  ITS11_function(){for(let i=1;i<=this.LY;i++){this.ITS11[i]=(this.IPD06[i]+this.PAS10[i])*this.IT;}}
  BTC12_function(){for(let i=1;i<=this.LY;i++){this.BTC12[i]=this.EMI02*this.MM[i]+this.MAS09[i]+this.PAS10[i]-this.ITS11[i];}}
  RAS13_function(){this.RAS13[0]=0; for(let i=1;i<=this.LY;i++){this.RAS13[i]=this.RAS13[i-1]+((this.RP*(Math.pow((1+this.RA),this.YY[i-1])))*12);}}
  ISD14_function(){for(let i=1;i<=this.LY;i++){this.ISD14[i]=this.SD*((Math.pow((1+(this.SR/12)),this.MM[i]))-1);}}
  DSL15_function(){for(let i=1;i<=this.LY;i++){this.DSL15[i]=this.DPA01*((Math.pow((1+(this.SR/12)),this.MM[i]))-1);}}
  SWR16_function(){for(let i=1;i<=this.LY;i++){this.SWR16[i]=(this.DSL15[i]+this.BTC12[i])-(this.RAS13[i]+this.ISD14[i]);}}
  BOR17_function(){for(let i=1;i<=this.LY;i++){this.BOR17[i]=this.ECR08[i]-this.SWR16[i];}}
  SWB18_function(){for(let i=1;i<=this.LY;i++){this.SWB18[i]=this.ECR08[i]+this.ISD14[i]-this.DSL15[i];}this.update_chart();this.update_msg();}

  public update_msg():void{
    var RentCount=0;
    var BuyCount=0;
    var Count=0;
    var booleanValue;
    var booleanLoopValue

    if(this.SWR16[1] > this.SWB18[1]){

      for(let i=1;i<=this.LY;i++){

        if((this.SWR16[i] > this.SWB18[i])){
          Count++;
        }
        else{
          break;
        }
      }
      this.msg_year=Count;
      this.firstDecision= "Rent";
      this.secondDecision= "Buy";
    }
    else
    {
      for(let i=1;i<=this.LY;i++){

        if((this.SWR16[i] < this.SWB18[i])){
          Count++;
        }
        else{
          break;
        }
      }
      this.msg_year=Count;
      this.firstDecision= "Buy";
      this.secondDecision= "Rent";
    }  
  }


  // linechart dynamic function  
  public update_chart():void {

    let data_rent = [];
    let data_buy = [];        
    this.lineChartLabels.length=0;

    for(let j=0; j< this.LY; j++)
    {
      data_rent[j]=Math.round(this.SWR16[j+1]);
      data_buy[j]=Math.round(this.SWB18[j+1]);
      this.lineChartLabels.push(this.year + j);
    }      

    let clone = JSON.parse(JSON.stringify(this.lineChartData));
    clone[0].data = data_rent;
    clone[1].data = data_buy;
    this.lineChartData = clone;
  }

  active:boolean=false;

  /*Side nav hide and show funcations*/
  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    this.active=true;
  }
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    this.active=false;
  }
}
