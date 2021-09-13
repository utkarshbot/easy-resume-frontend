import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  option1 :AnimationOptions = {
    // path:'https://assets6.lottiefiles.com/packages/lf20_sk5h1kfn.json'
    path:'https://assets9.lottiefiles.com/packages/lf20_cvl6inw9.json'
  }
  option2 :AnimationOptions = {
    path:'https://assets5.lottiefiles.com/packages/lf20_qu4nyriu.json'
  }
  constructor() { }

  ngOnInit(): void {
  }

}
