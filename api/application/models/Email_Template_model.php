<?php

class Email_Template_model extends CI_Model
 {

	public function add_email($post_email) {
	
		if($post_email) {
			
			if($post_email['IsActive']==1){
				$IsActive = true;
			} else {
				$IsActive = false;
			}
			if(!empty($post_email['To'])){
				$To = implode(",",$post_email['To']);
			} else {
				$To = '';
			}
			if(!empty($post_email['Cc'])){
				$Cc = implode(",",$post_email['Cc']);
			} else {
				$Cc = '';
			}
			if(!empty($post_email['Bcc'])){
				$Bcc = implode(",",$post_email['Bcc']);
			} else {
				$Bcc = '';
			}
			if(isset($post_email['ToEmail']) && !empty($post_email['ToEmail'])){
				$ToEmail = implode(",",$post_email['ToEmail']);
			} else {
				$ToEmail = '';
			}	
			if(isset($post_email['CcEmail']) && !empty($post_email['CcEmail'])){
				$CcEmail = implode(",",$post_email['CcEmail']);
			} else {
				$CcEmail = '';
			}	
			if(isset($post_email['BccEmail']) && !empty($post_email['BccEmail'])){
				$BccEmail = implode(",",$post_email['BccEmail']);
			} else {
				$BccEmail = '';
			}			

			$email_data = array(
				'Token' => $post_email['Token'],
				'Subject' => $post_email['Subject'],
				'EmailBody' => $post_email['EmailBody'],
				'To' => $To,
				'Cc' => $Cc,
				'Bcc' => $Bcc,
				'ToEmail' => $ToEmail,
				'CcEmail' => $CcEmail,
				'BccEmail' => $BccEmail,
				'IsActive' => $IsActive,
				'CreatedBy' => $post_email['CreatedBy'],
				'UpdatedBy' => $post_email['UpdatedBy'],
				'UpdatedOn' => date('y-m-d H:i:s'),
			);
			
			$res = $this->db->insert('tblemailtemplate',$email_data);
			
			if($res) {
				return true;
			} else {
				return false;
			}
	
		} else {
			return false;
		}
	}
	
	public function getlist_email() {
	
		$this->db->select('EmailId,Token,Subject,EmailBody,To,Cc,Bcc,ToEmail,CcEmail,BccEmail,IsActive');
		$result = $this->db->get('tblemailtemplate');
		
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		foreach($res as $row) {
			$row->To = str_replace("1","Admin",$row->To);
			$row->To = str_replace("2","Sales",$row->To);
			$row->To = str_replace("3","General User",$row->To);
			$row->Cc = str_replace("1","Admin",$row->Cc);
			$row->Cc = str_replace("2","Sales",$row->Cc);
			$row->Cc = str_replace("3","General User",$row->Cc);
			$row->Bcc = str_replace("1","Admin",$row->Bcc);
			$row->Bcc = str_replace("2","Sales",$row->Bcc);
			$row->Bcc = str_replace("3","General User",$row->Bcc);
		}
		return $res;
		
	}
	
	
	public function get_emaildata($email_id = NULL) {
		
		if($email_id) {
			
			$this->db->select('EmailId,Token,Subject,EmailBody,To,Cc,Bcc,ToEmail,CcEmail,BccEmail,IsActive');
			$this->db->where('EmailId',$email_id);
			$result = $this->db->get('tblemailtemplate');
			
			$email_data = array();
			foreach($result->result() as $row) {				
				$row->To = explode(",",$row->To);
				$row->Cc = explode(",",$row->Cc);
				$row->Bcc = explode(",",$row->Bcc);
				$email_data = $row;
			}
			return $email_data;
			
		} else {
			return false;
		}
	}
	
	
	public function edit_email($post_email) {
	
		if($post_email) {
			
			if($post_email['IsActive']==1){
				$IsActive = true;
			} else {
				$IsActive = false;
			}
			if(!empty($post_email['To'])){
				$To = implode(",",$post_email['To']);
			} else {
				$To = '';
			}
			if(!empty($post_email['Cc'])){
				$Cc = implode(",",$post_email['Cc']);
			} else {
				$Cc = '';
			}
			if(!empty($post_email['Bcc'])){
				$Bcc = implode(",",$post_email['Bcc']);
			} else {
				$Bcc = '';
			}	
			if(isset($post_email['ToEmail']) && !empty($post_email['ToEmail'])){
				$ToEmail = implode(",",$post_email['ToEmail']);
			} else {
				$ToEmail = '';
			}	
			if(isset($post_email['CcEmail']) && !empty($post_email['CcEmail'])){
				$CcEmail = implode(",",$post_email['CcEmail']);
			} else {
				$CcEmail = '';
			}	
			if(isset($post_email['BccEmail']) && !empty($post_email['BccEmail'])){
				$BccEmail = implode(",",$post_email['BccEmail']);
			} else {
				$BccEmail = '';
			}	

			$email_data = array(
				'Token' => $post_email['Token'],
				'Subject' => $post_email['Subject'],
				'EmailBody' => $post_email['EmailBody'],
				'To' => $To,
				'Cc' => $Cc,
				'Bcc' => $Bcc,
				'ToEmail' => $ToEmail,
				'CcEmail' => $CcEmail,
				'BccEmail' => $BccEmail,
				'IsActive' => $IsActive,
				'UpdatedBy' => $post_email['UpdatedBy'],
				'UpdatedOn' => date('y-m-d H:i:s'),
			);
			
			$this->db->where('EmailId',$post_email['EmailId']);
			$res = $this->db->update('tblemailtemplate',$email_data);
			
			if($res) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}	
	
	}
	
	
	public function delete_email($email_id) {
	
		if($email_id) {
			
			$this->db->where('EmailId',$email_id);
			$res = $this->db->delete('tblemailtemplate');
			
			if($res) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}

	}

	public function getRoleList() {
	
		$this->db->select('RoleId,RoleName,IsActive');
		$this->db->where('RoleName!=','IT');
		$result = $this->db->get('tblmstuserrole');
		
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;		
	}

	public function getPlaceholderList() {
	
		$this->db->select('PlaceholderId,PlaceholderName,IsActive');
		$this->db->where('IsActive',1);
		$result = $this->db->get('tblmstemailplaceholder');
		
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;		
	}
	
}
