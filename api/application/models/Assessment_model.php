<?php

class Assessment_model extends CI_Model
 {

	public function getlist_ksa() {
	
		$this->db->select('ksa.KSAId,ksa.Name');
		$query = $this->db->get('tblmstksa as ksa');	
		$result = $query->result();
		$data = array();
		$j = -1;
		for($i=0; $i<$query->num_rows(); $i++) {
			if($i==0 || $i%6==0){
				$res = array();
				$j++;
			}			
			array_push($res,$result[$i]);			
			$data[$j]['row'] = $res;
		}
		// if($query->result()) {
		// 	$data = $query->result();
		// }
		return $data;
		
	}
	
}
