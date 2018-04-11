<?php

class Register_model extends CI_Model
{
	public function getlist_country() {
	
		$this->db->select('*');
		$this->db->where('IsActive="1"');
		$result = $this->db->get('tblmstcountry');
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}
	//List state
	function getlist_state()
	{
		$this->db->select('*');
		$result=$this->db->get('tblmststate');
		
		$res=array();
		if($result->result())
		{
			$res=$result->result();
		}
		return $res;
	}
	public function getStateList($country_id = NULL) {
		
		if($country_id) {
			
			$this->db->select('StateId,StateName');
			$this->db->where('CountryId',$country_id);
			$result = $this->db->get('tblmststate');
				
			
			$res = array();
			if($result->result()) {
				$res = $result->result();
			}
			return $res;
			
		} else {
			return false;
		}
	}
	
	public function company_default($CompanyId = NULL) {
		
		if($CompanyId) {
			
			// $this->db->select('CompanyId,Name,IndustryId,Website,PhoneNumber');
			// $this->db->where('CompanyId',$CompanyId);
			// $result = $this->db->get('tblcompany');
		$this->db->select('pr.CompanyId,pr.Name,pr.IndustryId,pr.Website,pr.PhoneNumber,ps.IndustryId,ps.IndustryName');
		$this->db->join('tblmstindustry ps', 'pr.IndustryId = ps.IndustryId', 'left');
		$this->db->where('CompanyId',$CompanyId);
		$this->db->where('IsActive="1"');
		$result = $this->db->get('tblcompany pr');
			$company_data = array();
			foreach($result->result() as $row) {
				$company_data = $row;
			}
			return $company_data;
			
		} else {
			return false;
		}
		
	}
	public function add_Register($post_user,$com_reg)
	{	
		if($post_user)
		{
            if($com_reg['CompanyId']>0)
			{	
					$user_data=array(
						"RoleId"=>3,
						"CompanyId"=>$com_reg['CompanyId'],
						"FirstName"=>$post_user['FirstName'],
						"LastName"=>$post_user['LastName'],
						"Title"=>$post_user['Title'],
						"EmailAddress"=>$post_user['EmailAddress'],
						"Password"=>md5($post_user['Password']),
						"Address1"=>$post_user['Address1'],
						"Address2"=>$post_user['Address2'],
						"CountryId"=>$post_user['CountryId'],
						"StateId"=>$post_user['StateId'],
						"City"=>$post_user['City'],
						"ZipCode"=>$post_user['ZipCode'],
						"PhoneNumber"=>$post_user['PhoneNumber'],
						"CreatedBy" =>1,
						"UpdatedBy" =>1,
					);	
				$res=$this->db->insert('tbluser',$user_data);
				if($res)
				{
					return true;
				}
				else
				{
					return false;
				}
				
			}else
			{
				$company_data=array(
			
					"Name"=>$com_reg['Name'],
					"IndustryId"=>$com_reg['IndustryId'],
					"Website"=>$com_reg['Website'],
					"PhoneNumber"=>$com_reg['PhoneNumber1'],
					"CreatedBy" =>1,
					"UpdatedBy" =>1
				);	
				
				$res=$this->db->insert('tblcompany',$company_data);
				
				$this->db->select('CompanyId');
				$this->db->order_by('CompanyId','desc');
				$this->db->limit(1);
				$result=$this->db->get('tblcompany');
				
					$company_data = array();
					foreach($result->result() as $row) 
					{
						$company_data = $row;
					}
				
				
				
				$user_data=array(
					"RoleId"=>3,
					"CompanyId"=>$company_data->CompanyId,
					"FirstName"=>$post_user['FirstName'],
					"LastName"=>$post_user['LastName'],
					"Title"=>$post_user['Title'],
					"EmailAddress"=>$post_user['EmailAddress'],
					"Password"=>md5($post_user['Password']),
					"Address1"=>$post_user['Address1'],
					"Address2"=>$post_user['Address2'],
					"CountryId"=>$post_user['CountryId'],
					"StateId"=>$post_user['StateId'],
					"City"=>$post_user['City'],
					"ZipCode"=>$post_user['ZipCode'],
					"PhoneNumber"=>$post_user['PhoneNumber'],
					"CreatedBy" =>1,
					"UpdatedBy" =>1,
				);	
				
				$res=$this->db->insert('tbluser',$user_data);	
				if($res)
				{
					return true;
				}
				else
				{
					return false;
				}
			}
		}
		else
		{
				return false;
		}
	}
	
	
	function getlist_Industry()
	{
		$this->db->select('*');
		$result=$this->db->get('tblmstindustry');
		
		$res=array();
		if($result->result())
		{
			$res=$result->result();
		}
		return $res;
	}
		
		
	public function get_userdata($user_id=Null)
	{
	  if($user_id)
	  {
		  
		  $this->db->select('us.UserId,us.CompanyId,us.FirstName,us.LastName,us.Title,us.EmailAddress,us.Address1,
			us.Address2,us.CountryId,us.StateId,us.City,us.ZipCode,us.PhoneNumber,us.IsActive,
			tc.CompanyId,tc.Name,tc.Website,tc.PhoneNumber,
			in.IndustryId,in.IndustryName');
			
			$this->db->join('tblcompany tc', 'us.CompanyId = tc.CompanyId', 'left');
			$this->db->join('tblmstindustry in','tc.IndustryId = in.IndustryId', 'left');
			$this->db->where('UserId=',$user_id);
			$result = $this->db->get('tbluser us');
		
			// $this->db->select('pr.CompanyId,pr.Name,pr.IndustryId,pr.Website,pr.PhoneNumber,ps.IndustryId,ps.IndustryName');
		// $this->db->join('tblmstindustry ps', 'pr.IndustryId = ps.IndustryId', 'left');
		// $this->db->where('CompanyId',$CompanyId);
		// $result = $this->db->get('tblcompany pr');
	

		 // $this->db->select('*');
		 // $this->db->where('UserId',$user_id);
		 // $result=$this->db->get('tbluser');
		 $user_data= array();
		 foreach($result->result() as $row)
		 {
			$user_data=$row;
			
		 }
		 return $user_data;
		 
	  }
	  else
	  {
		  return false;
	  }
	}
 public function edit_user($post_user) {
		if($post_user['IsActive']==1)
					{
						$IsActive = true;
					} else {
						$IsActive = false;
					}
		if($post_user) 
		{
				$user_data = array(

				//"RoleId"=>$data['RoleId'],
				//"CompanyId"=>$data['CompanyId'],
				"FirstName"=>$post_user['FirstName'],
				"LastName"=>$post_user['LastName'],
				"Title"=>$post_user['Title'],
				"EmailAddress"=>$post_user['EmailAddress'],
				//"Password"=>$post_user['Password'],
				"Address1"=>$post_user['Address1'],
				"Address2"=>$post_user['Address2'],
				"CountryId"=>$post_user['CountryId'],
				"StateId"=>$post_user['StateId'],
				"City"=>$post_user['City'],
				"ZipCode"=>$post_user['ZipCode'],
				"PhoneNumber"=>$post_user['PhoneNumber'],
				"IsActive"=>$IsActive,
				'CreatedOn' => date('y-m-d H:i:s'),
				'UpdatedOn' => date('y-m-d H:i:s')
			);
			
			
			
			
			$this->db->where('UserId',$post_user['UserId']);
			$res = $this->db->update('tbluser',$user_data);
			
			if($res) 
			{
				return true;
			} else
				{
				 return false;
			    }
		}
		else 
		{
			return false;
		}	
	
	}
	
	
	
	
}