<?php
defined('BASEPATH') OR exit('No direct script access allowed');
use \Firebase\JWT\JWT;

class Forgotpass extends CI_Controller 
{	
	public function __construct()
	{
		parent::__construct();
		$this->load->model('Forgotpass_model');
		include APPPATH . 'vendor/firebase/php-jwt/src/JWT.php';
	}
	
	
	public function userpass()
		{
				//$data = {};
						 		
		$post_pass = json_decode(trim(file_get_contents('php://input')), true);		
		if ($post_pass)
			{
				//	http://localhost:4300/resetpass

				$post_pass['VCode']=mt_rand(100000, 999999);
				
				$result = $this->Forgotpass_model->forgot_pass($post_pass);
				if($result)
				{
						 $post_pass['UserId']=$result->UserId;
						//$data = {};
						 $data['UserId']=$post_pass['UserId'];
						 $data['VCode']=$post_pass['VCode'];
						//echo json_encode($post_pass); 
						
						$config['protocol']='smtp';
						$config['smtp_host']='ssl://smtp.googlemail.com';
						$config['smtp_port']='465';
						$config['smtp_user']='myopeneyes3937@gmail.com';
						$config['smtp_pass']='W3lc0m3@2018';
						$config['charset']='utf-8';
						$config['newline']="\r\n";
						$config['mailtype'] = 'html';	
											
						$this->email->initialize($config);

						$this->email->from('myopeneyes3937@gmail.com','Change password AFP account');
						$this->email->to($post_pass['EmailAddress']);
						
						
						$this->email->subject('Change your password Pass');
						$this->email->message('We have received a password change request for your Association for Financial Professionals - AFP account '.$post_pass['EmailAddress'].'
						<br><br>http://localhost:4300/resetpass/'.JWT::encode($data,"MyGeneratedKey","HS256").'<br><br>If you did not ask to change your password, then you can ignore this email and your password will not be changed.<br> You will be able to use the link below only once. ');
						
						
						
						$this->email->send();
						echo json_encode($data);
				}	
				else
				{
					
					echo json_encode("Code duplicate");
				}
										
		}
		
	}
	


	
	
	
	
}
