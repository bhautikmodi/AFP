<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Invitation extends CI_Controller {


	public function __construct() {
	
		parent::__construct();
		
		$this->load->model('Invitation_model');
		
	}
	
	public function getAll() {
		
		$data="";
		
		$data['Inv']=$this->Invitation_model->getlist_Invitation();
		
		$data['Disinv']=$this->Invitation_model->getlist_DesInvitation();
	
		echo json_encode($data);
				
	}
	
	
	public function add() {
								
		$post_Invitation = json_decode(trim(file_get_contents('php://input')), true);		
		if ($post_Invitation) {
			if($post_Invitation['UserInvitationId'] > 0){
				$result = $this->Invitation_model->edit_Invitation($post_Invitation);
				if($result) {
					//echo json_encode($post_Invitation);	
				}	
			} else {
				
				$post_Invitation['Code']=mt_rand(100000, 999999);
				$result = $this->Invitation_model->add_Invitation($post_Invitation);
				if($result) {
					//echo json_encode($post_Invitation);	
					$config['protocol']='smtp';
					$config['smtp_host']='ssl://smtp.googlemail.com';
					$config['smtp_port']='465';
					$config['smtp_user']='myopeneyes3937@gmail.com';
					$config['smtp_pass']='W3lc0m3@2018';
					$config['charset']='utf-8';
					$config['newline']="\r\n";
					$config['mailtype'] = 'html';	
										
					$this->email->initialize($config);

					$this->email->from('myopeneyes3937@gmail.com','Email Test');
					$this->email->to($post_Invitation['EmailAddress']);		
					$this->email->subject('Invitation mail');
					$this->email->message('sending mail recive.....'.$post_Invitation['Code']);
					if($this->email->send())
					{
						echo json_encode("success");
					}else
					{
						echo json_encode("notsend");
					}
				}	else{
					
					echo json_encode("email duplicate");
				}
			}							
		}
		
	}
	public function delete($Invitation_Id = NULL) {
		
		if(!empty($Invitation_Id)) {

			$result = $this->Invitation_model->delete_Invitation($Invitation_Id);			
			if($result) {
				echo json_encode("Revoke successfully");	
			}	
			
		} 
			
	}
	public function ReInvite() {
		$post_Invitation = json_decode(trim(file_get_contents('php://input')), true);
		if(!empty($post_Invitation)) {
	
			$post_Invitation['Code']=mt_rand(100000,999999);
			$result = $this->Invitation_model->ReInvite_Invitation($post_Invitation);			
			if($result) {
				$config['protocol']='smtp';
					$config['smtp_host']='ssl://smtp.googlemail.com';
					$config['smtp_port']='465';
					$config['smtp_user']='myopeneyes3937@gmail.com';
					$config['smtp_pass']='W3lc0m3@2018';
					$config['charset']='utf-8';
					$config['newline']="\r\n";
					$config['mailtype'] = 'html';	
										
					$this->email->initialize($config);

					$this->email->from('myopeneyes3937@gmail.com','Email Test');
					$this->email->to($post_Invitation['EmailAddress']);		
					$this->email->subject('Invitation mail');
					$this->email->message('change mail recive.....'.$post_Invitation['Code']);
					if($this->email->send())
					{
						
						echo json_encode("success");
					}else
					{
						echo json_encode("error");
					}
					
			}	
			
		} 
			
	}
	
	public function code()
		{
								
		$post_Invitation = json_decode(trim(file_get_contents('php://input')), true);		
		if ($post_Invitation)
			{
			
				$result = $this->Invitation_model->Invitation_code($post_Invitation);
				if($result)
				{
					echo json_encode("Code success");
				}	
				else
				{
					
					echo json_encode("Code duplicate");
				}
										
		}
		
	}

	
	
}
