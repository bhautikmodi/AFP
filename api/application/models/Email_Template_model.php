<?php

class Email_Template_model extends CI_Model
 {

	public function add_email($post_email) {
	
		if($post_email) {
			
			if($post_email['check']==0){
				if($post_email['IsActive']==1){

					$this->db->select('EmailId');
					$this->db->where('Token',$post_email['Token']);
					$this->db->where('To',$post_email['To']);
					$this->db->where('IsActive',true);
					$query = $this->db->get('tblemailtemplate');
					
					if($query->num_rows() > 0){
						return 'sure';		
					} 
				}	
			}	
			
			if($post_email['IsActive']==1){
				$email_updatedata = array(
					'IsActive' => false,
				);
				$this->db->where('Token',$post_email['Token']);
				$this->db->where('To',$post_email['To']);
				$this->db->where('IsActive',true);
				$update_res = $this->db->update('tblemailtemplate',$email_updatedata);
			}

			if($post_email['IsActive']==1){
				$IsActive = true;
			} else {
				$IsActive = false;
			}
			if(isset($post_email['ToEmail']) && !empty($post_email['ToEmail'])){
				$ToEmail = $post_email['ToEmail'];
			} else {
				$ToEmail = '';
			}	
			if(isset($post_email['CcEmail']) && !empty($post_email['CcEmail'])){
				$CcEmail = $post_email['CcEmail'];
			} else {
				$CcEmail = '';
			}	
			if(isset($post_email['BccEmail']) && !empty($post_email['BccEmail'])){
				$BccEmail = $post_email['BccEmail'];
			} else {
				$BccEmail = '';
			}		
			$email_data = array(
				'Token' => $post_email['Token'],
				'Subject' => $post_email['Subject'],
				'EmailBody' => $post_email['EmailBody'],
				'To' => $post_email['To'],
				'Cc' => $post_email['Cc'],
				'Bcc' => $post_email['Bcc'],
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
	
		$this->db->select('et.EmailId,et.Token,et.Subject,et.EmailBody,et.To,et.Cc,et.Bcc,et.IsActive,role1.RoleName as roleTo,role2.RoleName as roleCc,role3.RoleName as roleBcc');
		$this->db->join('tblmstuserrole role1', 'role1.RoleId = et.To', 'left');
		$this->db->join('tblmstuserrole role2', 'role2.RoleId = et.Cc', 'left');
		$this->db->join('tblmstuserrole role3', 'role3.RoleId = et.Bcc', 'left');
		$result = $this->db->get('tblemailtemplate as et');
		
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;		
	}
	
	
	public function get_emaildata($email_id = NULL) {
		
		if($email_id) {
			
			$this->db->select('EmailId,Token,Subject,EmailBody,To,Cc,Bcc,ToEmail,CcEmail,BccEmail,IsActive');
			$this->db->where('EmailId',$email_id);
			$result = $this->db->get('tblemailtemplate');
			
			$email_data = array();
			foreach($result->result() as $row){
				$email_data = $row;
			}
			return $email_data;
			
		} else {
			return false;
		}
	}
	
	
	public function edit_email($post_email) {
	
		if($post_email) {
			
			if($post_email['check']==0){
				if($post_email['IsActive']==1){

					$this->db->select('EmailId');
					$this->db->where('Token',$post_email['Token']);
					$this->db->where('To',$post_email['To']);
					$this->db->where('IsActive',true);
					$query = $this->db->get('tblemailtemplate');
					
					if($query->num_rows() > 0){
						return 'sure';		
					} 
				}	
			}	
			
			if($post_email['IsActive']==1){
				$email_updatedata = array(
					'IsActive' => false,
				);
				$this->db->where('Token',$post_email['Token']);
				$this->db->where('To',$post_email['To']);
				$this->db->where('IsActive',true);
				$update_res = $this->db->update('tblemailtemplate',$email_updatedata);
			}
						
			if($post_email['IsActive']==1){
				$IsActive = true;
			} else {
				$IsActive = false;
			}
			if(isset($post_email['ToEmail']) && !empty($post_email['ToEmail'])){
				$ToEmail = $post_email['ToEmail'];
			} else {
				$ToEmail = '';
			}	
			if(isset($post_email['CcEmail']) && !empty($post_email['CcEmail'])){
				$CcEmail = $post_email['CcEmail'];
			} else {
				$CcEmail = '';
			}	
			if(isset($post_email['BccEmail']) && !empty($post_email['BccEmail'])){
				$BccEmail = $post_email['BccEmail'];
			} else {
				$BccEmail = '';
			}		
			$email_data = array(
				'Token' => $post_email['Token'],
				'Subject' => $post_email['Subject'],
				'EmailBody' => $post_email['EmailBody'],
				'To' => $post_email['To'],
				'Cc' => $post_email['Cc'],
				'Bcc' => $post_email['Bcc'],
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
