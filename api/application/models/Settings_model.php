<?php

class Settings_model extends CI_Model
 {

	public function add_teamsize($post_teamsize) {
	
		if($post_teamsize) {
						
			$teamsize_data = array(
				'TeamSize' => $post_teamsize['TeamSize'],
				'CreatedBy' => $post_teamsize['CreatedBy'],
				'UpdatedBy' => $post_teamsize['UpdatedBy'],
				'UpdatedOn' => date('y-m-d H:i:s'),
			);
			
			$res = $this->db->insert('tblmstteamsize',$teamsize_data);
			
			if($res) {
				return true;
			} else {
				return false;
			}
	
		} else {
			return false;
		}
	}

	public function addRemainigDays($post_rdays) {
	
		if($post_rdays) {			
			//$this->db->where('TeamSizeId',$teamsize_id);
			//$result = $this->db->delete('tblmstreminderdays');
			$result = $this->db->truncate('tblmstreminderdays');
			if($result){
				foreach($post_rdays as $days) {

					$rdays_data = array(
						'Day' => $days['Day'],
						'CreatedBy' => $days['CreatedBy'],
						'UpdatedBy' => $days['UpdatedBy'],
						'UpdatedOn' => date('y-m-d H:i:s'),
					);
					
					$res = $this->db->insert('tblmstreminderdays',$rdays_data);
				}
				if($res) {
					return true;
				} else {
					return false;
				}
		
			} else {
				return false;
			}				
			
		} else {
			return false;
		}
	}
	
	public function getlist_teamsize() {
	
		$this->db->select('ts.*');
		$result = $this->db->get('tblmstteamsize as ts');		
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}
	
	public function get_noofksa($userid = NULL){

		if($userid) {
			$this->db->select('ConfigurationId,Key,Value');
			$this->db->where('Key','NoOfKSA');
			$result = $this->db->get('tblmstconfiguration');			

			if($result->num_rows()==0){
				$data = array(
					'Key' => 'NoOfKSA',
					'Value' => '50',
					'IsActive' => 1,
					'CreatedBy' => $userid,
					'UpdatedBy' => $userid,
					'UpdatedOn' => date('y-m-d H:i:s'),
				);			
				$res = $this->db->insert('tblmstconfiguration',$data);

				$this->db->select('ConfigurationId,Key,Value');
				$this->db->where('Key','NoOfKSA');
				$result = $this->db->get('tblmstconfiguration');

			} 
			$res = array();
			foreach($result->result() as $row) {
				$res = $row;
			}
			return $res;

		} else {
			return false;
		}
	}

	public function get_invitation($userid = NULL){
		if($userid) {
			$this->db->select('ConfigurationId,Key,Value');
			$this->db->where('Key','Invitation');
			$result = $this->db->get('tblmstconfiguration');			

			if($result->num_rows()==0){
				$data = array(
					'Key' => 'Invitation',
					'Value' => 1,
					'IsActive' => 1,
					'CreatedBy' => $userid,
					'UpdatedBy' => $userid,
					'UpdatedOn' => date('y-m-d H:i:s'),
				);			
				$res = $this->db->insert('tblmstconfiguration',$data);

				$this->db->select('ConfigurationId,Key,Value');
				$this->db->where('Key','Invitation');
				$result = $this->db->get('tblmstconfiguration');

			} 
			$res = array();
			foreach($result->result() as $row) {
				$res = $row;
			}
			return $res;

		} else {
			return false;
		}
	}

	public function get_remainingdays(){
		$this->db->select('Day,CreatedBy,UpdatedBy');
		$result = $this->db->get('tblmstreminderdays');		
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
	}

	public function get_emailfrom($userid = NULL){
		if($userid) {
			$this->db->select('ConfigurationId,Key,Value');
			$this->db->where('Key','EmailFrom');
			$result = $this->db->get('tblmstconfiguration');			

			if($result->num_rows()==0){
				$data = array(
					'Key' => 'EmailFrom',
					'Value' => '',
					'IsActive' => 1,
					'CreatedBy' => $userid,
					'UpdatedBy' => $userid,
					'UpdatedOn' => date('y-m-d H:i:s'),
				);			
				$res = $this->db->insert('tblmstconfiguration',$data);

				$this->db->select('ConfigurationId,Key,Value');
				$this->db->where('Key','EmailFrom');
				$result = $this->db->get('tblmstconfiguration');

			} 
			$res = array();
			foreach($result->result() as $row) {
				$res = $row;
			}
			return $res;

		} else {
			return false;
		}
	}
	
	// public function get_teamsizedata($teamsize_id = NULL) {
		
	// 	if($teamsize_id) {
			
	// 		$this->db->select('*');
	// 		$this->db->where('TeamSizeId',$teamsize_id);
	// 		$result = $this->db->get('tblmstteamsize');
			
	// 		$teamsize_data = array();
	// 		foreach($result->result() as $row) {
	// 			$teamsize_data = $row;
	// 		}
	// 		return $teamsize_data;
			
	// 	} else {
	// 		return false;
	// 	}
	// }
	
	public function update_config($config_data) {
	
		if($config_data) {

			$data = array(
				'Value' => $config_data['Value'],
				'UpdatedBy' => $config_data['UpdatedBy'],
				'UpdatedOn' => date('y-m-d H:i:s'),
			);
			
			$this->db->where('Key',$config_data['Key']);
			$res = $this->db->update('tblmstconfiguration',$data);
			
			if($res) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}	
	
	}

	
	public function edit_teamsize($post_teamsize) {
	
		if($post_teamsize) {

			$teamsize_data = array(
				'TeamSize' => $post_teamsize['TeamSize'],
				'UpdatedBy' => $post_teamsize['UpdatedBy'],
				'UpdatedOn' => date('y-m-d H:i:s'),
			);
			
			$this->db->where('TeamSizeId',$post_teamsize['TeamSizeId']);
			$res = $this->db->update('tblmstteamsize',$teamsize_data);
			
			if($res) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}	
	
	}
	
	
	public function delete_teamsize($teamsize_id) {
	
		if($teamsize_id) {
			
			$this->db->where('TeamSizeId',$teamsize_id);
			$res = $this->db->delete('tblmstteamsize');
			
			if($res) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
		
	}
	
}
