<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Invitation extends CI_Controller {


	public function __construct() {
	
		parent::__construct();
		
		$this->load->model('Invitation_model');
		
	}

	public function check(){


		$query = $this->db->query("SELECT et.Subject,et.EmailBody,et.ToEmail,et.CcEmail,et.BccEmail,(SELECT GROUP_CONCAT(UserId SEPARATOR ',') FROM tbluser WHERE RoleId = et.To && ISActive = 1) AS totalTo,(SELECT GROUP_CONCAT(EmailAddress SEPARATOR ',') FROM tbluser WHERE RoleId = et.Cc && ISActive = 1) AS totalcc,(SELECT GROUP_CONCAT(EmailAddress SEPARATOR ',') FROM tbluser WHERE RoleId = et.Bcc && ISActive = 1) AS totalbcc FROM tblemailtemplate AS et WHERE et.Token = 'Registration' && et.IsActive = 1");

		foreach($query->result() as $row){
			 $userId_ar = explode(',', $row->totalTo);
			 foreach($userId_ar as $userId){
				$query1 = $this->db->query('SELECT p.PlaceholderId,p.PlaceholderName,t.TableName,c.ColumnName FROM tblmstemailplaceholder AS p LEFT JOIN tblmsttablecolumn AS c ON c.ColumnId = p.ColumnId LEFT JOIN tblmsttable AS t ON t.TableId = c.TableId');
				foreach($query1->result() as $row1){
					$query2 = $this->db->query('SELECT '.$row1->ColumnName.' AS ColumnName FROM '.$row1->TableName.' AS tn WHERE tn.UserId = '.$userId);
					$result2 = $query2->result();
					//echo "{ ".$row1->PlaceholderName." }";
					$row->EmailBody = str_replace("{ ".$row1->PlaceholderName." }",$result2[0]->ColumnName,$row->EmailBody);
					//echo $result2[0]->ColumnName;
					//echo "<pre>"; print_r($result2[0]->$row1->ColumnName);					
				}
				echo $row->EmailBody;
			 }
		}
		die;

		
		 

		// $config['protocol']='smtp';
		// $config['smtp_host']='ssl://smtp.googlemail.com';
		// $config['smtp_port']='465';
		// $config['smtp_user']='myopeneyes3937@gmail.com';
		// $config['smtp_pass']='W3lc0m3@2018';
		// $config['charset']='utf-8';
		// $config['newline']="\r\n";
		// $config['mailtype'] = 'html';							
		// $this->email->initialize($config);

		// $this->email->from('myopeneyes3937@gmail.com');
		// $this->email->to('vidhi.bathani@theopeneyes.in');		
		// $this->email->subject('Invitation mail');
		// $this->email->cc('vidhi.shekhat@gmail.com,nirav.patel@theopeneyes.in');
		// $this->email->bcc('vidhi.bathani@theopeneyes.in,mitesh.patel@theopeneyes.in');
		// $this->email->message('hi vidhi, sending mail recive.....');
		// if($this->email->send())
		// {
		// 	echo 'success';
		// }else
		// {
		// 	echo 'fail';
		// }
	}
	
	public function getAll() {
		
		$data="";
		
		$data['Inv']=$this->Invitation_model->getlist_Invitation();
		
		$data['Disinv']=$this->Invitation_model->getlist_DesInvitation();
	
		echo json_encode($data);
				
	}
	
	public function getAllIndustry()
	{
		$data="";	
	
		$data=$this->Invitation_model->getlist_Industry();
	
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
				
				if($result=='days')
				{
					echo json_encode("days");
				}elseif($result=='revoked')
				{
					echo json_encode("revoked");
				}elseif($result=='email')
				{
					echo json_encode("email");
				}
				elseif($result=='code')
				{
					echo json_encode("code");
				}
				else{
					echo json_encode($result);
				}
										
		}
		
	}

	
	
}
