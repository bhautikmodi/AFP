import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { CountryService } from '../services/country.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../services/common.service';

@Component({
	selector: 'app-country',
	providers: [CountryService, CommonService],
	templateUrl: './country.component.html',
	styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
	CountryEntity;
	submitted;
	btn_disable;
	header;
	constructor(private http: Http, private globals: Globals, private router: Router,
		private CountryService: CountryService, private route: ActivatedRoute, private CommonService: CommonService) { }

	ngOnInit() {
		this.CommonService.get_permissiondata({ 'RoleId': this.globals.authData.RoleId, 'screen': 'Country' })
			.then((data) => {
				if (data['AddEdit'] == 1) {
					this.globals.msgflag = false;
					this.CountryEntity = {};
					let id = this.route.snapshot.paramMap.get('id');
					if (id) {
						this.header = 'Edit';
						this.CountryService.getById(id)
							.then((data) => {
								this.CountryEntity = data;


							},
							(error) => {
								alert('error');
							});
					} else {
						this.header = 'Add';
						this.CountryEntity = {};
						this.CountryEntity.CountryId = 0;
						this.CountryEntity.IsActive = '1';
					}
				} else {
					this.router.navigate(['/dashboard']);
				}
			},
			(error) => {
				alert('error');
			});
	}


	addCountry(CountryForm) {
		let id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.CountryEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = false;
		} else {
			this.CountryEntity.CreatedBy = this.globals.authData.UserId;
			this.CountryEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = true;
		}
		if (CountryForm.valid) {
			this.btn_disable = true;
			this.CountryService.add(this.CountryEntity)
				.then((data) => {
					//alert('success');
					this.btn_disable = false;
					this.submitted = false;
					this.CountryEntity = {};
					CountryForm.form.markAsPristine();
					if (id) {
						this.globals.message = 'Update successfully';
						this.globals.type = 'success';
						this.globals.msgflag = true;
					} else {
						this.globals.message = 'Add successfully';
						this.globals.type = 'success';
						this.globals.msgflag = true;
					}
					this.router.navigate(['/country/list']);
				},
				(error) => {
					alert('error');
					this.btn_disable = false;
					this.submitted = false;
				});
		}
	}

	clearForm(CountryForm) {
		this.CountryEntity = {};
		this.CountryEntity.CountryId = 0;
		this.CountryEntity.IsActive = '1';
		this.submitted = false;
		CountryForm.form.markAsPristine();
	}

}
