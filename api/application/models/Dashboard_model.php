<?php

class Dashboard_model extends CI_Model
 {

	
	
	public function getlist_User() {
	
		$this->db->select('UserId');
		$result = $this->db->get('tbluser');
		return 	$result->num_rows();
	}

	public function getlist_Domain() {
		
		$this->db->select('DomainId');
		$result1 = $this->db->get('tblmstdomain');
		return 	$result1->num_rows();
	}
	public function getlist_Carea() {
		
		$this->db->select('CAreaId');
		$result2 = $this->db->get('tblmstcompetencyarea');
		return 	$result2->num_rows();
	}
	public function getlist_Tksa() {
		
		$this->db->select('KSAId');
		$result3 = $this->db->get('tblmstksa');
		return 	$result3->num_rows();
	}
	public function getlist_Course() {
	
		$this->db->select('CourseId');
		$result4 = $this->db->get('tblmstcourse');
		return 	$result4->num_rows();
	}
}
