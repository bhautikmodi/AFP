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
						echo json_encode('Success');
				}	
				else
				{
					
					echo json_encode('Code duplicate');
				}
										
		}
		
	}
	

	public function resetpasslink()
		{
								
		$post_passlink = json_decode(trim(file_get_contents('php://input')), true);		
		if ($post_passlink)
			{
					
				$result = $this->Reset_model->reset_passlink($post_passlink);
				if($result)
				{
						echo json_encode('Success');
				}	
				else
				{
					
					echo json_encode('Code duplicate');
				}
										
		}
		
	}

	
	
	
	
	
	
}
