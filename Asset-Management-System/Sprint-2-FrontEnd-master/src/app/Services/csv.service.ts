import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CSVService {

  constructor() { }

  downloadFile(data, filename = 'data') {

    const { convertArrayToCSV } = require('convert-array-to-csv');
    const header = ["Asset Id", "Name", "Description", "Status"]

    let csvData = convertArrayToCSV(data, {
      header,
      separator: ','
    })

    console.log(csvData)
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

}
