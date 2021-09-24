try {
	Zabbix.Log(4, 'GChat webhook script value='+value);
 
	var result = {
            'tags': {
                'endpoint': 'GChat'
            }
        },
        params = JSON.parse(value),
        req = new CurlHttpRequest(),
        message = {},
        resp,
        final_url = '';
 
	req.AddHeader('Content-Type: application/json; charset=UTF-8');

    final_url = params.ROOM_URL;
    if(params.EVENT_ID != '') {
        final_url += "&threadKey=" + encodeURI(params.EVENT_ID);
    }
 
	message.text = "*" + params.Subject + "* \n\n" + params.Message;
	resp = req.Post(final_url, JSON.stringify(message));
 
	if (req.Status() != 200) {
		throw 'Response code: '+req.Status();
	}
 
    Zabbix.Log(4, 'GChat message success URL : ' + final_url);
    Zabbix.Log(4, 'GChat message success MSG : ' + JSON.stringify(resp));

	resp = JSON.parse(resp);
} catch (error) {
	Zabbix.Log(3, 'GChat message creation failed json : ' + JSON.stringify(message));
	Zabbix.Log(3, 'GChat issue creation failed : ' + error);
 
    result = {};
}
 
return JSON.stringify(result);
