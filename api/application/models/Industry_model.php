<?php

class Industry_model extends CI_Model
 {

	public function add_Industry($post_Industry) {
			if($post_Industry['IsActive']==1)
					{
						$IsActive = true;
					} else {
						$IsActive = false;
					}
		if($post_Industry) {
			
			$Industry_data = array(
				
				'IndustryName' => $post_Industry['IndustryName'],
				'IsActive' => $IsActive
			
			);
			
			$res = $this->db->insert('tblmstindustry',$Industry_data);
			
			if($res) {
				return true;
			} else {
				return false;
			}
	
		} else {
			return false;
		}
	}
	
	public function getlist_Industry() {
	
		$this->db->select('*');
		$result = $this->db->get('tblmstindustry');
		
		// $this->db->select('pr.CourseId,pr.Name,pr.KeyConcepts,pr.IsActive,ps.DisplayText,ps.ConfigurationId');
		// $this->db->join('tblmstconfiguration ps', 'pr.ConfigurationId = ps.ConfigurationId', 'left');
		// $result = $this->db->get('tblmstcourse pr');
		
		
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}
	
	
	public function get_Industrydata($Industry_Id = NULL)
	{
		
		if($Industry_Id) {
			
			$this->db->select('*');
			$this->db->where('IndustryId',$Industry_Id);
			$result = $this->db->get('tblmstindustry');
			
			$company_data = array();
			foreach($result->result() as $row) {
				$company_data = $row;
			}
			return $company_data;
			
		} else {
			return false;
		}
	}
	
	
	public function edit_Industry($post_Industry) {
	
		if($post_Industry) {
			 if($post_Industry['IsActive']==1)
					{
						$IsActive = true;
					} else {
						$IsActive = false;
					}
			$Industry_data = array(
				'IndustryName' => $post_Industry['IndustryName'],
				'IsActive' => $IsActive
			
			);
			
			$this->db->where('IndustryId',$post_Industry['IndustryId']);
			$res = $this->db->update('tblmstindustry',$Industry_data);
			
			if($res) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}	
	
	}
	
	
	public function delete_Industry($Industry_Id) {
	
		if($Industry_Id) {
			
			$this->db->where('IndustryId',$Industry_Id);
			$res = $this->db->delete('tblmstindustry');
			
			if($res) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
		
	}
	
}