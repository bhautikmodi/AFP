<?php

class Login_user_model extends CI_Model {

	public function check_login($data) {
		
		$this->db->select('UserId,RoleId,FirstName,LastName,EmailAddress');
		$this->db->from('tbluser');
		$this->db->where('EmailAddress',trim($data['EmailAddress']));
		$this->db->where('Password',md5(trim($data['Password'])));
		$this->db->where('IsActive',1);
		$this->db->limit(1);
		$query = $this->db->get();
		
		if ($query->num_rows() == 1) {
			return $query->result();
		} else {
			return false;
		}
	}	
	
}
