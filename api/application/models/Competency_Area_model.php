<?php

class Competency_Area_model extends CI_Model
 {

	public function add_area($post_area) {
	
		if($post_area) {
			
			if($post_area['IsActive']==1){
				$IsActive = true;
			} else {
				$IsActive = false;
			}

			$area_data = array(
				'Name' => $post_area['Name'],
				'DomainId' => $post_area['DomainId'],
				'Description' => $post_area['Description'],
				'KeyConcepts' => $post_area['KeyConcepts'],
				'IsActive' => $IsActive,
				'CreatedBy' => $post_area['CreatedBy'],
				'UpdatedBy' => $post_area['UpdatedBy'],
				'UpdatedOn' => date('y-m-d H:i:s'),
			);
			
			$res = $this->db->insert('tblmstcompetencyarea',$area_data);
			
			if($res) {
				return true;
			} else {
				return false;
			}
	
		} else {
			return false;
		}
	}
	
	public function getlist_area() {
	
		$this->db->select('area.CAreaId,area.Name as AreaName,area.Description,area.KeyConcepts,area.IsActive,domain.DomainId,domain.Name as DomainName,(SELECT COUNT(mk.KSAId) FROM tblmstksa as mk WHERE area.CAreaId=mk.CAreaId) as isdisabled');
		$this->db->join('tblmstdomain domain', 'area.DomainId = domain.DomainId', 'left');
		$result = $this->db->get('tblmstcompetencyarea area');
		
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}
	
	
	public function get_areadata($area_id = NULL) {
		
		if($area_id) {
			
			$this->db->select('area.CAreaId,area.DomainId,area.Name,area.Description,area.KeyConcepts,area.IsActive,(SELECT COUNT(mk.KSAId) FROM tblmstksa as mk WHERE area.CAreaId=mk.CAreaId) as isdisabled');
			$this->db->where('CAreaId',$area_id);
			$result = $this->db->get('tblmstcompetencyarea area');
			
			$area_data = array();
			foreach($result->result() as $row) {
				$area_data = $row;
			}
			return $area_data;
			
		} else {
			return false;
		}
	}
	
	
	public function edit_area($post_area) {
	
		if($post_area) {
			
			if($post_area['IsActive']==1){
				$IsActive = true;
			} else {
				$IsActive = false;
			}

			$area_data = array(
				'Name' => $post_area['Name'],
				'DomainId' => $post_area['DomainId'],
				'Description' => $post_area['Description'],
				'KeyConcepts' => $post_area['KeyConcepts'],
				'IsActive' => $IsActive,
				'UpdatedBy' => $post_area['UpdatedBy'],
				'UpdatedOn' => date('y-m-d H:i:s'),
			);
			
			$this->db->where('CAreaId',$post_area['CAreaId']);
			$res = $this->db->update('tblmstcompetencyarea',$area_data);
			
			if($res) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}	
	
	}
	
	
	public function delete_area($area_id) {
	
		if($area_id) {
			
			$this->db->where('CAreaId',$area_id);
			$res = $this->db->delete('tblmstcompetencyarea');
			
			if($res) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}

		// if($area_id) {			
			
		// 	$this->db->select('KSAId');
		// 	$this->db->where('CAreaId',$area_id);
		// 	$result = $this->db->get('tblmstksa');
		// 	if($result->num_rows()==0){
		// 		$this->db->where('CAreaId',$area_id);
		// 		$res = $this->db->delete('tblmstcompetencyarea');
				
		// 		if($res) {
		// 			return true;
		// 		} else {
		// 			return false;
		// 		}
		// 	} else {
		// 		return false;
		// 	}			
		// } else {
		// 	return false;
		// }
		
	}
	
	public function getDomainList() {
	
		$this->db->select('DomainId,Name,IsActive');
		//$this->db->where('IsActive',1);
		$result = $this->db->get('tblmstdomain');
		
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}
	
}
