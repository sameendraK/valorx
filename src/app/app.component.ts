import { Component, ViewChild } from '@angular/core';
import { ApiService } from './services/api.service';
import { debounceTime, distinctUntilChanged, fromEvent, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'valorx';
  constructor(
    private apiService: ApiService
  ) { }

  apiData: any;

  // @ViewChild('inputEle')
  // inputEle: String | undefined

  ngOnInit() {
    // this.apiService.fetch().subscribe((res) => {
    //   this.apiData = res;
    // })
    //NOTE: MODIFIED FOR SINGLE API CALL 
    const inputElement: any = document.querySelector('.inputText');
    fromEvent(inputElement, 'input').pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.apiService.fetch(inputElement.value))
    ).subscribe((res: any) => {
      this.apiData = res.items;
    });
  }

  ngOnChanges() {
    // this.inputEle.focu
  }

  searchText: string = '';

  //NOTE: THIS IS OLD CODE WHERE MULTIPLE API CALLS ARE GOING
  // inputChangeHanlder(event: any) {
  //   const inputElement: any = document.querySelector('.inputText');
  //   fromEvent(inputElement, 'input').pipe(
  //     debounceTime(1000),
  //   ).subscribe((res: any) => {
  //     this.searchText = event.target.value;
  //     this.fetchData();
  //     console.log(res);
  //   })
  //   // console.log(inputElement);
  // }
  // fetchData() {
  //   this.apiService.fetch(this.searchText).subscribe((res: any) => {
  //     this.apiData = res.items;
  //     // console.log(this.apiData)
  //   })
  // }

  showUserDetails: boolean = false;
  userDetails: any;
  loginHanlder(data: any) {
    this.apiService.fetchUrl(data).subscribe((res) => {
      this.userDetails = res;
      this.showUserDetails = true;
      console.log(res)
    })
    // console.log(data);
  }

  fetchDetails(data: string) {
    this.apiService.fetchUrl(data).subscribe((res) => {
      this.userDetails = res;
      this.showUserDetails = true;
      console.log(res)
    })
  }

}
