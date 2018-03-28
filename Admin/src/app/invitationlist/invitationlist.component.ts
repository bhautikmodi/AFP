import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { InvitationService } from '../services/invitation.service';
import { Globals } from '.././globals';
declare var $: any;

@Component({
  selector: 'app-invitationlist',
  providers: [ InvitationService ],
  templateUrl: './invitationlist.component.html',
  styleUrls: ['./invitationlist.component.css']
})
export class InvitationlistComponent implements OnInit {
	InvitationList;
	msgflag;
	message;

  constructor( private http: Http,private globals: Globals, private router: Router, private InvitationService: InvitationService,private route:ActivatedRoute) { }

 

  ngOnInit() { debugger
   
    this.InvitationService.getAll()
    .then((data) => 
    { 
      this.InvitationList = data;	
      setTimeout(function(){
        $('#dataTables-example').dataTable( {
          "oLanguage": {
            "sLengthMenu": "_MENU_ Invitation per Page",
            "sInfo": "Showing _START_ to _END_ of _TOTAL_ Invitation",
            "sInfoFiltered": "(filtered from _MAX_ total Invitation)"
          }
        });
      },100); 
  
    }, 
    (error) => 
    {
      alert('error');
    });	
    //this.msgflag = false;
    }
  

}
