<?php

class Domain_model extends CI_Model
 {

	public function add_domain($post_domain) {
	
		if($post_domain) {
			
			if($post_domain['IsActive']==1){
				$IsActive = true;
			} else {
				$IsActive = false;
			}

			$domain_data = array(
				'Name' => $post_domain['Name'],
				'IsActive' => $IsActive,
				'CreatedBy' => $post_domain['CreatedBy'],
				'UpdatedBy' => $post_domain['UpdatedBy'],
				'UpdatedOn' => date('y-m-d H:i:s'),
			);
			
			$res = $this->db->insert('tblmstdomain',$domain_data);
			
			if($res) {
				return true;
			} else {
				return false;
			}
	
		} else {
			return false;
		}
	}
	
	public function getlist_domain() {
	
		$this->db->select('*');
		$result = $this->db->get('tblmstdomain');
		
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}
	
	
	public function get_domaindata($domain_id = NULL) {
		
		if($domain_id) {
			
			$this->db->select('*');
			$this->db->where('DomainId',$domain_id);
			$result = $this->db->get('tblmstdomain');
			
			$domain_data = array();
			foreach($result->result() as $row) {
				$domain_data = $row;
			}
			return $domain_data;
			
		} else {
			return false;
		}
	}
	
	
	public function edit_domain($post_domain) {
	
		if($post_domain) {

			if($post_domain['IsActive']==1){
				$IsActive = true;
			} else {
				$IsActive = false;
			}

			$domain_data = array(
				'Name' => $post_domain['Name'],
				'IsActive' => $IsActive,
				'UpdatedBy' => $post_domain['UpdatedBy'],
				'UpdatedOn' => date('y-m-d H:i:s'),
			);
			
			$this->db->where('DomainId',$post_domain['DomainId']);
			$res = $this->db->update('tblmstdomain',$domain_data);
			
			if($res) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}	
	
	}
	
	
	public function delete_domain($domain_id) {
	
		if($domain_id) {
			
			$this->db->where('DomainId',$domain_id);
			$res = $this->db->delete('tblmstdomain');
			
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
