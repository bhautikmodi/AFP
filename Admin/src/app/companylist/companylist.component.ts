import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/Forms';
import { HttpModule } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

import { CompanyService } from '../services/company.service';
import { Globals } from '../globals';
declare var $: any;


@Component({
  selector: 'app-companylist',
  providers: [ CompanyService ],
  templateUrl: './companylist.component.html',
  styleUrls: ['./companylist.component.css']
})
export class CompanylistComponent implements OnInit {

	companyList;
	deleteEntity;
	msgflag;
	message;
   constructor(private http: Http, private router: Router, private route: ActivatedRoute, private CompanyService: CompanyService,private globals: Globals) { }

  ngOnInit() { 
	this.CompanyService.getAllCompany	()
	.then((data) => 
	{ 
		this.companyList = data;	
		setTimeout(function(){
      $('#dataTables-example').dataTable( {
        "oLanguage": {
          "sLengthMenu": "_MENU_ Company per Page",
					"sInfo": "Showing _START_ to _END_ of _TOTAL_ Company",
					"sInfoFiltered": "(filtered from _MAX_ total Company)"
        }
      });
    },100); 

	}, 
	(error) => 
	{
		alert('error');
	});	
	this.msgflag = false;
  }

	deleteCompany(company)
	{ 
		this.deleteEntity =  company;
		$('#Delete_Modal').modal('show');					
	}

	deleteConfirm(company)
	{ 
		this.CompanyService.deleteCompany(company.CompanyId)
		.then((data) => 
		{
			let index = this.companyList.indexOf(company);
			$('#Delete_Modal').modal('hide');
			if (index != -1) {
				this.companyList.splice(index, 1);
				//this.router.navigate(['/domain/list']);
				// setTimeout(function(){
				// 	$('#dataTables-example').dataTable( {
				// 		"oLanguage": {
				// 			"sLengthMenu": "_MENU_ Domains per Page",
				// 			"sInfo": "Showing _START_ to _END_ of _TOTAL_ Domains",
				// 			"sInfoFiltered": "(filtered from _MAX_ total Domains)"
				// 		}
				// 	});
				// },3000); 
			}			
			//alert(data);
			this.message = 'Delete successfully';
			this.msgflag = true;
		}, 
		(error) => 
		{
			alert('error');
		});		
	}
}
