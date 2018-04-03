<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class Register extends CI_Controller 
{	
	public function __construct()
	{
		parent::__construct();
		$this->load->model('Register_model');
	}
	
	
	
		public function getAllCountry()
	{
		$data="";
		
		$data=$this->Register_model->getlist_country();
		echo json_encode($data);
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
	
	// public function addUser()
	// {
		// $post_user = json_decode(trim(file_get_contents('php://input')), true);
		// if ($post_user) 
			// {
				// if($post_user['UserId']>0)
				// {
					// $result = $this->User_model->edit_user($post_user);
					// if($result)
					// {
						// echo json_encode($post_user);	
					// }	
				// }
				// else
				// {
					
					// $result = $this->User_model->add_user($post_user); 
			
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


	
	

	
	
	
	
	
	
	
	// // List all company
	// public function getAllCompany()
	// {
		// $data="";	
		// //$this->load->model('Company_model');
		// $data=$this->User_model->getlist_company();
		// //print_r($data);
		// //.exit;
		// echo json_encode($data);
	// }
	

}
