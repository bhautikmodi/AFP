import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SalesDashboardService } from '../services/sales-dashboard.service';
declare var $: any;
@Component({
  selector: 'app-sales-dashboard',
  providers: [SalesDashboardService],
  templateUrl: './sales-dashboard.component.html',
  styleUrls: ['./sales-dashboard.component.css']
})
export class SalesDashboardComponent implements OnInit {
	CompanyList;
	UserList;
	Usersearch;
	SalesDashboardEntity;
	submitted;
	btn_disable;
	header;
  constructor(private http: Http, private globals: Globals, private router: Router, private route: ActivatedRoute,
		private SalesDashboardService: SalesDashboardService) { }


  ngOnInit() {debugger
    this.SalesDashboardEntity={};
		this.SalesDashboardEntity.CompanyId='';
		this.SalesDashboardEntity.UserId='';
		this.Usersearch=[];
		this.UserList=[];
		this.CompanyList=[];
		
    $('.user_box').click(function(){
					
			$('.user_box').removeClass('active');
			$(this).addClass('active');
		});
		
		
		this.SalesDashboardService.getAllUser()
		//.map(res => res.json())
		.then((data) => {
			this.UserList = data['user'];
			this.CompanyList = data['com'];
		},
		(error) => {
			alert('error');
		});
  }
  addSalesDashboard(SalesDashboardForm) {
		debugger
		if (SalesDashboardForm.valid) {
			this.btn_disable = true;
		  this.SalesDashboardEntity.CompanyId;
			this.SalesDashboardEntity.UserId;
			var data = {'com': this.SalesDashboardEntity.CompanyId,'user':this.SalesDashboardEntity.UserId};
			this.SalesDashboardService.add(data)
				.then((data) => {
					//alert('success');
					if(data=='error')
					{
						this.Usersearch=[];
					}else{		this.Usersearch = data;
					}
			
					this.btn_disable = false;
					this.submitted = false;
				
				},
				(error) => {
					alert('error');
					this.btn_disable = false;
					this.submitted = false;
				});
		}
		
	}
	getUserList(SalesDashboardForm)
	{ debugger
		SalesDashboardForm.form.controls.UserId.markAsDirty();
		this.SalesDashboardEntity.UserId='';
		if(this.SalesDashboardEntity.CompanyId > 0){
			this.SalesDashboardService.getUserList(this.SalesDashboardEntity.CompanyId)
			.then((data) => 
			{
				this.UserList = data;
			}, 
			(error) => 
			{
				alert('error');
			});
		} else {
			this.UserList = [];
		}
	}
	clickid()
  {
	var id = $('.user_box.active input').val();
	//alert(id);
  localStorage.setItem('UserId',id);
  this.router.navigate(['/']);  
  
  }
  addclass(i){
	  
	  $('.user_box').removeClass('active');
	  $('#cbox'+i).addClass('active');
		//e.currentTarget.addClass('active');
  }

}
