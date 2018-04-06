<?php

class AssessmentDetails_model extends CI_Model
 {

	public function add_AssessmentDetails($post_AssessmentDetails) {
			
		if($post_AssessmentDetails) {
			
			$AssessmentDetails_data = array(
				
				'AssessmentName' => $post_AssessmentDetails['AssessmentName'],
				'TeamSizeId' => $post_AssessmentDetails['TeamSizeId'],
				'Description' => $post_AssessmentDetails['Description']
			
			);
			
			$res = $this->db->insert('AssessmentDetails',$AssessmentDetails_data);
			
			if($res) {
				return true;
			} else {
				return false;
			}
	
		} else {
			return false;
		}
	}	
	
	public function getTeamSizeList() {
	
		$this->db->select('TeamSizeId,TeamSize,IsActive');
		$this->db->where('IsActive=1');
		$result = $this->db->get('tblmstteamsize');
		
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}
}
