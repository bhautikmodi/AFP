<?php

class Company_model extends CI_Model
{
	
	public function add_company($post_company)
	{	if($post_company['IsActive']==1)
					{
						$IsActive = true;
					} else {
						$IsActive = false;
					}
		if($post_company)
		{
			$company_data = array(
				'Name' => $post_company['Name'],
				'IndustryId' => $post_company['IndustryId'],
				'Website' => $post_company['Website'],
				'PhoneNumber' => $post_company['PhoneNumber'],
				'IsActive' => $IsActive,
				'UpdatedOn' => date('y-m-d H:i:s')
			);
				
				$res=$this->db->insert('tblcompany',$company_data);
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
	
	public function get_companydata($company_id=Null)
	{
	  if($company_id)
	  {
		 $this->db->select('*');
		 $this->db->where('CompanyId',$company_id);
		 $result=$this->db->get('tblcompany');
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
	
	 public function edit_company($post_company)
	 {
		if($post_company['IsActive']==1)
					{
						$IsActive = true;
					} else {
						$IsActive = false;
					}
		if($post_company) {
			
			$company_data = array(
				'Name' => $post_company['Name'],
				'IndustryId' => $post_company['IndustryId'],
				'Website' => $post_company['Website'],
				'PhoneNumber' => $post_company['PhoneNumber'],
				'IsActive' => $IsActive,
				'UpdatedOn' => date('y-m-d H:i:s')
			);
			
			$this->db->where('CompanyId',$post_company['CompanyId']);
			$res = $this->db->update('tblcompany',$company_data);
			
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
	
	function getlist_company()
	{
		$this->db->select('*');
		$result=$this->db->get('tblcompany');
		
		$res=array();
		if($result->result())
		{
			$res=$result->result();
		}
		return $res;
	}
	
	public function delete_company($company_id) 
	{
	
		if($company_id) 
		{
			
			$this->db->where('CompanyId',$company_id);
			$res = $this->db->delete('tblcompany');
			
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
	
	
	//list Industry
	public function getlist_Industry() {
	
		$this->db->select('*');
		$result = $this->db->get('tblmstindustry');
		
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}
	
}