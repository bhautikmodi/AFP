<?php
defined('BASEPATH') OR exit('No direct script access allowed');
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

class Remaining extends CI_Controller 
{	
	public function __construct()
	{
		parent::__construct();
		$this->load->model('Remaining_model');
	}
	
	
	public function addRemaining()
	{
		$post_remaining = json_decode(trim(file_get_contents('php://input')), true);
		if ($post_remaining) 
			{
				if($post_remaining['ConfigurationId']>0)
				{
					$result = $this->Remaining_model->edit_remaining($post_remaining);
					if($result)
					{
						echo json_encode($post_remaining);	
					}	
				}
				else
				{
					
					$result = $this->Remaining_model->add_remaining($post_remaining); 
					if($result)
					{
						echo json_encode($post_remaining);	
					}	

				}
					
			}
	}
	
	
	//Delete UserList
	public function delete($confi_id = NULL) 
	{
		//$this->load->model('Country_model');
		if(!empty($confi_id)) {

			$result = $this->Remaining_model->delete_remaining($confi_id);			
			if($result) {
				echo json_encode("Delete successfully");	
			}	
			
		} 
			
	}
	
	//get userId edit
	public function getById($confi_id=null)
	{	
		//$this->load->model('Country_model');
		if(!empty($confi_id))
		{
			$data=[];
			$data=$this->Remaining_model->get_remainingdata($confi_id);
			echo json_encode($data);
		}
	}
	
	
	
	public function getDays()
	{
		$data="";
		
		$data=$this->Remaining_model->getlist_days();
		 
		if($data)
		{
			foreach($data as $days)
			{ 
				echo $Day=$days->Day;
				  $datetime1=date('Y-m-d',strtotime('-'.$Day.'days'));
			
			
			$data2=$this->Remaining_model->getlist_value($datetime1);
			
			if($data2)
			
					$config['protocol']='smtp';
					$config['smtp_host']='ssl://smtp.googlemail.com';
					$config['smtp_port']='465';
					$config['smtp_user']='myopeneyes3937@gmail.com';
					$config['smtp_pass']='W3lc0m3@2018';
					$config['charset']='utf-8';
					$config['newline']="\r\n";
					$config['mailtype'] = 'html';	
			   foreach ($data2 as $users)
			   {
				   //echo $users->EmailAddress;
					//echo json_encode($users);
					
										
					$this->email->initialize($config);

					$this->email->from('myopeneyes3937@gmail.com','Email Test');
					$this->email->to($users->EmailAddress);
					
					
					$this->email->subject('Sending mail');
					$this->email->message('sending mail recive.....');
					
					
					
					if($this->email->send()){
						echo json_encode('success');
					} else {
						echo json_encode('asdasd');
					}
				
			   }
				
				
		
				
			}
			
			
			
		}
	}
	
	
	
	public function getAll()
	{
		$data="";
		
		$data=$this->Remaining_model->getlist_remaining();
		//print_r($data);
		//exit;
		if($data)
			
					$config['protocol']='smtp';
					$config['smtp_host']='ssl://smtp.googlemail.com';
					$config['smtp_port']='465';
					$config['smtp_user']='myopeneyes3937@gmail.com';
					$config['smtp_pass']='W3lc0m3@2018';
					$config['charset']='utf-8';
					$config['newline']="\r\n";
					$config['mailtype'] = 'html';	
			   foreach ($data as $users)
			   {
					//echo json_encode($users);
					
										
					$this->email->initialize($config);

					$this->email->from('myopeneyes3937@gmail.com','Email Test');
					$this->email->to($users->EmailAddress);
					
					
					$this->email->subject('Sending mail');
					$this->email->message('sending mail recive.....');
					
					
					
					if($this->email->send()){
						//echo json_encode('success');
					} else {
						//echo json_encode('asdasd');
					}
				
			   }
				
				echo json_encode('success');
		
		
		
	}
	
	
}
