<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Common extends CI_Controller {


    public function __construct() {
	
		parent::__construct();
		
		$this->load->model('Common_model');
		
	}

	// public function hello() {
	// 	$CAssessmentId = 18;
	// 	$data = $this->db->query('SELECT dk.DomainId,dk.AvgRatingScale,ROUND(dk.AvgRatingScale) as avg, d.Name FROM tbldomainwiseksa AS dk LEFT JOIN tblmstdomain AS d ON dk.DomainId = d.DomainId WHERE CAssessmentId='.$CAssessmentId);
	// 	//echo "<pre>"; print_r($data->result()); 
	// 	$obj = '';		
	// 	foreach($data->result() as $row)
	// 	 {	
	// 		 $domain = array();
	// 		 $array = json_decode(json_encode($row), True);
	// 		 $domain = $array;

	// 		$data1 = $this->db->query('SELECT ConfigurationId,`Key`,`Value` FROM tblmstconfiguration AS cl WHERE cl.Key = "CourseLevel" AND ((cl.Value = "Foundational" AND '.$row->avg.' in (0,1,2)) OR  (cl.Value = "Intermediate" AND '.$row->avg.' in (0,1,2,3)) OR (cl.Value = "Advanced" AND '.$row->avg.' in (0,1,2,3,4)))');
	// 		//echo "<pre>"; print_r($data1->result());
	// 		$domain['rs'] = array();
			
	// 		foreach($data1->result() as $row1)
	// 		{	
				
	// 			$array1 = json_decode(json_encode($row1), True);
				
	// 			//$domain['rs'] = $row1;		
	// 			$data3 = $this->db->query('SELECT c.CourseId,c.Name,c.CourseLevelId FROM tblmstcourse AS c WHERE c.DomainId = '.$row->DomainId.' && c.CourseLevelId = '.$row1->ConfigurationId);
				
	// 			//echo "<pre>"; print_r($data3->result()); 
	// 			//$array1['course'] = array();
	// 			$array2 = json_decode(json_encode($data3->result()), True);
	// 			$array1['course'] = $array2;

	// 			$domain['rs'][] = $array1;
	// 		}			
	// 		//echo "<br/>"; 
	// 		$obj[] = $domain; 
	// 	 }  
	// 	 echo "<pre>"; print_r($obj);
	// 	 die;
	// } 
	
	public function get_permissiondata() {
		
		$post_permission = json_decode(trim(file_get_contents('php://input')), true);		

		if ($post_permission) {
			$data = "";		
			$data = $this->Common_model->get_permissiondata($post_permission);
			echo json_encode($data);						
		}
				
	}	
	
}
