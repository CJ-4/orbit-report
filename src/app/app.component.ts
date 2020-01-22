import { Component } from '@angular/core';
import { Satellite } from './satellite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'orbit-report';
}
class sourceList{
sourceList: Satellite[];
displayList: Satellite[];


constructor() {
  this.sourceList = [];
  let satellitesUrl = 'https://handlers.education.launchcode.org/static/satellites.json';
  window.fetch(satellitesUrl).then(function(response) {
     response.json().then(function(data) {
        let satData = data.satellites;
        let satellite = {};
        for (let i = 0; i<satData.length; i++){
          satellite = new Satellite(satData[i].name, satData[i].type, satData[i].orbitType, satData[i].operational);
          this.sourceList.push(satellite);
        
        }
        this.displayList = this.sourceList.slice(0);
     }.bind(this));
  }.bind(this));  


}
  search(searchTerm: string): void {
    let same: Satellite[] = [];
    searchTerm = searchTerm.toLowerCase();
    for(let i = 0; i < this.sourceList.length; i++) {
       let name = this.sourceList[i].toLowerCase();
       if (name.indexOf(searchTerm) >= 0) {
          same.push(this.sourceList[i]);
       }
    }
    this.displayList = same;
 }

}
