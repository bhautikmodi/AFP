<?php

class Sales_dashboard_model extends CI_Model
{
	

	
	//list Industry
	public function getlist_company() {
	
		$this->db->select('CompanyId,Name');
		//$this->db->where('IsActive="1"');
		$result = $this->db->get('tblcompany');
		
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}
	public function getlist_User() {
	
		$this->db->select('UserId,CONCAT(FirstName," ",LastName) as Name');
		//$this->db->where('IsActive="1"');
		$result = $this->db->get('tbluser');
		
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}
	
}