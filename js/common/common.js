
/* 显示Ajax表单 */
function ajax_form(id, title, url, width, model)
{
    if (!width)	width = 480;
    if (!model) model = 1;
    var d = DialogManager.create(id);
    d.setTitle(title);
    d.setContents('ajax', url);
    d.setWidth(width);
    d.show('center',model);
    return d;
}
//显示一个内容为自定义HTML内容的消息
function html_form(id, title, _html, width, model) {
    if (!width)	width = 480;
    if (!model) model = 0;
    var d = DialogManager.create(id);
    d.setTitle(title);
    d.setContents(_html);
    d.setWidth(width);
    d.show('center',model);
    return d;
}

function showDialog(msg, mode, t, func, cover, funccancel, leftmsg, confirmtxt, canceltxt, closetime, locationtime) {
	if (mode == 'js'){
		if(typeof func == 'function') func();
		else eval(func);
		//hideMenu(null, 'dialog');
		return ;
	}
	clearTimeout(showDialogST);
	cover = isUndefined(cover) ? (mode == 'info' ? 0 : 1) : cover;
	leftmsg = isUndefined(leftmsg) ? '' : leftmsg;
	mode = in_array(mode, ['confirm', 'notice', 'info', 'succ','js']) ? mode : 'alert';
	var menuid = 'fwin_dialog';
	var menuObj = $$(menuid);
	var showconfirm = 1;
	confirmtxtdefault = '确定';
	closetime = isUndefined(closetime) ? '' : closetime;
	closefunc = function () {
		if(typeof func == 'function') func();
		else eval(func);
		hideMenu(menuid, 'dialog');
	};
	if(closetime) {
		leftmsg = closetime + ' 秒后窗口关闭';
		showDialogST = setTimeout(closefunc, closetime * 1000);
		showconfirm = 0;
	}
	locationtime = isUndefined(locationtime) ? '' : locationtime;
	if(locationtime) {
		leftmsg = locationtime + ' 秒后页面跳转';
		showDialogST = setTimeout(closefunc, locationtime * 1000);
		showconfirm = 0;
	}
	confirmtxt = confirmtxt ? confirmtxt : confirmtxtdefault;
	canceltxt = canceltxt ? canceltxt : '取消';

	if(menuObj) hideMenu('fwin_dialog', 'dialog');
	menuObj = document.createElement('div');
	menuObj.style.display = 'none';
	menuObj.className = 'dialog_body';
	menuObj.id = menuid;
	$$('append_parent').appendChild(menuObj);
	var hidedom = '';
	if(!BROWSER.ie) {
		hidedom = '<style type="text/css">object{visibility:hidden;}</style>';
	}
	var s = hidedom + '<h3 class="dialog_head"><span class="dialog_title">';
	s += t ? t : '<span class="dialog_title_icon">提示信息</span>';
	s += '</span><span class="dialog_close_button" id="fwin_dialog_close" onclick="hideMenu(\'' + menuid + '\', \'dialog\')" title="关闭">X</span></h3>';
	if(mode == 'info') {
		s += msg ? msg : '';
	} else {
		s += '<div class="eject_con"><div class="dialog_message_contents">';
		s += '<i class="' + (mode == 'alert' ? 'alert_error' : (mode == 'succ' ? 'alert_right' : 'alert_info')) + '"></i>' + msg + '</div></div>';
		s += '<div class="dialog_buttons_bar">' + (leftmsg ? '<time class="countdown">'+'<i class="icon-time"></i>' + leftmsg + '</time>' : '') + (showconfirm ? '<a href="javascript:void(0)" id="fwin_dialog_submit" class="dialog-bottom-btn dialog-bottom-btn mr10">'+confirmtxt+'</a>' : '');
		s += mode == 'confirm' ? '<a href="javascript:void(0)" id="fwin_dialog_cancel" class="dialog-bottom-btn" onclick="hideMenu(\'' + menuid + '\', \'dialog\')">'+canceltxt+'</a>' : '';
		s += '</div>';
	}
	menuObj.innerHTML = s;
	if($$('fwin_dialog_submit')) $$('fwin_dialog_submit').onclick = function() {
		if(typeof func == 'function') func();
		else eval(func);
		hideMenu(menuid, 'dialog');
	};
	if($$('fwin_dialog_cancel')) {
		$$('fwin_dialog_cancel').onclick = function() {
			if(typeof funccancel == 'function') funccancel();
			else eval(funccancel);
			hideMenu(menuid, 'dialog');
		};
		$$('fwin_dialog_close').onclick = $$('fwin_dialog_cancel').onclick;
	}
	showMenu({'mtype':'dialog','menuid':menuid,'duration':3,'pos':'00','zindex':JSMENU['zIndex']['dialog'],'cache':0,'cover':cover});
	try {
		if($$('fwin_dialog_submit')) $$('fwin_dialog_submit').focus();
	} catch(e) {}
}

function showSucc(msg) {
	var p = /<script[^\>]*?>([^\x00]*?)<\/script>/ig;
	msg = msg.replace(p, '');
	if(msg !== '') {
		showDialog(msg, 'succ', '提示信息', null, true, null, '', '', '', 3);
	}
}

function showError(msg) {
	var p = /<script[^\>]*?>([^\x00]*?)<\/script>/ig;
	msg = msg.replace(p, '');
	if(msg !== '') {
		showDialog(msg, 'alert', '错误信息', null, true, null, '', '', '', 3);
	}
}


