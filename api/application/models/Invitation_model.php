<?php

class Invitation_model extends CI_Model
 {

	public function add_Invitation($post_Invitation) {
		
		if($post_Invitation) {
			if($post_Invitation['IsActive']==1){
				$IsActive = true;
			} else {
				$IsActive = false;
			}
			
			
			
				$this->db->select('*');
				$this->db->from('tbluserinvitation');
				$this->db->where('EmailAddress',trim($post_Invitation['EmailAddress']));
				$this->db->limit(1);
				$query = $this->db->get();
				
				if ($query->num_rows() == 1) {
					return false;
				} else {
					$Invitation_data = array(
						'EmailAddress' => $post_Invitation['EmailAddress'],
						'Code' => $post_Invitation['Code']
					);
					$res = $this->db->insert('tbluserinvitation',$Invitation_data);
					
					if($res) {
						return true;
					} else {
						return false;
					}
				}
	
		} else {
			return false;
		}
	}
	
	public function getlist_Invitation() {

		$this->db->select('UserInvitationId,EmailAddress,Status,Code,IsActive');
		$result = $this->db->get('tbluserinvitation');	
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}
	public function getlist_DesInvitation() {

		$this->db->select('ConfigurationId,Value,IsActive');	
		$this->db->where('Key="Invitation"');
		$result = $this->db->get('tblmstconfiguration');	
		
			$Desinvi_data = array();
			foreach($result->result() as $row) {
				$Desinvi_data = $row;
			}
			return $Desinvi_data;
		
		
	}
	public function delete_Invitation($Invitation_Id) {
	
	if($Invitation_Id) {
		
			$Invitation_data = array(
				'Status' => 2,
				'code' =>''
			
			);
			
			$this->db->where('UserInvitationId',$Invitation_Id);
			$res = $this->db->update('tbluserinvitation',$Invitation_data);
			
			if($res) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}	
		
	}
	public function ReInvite_Invitation($post_Invitation) {
	
	if($post_Invitation) {
		
			$Invitation_data = array(
				'Status' => 0,
				'code' =>$post_Invitation['Code'],
				'CreatedOn' => date('y-m-d H:i:s'),
				'UpdatedOn' => date('y-m-d H:i:s')
				
			
			);
			
			$this->db->where('UserInvitationId',$post_Invitation['UserInvitationId']);
			$res = $this->db->update('tbluserinvitation',$Invitation_data);
			
			if($res) {
				return true;
			} else {
				return false;
			}
		}
		else {
			
			return false;
		}	
		
	}
	
	public function Invitation_code($post_Invitation) 
	{      
		
		$datetime1=date('Y-m-d',strtotime('-'.'30'.'days'));
		$this->db->select('UserInvitationId');	
		$this->db->where('EmailAddress',trim($post_Invitation['EmailAddress']));
		$this->db->where('UpdatedOn >',$datetime1);
		$this->db->limit(1);
		$result = $this->db->get('tbluserinvitation');	
		if ($result->num_rows() == 1) 
		{
	
				$this->db->select('UserInvitationId,Status');				
				$this->db->where('EmailAddress',trim($post_Invitation['EmailAddress']));
				$this->db->where('Code',trim($post_Invitation['Code']));
				$this->db->limit(1);
				$this->db->from('tbluserinvitation');
				$query = $this->db->get();
			
				if ($query->num_rows() == 1) 
				{
					return 'true';
				
				} else
				{
					$this->db->select('UserInvitationId,Status');				
					$this->db->where('EmailAddress',trim($post_Invitation['EmailAddress']));
					$this->db->where('Status',2);
					$this->db->from('tbluserinvitation');
					$query = $this->db->get();
				
					if($query->num_rows() == 1)
					{
						return 'revoked';
						
					}else
					{
						return 'code';
						
					}
					
				}
		}else
		{
				$this->db->select('UserInvitationId');	
				$this->db->where('EmailAddress',trim($post_Invitation['EmailAddress']));
				$result = $this->db->get('tbluserinvitation');	
				if($result->num_rows() == 1)
							{
								return 'days';
								
							}else
							{
								
								return 'email';
								
							}
			
		}
		
		
	}
	
	
}
