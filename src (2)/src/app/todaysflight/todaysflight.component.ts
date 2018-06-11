import { Component, OnInit } from '@angular/core';
import { ElementRef } from '@angular/core';
declare var $;


@Component({
  selector: 'app-todaysflight',
  templateUrl: './todaysflight.component.html',
  styleUrls: ['./todaysflight.component.css']
})
export class TodaysflightComponent implements OnInit {

  constructor(private elref: ElementRef) { }

  ngOnInit() {
    $(document).ready(function(){
      let owl = $('.owl-carousel');
      owl.owlCarousel();
      $('#customPrevBtn').click(function() {
        owl.trigger('next.owl.carousel', [500]);
      })
// Go to the previous item
      $('#customNextBtn').click(function() {
        // With optional speed parameter
        // Parameters has to be in square bracket '[]'
        owl.trigger('prev.owl.carousel', [500]);
      })
    });
  }

}
