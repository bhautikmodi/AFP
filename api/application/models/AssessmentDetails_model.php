<?php

class AssessmentDetails_model extends CI_Model
 {

	// public function CheckAssessment($UserId = NULL) {
		
	// 	if($UserId) {

	// 		$this->db->select('CAssessmentId');
	// 		$this->db->where('UserId',$UserId);
	// 		$this->db->where('EndTime',NULL);
	// 		$query = $this->db->get('tblcandidateassessment');
	// 		$data = array();	
	// 		if($query->num_rows()==1){
	// 			foreach($query->result() as $row) {
	// 				$data = $row;
	// 			}
	// 			return $data;
	// 		} else {
	// 			return 'yes';
	// 		}			
	// 	}	
			
	// }

	public function add_AssessmentDetails($post_AssessmentDetails) {
			
		if($post_AssessmentDetails) {
			
			$AssessmentDetails_data = array(
				'UserId'=>trim($post_AssessmentDetails['UserId']),
				'AssessmentName' => trim($post_AssessmentDetails['AssessmentName']),
				'TeamSizeId' => trim($post_AssessmentDetails['TeamSizeId']),
				'Description' => trim($post_AssessmentDetails['Description']),
				'CreatedBy' => trim($post_AssessmentDetails['CreatedBy']),
				'UpdatedBy' => trim($post_AssessmentDetails['UpdatedBy']),
				'UpdatedOn' => date('y-m-d H:i:s'),
				'StartTime' => date('y-m-d H:i:s'),			
			);
			$res = $this->db->insert('tblcandidateassessment',$AssessmentDetails_data);
			if($res) {				
				$insert_id = $this->db->insert_id();

				// $result = $this->db->query('SELECT CAreaId,round(((SELECT COUNT(k1.KSAId) FROM tblmstksa AS k1 WHERE k1.CAreaId=k.CAreaId) * (SELECT value FROM tblmstconfiguration as config WHERE config.Key = "NoOfKSA" LIMIT 1))/(SELECT COUNT(KSAId) FROM tblmstksa)) AS getksa from tblmstksa AS k GROUP BY CAreaId');
				// foreach($result->result() as $row) {
				// 	$insert = $this->db->query('INSERT INTO tblcandidateksa (CAssessmentId, KSAId) SELECT '.$insert_id.', ksa.KSAId FROM tblmstksa AS ksa  WHERE ksa.CAreaId = '.$row->CAreaId.' order by RAND() LIMIT '.$row->getksa);
				// }

				$i = 0;
				$ksaq = $this->db->query('SELECT Value FROM tblmstconfiguration as config WHERE config.Key = "NoOfKSA" LIMIT 1');
				$ksa = $ksaq->result();
				$totalksa = $ksa[0]->Value; 
				$result = $this->db->query('SELECT CAreaId,round(((SELECT COUNT(k1.KSAId) FROM tblmstksa AS k1 WHERE k1.CAreaId=k.CAreaId) * (SELECT value FROM tblmstconfiguration as config WHERE config.Key = "NoOfKSA" LIMIT 1))/(SELECT COUNT(KSAId) FROM tblmstksa)) AS getksa, ((SELECT COUNT(k1.KSAId) FROM tblmstksa AS k1 WHERE k1.CAreaId=k.CAreaId) - round(((SELECT COUNT(k1.KSAId) FROM tblmstksa AS k1 WHERE k1.CAreaId=k.CAreaId) * (SELECT value FROM tblmstconfiguration as config WHERE config.Key = "NoOfKSA" LIMIT 1))/(SELECT COUNT(KSAId) FROM tblmstksa))) AS leftksam from tblmstksa AS k GROUP BY CAreaId');
				$obj = $result->result();
				foreach($obj as $row) {
					if($row->getksa==0){
						$row->getksa=1;
					}
					$i = +$i + +$row->getksa;
				}
				if($i<$totalksa){
					$q = +$totalksa - +$i;
					$j = 0;
					while($j<$q){
						if($obj[$j].leftksam>0){
							$obj[$j]->getksa = $obj[$j]->getksa + 1;
							$j++;
						}				
					}
				} else if($i>$totalksa){
					$q = +$i - +$totalksa;	
					$j = 0;
					while($j<$q){
						$obj[$j]->getksa = $obj[$j]->getksa - 1;
						$j++;				
					}		
				} 
				foreach($obj as $row) {
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
