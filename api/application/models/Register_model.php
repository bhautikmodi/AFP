<?php

class Register_model extends CI_Model
{
	public function getlist_country() {
	
		$this->db->select('*');
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
						"Password"=>$post_user['Password'],
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
					"Password"=>$post_user['Password'],
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
		  
		  $this->db->select('UserId,RoleId,CompanyId,FirstName,LastName,Title,EmailAddress,Password,Address1,
		Address2,CountryId,StateId,City,ZipCode,PhoneNumber,IsActive');
		$this->db->where('user.UserId=',$user_id);
		
		//$this->db->join('tblmststate sta', 'sta.StateId = user.UserId', 'left');
		$result = $this->db->get('tbluser user');
		
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

	
	
	
	
}