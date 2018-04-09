<?php
defined('BASEPATH') OR exit('No direct script access allowed');
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

class Resetpass extends CI_Controller 
{	
	public function __construct()
	{
		parent::__construct();
		$this->load->model('Reset_model');
	}
	
	
	public function resetuserpass()
		{
								
		$post_pass = json_decode(trim(file_get_contents('php://input')), true);		
		if ($post_pass)
			{
					
				$result = $this->Reset_model->reset_pass($post_pass);
				if($result)
				{
						echo json_encode("Success");
				}	
				else
				{
					
					echo json_encode("Code duplicate");
				}
										
		}
		
	}
	

	
	// public function addUser()
	// {
		// $post_user = json_decode(trim(file_get_contents('php://input')), true);
		// if ($post_user) 
			// {
				// if($post_user['UserId']>0)
				// {
					// $result = $this->Resetpass_model->edit_user($post_user);
					// if($result)
					// {
						// echo json_encode($post_user);	
					// }	
				// }
				// else
				// {
					
					// $result = $this->Resetpass_model->add_user($post_user); 
			
					// if($result)
					// {
						// echo json_encode($post_user); 
						// $config['protocol']='smtp';
						// $config['smtp_host']='ssl://smtp.googlemail.com';
						// $config['smtp_port']='465';
						// $config['smtp_user']='myopeneyes3937@gmail.com';
						// $config['smtp_pass']='W3lc0m3@2018';
						// $config['charset']='utf-8';
						// $config['newline']="\r\n";
						// $config['mailtype'] = 'html';	
											
						// $this->email->initialize($config);

						// $this->email->from('myopeneyes3937@gmail.com','Email Test');
						// $this->email->to($post_user['EmailAddress']);
						
						
						// $this->email->subject('Sending mail');
						// $this->email->message('sending mail recive.....');
						
						
						
						// $this->email->send();
					// }	
				// }
					
			// }
	// }
	
	
	
	// all user
	
	// public function getDays()
	// {
		// $data="";
		
		// $data=$this->Remaining_model->getlist_days();
		 
		// if($data)
		// {
			// foreach($data as $days)
			// { 
				  // $Day=$days->Day;
				  // $datetime1=date('Y-m-d',strtotime('-'.$Day.'days'));
			
			
			  // $data2=$this->Remaining_model->getlist_value($datetime1);
			// //echo "<pre>";
			// //	print_r	($data2);
			// if($data2)
			// {
					// $config['protocol']='smtp';
					// $config['smtp_host']='ssl://smtp.googlemail.com';
					// $config['smtp_port']='465';
					// $config['smtp_user']='myopeneyes3937@gmail.com';
					// $config['smtp_pass']='W3lc0m3@2018';
					// $config['charset']='utf-8';
					// $config['newline']="\r\n";
					// $config['mailtype'] = 'html';
					// //echo "<pre>";
					// //print_r($data2);
			   // foreach ($data2 as $users)
			   // {
						  // $users->EmailAddress;
						// //	json_encode($users);
					
										
					// $this->email->initialize($config);

					// $this->email->from('myopeneyes3937@gmail.com','Email Test');
					// $this->email->to($users->EmailAddress);
					
					
					// $this->email->subject('Sending mail remaining');
					// $this->email->message('sending mail recive.....');
					
					
					
					// if($this->email->send()){
						// echo json_encode('success');
					// } else {
						// echo json_encode('asdasd');
					// }
				
			   // }
				
				
		
				
			// }
			// }
			
			
		// }
	// }
	
	
	
	
}
