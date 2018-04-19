<?php
defined('BASEPATH') OR exit('No direct script access allowed');
use \Firebase\JWT\JWT;

class Register extends CI_Controller 
{	
	public function __construct()
	{
		parent::__construct();
		$this->load->model('Register_model');
		include APPPATH . 'vendor/firebase/php-jwt/src/JWT.php';
	}
	
	
	
		public function getAllCountry()
	{
		
				$data="";
				
				$data=$this->Register_model->getlist_country();

				
				echo json_encode($data);
		
	}
	public function getCompany($CompanyId = NULL)
	{
		if(!empty($CompanyId)) 
		{
				$data="";
				
				$data=$this->Register_model->company_default($CompanyId);
				
				echo json_encode($data);
		}
	}
	// List all state
	public function getAllState()
	{
		$data="";
		
		$data=$this->Register_model->getlist_state();
		
		echo json_encode($data);
	}
	public function getStateList($country_id = NULL) {
		
		if(!empty($country_id)) {
			
			$result = [];
			$result = $this->Register_model->getStateList($country_id);			
			echo json_encode($result);				
		}			
	}
	
	public function addRegister()
	{
		$post_user = json_decode(trim(file_get_contents('php://input')), true);

					
		if ($post_user) 
			{			
			if($post_user['UserId']>0)
				{
					$result = $this->Register_model->edit_user($post_user);
					if($result)
					{
						echo json_encode($post_user);	
					}	
				}
				else
				{
					
					$result = $this->Register_model->add_Register($post_user); 
					//print_r($result);exit;
					if($result)
					{
							$token = array(
							"UserId" => $result[0]->UserId,
							"RoleId" => $result[0]->RoleId,
							"EmailAddress" => $result[0]->EmailAddress,
							"FirstName" => $result[0]->FirstName,
							"LastName" => $result[0]->LastName
							);

							$jwt = JWT::encode($token, "MyGeneratedKey","HS256");
							$output['token'] = $jwt;
						
						//echo json_encode('success');
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
					$this->email->to($post_user['EmailAddress']);
					
					
					$this->email->subject('Sending mail');
					//$this->email->message('sending mail recive.....');
					$this->email->message('<table style="font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:22px; color:#000; border:1px solid #0333; width:600px; margin:0 auto;" cellpadding="0" cellspacing="0" border="0">
					<tr>
						<td style="padding:10px; border-bottom:1px solid #ccc; background:url(https://www.afponline.org/assets/images/afp-pattern.png) right -50px no-repeat #fafafa; background-size:300px;"><img src="https://www.afponline.org/assets/images/afp-logo.png" alt="" style="width:250px;" /></td>
					</tr>
					
					<tr>
						<td style="padding:10px;">
							<p style="color:#007699;"><strong>Hello, '.$post_user['FirstName'].'</strong></p>
							
							<p>Welcome to <strong>Association for Financial Professionals</strong>.</p>
							<br>
							<p>Thank you for registrartion.</p>
							<p>You are registration successful.</p>	
						</td>
					</tr>
					<tr>
						<td style="padding:10px;">
							<p><strong>Regards,<br><span style="color:#007699;">AFP TEAM</span></strong></p>
						</td>
					</tr>
					<tr>
						<td style="padding:10px; border-top:1px solid #ccc; background:#0085AD; text-align:center; color:#fff;">Copyright © 2018 Association for Financial Professionals - All rights reserved. </td>
					</tr>
				</table>');

				$this->email->send();
				echo json_encode($output);
					}
					else
					{
						echo json_encode('error ');
					}
				}
					
			}
	}
public function getById($user_id=null)
	{	
		
		if(!empty($user_id))
		{
			$data=[];
			$data=$this->Register_model->get_userdata($user_id);
			echo json_encode($data);
		}
	}

	

	
	

}
