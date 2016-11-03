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
        console.log('remove');
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
        jsSetting += '<div class="jspInput">';
		jsSetting += '</div>';
        $('#jsp' + guid + ' .jspSettings').append(jsSetting);
        $('#jspSetting'+settingGuid+' .jspInput').slider({
				range: "min",
				max: max,
				min: min,
				value: current,
				step: step,
                slide: function (event, ui) {
					callback(ui.value);
				}
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
    addColorPicker: function (guid, label, color, callback) {
        var settingGuid = this.guid();
        var jsSetting = '';
        jsSetting += '<div class="jspSetting" id="jspSetting'+settingGuid+'">';
        jsSetting += '<div class="jspLabel">'+label+'</div>';
        jsSetting += '<div class="jspInput">';
        // jsSetting += '<input type="text" name="' + color + '" value="'+color+'">';
		jsSetting += '</div>';
        $('#jsp' + guid + ' .jspSettings').append(jsSetting);
        var input = document.createElement('INPUT');
        var picker = new jscolor(input);
        picker.fromString(color);
        // picker.onFineChange = callback(this);
        // picker.fromHSV(360 / 100 * i, 100, 100)
        $('#jspSetting' + settingGuid + ' .jspInput').append(input);
        // document.getElementById('container').appendChild(input)
        $('#jspSetting'+settingGuid+' .jspInput input').on('change input',function(e){
            callback($(this).val());
        });


        // var input = document.createElement('INPUT')
        // var picker = new jscolor(input)
        // picker.fromHSV(360 / 100 * i, 100, 100)
    
        // document.getElementById('container').appendChild(input)
    },
    guid: function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
}