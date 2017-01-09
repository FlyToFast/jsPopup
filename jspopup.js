var jspopup = {
    vars: {
        var1: 'value1',
        var2: 'value2'
    },
    initPopup: function (title) {
        var guid = this.guid();
        var jsPopupDiv = '';
        jsPopupDiv += '<div class="jspfullscreen jspflexboxCenter" id="jspf'+guid+'">'
	    jsPopupDiv += '<div class="jsp" id="jsp'+guid+'">';
	    jsPopupDiv += '<div class="jspTopBar">';
	    jsPopupDiv += '<div class=" jspPopupTitle">'+title+'</div>';
        jsPopupDiv += '<div class="jspClose" id="popUpClose' + guid + '"></div>';
        jsPopupDiv += '</div>';
        jsPopupDiv += '<div class="jspSettings"></div>';
        jsPopupDiv += '</div>';
        jsPopupDiv += '<div class="jspFullscreenDark" id="black' + guid + '"></div>';
        $('body').append(jsPopupDiv);
        this.closePopupListenet(guid);
        $('#jsp' + guid).draggable(
			{ handle: ".jspPopupTitle" }
        );
        return guid;
    },
    closePopupListenet: function (guid) {
        $('#popUpClose' + guid + ', #black' + guid).on('click', function () {
            $('#jspf' + guid).remove();
            $('#black' + guid).remove();
        });
    },
    addSetting: function (guid) {
        var jsSetting = '';
        jsSetting += '<div class="mfPopupLabelInput">';
		jsSetting += '<label class="mfPopupLabel">attendees - Size</label>';
		jsSetting += '<div class="mfPopupSlider" type="text" id="AttendeesSize'+guid+'"></div>';
		jsSetting += '</div>';
        $('#jsp' + guid).append(jsSetting);
    },

    addSliderSetting: function (guid, label, current, min, max, step, callback) {
        var settingGuid = this.guid();
        var jsSetting = '';
        jsSetting += '<div class="jspSetting" id="jspSetting'+settingGuid+'">';
        jsSetting += '<div class="jspLabel">'+label+'</div>';
        jsSetting += '<div class="jspInput jspFlex">';
        jsSetting += '<div class="jspInputLeft">';
        		jsSetting += '</div>';

        jsSetting += '<div class="jspInputRight">';
        jsSetting += '<input type="number" name="jspNumber" value="'+current+'" min="'+min+'" max="'+max+'" step="'+step+'">';
		jsSetting += '</div>';

		jsSetting += '</div>';
        $('#jsp' + guid + ' .jspSettings').append(jsSetting);
        $('#jspSetting'+settingGuid+' .jspInputLeft').slider({
				range: "min",
				max: max,
				min: min,
				value: current,
				step: step,
                slide: function (event, ui) {
                    $('#jspSetting'+settingGuid+' .jspInputRight input').val(ui.value);
					callback(ui.value);
				}
			});
        $('#jspSetting'+settingGuid+' .jspInputRight input').on('input',function(e){
            $('#jspSetting'+settingGuid+' .jspInputLeft').slider( "value", $(this).val() );
            callback($(this).val());
        });
    },
    addTextSetting: function (guid, name, label, current, callback) {
        var settingGuid = this.guid();
        var jsSetting = '';
        jsSetting += '<div class="jspSetting" id="jspSetting'+settingGuid+'">';
        jsSetting += '<div class="jspLabel">'+label+'</div>';
        jsSetting += '<div class="jspInput">';
        jsSetting += '<input type="text" name="' + name + '" value="'+current+'">';
		jsSetting += '</div>';
        $('#jsp' + guid + ' .jspSettings').append(jsSetting);
        $('#jspSetting'+settingGuid+' .jspInput input').on('input',function(e){
            callback($(this).val());
        });
    },
    addButtonSetting: function (guid, name, remove, callback) {
        var settingGuid = this.guid();
        var jsSetting = '';
        jsSetting += '<div class="jspSetting" id="jspSetting'+settingGuid+'">';
        jsSetting += '<div class="jspButton"><span>' + name + '</span></div>';
		jsSetting += '</div>';
        $('#jsp' + guid + ' .jspSettings').append(jsSetting);
        $('#jspSetting' + settingGuid + ' .jspButton').on('click', function (e) {
            if (remove) {
                $('#jspf' + guid).remove();
                $('#black' + guid).remove();
            }
            callback();
        });
    },
    addMultipleButtonsSetting: function (guid, buttonsArray) {
        var settingGuid = this.guid();
        var jsSetting = '';
        jsSetting += '<div class="jspSetting">';
        for (i = 0; i < buttonsArray.length; i++) {
            jsSetting += '<div class="jspButton multipleButtons" id="jspSetting'+settingGuid+'-'+i+'"><span>'+buttonsArray[i][0]+'</span></div>';
        }        
		jsSetting += '</div>';
        $('#jsp' + guid + ' .jspSettings').append(jsSetting);
         for (i = 0; i < buttonsArray.length; i++) { 
            $('#jspSetting' + settingGuid +'-'+i).on('click', function (e) {
                var p = $(this).attr('id').split('-').slice(-1)[0];
                if (buttonsArray[p][1]) {
                    $('#jspf' + guid).remove();
                    $('#black' + guid).remove();
                }
                buttonsArray[p][2]();
            });
        }  
    },
    addMultipleNumberSetting: function (guid, numbersArray) {
        var settingGuid = this.guid();
        var jsSetting = '';
        jsSetting += '<div class="jspSetting">';
        for (i = 0; i < numbersArray.length; i++) {
            jsSetting += '<div class="multipleNumbers">';
            jsSetting += '<div class="jspLabel">'+numbersArray[i][0]+'</div>';
            jsSetting += '<div class="jspInput" id="jspSetting'+settingGuid+'-'+i+'">';
            jsSetting += '<input type="number" name="jspNumber" value="'+numbersArray[i][1]+'" min="'+numbersArray[i][2]+'" max="'+numbersArray[i][3]+'" step="'+numbersArray[i][4]+'">';
            jsSetting += '</div>';
            jsSetting += '</div>';
        }        
		jsSetting += '</div>';
        $('#jsp' + guid + ' .jspSettings').append(jsSetting);
         for (i = 0; i < numbersArray.length; i++) { 
            $('#jspSetting' + settingGuid +'-'+i + ' input').on('input',function(e){
                var p = $(this).parent().attr('id').split('-').slice(-1)[0];
                numbersArray[p][5]($(this).val());
            });
        }  
    },

    
    addColorPicker: function (guid, label, color, callback) {
        var settingGuid = this.guid();
        var jsSetting = '';
        jsSetting += '<div class="jspSetting" id="jspSetting'+settingGuid+'">';
        jsSetting += '<div class="jspLabel">'+label+'</div>';
        jsSetting += '<div class="jspInput">';
		jsSetting += '</div>';
        $('#jsp' + guid + ' .jspSettings').append(jsSetting);
        var input = document.createElement('INPUT');
        var picker = new jscolor(input);
        picker.fromString(color);
        $('#jspSetting' + settingGuid + ' .jspInput').append(input);
        $('#jspSetting'+settingGuid+' .jspInput input').on('change input',function(e){
            callback($(this).val());
        });
    },
    addSelectbox: function (guid, label, selectionArray, selected, callback) {
        var settingGuid = this.guid();
        var jsSetting = '';
        jsSetting += '<div class="jspSetting" id="jspSetting'+settingGuid+'">';
        jsSetting += '<div class="jspLabel">'+label+'</div>';
        jsSetting += '<div class="jspInput">';
        jsSetting += '<select>';
        for (i = 0; i < selectionArray.length; i++) { 
            jsSetting += '<option';
            if(selectionArray[i]==selected)
                jsSetting += ' selected="selected"';
            jsSetting += ' value="' + selectionArray[i] + '">' + selectionArray[i] + '</option>';
        }
        jsSetting += '</select>';
		jsSetting += '</div>';
        $('#jsp' + guid + ' .jspSettings').append(jsSetting);
        $('#jspSetting'+settingGuid+' .jspInput select').on('input',function(e){
            callback($(this).val());
        });
    },
    addCheckbox: function (guid, label, selected, callback) {
        var settingGuid = this.guid();
        var jsSetting = '';
        jsSetting += '<div class="jspSetting" id="jspSetting'+settingGuid+'">';
        jsSetting += '<div class="jspLabel">'+label+'</div>';
        jsSetting += '<div class="jspInput">';
        // jsSetting += '<input type="text" name="' + name + '" value="'+current+'">';
        jsSetting += '<input type="checkbox"';
        if (selected) { jsSetting += ' checked ';}
        jsSetting += '>';
		jsSetting += '</div>';
        $('#jsp' + guid + ' .jspSettings').append(jsSetting);
        $('#jspSetting' + settingGuid + ' .jspInput input').change(function () {
            if ($(this).is(":checked")) {
                callback(1);
            } else { 
                callback(0);
            }
        // $('#textbox1').val($(this).is(':checked'));        
    });
        // $('#jspSetting'+settingGuid+' .jspInput input').on('input',function(e){
        //     callback($(this).val());
        // });
    },
    guid: function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
}