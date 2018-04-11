<?php

class State_model extends CI_Model
{
	public function add_state($post_state)
	{
		if($post_state['IsActive']==1)
					{
						$IsActive = true;
					} else {
						$IsActive = false;
					}
		if($post_state)
		{
			$state_data=array(
				"CountryId"=>$post_state['CountryId'],
				"StateName"=>$post_state['StateName'],
				"StateAbbreviation"=>$post_state['StateAbbreviation'],
				"IsActive"=>$IsActive,
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
		 $this->db->select('StateId,StateName,StateAbbreviation,CountryId,IsActive');
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
		if($post_state['IsActive']==1)
					{
						$IsActive = true;
					} else {
						$IsActive = false;
					}
		if($post_state) {
			
			$state_data = array(
				"CountryId"=>$post_state['CountryId'],
				"StateName"=>$post_state['StateName'],
				"StateAbbreviation"=>$post_state['StateAbbreviation'],
				"IsActive"=>$IsActive
				
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
		$this->db->select('st.StateId,st.StateName,st.StateAbbreviation,st.IsActive,con.CountryName');
			$this->db->join('tblmstcountry con', 'con.CountryId = st.CountryId', 'left');
		 // $this->db->select('st.StateId,st.StateName,st.StateAbbreviation,st.IsActive,con.CountryName');
		 // $this->db->join('tblmstcountry con','st.StateId = st.StateId', 'left');
		 $this->db->where('IsActive="1"');
		$result=$this->db->get('tblmststate st');
		
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