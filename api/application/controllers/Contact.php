<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Contact extends CI_Controller {


	public function __construct() {
	
		parent::__construct();
		
		$this->load->model('Contact_model');
		
	}
	

	
	public function add() {
		
		$post_Contact = json_decode(trim(file_get_contents('php://input')), true);		

		// if ($post_Contact) {
		// 	if($post_Contact['ContactId'] > 0){
		// 		$result = $this->Contact_model->edit_Contact($post_Contact);
		// 		if($result) {
		// 			echo json_encode($post_Contact);	
		// 		}	
		// 	} else {
				$result = $this->Contact_model->add_Contact($post_Contact);
			
			
					if($result) {
						$this->db->select('ConfigurationId,Key,Value');
						$this->db->where('Key','ContactFrom');
						$ress = $this->db->get('tblmstconfiguration');
                        $res = array();
						foreach($ress->result() as $row) {
							$res = $row;
						}
						
                        $to= $res->Value;  
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
						$this->email->to($to);
						
						
						
						$subject = 'AFP Corporate Training Skills Assessment';
						$this->email->subject($subject);
					
	
						$body = '<table style="font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:22px; color:#000; border:1px solid #0333; width:600px; margin:0 auto;" border="0" cellpadding="0" cellspacing="0">
						<tbody>
							<tr>
								<td style="padding:10px; border-bottom:1px solid #ccc; background-color:#fafafa"><a href="https://www.afponline.org" target="_blank"><img alt="" src="https://www.afponline.org/assets/images/afp-logo.png" style="width:250px" /></a></td>
							</tr>
							<tr>
							  <td></td>
							</tr>
							<tr>
								<td style="padding:10px;">
								<p> AFP Corporate Training Skills Assessment tool.</p>
				
								
								First Name : '.$post_Contact['FirstName'].'<br>
								Last Name : '.$post_Contact['LastName'].'<br>
							    Email Address : '.$post_Contact['EmailAddress'].'<br>
								Company Name : '.$post_Contact['CompanyName'].'<br>
								Comments : '.$post_Contact['Comments'].'</p>
					
								<p>Please do not share this code, and use it within thirty days.If you have any questions, please contact me at rpinover@AFPonline.org or<br> +1 301.961.8884.</p>
					
								
								<p>
								<p>Regards,<br>
								Robert Pinover<br>
								Client Success Specialist<br>
								<a href="https://www.afponline.org/">Association for Financial Professionals</a> (AFP)<br><br>
								</p>
							
								</td>
							</tr>
							<tr>
								<td style="padding:10px; border-top:5px solid #a51c36; background:#072b49; text-align:center; color:#fff;">Copyright &copy; 2018 Association for Financial Professionals - All rights reserved. </td>
							</tr>
						</tbody>
					</table>';
					
						
					$this->email->message($body);
						
						if($this->email->send()){
							
					echo json_encode('success');
							//echo json_encode('success');
						} else {
							//echo json_encode('asdasd');
						}
					
				   
					
					}	
		
	}
	
	// public function getById($Configuration_id = NULL) {
		
	// 	if (!empty($Configuration_id)) {
	// 		$data = [];		
	// 		$data = $this->CourseLevel_model->get_CourseLeveldata($Configuration_id);
	// 		echo json_encode($data);			
	// 	}
	// }	
	public function getById($CId=null)
	{	
		
		if(!empty($CId))
		{
			$data=[];
			$data=$this->Contact_model->get_userdata($CId);
			echo json_encode($data);
		}
	}

	
	
}
