<?php

class Settings_model extends CI_Model
 {

	public function add_teamsize($post_teamsize) {
	
		if($post_teamsize) {
						
			$teamsize_data = array(
				'TeamSize' => $post_teamsize['TeamSize'],
				'CreatedBy' => $post_teamsize['CreatedBy'],
				'UpdatedBy' => $post_teamsize['UpdatedBy'],
				'UpdatedOn' => date('y-m-d H:i:s'),
			);
			
			$res = $this->db->insert('tblmstteamsize',$teamsize_data);
			
			if($res) {
				return true;
			} else {
				return false;
			}
	
		} else {
			return false;
		}
	}
	
	public function getlist_teamsize() {
	
		$this->db->select('ts.*');
		$result = $this->db->get('tblmstteamsize as ts');		
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}
	
	
	// public function get_teamsizedata($teamsize_id = NULL) {
		
	// 	if($teamsize_id) {
			
	// 		$this->db->select('*');
	// 		$this->db->where('TeamSizeId',$teamsize_id);
	// 		$result = $this->db->get('tblmstteamsize');
			
	// 		$teamsize_data = array();
	// 		foreach($result->result() as $row) {
	// 			$teamsize_data = $row;
	// 		}
	// 		return $teamsize_data;
			
	// 	} else {
	// 		return false;
	// 	}
	// }
	
	
	public function edit_teamsize($post_teamsize) {
	
		if($post_teamsize) {

			$teamsize_data = array(
				'TeamSize' => $post_teamsize['TeamSize'],
				'UpdatedBy' => $post_teamsize['UpdatedBy'],
				'UpdatedOn' => date('y-m-d H:i:s'),
			);
			
			$this->db->where('TeamSizeId',$post_teamsize['TeamSizeId']);
			$res = $this->db->update('tblmstteamsize',$teamsize_data);
			
			if($res) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}	
	
	}
	
	
	public function delete_teamsize($teamsize_id) {
	
		if($teamsize_id) {
			
			$this->db->where('TeamSizeId',$teamsize_id);
			$res = $this->db->delete('tblmstteamsize');
			
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
