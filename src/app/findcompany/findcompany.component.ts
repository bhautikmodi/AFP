import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FindcompanyService } from '../services/findcompany.service';
declare var $: any;
@Component({
  selector: 'app-findcompany',
     providers: [ FindcompanyService ],
  templateUrl: './findcompany.component.html',
  styleUrls: ['./findcompany.component.css']
})
export class FindcompanyComponent implements OnInit {
CompanyList;
constructor( private http: Http,private globals: Globals, private router: Router, private FindcompanyService: FindcompanyService,private route:ActivatedRoute) { }

  ngOnInit() 
  {
					
				$('.autocomplete').keyup(function() {
					var query = $.trim($('.autocomplete').val()).toLowerCase();
					$('div.company_name').each(function(){
						 var $this = $(this);
						 if($this.text().toLowerCase().indexOf(query) === -1)
							 $this.closest('.company_section .col-md-3').fadeOut();
						else $this.closest('.company_section .col-md-3').fadeIn();
					});
				});
				
				
				
				$('.company_box').click(function(){
					
					$('.company_box').removeClass('active');
					$(this).addClass('active');
				});
				
				
				
			this.FindcompanyService.getAllCompany()
			//.map(res => res.json())
			.then((data) => 
			{
				
				this.CompanyList = data;
			}, 
			(error) => 
			{
				alert('error');
			});	  
  
			
	  
  }
  clickid()
  {
	var id = $('.company_box.active input').val();
	//alert(id);
  localStorage.setItem('CompanyId',id);
  this.router.navigate(['/register']);  
  
  }
  addclass(i){
	  
	  $('.company_box').removeClass('active');
	  $('#cbox'+i).addClass('active');
		//e.currentTarget.addClass('active');
  }
  removeidreg()
  {
	 localStorage.removeItem('CompanyId');
	 this.router.navigate(['/register']);  
  }

}
