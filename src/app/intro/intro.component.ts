import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  showIntro: boolean = true;


  ngOnInit(): void {
    setTimeout(() => {
      this.showIntro = false;
    }, 2500);
  }



}
