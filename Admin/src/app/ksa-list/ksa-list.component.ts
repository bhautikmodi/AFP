import { Component, OnInit, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { KsaService } from '../services/ksa.service';
import { CommonService } from '../services/common.service';
import { Globals } from '.././globals';

declare var $,unescape: any;

@Component({
  selector: 'app-ksa-list',
  providers: [ KsaService,CommonService ],
  templateUrl: './ksa-list.component.html',
  styleUrls: ['./ksa-list.component.css']
})
export class KsaListComponent implements OnInit {

	ksaList;
	deleteEntity;
	msgflag;
	message;
	permissionEntity;
	//globals;
	
	constructor(private el: ElementRef, private http: Http, private router: Router, private route: ActivatedRoute,
		 private KsaService: KsaService, private CommonService: CommonService, private globals: Globals) 
  {
	
  }

  ngOnInit() { 
	$('.print').on('click',function(){
		window.print();
	})

	this.globals.isLoading = false;
	$("body").tooltip({
		selector: "[data-toggle='tooltip']",
		container: "body"
	});
	//this.globals = this.global;
		this.permissionEntity = {}; 
		if(this.globals.authData.RoleId==4){
			this.permissionEntity.View=1;
			this.permissionEntity.AddEdit=1;
			this.permissionEntity.Delete=1;
			this.default();
		} else {		
			this.CommonService.get_permissiondata({'RoleId':this.globals.authData.RoleId,'screen':'KSA'})
			.then((data) => 
			{
				this.permissionEntity = data;
				if(this.permissionEntity.View==1 ||  this.permissionEntity.AddEdit==1 || this.permissionEntity.Delete==1){
					this.default();
				} else {
					this.router.navigate(['/access-denied']);
				}		
			},
			(error) => 
			{
				//alert('error');
				this.globals.isLoading = false;
				this.router.navigate(['/pagenotfound']);
			});	
		}		
	}
	
	default(){
		
		this.KsaService.getAll()
		.then((data) => 
		{ 
			this.ksaList = data;	
			setTimeout(function(){
				$('#dataTables-example').dataTable( {
					"oLanguage": {
						"sLengthMenu": "_MENU_ KSAs per Page",
						"sInfo": "Showing _START_ to _END_ of _TOTAL_ KSAs",
						"sInfoFiltered": "(filtered from _MAX_ total KSAs)",
						"sInfoEmpty": "Showing 0 to 0 of 0 KSAs"
					}
				});
				$(".ksa").addClass("selected");
			},100); 
			this.globals.isLoading = false;
		}, 
		(error) => 
		{
			//alert('error');
			this.globals.isLoading = false;
			this.router.navigate(['/pagenotfound']);
		});	
		this.msgflag = false;
		}

		printData()
		{
			var divToPrint=document.getElementById("dataTables-example");
			var newWin= window.open("");
			newWin.document.write(divToPrint.outerHTML);
			newWin.print();
			newWin.close();
		}
	
		tableToExcel(table, name)
		{
			var uri = 'data:application/vnd.ms-excel;base64,'
			, template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
			, base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
			, format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
			if (!table.nodeType){ table = document.getElementById(table)
			var ctx = {worksheet: name || 'Worksheet', table: table.outerHTML}
			window.location.href = uri + base64(format(template, ctx))}
		}
	
	deleteksa(ksa)
	{ 
		this.deleteEntity =  ksa;
		$('#Delete_Modal').modal('show');					
	}

	deleteConfirm(ksa)
	{
		 var del={'Userid':this.globals.authData.UserId,'id':ksa.KSAId};
		this.KsaService.delete(del)
		.then((data) => 
		{
			let index = this.ksaList.indexOf(ksa);
			$('#Delete_Modal').modal('hide');
			if (index != -1) {
				this.ksaList.splice(index, 1);			
			}	
			this.globals.message = 'KSA Deleted Successfully';
			this.globals.type = 'success';
			this.globals.msgflag = true;
		}, 
		(error) => 
		{
			$('#Delete_Modal').modal('hide');
			if(error.text){
				this.globals.message = "You can't delete this record because of their dependency!";
				this.globals.type = 'danger';
				this.globals.msgflag = true;
			}	
		});		
	}
	
}



