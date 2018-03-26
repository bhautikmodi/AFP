import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../services/country.service';
import { Globals } from '.././globals';
declare var $: any;
@Component({
  selector: 'app-countrylist',
    providers: [ CountryService ],
  templateUrl: './countrylist.component.html',
  styleUrls: ['./countrylist.component.css']
})
export class CountrylistComponent implements OnInit {
    CountryList;
	deleteEntity;
	msgflag;
	message;
 constructor( private http: Http,private globals: Globals, private router: Router, private CountryService: CountryService,private route:ActivatedRoute) { }


ngOnInit() { 
	this.CountryService.getAll()
	.then((data) => 
	{ 
		this.CountryList = data;	
		setTimeout(function(){
      $('#dataTables-example').dataTable( {
        "oLanguage": {
          "sLengthMenu": "_MENU_ Country per Page",
					"sInfo": "Showing _START_ to _END_ of _TOTAL_ Country",
					"sInfoFiltered": "(filtered from _MAX_ total Country)"
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

	deleteCountry(Country)
	{ 
		this.deleteEntity =  Country;
		$('#Delete_Modal').modal('show');					
	}

	deleteConfirm(Country)
	{ 
		this.CountryService.delete(Country.CountryId)
		.then((data) => 
		{
			let index = this.CountryList.indexOf(Country);
			$('#Delete_Modal').modal('hide');
			if (index != -1) {
				this.CountryList.splice(index, 1);
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
