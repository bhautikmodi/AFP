<?php

class AuditLog_model extends CI_Model
 {	
	public function getEmailLog() {
	
		$this->db->select('el.EmailLogId,el.From,el.Cc,el.Bcc,el.To,el.Subject,el.MessageBody,el.CreatedOn');
		$result = $this->db->get('tblemaillog as el');		
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}
}
