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
    guid: function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
}