<?php
defined('BASEPATH') OR exit('No direct script access allowed');
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

class User extends CI_Controller 
{	
	public function __construct()
	{
		parent::__construct();
		$this->load->model('User_model');
	}
	
	
	public function addUser()
	{
		$post_user = json_decode(trim(file_get_contents('php://input')), true);
		if ($post_user) 
			{
				if($post_user['UserId']>0)
				{
					$result = $this->User_model->edit_user($post_user);
					if($result)
					{
						echo json_encode($post_user);	
					}	
				}
				else
				{
					
					$result = $this->User_model->add_user($post_user); 
			
					if($result)
					{
						echo json_encode($post_user); 
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
						$this->email->message('sending mail recive.....');
						
						
						
						$this->email->send();
					}	
				}
					
			}
	}
	
	
	//Delete UserList
	public function deleteUser($user_id = NULL) 
	{
		
		if(!empty($user_id)) {

			$result = $this->User_model->delete_user($user_id);			
			if($result) {
				echo json_encode("Delete successfully");	
			}	
			
		} 
			
	}
	
	//get userId edit
	public function getById($user_id=null)
	{	
		//$this->load->model('Country_model');
		if(!empty($user_id))
		{
			$data=[];
			$data=$this->User_model->get_userdata($user_id);
			echo json_encode($data);
		}
	}
	
	
	
	public function getAllCountry()
	{
		$data="";
		$this->load->model('Country_model');
		$data=$this->Country_model->getlist_country();
		//print_r($data);
		//.exit;
		echo json_encode($data);
	}
	
	
	
	// Add Status
	public function getAllUserList()
	{
		$data="";
		
		$data=$this->User_model->getlist_user();
		//print_r($data);
		//.exit;
		echo json_encode($data);
	}
	
	// List all state
	public function getAllState()
	{
		$data="";
		
		$data=$this->User_model->getlist_state();
		
		echo json_encode($data);
	}
	
	// List all company
	public function getAllCompany()
	{
		$data="";	
		//$this->load->model('Company_model');
		$data=$this->User_model->getlist_company();
		//print_r($data);
		//.exit;
		echo json_encode($data);
	}
	
	//List role
	public function getAllRole()
	{
		$data="";
		
		$data=$this->User_model->getlist_userrole();
		
		echo json_encode($data);
	}
}
