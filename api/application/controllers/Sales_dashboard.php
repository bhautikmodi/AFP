<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class Sales_dashboard extends CI_Controller 
{	
	public function __construct()
	{
		parent::__construct();
		$this->load->model('Sales_dashboard_model');
	}
	
	// public function addSales-dashboard()
	// {
		
	// 	$post_company = json_decode(trim(file_get_contents('php://input')), true);
	// 	if ($post_company) 
	// 		{
	// 			if($post_company['CompanyId']>0)
	// 			{
	// 				$result = $this->Company_model->edit_company($post_company);
	// 				if($result)
	// 				{
	// 					echo json_encode($post_company);	
	// 				}	
	// 			}
	// 			else
	// 			{
	// 				$result = $this->Company_model->add_company($post_company);
	// 				if($result)
	// 				{
	// 					echo json_encode($post_company);	
	// 				}	
	// 			}
					
	// 		}
	// }
	
	
	

	public function getAllUser() {
		
		$data="";
		
		$data=$this->Sales_dashboard_model->getlist_User();
		
		echo json_encode($data);
				
	}
	
	//list all industry
	public function getAllCompany() {
		
		$data="";
		
		$data=$this->Sales_dashboard_model->getlist_company();
		
		echo json_encode($data);
				
	}
	
}