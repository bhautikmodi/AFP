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
						
						
						$this->email->subject('AFP password change request');
						// $this->email->message('<br>Hello '.$result->FirstName. '<br><br>We have received a password change request for your Association for Financial Professionals - AFP account '.$post_pass['EmailAddress'].'
						// <br><br>Link : http://localhost:4300/resetpass/'.JWT::encode($data,"MyGeneratedKey","HS256").'<br><br>If you did not ask to change your password, then you can ignore this email and your password will not be changed.<br> You will be able to use the link below only once.<br>
						// Regards,<br>
						// AFP TEAM');
						
						$this->email->message('<table style="font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:22px; color:#000; border:1px solid #0333; width:600px; margin:0 auto;" cellpadding="0" cellspacing="0" border="0">
						<tr>
						<td style="padding:10px; border-bottom:1px solid #ccc; background:url(https://www.afponline.org/assets/images/afp-pattern.png) right -50px no-repeat #fafafa; background-size:300px;"><a href="http://localhost:4300/dashboard"><img src="https://www.afponline.org/assets/images/afp-logo.png" alt="" style="width:250px;" /></a></td>
						</tr>
						<tr>
							<td style="padding:10px;">
								<p style="color:#007699;"><strong>Welcome! </strong></p>
								<p>Association for Financial Professionals.</p>
								
								<p>Change your password</p>

								<p>We have received a password change request for your AFP account '.$post_pass['EmailAddress'].'</p>

								<p>If you did not ask to change your password, then you can ignore this email and your password will not be changed.<br> You will be able to use the link below only once.</p>
								<p><strong>Link : </strong> <span style="color:#007699;font-size:13px; text-decoration:none;"> http://localhost:4300/resetpass/'.JWT::encode($data,"MyGeneratedKey","HS256").'</span></p>
								<p><strong>Regards,<br><span style="color:#007699;">AFP TEAM</span></strong></p>
							</td>
						</tr>
						<tr>
							<td style="padding:10px; border-top:1px solid #ccc; background:#0085AD; text-align:center; color:#fff;">Copyright © 2018 Association for Financial Professionals - All rights reserved. </td>
						</tr>
					</table>');
						
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
