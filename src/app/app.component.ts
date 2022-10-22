
import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'Mariam-CSV',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  
  isMultiple :boolean = false;
  isMultipleF(){
    this.isMultiple = true;
  }


  data:any= [];
  head:any=[];
  

   


  onFileChange(e: any) {
    const target : any = e.target;
    

     if (target.files.length !== 1){
        this.isMultipleF();
     }else{
      this.isMultiple = false;

      const reader: FileReader = new FileReader();

      reader.onload = (e: any) => {
  
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
  
        const wsname : string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
  
        const Excel = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
  
        this.data = Excel.slice(1);
        this.head = Excel.at(0);

      };
  
      reader.readAsBinaryString(target.files[0]);
  
     }

  }



}
