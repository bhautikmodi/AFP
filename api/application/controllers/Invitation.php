<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Invitation extends CI_Controller {


	public function __construct() {
	
		parent::__construct();
		
		$this->load->model('Invitation_model');
		
	}

	public function check(){

		$config['protocol']='smtp';
		$config['smtp_host']='ssl://smtp.googlemail.com';
		$config['smtp_port']='465';
		$config['smtp_user']='myopeneyes3937@gmail.com';
		$config['smtp_pass']='W3lc0m3@2018';
		$config['charset']='utf-8';
		$config['newline']="\r\n";
		$config['mailtype'] = 'html';							
		$this->email->initialize($config);

		$query = $this->db->query("SELECT et.Subject,et.EmailBody,et.ToEmail,et.CcEmail,et.BccEmail,(SELECT GROUP_CONCAT(UserId SEPARATOR ',') FROM tbluser WHERE RoleId = et.To && ISActive = 1) AS totalTo,(SELECT GROUP_CONCAT(EmailAddress SEPARATOR ',') FROM tbluser WHERE RoleId = et.Cc && ISActive = 1) AS totalcc,(SELECT GROUP_CONCAT(EmailAddress SEPARATOR ',') FROM tbluser WHERE RoleId = et.Bcc && ISActive = 1) AS totalbcc FROM tblemailtemplate AS et WHERE et.Token = 'Registration' && et.IsActive = 1");
		foreach($query->result() as $row){ 			
			 $userId_ar = explode(',', $row->totalTo);			 
			 foreach($userId_ar as $userId){
				$queryTo = $this->db->query('SELECT EmailAddress FROM tbluser where UserId = '.$userId); 
				$rowTo = $queryTo->result();
				$query1 = $this->db->query('SELECT p.PlaceholderId,p.PlaceholderName,t.TableName,c.ColumnName FROM tblmstemailplaceholder AS p LEFT JOIN tblmsttablecolumn AS c ON c.ColumnId = p.ColumnId LEFT JOIN tblmsttable AS t ON t.TableId = c.TableId');
				$body = $row->EmailBody;
				foreach($query1->result() as $row1){			
					$query2 = $this->db->query('SELECT '.$row1->ColumnName.' AS ColumnName FROM '.$row1->TableName.' AS tn WHERE tn.UserId = '.$userId);
					$result2 = $query2->result();
					$body = str_replace("{ ".$row1->PlaceholderName." }",$result2[0]->ColumnName,$body);					
				} 
				echo "<pre>"; print_r($rowTo[0]->EmailAddress);
				// echo $body; echo "<br/>";
				// echo $row->CcEmail; echo "<br/>";
				// echo $row->BccEmail; echo "<br/>";
				// echo $row->Subject; echo "<br/>";
				// echo $row->Subject; echo "<br/>";
				// $this->email->from('myopeneyes3937@gmail.com');
				// $this->email->to($row->);		
				// $this->email->subject();
				// $this->email->cc();
				// $this->email->bcc();
				// $this->email->message($body);
				// if($this->email->send())
				// {
				// 	echo 'success';
				// }else
				// {
				// 	echo 'fail';
				// }
			 } 
		}
		die;		
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
					//$this->email->message('sending mail recive.....'.$post_Invitation['Code']);
					$this->email->message('<table style="font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:22px; color:#000; border:1px solid #0333; width:600px; margin:0 auto;" cellpadding="0" cellspacing="0" border="0">
					<tr>
						<td style="padding:10px; border-bottom:1px solid #ccc; background:url(https://www.afponline.org/assets/images/afp-pattern.png) right -50px no-repeat #fafafa; background-size:300px;"><img src="https://www.afponline.org/assets/images/afp-logo.png" alt="" style="width:250px;" /></td>
					</tr>
					
					<tr>
						<td style="padding:10px;">
							<p style="color:#007699;"><strong>Hi,</strong></p>
							
							<p>Welcome to <strong>Association for Financial Professionals</strong>.</p>
							<br>
							<p>This is a user verification code.This code is use for the registration.So,please keep it the new user registration</p>
							
							
							
						</td>
					</tr>
					<tr>
						<td style="padding:10px;">
							
							
							
							<p>Invitation code '.$post_Invitation['Code'].'</p>
							<p><strong>Regards,<br><span style="color:#007699;">AFP TEAM</span></strong></p>
						</td>
					</tr>
					<tr>
						<td style="padding:10px; border-top:1px solid #ccc; background:#0085AD; text-align:center; color:#fff;">Copyright © 2018 Association for Financial Professionals - All rights reserved. </td>
					</tr>
				</table>');

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
