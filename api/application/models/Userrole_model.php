<?php

class Userrole_model extends CI_Model
{
	
	public function add_userrole($post_userrole)
	{
		if($post_userrole)
		{
			 
			$userrole_data=array(
				"RoleId"=>$post_userrole['RoleId'],
				"RoleName"=>$post_userrole['RoleName'],
				"IsActive"=>$post_userrole['IsActive'],
				"CreatedBy" =>1,
				"UpdatedBy" =>1,
			);	
				
				$res=$this->db->insert('tblmstuserrole',$userrole_data);
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
	public function getlist_userrole()
	{
		$this->db->select('*');
		$result=$this->db->get('tblmstuserrole');
		
		$res=array();
		if($result->result())
		{
			$res=$result->result();
		}
		return $res;
	}
		
	
	//Delete UserList
	public function delete_userrole($role_id) 
	{
	
		if($role_id) 
		{
			
			$this->db->where('RoleId',$role_id);
			$res = $this->db->delete('tblmstuserrole');
			
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
	 public function edit_userrole($post_userrole) {
	
		if($post_userrole) 
		{
				$userrole_data = array(
				//"ProjectStatusId"=>$post_userrole['ProjectStatusId'],
				//"RoleId"=>$post_userrole['RoleId'],
				"RoleName"=>$post_userrole['RoleName'],
				"IsActive"=>$post_userrole['IsActive'],
				'CreatedOn' => date('y-m-d H:i:s'),
				'UpdatedOn' => date('y-m-d H:i:s')
			);
			
			$this->db->where('RoleId',$post_userrole['RoleId']);
			$res = $this->db->update('tblmstuserrole',$userrole_data);
			
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
	
	
	public function get_userroledata($role_id=Null)
	{
	  if($role_id)
	  {
		 $this->db->select('*');
		 $this->db->where('RoleId',$role_id);
		 $result=$this->db->get('tblmstuserrole');
		 $company_data= array();
		 foreach($result->result() as $row)
		 {
			$company_data=$row;
			
		 }
		 return $company_data;
		 
	  }
	  else
	  {
		  return false;
	  }
	}
	
	
	// //List state
	// function getlist_state()
	// {
		// $this->db->select('*');
		// $result=$this->db->get('tblmststate');
		
		// $res=array();
		// if($result->result())
		// {
			// $res=$result->result();
		// }
		// return $res;
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