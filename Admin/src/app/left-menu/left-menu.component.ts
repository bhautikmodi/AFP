import { Component, OnInit } from '@angular/core';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
import { RolepermissionService } from '../services/rolepermission.service';
declare var $,PerfectScrollbar: any;
@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {

  menuList;
  
  constructor(private globals: Globals, private router: Router, private RolepermissionService: RolepermissionService) { }

  ngOnInit() {
    alert(this.router.url);
    $(".test company").addClass("selected");
    this.menuList = [];   
    new PerfectScrollbar('.sidebar-collapse');
    this.RolepermissionService.getLeftMenu(this.globals.authData.RoleId)
			.then((data) => 
			{
        this.menuList = data;
        console.log(this.menuList);
      //   setTimeout(function(){        
      //     $('.inner_dropdown').on('click', function(){
      //       $(".nav-second-level").toggleClass("display_block");	
      //     });
      // },100);
        
			},
			(error) => 
			{
				alert('error');
			});	
  }

  addclass(i){
    if(!$("#sel"+i).hasClass("inner_dropdown")){
      $(".test").removeClass("selected");
      $("#sel"+i).addClass("selected");
    }    
      $(".nav-second-level").addClass("display_block");
      var check = $("#nav"+i).parent().hasClass("active");
      $(".nav-second-level").parent().removeClass("active");
      if(check){
        $("#nav"+i).parent().removeClass("active");
      } else {
        $("#nav"+i).parent().addClass("active");
        $("#nav"+i).removeClass("display_block");	
    }   
  }

  addsubclass(i,j){ 
    $(".nav-second-level").addClass("display_block");
    $("#nav"+i).parent().removeClass("active");
    $("#nav"+i).removeClass("display_block");	
    $(".test").removeClass("selected");
    $("#slc"+i+j).addClass("selected");
  }

  dash(){
    $(".nav-second-level").parent().removeClass("active");
    $(".nav-second-level").addClass("display_block");
    $(".test").removeClass("selected");
    $("#dash").addClass("selected");
  }

  menuopen(path){
    this.globals.msgflag = false;	  
    this.globals.currentLink = this.router.url;
    this.router.navigate([path]);
  }

}

