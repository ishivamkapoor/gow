import { Component, OnInit } from '@angular/core';
declare var $;


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
  var $content = $(".content").hide();
  $(".toggle").on("click", function(e){
    $(this).toggleClass("expanded");
    $content.slideToggle();
  });
});
  }

}
