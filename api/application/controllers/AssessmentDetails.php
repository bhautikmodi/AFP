<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class AssessmentDetails extends MY_Controller {


	public function __construct() {
	
		parent::__construct();
		
		$this->load->model('AssessmentDetails_model');
		
	}
	
	// public function CheckAssessment($UserId = NULL) {
		
	// 	if (!empty($UserId)) {
	// 		$data="";
	// 		$data=$this->AssessmentDetails_model->CheckAssessment($UserId);		
	// 		echo json_encode($data);			
	// 	}				
	// }
	
	public function test(){
		$ksaq = $this->db->query('SELECT Value FROM tblmstconfiguration as config WHERE config.Key = "NoOfKSA" LIMIT 1');
		$ksa = $ksaq->result();
		$totalksa = $ksa[0]->Value; 
		$result = $this->db->query('SELECT CAreaId,(SELECT COUNT(k1.KSAId) FROM tblmstksa AS k1 WHERE k1.CAreaId=ca.CAreaId and k1.IsActive=1) AS totalksa,(SELECT COUNT(k1.KSAId) FROM tblmstksa AS k1 WHERE k1.CAreaId=ca.CAreaId and k1.IsActive=1) AS tempksa, 0 AS destksa from tblmstcompetencyarea as ca left join tblmstdomain as d ON ca.DomainId=d.DomainId where d.IsActive=1 and ca.IsActive=1');
		$obj = $result->result(); 
		$i = 0;
		while($i<$totalksa){
			foreach($obj as $row) {
				if($row->tempksa > 0){
					$row->tempksa = $row->tempksa - 1;
					$row->destksa = $row->destksa + 1;
					$i++;
					if($i==$totalksa){
						break;
					}
				}			
			}
		}	
		$res = array();

		// foreach($obj as $row) {
		// 	$data = $this->db->query('SELECT 35 as CAssessmentId,ksa.KSAId as KSAId FROM tblmstksa AS ksa  WHERE ksa.CAreaId = '.$row->CAreaId.' order by RAND() LIMIT '.$row->destksa);	
		// 	$array = json_decode(json_encode($data->result()), True);
		//  	$res = array_merge($res,$array);
		// }
		// shuffle($res);
		// foreach($res as $obj) {
		// 	$data = $this->db->query('INSERT INTO tblcandidateksa (CAssessmentId, KSAId) VALUES ('.$obj["CAssessmentId"].','.$obj["KSAId"].')');	
		// }
		//echo json_encode($res);


		foreach($obj as $row) {
			$data = $this->db->query('SELECT ksa.KSAId,d.Name as DomainName,ca.Name as CAreaName,ksa.Name as KSAName FROM tblmstksa AS ksa LEFT JOIN tblmstcompetencyarea AS ca ON ksa.CAreaId=ca.CAreaId LEFT JOIN tblmstdomain AS d ON d.DomainId=ca.DomainId WHERE ksa.CAreaId = '.$row->CAreaId.' order by RAND() LIMIT '.$row->destksa);	
			$array = json_decode(json_encode($data->result()), True);
			$res = array_merge($res,$array);
		}
		shuffle($res);
		echo json_encode($res);
	}
	
	public function add() {
		
		$post_AssessmentDetails = json_decode(trim(file_get_contents('php://input')), true);		

		if ($post_AssessmentDetails) 
		{
		
				$result = $this->AssessmentDetails_model->add_AssessmentDetails($post_AssessmentDetails);
				if($result)
				{	
					$EmailToken = 'Start Assessment';

					$this->db->select('Value');
					$this->db->where('Key','EmailFrom');
					$smtp1 = $this->db->get('tblmstconfiguration');	
					foreach($smtp1->result() as $row) {
						$smtpEmail = $row->Value;
					}
					$this->db->select('Value');
					$this->db->where('Key','EmailPassword');
					$smtp2 = $this->db->get('tblmstconfiguration');	
					foreach($smtp2->result() as $row) {
						$smtpPassword = $row->Value;
					}
			
					$config['protocol']='smtp';
					$config['smtp_host']='ssl://smtp.googlemail.com';
					$config['smtp_port']='465';
					$config['smtp_user']=$smtpEmail;
					$config['smtp_pass']=$smtpPassword;
					$config['charset']='utf-8';
					$config['newline']="\r\n";
					$config['mailtype'] = 'html';							
					$this->email->initialize($config);
			
					$query = $this->db->query("SELECT et.Subject,et.EmailBody,et.BccEmail,(SELECT GROUP_CONCAT(UserId SEPARATOR ',') FROM tbluser WHERE RoleId = et.To && ISActive = 1) AS totalTo,(SELECT GROUP_CONCAT(EmailAddress SEPARATOR ',') FROM tbluser WHERE RoleId = et.Cc && ISActive = 1) AS totalcc,(SELECT GROUP_CONCAT(EmailAddress SEPARATOR ',') FROM tbluser WHERE RoleId = et.Bcc && ISActive = 1) AS totalbcc FROM tblemailtemplate AS et WHERE et.Token = '".$EmailToken."' && et.IsActive = 1");
					foreach($query->result() as $row){ 	
						$userId_ar = explode(',', $row->totalTo);			 
						 foreach($userId_ar as $userId){
							$queryTo = $this->db->query('SELECT EmailAddress FROM tbluser where UserId = '.$userId); 
							$rowTo = $queryTo->result();
							$query1 = $this->db->query('SELECT p.PlaceholderId,p.PlaceholderName,t.TableName,c.ColumnName FROM tblmstemailplaceholder AS p LEFT JOIN tblmsttablecolumn AS c ON c.ColumnId = p.ColumnId LEFT JOIN tblmsttable AS t ON t.TableId = c.TableId WHERE p.IsActive = 1');
							$body = $row->EmailBody;
							foreach($query1->result() as $row1){			
								$query2 = $this->db->query('SELECT '.$row1->ColumnName.' AS ColumnName FROM '.$row1->TableName.' AS tn LEFT JOIN tblmstuserrole AS role ON tn.RoleId = role.RoleId LEFT JOIN tblmstcountry AS con ON tn.CountryId = con.CountryId LEFT JOIN tblmststate AS st ON tn.StateId = st.StateId LEFT JOIN tblcompany AS com ON tn.CompanyId = com.CompanyId LEFT JOIN tblmstindustry AS ind ON com.IndustryId = ind.IndustryId WHERE tn.UserId = '.$userId);
								$result2 = $query2->result();
								$body = str_replace("{ ".$row1->PlaceholderName." }",$result2[0]->ColumnName,$body);					
							} 
							if($row->BccEmail!=''){
								$bcc = $row->BccEmail.','.$row->totalbcc;
							} else {
								$bcc = $row->totalbcc;
							}
							$this->email->from($smtpEmail, 'AFP Admin');
							$this->email->to($rowTo[0]->EmailAddress);		
							$this->email->subject($row->Subject);
							$this->email->cc($row->totalcc);
							$this->email->bcc($bcc);
							$this->email->message($body);
							if($this->email->send())
							{
								$email_log = array(
									'From' => trim($smtpEmail),
									'Cc' => trim($row->totalcc),
									'Bcc' => trim($bcc),
									'To' => trim($rowTo[0]->EmailAddress),
									'Subject' => trim($row->Subject),
									'MessageBody' => trim($body),
								);
								
								$res = $this->db->insert('tblemaillog',$email_log);
								//echo 'success';
							}else
							{
								//echo 'fail';
							}
						} 
					}
					echo json_encode($result); 				
				}							
		}
		
	}
	
	
	
	public function getAllTeamSize() {
		
		$data="";
		
		$data=$this->AssessmentDetails_model->getTeamSizeList();
		
		echo json_encode($data);
				
	}

	public function check() {
		
		$i = 0;
		$ksaq = $this->db->query('SELECT Value FROM tblmstconfiguration as config WHERE config.Key = "NoOfKSA" LIMIT 1');
		$ksa = $ksaq->result();
		$totalksa = $ksa[0]->Value; 
		$result = $this->db->query('SELECT CAreaId,round(((SELECT COUNT(k1.KSAId) FROM tblmstksa AS k1 WHERE k1.CAreaId=k.CAreaId) * (SELECT value FROM tblmstconfiguration as config WHERE config.Key = "NoOfKSA" LIMIT 1))/(SELECT COUNT(KSAId) FROM tblmstksa)) AS getksa, ((SELECT COUNT(k1.KSAId) FROM tblmstksa AS k1 WHERE k1.CAreaId=k.CAreaId) - round(((SELECT COUNT(k1.KSAId) FROM tblmstksa AS k1 WHERE k1.CAreaId=k.CAreaId) * (SELECT value FROM tblmstconfiguration as config WHERE config.Key = "NoOfKSA" LIMIT 1))/(SELECT COUNT(KSAId) FROM tblmstksa))) AS leftksam from tblmstksa AS k GROUP BY CAreaId');
		$obj = $result->result();
		foreach($obj as $row) {
			if($row->getksa==0){
				$row->getksa=1;
			}
			$i = +$i + +$row->getksa;
		}
		echo $i; 
		if($i<$totalksa){
			echo "less";
			echo $q = +$totalksa - +$i;
			$j = 0;
			while($j<$q){
				if($obj[$j].leftksam>0){
					$obj[$j]->getksa = $obj[$j]->getksa + 1;
					$j++;
				}				
			}
		} else if($i>$totalksa){
			echo "more";
			echo $q = +$i - +$totalksa;	
			$j = 0;
			while($j<$q){
				$obj[$j]->getksa = $obj[$j]->getksa - 1;
				$j++;				
			}		
		} else {
			echo "equal";
		}
		foreach($obj as $row) {
			//$insert = $this->db->query('INSERT INTO tblcandidateksa (CAssessmentId, KSAId) SELECT '.$insert_id.', ksa.KSAId FROM tblmstksa AS ksa  WHERE ksa.CAreaId = '.$row->CAreaId.' order by RAND() LIMIT '.$row->getksa);
		}
		print_r($obj); die;		
	}
	
	
}
