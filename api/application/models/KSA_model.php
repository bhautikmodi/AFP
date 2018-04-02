<?php

class KSA_model extends CI_Model
 {

	public function add_ksa($post_ksa) {
	
		if($post_ksa) {
			
			if($post_ksa['IsActive']==1){
				$IsActive = true;
			} else {
				$IsActive = false;
			}

			$ksa_data = array(
				'Name' => $post_ksa['Name'],
				'CAreaId' => $post_ksa['CAreaId'],
				'IsActive' => $IsActive,
				'CreatedBy' => $post_ksa['CreatedBy'],
				'UpdatedBy' => $post_ksa['UpdatedBy'],
				'UpdatedOn' => date('y-m-d H:i:s'),
			);
			
			$res = $this->db->insert('tblmstksa',$ksa_data);
			
			if($res) {
				return true;
			} else {
				return false;
			}
	
		} else {
			return false;
		}
	}
	
	public function getlist_ksa() {
	
		$this->db->select('ksa.KSAId,ksa.Name as ksaName,ksa.IsActive,area.CAreaId,area.Name as CAreaName,(SELECT COUNT(*) FROM tblcandidateksa as ck WHERE ksa.KSAId=ck.KSAId) as isdisabled');
		$this->db->join('tblmstcompetencyarea area', 'ksa.CAreaId = area.CAreaId', 'left');
		$result = $this->db->get('tblmstksa ksa');
		
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}
	
	
	public function get_ksadata($ksa_id = NULL) {
		
		if($ksa_id) {
			
			$this->db->select('*');
			$this->db->where('KSAId',$ksa_id);
			$result = $this->db->get('tblmstksa');
			
			$ksa_data = array();
			foreach($result->result() as $row) {
				$ksa_data = $row;
			}
			return $ksa_data;
			
		} else {
			return false;
		}
	}
	
	
	public function edit_ksa($post_ksa) {
	
		if($post_ksa) {
			
			if($post_ksa['IsActive']==1){
				$IsActive = true;
			} else {
				$IsActive = false;
			}

			$ksa_data = array(
				'Name' => $post_ksa['Name'],
				'CAreaId' => $post_ksa['CAreaId'],
				'IsActive' => $IsActive,
				'CreatedBy' => $post_ksa['CreatedBy'],
				'UpdatedBy' => $post_ksa['UpdatedBy'],
				'UpdatedOn' => date('y-m-d H:i:s'),
			);
			
			$this->db->where('KSAId',$post_ksa['KSAId']);
			$res = $this->db->update('tblmstksa',$ksa_data);
			
			if($res) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}	
	
	}
	
	
	public function delete_ksa($ksa_id) {
	
		if($ksa_id) {
			
			$this->db->where('KSAId',$ksa_id);
			$res = $this->db->delete('tblmstksa');
			
			if($res) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
		
	}
	
	public function getCAreaList() {
	
		$this->db->select('CAreaId,Name');
		$this->db->where('IsActive',1);
		$result = $this->db->get('tblmstcompetencyarea');
		
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}
	
}
