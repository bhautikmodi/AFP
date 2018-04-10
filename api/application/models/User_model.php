<?php

class User_model extends CI_Model
{
	
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
	
	public function add_user($post_user)
	{	if($post_user['IsActive']==1)
					{
						$IsActive = true;
					} else {
						$IsActive = false;
					}
		if($post_user)
		{
			 
			$user_data=array(
				"RoleId"=>$post_user['RoleId'],
				"CompanyId"=>$post_user['CompanyId'],
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
				"IsActive"=>$IsActive,
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
		else
		{
				return false;
		}
	}
	
	//list project status
	public function getlist_user()
	{
		$this->db->select('us.UserId,us.RoleId,us.CompanyId,us.FirstName,us.LastName,us.Title,us.EmailAddress,us.Password,us.Address1,
		us.Address2,us.CountryId,us.StateId,us.City,us.ZipCode,us.PhoneNumber,us.IsActive,cp.Name,cp.Name,usms.RoleName');
		$this->db->join('tblcompany cp','cp.CompanyId = us.CompanyId', 'left');
		$this->db->join('tblmstuserrole usms','usms.RoleId = us.RoleId', 'left');
		$result = $this->db->get('tbluser us');
		
		$res=array();
		if($result->result())
		{
			$res=$result->result();
		}
		return $res;
	}
		
	
	//Delete UserList
	public function delete_user($user_id) 
	{
	
		if($user_id) 
		{
			
			$this->db->where('UserId',$user_id);
			$res = $this->db->delete('tbluser');
			
			if($res) {
				return true;
			} else {
				return false;
			}
		} 
		else 
		{
			return false;
		}
		
	}
	
	//Edit ProjectList
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
				//"ProjectStatusId"=>$post_user['ProjectStatusId'],
				"RoleId"=>$post_user['RoleId'],
				"CompanyId"=>$post_user['CompanyId'],
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
	
	
	//List state
	function getlist_state()
	{
		$this->db->select('StateId,StateName,StateAbbreviation,CountryId,IsActive');
		$result=$this->db->get('tblmststate');
		
		$res=array();
		if($result->result())
		{
			$res=$result->result();
		}
		return $res;
	}
	
	function getlist_company()
	{
		$this->db->select('CompanyId,Name');
		$result=$this->db->get('tblcompany');
		
		$res=array();
		if($result->result())
		{
			$res=$result->result();
		}
		return $res;
	}
	
	//list user role
	public function getlist_userrole()
	{
		$this->db->select('RoleId,RoleName');
		$result=$this->db->get('tblmstuserrole');
		
		$res=array();
		if($result->result())
		{
			$res=$result->result();
		}
		return $res;
	}
	
	public function getlist_country() {
	
		$this->db->select('CountryId,CountryName,CountryAbbreviation,PhonePrefix,IsActive');
		$result = $this->db->get('tblmstcountry');
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}
	
	
}