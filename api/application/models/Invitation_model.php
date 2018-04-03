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
				$this->db->from('tblUserInvitation');
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
		
			$res = $this->db->insert('tblUserInvitation',$Invitation_data);
			
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
	public function getlist_DesInvitation() {

		$this->db->select('*');	
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
				$this->db->select('UserInvitationId');				
				$this->db->where('EmailAddress',trim($post_Invitation['EmailAddress']));
				$this->db->where('Code',trim($post_Invitation['Code']));
				$this->db->limit(1);
				$this->db->from('tblUserInvitation');
				$query = $this->db->get();
				
				if ($query->num_rows() == 1) 
				{
					$Invitation_data = array(
						'Status' =>2 ,
						'code' =>'',
						'CreatedOn' => date('y-m-d H:i:s'),
						'UpdatedOn' => date('y-m-d H:i:s')
					);
			
					$this->db->where('EmailAddress',trim($post_Invitation['EmailAddress']));
					$this->db->where('Code',trim($post_Invitation['Code']));
					$res = $this->db->update('tbluserinvitation',$Invitation_data);
					if($res)
					{
					    return true;
					}else
					{
						return false;
					}
				
				} else
				{
					return false;
				}
				
				
	
		
	}
	
	
}
