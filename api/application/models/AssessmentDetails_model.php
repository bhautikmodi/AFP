<?php

class AssessmentDetails_model extends CI_Model
 {

	public function add_AssessmentDetails($post_AssessmentDetails) {
			
		if($post_AssessmentDetails) {
			
			$AssessmentDetails_data = array(
				'UserId'=>$post_AssessmentDetails['UserId'],
				'AssessmentName' => $post_AssessmentDetails['AssessmentName'],
				'TeamSizeId' => $post_AssessmentDetails['TeamSizeId'],
				'Description' => $post_AssessmentDetails['Description'],
				'StartTime' => date('y-m-d H:i:s'),			
			);
			$res = $this->db->insert('tblcandidateassessment',$AssessmentDetails_data);
			if($res) {				
				$insert_id = $this->db->insert_id();
				$this->db->select('KSAId');
				$result = $this->db->get('tblmstksa');
				foreach($result->result() as $row) {
					$candidateksa_data = array(
						'CAssessmentId' => $insert_id,
						'KSAId' => $row->KSAId,
						'IsActive' => 1,	
						'UpdatedBy' => date('y-m-d H:i:s'),			
					);
					$res = $this->db->insert('tblcandidateksa',$candidateksa_data);
				}
				return $insert_id;
			} else {
				return false;
			}
	
		} else {
			return false;
		}
	}	
	
	public function getTeamSizeList() {
	
		$this->db->select('TeamSizeId,TeamSize,IsActive');
		$this->db->where('IsActive',1);
		$result = $this->db->get('tblmstteamsize');
		
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}
}
