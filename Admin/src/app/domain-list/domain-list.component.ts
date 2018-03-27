import { Component, OnInit, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DomainService } from '../services/domain.service';
import { Globals } from '.././globals';
declare var $: any;

@Component({
  selector: 'app-domain-list',
  providers: [ DomainService ],
  templateUrl: './domain-list.component.html',
  styleUrls: ['./domain-list.component.css']
})
export class DomainListComponent implements OnInit {

	domainList;
	deleteEntity;
	msgflag;
	message;
	type;
	
	constructor(private el: ElementRef, private http: Http, private router: Router, private route: ActivatedRoute,
		 private domainService: DomainService, private globals: Globals) 
  {
	
  }

  ngOnInit() { 
		//this.globals.msgflag = false;
	this.domainService.getAll()
	.then((data) => 
	{ 
		this.domainList = data;	
		setTimeout(function(){
      $('#dataTables-example').dataTable( {
        "oLanguage": {
          "sLengthMenu": "_MENU_ Domain per Page",
					"sInfo": "Showing _START_ to _END_ of _TOTAL_ Domain",
					"sInfoFiltered": "(filtered from _MAX_ total Domain)",
					"sInfoEmpty": "Showing 0 to 0 of 0 Domain"
        }
      });
    },100); 

	}, 
	(error) => 
	{
		alert('error');
	});		
  }
	
	deleteDomain(domain)
	{ 
		this.deleteEntity =  domain;
		$('#Delete_Modal').modal('show');					
	}

	deleteConfirm(domain)
	{ 
		this.domainService.delete(domain.DomainId)
		.then((data) => 
		{
			let index = this.domainList.indexOf(domain);
			$('#Delete_Modal').modal('hide');
			if (index != -1) {
				this.domainList.splice(index, 1);
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
			this.globals.message = 'Delete successfully';
			this.globals.type = 'success';
			this.globals.msgflag = true;
		}, 
		(error) => 
		{
			$('#Delete_Modal').modal('hide');
			if(error.text){
				this.globals.message = "You can't delete this record because of their dependency.";
				this.globals.type = 'danger';
				this.globals.msgflag = true;
			}	
		});		
	}
	
}
