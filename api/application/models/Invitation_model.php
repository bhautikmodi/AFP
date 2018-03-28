<?php

class Invitation_model extends CI_Model
 {

	public function add_Invitation($post_Invitation) {
		$otp=mt_rand(100000, 999999);
		if($post_Invitation) {
			if($post_Invitation['IsActive']==1){
				$IsActive = true;
			} else {
				$IsActive = false;
			}
			$Invitation_data = array(
			
				'EmailAddress' => $post_Invitation['EmailAddress'],
				'Code' => $otp
			
			);
			
			$res = $this->db->insert('tblUserInvitation',$Invitation_data);
			
			if($res) {
				return true;
			} else {
				return false;
			}
	
		} else {
			return false;
		}
	}
	
	public function getlist_Invitation() {
	//$this->db->select('con.*,(SELECT COUNT(*) FROM tblmstcourse as mc WHERE mc.CourseLevelId=con.ConfigurationId) as isdisabled');
		//$result = $this->db->get('tblUserInvitation as con');	
		$this->db->select('*');
		$result = $this->db->get('tblUserInvitation');	
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}
	
	
	
	
	
}
