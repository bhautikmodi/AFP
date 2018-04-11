<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class Register extends CI_Controller 
{	
	public function __construct()
	{
		parent::__construct();
		$this->load->model('Register_model');
	}
	
	
	
		public function getAllCountry($CompanyId = NULL)
	{
		if(!empty($CompanyId)) 
		{
				$data="";
				
				$data['res']=$this->Register_model->getlist_country();
				$data['com']=$this->Register_model->company_default($CompanyId);
				
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
		$data = json_decode(trim(file_get_contents('php://input')), true);
		$post_user = $data['reg'];
					$com_reg = $data['com'];
		if ($data) 
			{			
			if($post_user['UserId']>0)
				{
					$result = $this->Register_model->edit_user($post_user,$com_reg);
					if($result)
					{
						echo json_encode($data);	
					}	
				}else
				{
					
					$result = $this->Register_model->add_Register($post_user,$com_reg); 
			
					if($result)
					{
						echo json_encode('success'); 
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
					}else
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

	
	

	
	
	
	
	
	
	
	 // List all industry
	public function getAllIndustry()
	{
		$data="";	
	
		$data=$this->Register_model->getlist_Industry();
	
		echo json_encode($data);
	}
	

}
