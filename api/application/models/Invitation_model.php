<?php

class Invitation_model extends CI_Model
 {
	
	public	function getlist_Industry()
	{
		$this->db->select('*');
		$this->db->where('IsActive="1"');
		$result=$this->db->get('tblmstindustry');
		
		$res=array();
		if($result->result())
		{
			$res=$result->result();
		}
		return $res;
	}
	
	public function add_Invitation($post_Invitation) {
		
		if($post_Invitation) {
			if($post_Invitation['IsActive']==1){
				$IsActive = true;
			} else {
				$IsActive = false;
			}
			
			
			
				$this->db->select('EmailAddress');
				$this->db->from('tbluserinvitation');
				$this->db->where('EmailAddress',trim($post_Invitation['EmailAddress']));
				$this->db->limit(1);
				$query = $this->db->get();
				
				if ($query->num_rows() == 1) {
					return false;
				} else {
					$company_data=array(
			
						"Name"=>$post_Invitation['Name'],
						"IndustryId"=>$post_Invitation['IndustryId'],
						"Website"=>$post_Invitation['Website'],
						"PhoneNo"=>$post_Invitation['PhoneNumber1'],
						"CreatedBy" =>1,
						"UpdatedBy" =>1
					);	
					
					$query=$this->db->insert('tblcompany',$company_data);

					$this->db->select('CompanyId');
					$this->db->order_by('CompanyId','desc');
					$this->db->limit(1);
					$result=$this->db->get('tblcompany');
					
						$company_data = array();
						foreach($result->result() as $row) 
						{
							$company_data = $row;
						}
				
					$Invitation_data = array(
							'CompanyId' =>$company_data->CompanyId,
						'EmailAddress' => $post_Invitation['EmailAddress'],
						'Code' => $post_Invitation['Code'],
						'UpdatedOn' => date('y-m-d H:i:s')
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

		$this->db->select('ui.UserInvitationId,ui.EmailAddress,ui.Status,ui.CompanyId,ui.Code,ui.IsActive,ui.UpdatedOn,tc.CompanyId,tc.Name');
		$this->db->join('tblcompany tc', 'ui.CompanyId = tc.CompanyId', 'left');
		$result = $this->db->get('tbluserinvitation ui');	
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
				'code' =>'',
				'UpdatedOn' => date('y-m-d H:i:s')
			
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
	
	
	
	
}
