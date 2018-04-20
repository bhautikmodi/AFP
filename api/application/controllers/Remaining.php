<?php
defined('BASEPATH') OR exit('No direct script access allowed');

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
		// print_r($data);
		// exit;
		if($data)
		{
			foreach($data as $days)
			{ 
				   $Day=$days->Day;
				   $datetime1=date('Y-m-d',strtotime('-'.$Day.'days'));
			
				$data2=$this->Remaining_model->getlist_value($datetime1);
				
				if($data2)
				{
					//print_r($data2);
				//	exit;
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
						echo $users->EmailAddress;
						   json_encode($data2);
							
												
							$this->email->initialize($config);

							$this->email->from('myopeneyes3937@gmail.com','Email Test');
							$this->email->to($users->EmailAddress);
							
							
							$this->email->subject('Assesment remaining message');
							$this->email->message('<table style="font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:22px; color:#000; border:1px solid #0333; width:600px; margin:0 auto;" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td style="padding:10px; border-bottom:1px solid #ccc; background:url(https://www.afponline.org/assets/images/afp-pattern.png) right -50px no-repeat #fafafa; background-size:300px;"><img src="https://www.afponline.org/assets/images/afp-logo.png" alt="" style="width:250px;" /></td>
							</tr>
							<tr>
								<td style="padding:10px;">
									<p style="color:#007699;"><strong>Hello '.$users->FirstName. '</strong></p>
									<p>Welcome to <strong>Association for Financial Professionals</strong>.</p>
									
									
									<p>Please assesment will be complete.</p>
									
								</td>
							</tr>
							<tr>
								<td style="padding:10px; border-top:1px solid #ccc; background:#0085AD; text-align:center; color:#fff;">Copyright © 2018 Association for Financial Professionals - All rights reserved. </td>
							</tr>
						</table>');
							
							
							
							if($this->email->send()){
								echo json_encode('success');
							} else {
								echo json_encode('asdasd');
							}
						
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
