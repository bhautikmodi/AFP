<?php

class AssessmentDetails_model extends CI_Model
 {

	public function CheckAssessment($UserId = NULL) {
		
		if($UserId) {

			$this->db->select('CAssessmentId');
			$this->db->where('UserId',$UserId);
			$this->db->where('EndTime',NULL);
			$query = $this->db->get('tblcandidateassessment');
			$data = array();	
			if($query->num_rows()==1){
				foreach($query->result() as $row) {
					$data = $row;
				}
				return $data;
			} else {
				return 'yes';
			}			
		}	
			
	}

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
				// $this->db->select('KSAId');
				// $result = $this->db->get('tblmstksa');
				// foreach($result->result() as $row) {
				// 	$candidateksa_data = array(
				// 		'CAssessmentId' => $insert_id,
				// 		'KSAId' => $row->KSAId,
				// 		'IsActive' => 1,	
				// 		'UpdatedBy' => date('y-m-d H:i:s'),			
				// 	);
				// 	$res = $this->db->insert('tblcandidateksa',$candidateksa_data);
				// }
				$result = $this->db->query('SELECT CAreaId,round(((SELECT COUNT(k1.KSAId) FROM tblmstksa AS k1 WHERE k1.CAreaId=k.CAreaId) * (SELECT value FROM tblmstconfiguration as config WHERE config.Key = "NoOfKSA" LIMIT 1))/(SELECT COUNT(KSAId) FROM tblmstksa)) AS getksa from tblmstksa AS k GROUP BY CAreaId');
				foreach($result->result() as $row) {
					$insert = $this->db->query('INSERT INTO tblcandidateksa (CAssessmentId, KSAId) SELECT '.$insert_id.', ksa.KSAId FROM tblmstksa AS ksa  WHERE ksa.CAreaId = '.$row->CAreaId.' order by RAND() LIMIT '.$row->getksa);
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
