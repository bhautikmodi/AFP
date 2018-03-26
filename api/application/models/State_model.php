<?php

class State_model extends CI_Model
{
	public function add_state($post_state)
	{
		if($post_state)
		{
			$state_data=array(
				"StateName"=>$post_state['StateName'],
				"StateAbbreviation"=>$post_state['StateAbbreviation'],
				"IsActive"=>$post_state['IsActive'],
				
				"CreatedBy" => 1,
				"UpdatedBy" => 1,
				
			);	
				
				$res=$this->db->insert('tblmststate',$state_data);
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
	
	public function get_statedata($state_id=Null)
	{
	  if($state_id)
	  {
		 $this->db->select('*');
		 $this->db->where('StateId',$state_id);
		 $result=$this->db->get('tblmststate');
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
	
	 public function edit_state($post_state) {
	
		if($post_state) {
			
			$state_data = array(
				
				"StateName"=>$post_state['StateName'],
				"StateAbbreviation"=>$post_state['StateAbbreviation'],
				"IsActive"=>$post_state['IsActive']
				
			);
			
			$this->db->where('StateId',$post_state['StateId']);
			$res = $this->db->update('tblmststate',$state_data);
			
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
	
	public function delete_state($state_id) 
	{
	
		if($state_id) 
		{
			
			$this->db->where('StateId',$state_id);
			$res = $this->db->delete('tblmststate');
			
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
	
	
}