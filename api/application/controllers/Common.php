<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Common extends CI_Controller {


    public function __construct() {
	
		parent::__construct();
		
		$this->load->model('Common_model');
		
	}

	public function hello() {

		$data = $this->db->query('SELECT DomainId FROM tbldomainwiseksa group by DomainId');
		
		//echo "<pre>"; print_r($data->result()); 

				
				//echo "<pre>"; print_r($data1->result()); 

				foreach($data->result() as $row)
		 {
			$data1 = $this->db->query('SELECT ConfigurationId,`Key`,`Value` FROM tblmstconfiguration AS cl WHERE cl.Key = "CourseLevel"');
			foreach($data1->result() as $row1)
		 {
			 
			
			$data3 = $this->db->query('SELECT c.CourseId,c.Name,c.CourseLevelId FROM tblmstcourse AS c WHERE c.DomainId = '.$row->DomainId.' && c.CourseLevelId = '.$row1->ConfigurationId);
				echo "<pre>"; print_r($data3->result()); 
		 }
			
			echo "<br/>"; 
		 }


	} 
	
	public function get_permissiondata() {
		
		$post_permission = json_decode(trim(file_get_contents('php://input')), true);		

		if ($post_permission) {
			$data = "";		
			$data = $this->Common_model->get_permissiondata($post_permission);
			echo json_encode($data);						
		}
				
	}	
	
}
