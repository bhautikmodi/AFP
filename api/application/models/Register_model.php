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
	
	// public function add_user($post_user)
	// {	if($post_user['IsActive']==1)
					// {
						// $IsActive = true;
					// } else {
						// $IsActive = false;
					// }
		// if($post_user)
		// {
			 
			// $user_data=array(
				// "RoleId"=>$post_user['RoleId'],
				// "CompanyId"=>$post_user['CompanyId'],
				// "FirstName"=>$post_user['FirstName'],
				// "LastName"=>$post_user['LastName'],
				// "Title"=>$post_user['Title'],
				// "EmailAddress"=>$post_user['EmailAddress'],
				// "Password"=>$post_user['Password'],
				// "Address1"=>$post_user['Address1'],
				// "Address2"=>$post_user['Address2'],
				// "CountryId"=>$post_user['CountryId'],
				// "StateId"=>$post_user['StateId'],
				// "City"=>$post_user['City'],
				// "ZipCode"=>$post_user['ZipCode'],
				// "PhoneNumber"=>$post_user['PhoneNumber'],
				// "IsActive"=>$IsActive,
				// "CreatedBy" =>1,
				// "UpdatedBy" =>1,
			// );	
				
				// $res=$this->db->insert('tbluser',$user_data);
				// if($res)
				// {
					// return true;
				// }
				// else
				// {
					// return false;
				// }
		// }
		// else
		// {
				// return false;
		// }
	// }
	
	
	// function getlist_company()
	// {
		// $this->db->select('*');
		// $result=$this->db->get('tblcompany');
		
		// $res=array();
		// if($result->result())
		// {
			// $res=$result->result();
		// }
		// return $res;
	// }
	

	
	
	
	
}