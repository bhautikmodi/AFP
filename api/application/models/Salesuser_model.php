<?php

class Salesuser_model extends CI_Model
 {
    // public function getAllAssement($UserId = NULL) {
		
	// 	if($UserId) {

	// 		$this->db->select('cass.CAssessmentId,ts.TeamSize,cass.AssessmentName,cass.StartTime');
	// 		$this->db->where('UserId',$UserId);
    //         $this->db->where('EndTime!=',NULL);
    //         $this->db->order_by('CAssessmentId','desc');
    //         $this->db->join('tblmstteamsize ts', 'ts.TeamSizeId = cass.TeamSizeId', 'left');
	// 		$query = $this->db->get('tblcandidateassessment as cass');	
    //         $data = array();
    //         foreach($query->result() as $row){   
    //             $assessment_data = '';
    //             $assessment_data['assessment']=$row;             
    //             $this->db->select('d.Name as domain, dksa.AvgRatingScale as ratingscale, "#001F49" as color');
	// 			$this->db->where('dksa.CAssessmentId',$row->CAssessmentId);
	// 			$this->db->join('tblmstdomain d', 'd.DomainId = dksa.DomainId', 'left');
	// 			$query1 = $this->db->get('tbldomainwiseksa dksa');
	// 			if($query1->result())
	// 			{
    //                 $assessment_data['domainlist']=$query1->result();				   
    //             }  
    //             array_push($data,$assessment_data);         
    //         }	
    //         return $data;	
	// 	}				
    // }

    // public function getPendingAssement($UserId = NULL) {
		
	// 	if($UserId) {

	// 		$this->db->select('cass.CAssessmentId,cass.AssessmentName,cass.StartTime');
	// 		$this->db->where('UserId',$UserId);
    //         $this->db->where('EndTime',NULL);
    //         $this->db->order_by('CAssessmentId','desc');
	// 		$query = $this->db->get('tblcandidateassessment as cass');	
    //         $data = array();
    //         if($query->result())
    //         {
    //             $data=$query->result();				   
    //         }
    //         return $data;	
	// 	}				
    // }

    public function getUserassessment($CAssessmentId = NULL) {
		
		if($CAssessmentId) {
            $this->db->select('CAssessmentId');
			$this->db->where('CAssessmentId',$CAssessmentId);
			$this->db->where('EndTime!=',NULL);
			$query = $this->db->get('tblcandidateassessment');	
			if($query->num_rows()==1){
	
                $this->db->select('ca.CAssessmentId,ca.TeamSizeId,ca.AssessmentName,ca.Description,ts.TeamSize,ca.EndTime,ca.submitedDate,ca.StartTime,us.FirstName, (select count(CKSAId) from tblcandidateksa where CAssessmentId = '.$CAssessmentId.')as totalksa');
                $this->db->where('ca.CAssessmentId',$CAssessmentId);
                $this->db->join('tbluser us', 'us.UserId = ca.UserId', 'left');
                $this->db->join('tblmstteamsize ts', 'ts.TeamSizeId = ca.TeamSizeId', 'left');
                $query = $this->db->get('tblcandidateassessment ca');
                $assessment_data= array();
                foreach($query->result() as $row)
                {
                    $assessment_data=$row;
                    
                }
		     return $assessment_data;
            } else {
                return 'fail';
            }	
		}				
    }
    public function getUserAssessDetail($CAssessmentId = NULL) {
		
		if($CAssessmentId) {
            $this->db->select('CAssessmentId');
			$this->db->where('CAssessmentId',$CAssessmentId);
			$this->db->where('EndTime!=',NULL);
			$query = $this->db->get('tblcandidateassessment');	
			if($query->num_rows()==1){
	
                $this->db->select('d.Name as domain, dksa.AvgRatingScale as ratingscale, "#001F49" as color, dksa.PercentOfKSA');
                $this->db->where('dksa.CAssessmentId',$CAssessmentId);
                $this->db->join('tblmstdomain d', 'd.DomainId = dksa.DomainId', 'left');
                $query = $this->db->get('tbldomainwiseksa dksa');
                $domain_data = array();
                if($query->result())
                {
                    $domain_data=$query->result();				   
                }
               
                //$data = '';
                //$data['domain'] = $domain_data;
            
                return $domain_data;
            } else {
                return 'fail';
            }	
		}				
    }
    public function getUserAssessDomain($CAssessmentId = NULL) {
		
		if($CAssessmentId) {
            $this->db->select('CAssessmentId');
			$this->db->where('CAssessmentId',$CAssessmentId);
			$this->db->where('EndTime!=',NULL);
			$query = $this->db->get('tblcandidateassessment');	
			if($query->num_rows()==1){
	
                $this->db->select('d.Name as domain,"#001F49" as color, dksa.PercentOfKSA as value');
                $this->db->where('dksa.CAssessmentId',$CAssessmentId);
                $this->db->join('tblmstdomain d', 'd.DomainId = dksa.DomainId', 'left');
                $query = $this->db->get('tbldomainwiseksa dksa');
                $domainper_data = array();
                if($query->result())
                {
                    $domainper_data=$query->result();				   
                }
               
            
            
                return $domainper_data;
            } else {
                return 'fail';
            }	
		}				
    }
    public function getUserAssessRating($CAssessmentId = NULL) {
		
		if($CAssessmentId) {
            $this->db->select('CAssessmentId');
			$this->db->where('CAssessmentId',$CAssessmentId);
			$this->db->where('EndTime!=',NULL);
			$query = $this->db->get('tblcandidateassessment');	
			if($query->num_rows()==1){
	
                $this->db->select('d.Name as domain, dksa.PercentOfKSA as value,"#001F49" as color');
                $this->db->where('dksa.CAssessmentId',$CAssessmentId);
                $this->db->join('tblmstratingscale d', 'd.RatingScaleId = dksa.RatingScaleId', 'left');
                $query = $this->db->get('tblratingscalewiseksa dksa');
                $rating_data = array();
                if($query->result())
                {
                    $rating_data=$query->result();				   
                }
                return $rating_data;
            } else {
                return 'fail';
            }	
		}				
    }
    public function getUserAssessareaksa($CAssessmentId = NULL) {
		
		if($CAssessmentId) {
            $this->db->select('CAssessmentId');
			$this->db->where('CAssessmentId',$CAssessmentId);
			$this->db->where('EndTime!=',NULL);
			$query = $this->db->get('tblcandidateassessment');	
			if($query->num_rows()==1){
	
                $this->db->select('d.Name as domain, dksa.PercentOfKSA as value,"#001F49" as color');
                $this->db->where('dksa.CAssessmentId',$CAssessmentId);
                $this->db->join('tblmstcompetencyarea d', 'd.CAreaId = dksa.CAreaId', 'left');
                $query = $this->db->get('tblcareawiseksa dksa');
                $areaksa_data = array();
                if($query->result())
                {
                    $areaksa_data=$query->result();				   
                }
                return $areaksa_data;
            } else {
                return 'fail';
            }	
		}				
	}


    public function RecommendedCourse($CAssessmentId = NULL) {
		
		if($CAssessmentId) {
            $this->db->select('CAssessmentId');
			$this->db->where('CAssessmentId',$CAssessmentId);
			$this->db->where('EndTime!=',NULL);
			$query = $this->db->get('tblcandidateassessment');	
			if($query->num_rows()==1){
	
                $this->db->select('d.Name as domain, dksa.AvgRatingScale as ratingscale, "#001F49" as color, dksa.PercentOfKSA,mc.Name');
                $this->db->where('dksa.CAssessmentId',$CAssessmentId);
                
                $this->db->join('tblmstcourse mc', 'mc.DomainId = d.DomainId', 'left');
                $this->db->join('tblmstdomain d', 'd.DomainId = dksa.DomainId', 'left');
                $query = $this->db->get('tbldomainwiseksa dksa');
                $domain_data = array();
                if($query->result())
                {
                    $domain_data=$query->result();				   
                }
               
                //$data = '';
                //$data['domain'] = $domain_data;
            
                return $domain_data;
            } else {
                return 'fail';
            }	
		}				
    }
<<<<<<< HEAD
    public function getReCommendcourse($CAssessmentId = NULL) {
		
		if($CAssessmentId) {
            $data = $this->db->query('SELECT dk.DomainId,dk.AvgRatingScale,ROUND(dk.AvgRatingScale) as avg, d.Name FROM tbldomainwiseksa AS dk LEFT JOIN tblmstdomain AS d ON dk.DomainId = d.DomainId WHERE CAssessmentId='.$CAssessmentId);
            $obj = '';		
            foreach($data->result() as $row)
            {	
                $domain = array();
                $array = json_decode(json_encode($row), True);
                $domain = $array;
                $data1 = $this->db->query('SELECT ConfigurationId,`Key`,`Value` FROM tblmstconfiguration AS cl WHERE cl.Key = "CourseLevel" AND ((cl.Value = "Foundational" AND '.$row->avg.' in (0,1,2)) OR  (cl.Value = "Intermediate" AND '.$row->avg.' in (0,1,2,3)) OR (cl.Value = "Advanced" AND '.$row->avg.' in (0,1,2,3,4)))');
                $domain['rs'] = array();                
                foreach($data1->result() as $row1)
                {	                    
                    $array1 = json_decode(json_encode($row1), True);
                    $data3 = $this->db->query('SELECT c.CourseId,c.Name,c.CourseLevelId FROM tblmstcourse AS c WHERE c.DomainId = '.$row->DomainId.' && c.CourseLevelId = '.$row1->ConfigurationId);
                    $array2 = json_decode(json_encode($data3->result()), True);
                    $array1['course'] = $array2;
                    $domain['rs'][] = $array1;
                }
                $obj[] = $domain; 
            }  
            return $obj;
        }				
    }
=======

    public function getUserksa($CAssessmentId = NULL) {
		
		if($CAssessmentId) {

				$this->db->select('ck.CKSAId,ck.CAssessmentId,ck.KSAId,ck.RatingScaleId,ksa.Name');
				$this->db->join('tblmstksa ksa', 'ksa.KSAId = ck.KSAId', 'left');
				$this->db->where('ck.CAssessmentId',$CAssessmentId);
				$query = $this->db->get('tblcandidateksa as ck');	
				$result = $query->result();
	              $data = array();
                if($query->result())
                {
                    $data=$query->result();				   
                }
               
                //$data = '';
                //$data['domain'] = $domain_data;
            
                return $data;
					
		}else {
            return 'fail';
        }		
			
	}

>>>>>>> 0b74aad94c1a0d0fa496118aebd81eea6e8256fb
 }
 