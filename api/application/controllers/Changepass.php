<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Changepass extends CI_Controller 
{	
	public function __construct()
	{
		parent::__construct();
		$this->load->model('Changepass_model');
	}
	
	
	public function changeuserpass()
		{
								
		$post_pass = json_decode(trim(file_get_contents('php://input')), true);		
		if ($post_pass)
			{
					
				$result = $this->Changepass_model->change_pass($post_pass);
				if($result)
				{
					 $EmailAddress=$result->EmailAddress;
					 $FirstName=$result->FirstName;
					 $Password=$result->Password;
					 
						//exit;
						
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
						$this->email->to($EmailAddress);
						
						
						$this->email->subject('AFP password change request');
						//$this->email->message('<br>Hello<br>');
						
						$this->email->message('<table style="font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:22px; color:#000; border:1px solid #0333; width:600px; margin:0 auto;" cellpadding="0" cellspacing="0" border="0">
						<tr>
							<td style="padding:10px; border-bottom:1px solid #ccc; background:url(https://www.afponline.org/assets/images/afp-pattern.png) right -50px no-repeat #fafafa; background-size:300px;"><a href="http://localhost:4300/dashboard"><img src="https://www.afponline.org/assets/images/afp-logo.png" alt="" style="width:250px;" /></a></td>
						</tr>
						<tr>
							<td style="padding:10px;">
								<p style="color:#007699;"><strong>Hello! '.$FirstName.'</strong></p>
								<p>Association for Financial Professionals.</p>
								<p>We have received a password change request for your AFP account</p>

								<p>Your password has been changed</p>
								<p>Your password is : '.$post_pass['nPassword'].'</p>
								<p><strong>Regards,<br><span style="color:#007699;">AFP TEAM</span></strong></p>
							</td>
						</tr>
						<tr>
							<td style="padding:10px; border-top:1px solid #ccc; background:#0085AD; text-align:center; color:#fff;">Copyright © 2018 Association for Financial Professionals - All rights reserved. </td>
						</tr>
					</table>');
						
						$this->email->send();
						echo json_encode("success");
				}
				// if($result)
				// {
				// 		echo json_encode("Success");
				// }	
				else
				{
					
					echo json_encode("Code duplicate");
				}
										
		}
		
	}
	

	
	
	
	
	
}
