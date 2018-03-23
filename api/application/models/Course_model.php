<?php

class Course_model extends CI_Model
 {

	public function add_Course($post_Course) {
			if($post_Course['IsActive']==1)
					{
						$IsActive = true;
					} else {
						$IsActive = false;
					}
		if($post_Course) {
			
			$Course_data = array(
				
				'Name' => $post_Course['Name'],
				'ConfigurationId' => $post_Course['ConfigurationId'],
				'KeyConcepts' => $post_Course['KeyConcepts'],
				'IsActive' => $IsActive
			
			);
			
			$res = $this->db->insert('tblmstcourse',$Course_data);
			
			if($res) {
				return true;
			} else {
				return false;
			}
	
		} else {
			return false;
		}
	}
	
	public function getlist_Course() {
	
		// $this->db->select('*');
		// $result = $this->db->get('tblmstcourse');
		
		$this->db->select('pr.CourseId,pr.Name,pr.KeyConcepts,pr.IsActive,ps.DisplayText,ps.ConfigurationId');
		$this->db->join('tblmstconfiguration ps', 'pr.ConfigurationId = ps.ConfigurationId', 'left');
		$result = $this->db->get('tblmstcourse pr');
		
		
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}
	
	
	public function get_Coursedata($Course_Id = NULL)
	{
		
		if($Course_Id) {
			
			$this->db->select('*');
			$this->db->where('CourseId',$Course_Id);
			$result = $this->db->get('tblmstcourse');
			
			$company_data = array();
			foreach($result->result() as $row) {
				$company_data = $row;
			}
			return $company_data;
			
		} else {
			return false;
		}
	}
	
	
	public function edit_Course($post_Course) {
	
		if($post_Course) {
			 if($post_Course['IsActive']==1)
					{
						$IsActive = true;
					} else {
						$IsActive = false;
					}
			$Course_data = array(
				'Name' => $post_Course['Name'],
				'ConfigurationId' => $post_Course['ConfigurationId'],
				'KeyConcepts' => $post_Course['KeyConcepts'],
				'IsActive' => $IsActive
			
			);
			
			$this->db->where('CourseId',$post_Course['CourseId']);
			$res = $this->db->update('tblmstcourse',$Course_data);
			
			if($res) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}	
	
	}
	
	
	public function delete_Course($Course_Id) {
	
		if($Course_Id) {
			
			$this->db->where('CourseId',$Course_Id);
			$res = $this->db->delete('tblmstcourse');
			
			if($res) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
		
	}
	public function getCourseLevelList() {
	
		$this->db->select('ConfigurationId,Value,Key');
		$this->db->where('key="CourseLevel"');
		$result = $this->db->get('tblmstconfiguration');
		
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}
}
