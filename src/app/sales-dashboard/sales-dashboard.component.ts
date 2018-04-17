import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SalesDashboardService } from '../services/sales-dashboard.service';

@Component({
  selector: 'app-sales-dashboard',
  providers: [SalesDashboardService],
  templateUrl: './sales-dashboard.component.html',
  styleUrls: ['./sales-dashboard.component.css']
})
export class SalesDashboardComponent implements OnInit {
	CompanyList;
	UserList;
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
    this.SalesDashboardService.getAllCompany()
		//.map(res => res.json())
		.then((data) => {
			this.CompanyList = data;
		},
		(error) => {
			alert('error');
		});
		this.SalesDashboardService.getAllUser()
		//.map(res => res.json())
		.then((data) => {
			this.UserList = data;
		},
		(error) => {
			alert('error');
		});
  }
  addSalesDashboard(SalesDashboardForm) {
		debugger
		let id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.submitted = false;
		} else {
		//	this.SalesDashboardEntity.CompanyId = 0;
			this.submitted = true;
		}
		
	}
  clearForm(SalesDashboardForm) 
  {
		this.SalesDashboardEntity = {};
		this.SalesDashboardEntity.IsActive = '1';
		this.submitted = false;
		SalesDashboardForm.form.markAsPristine();
	}

}
