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
        jsPopupDiv += '<div class="jspClose" id="popUpClose' + guid + '">';
        jsPopupDiv += '</div>';
        jsPopupDiv += '</div>';

        //     jsPopupDiv += '<div class="mfPopupLabelInput">';
		// 	jsPopupDiv += '<label class="mfPopupLabel">ical-link</label>';
		// 	jsPopupDiv += '<input class="mfPopupInput" type="text" id="icalLink'+guid+'" value="3">';
        //     jsPopupDiv += '</div>';
        
        // jsPopupDiv += '<div class="mfPopupLabelInput">';
		// 	jsPopupDiv += '<label class="mfPopupLabel">ical-link</label>';
		// 	jsPopupDiv += '<input class="mfPopupInput" type="text" id="icalLink'+guid+'" value="3">';
        //     jsPopupDiv += '</div>';
        
        // jsPopupDiv += '<div class="mfPopupLabelInput">';
		// 	jsPopupDiv += '<label class="mfPopupLabel">ical-link</label>';
		// 	jsPopupDiv += '<input class="mfPopupInput" type="text" id="icalLink'+guid+'" value="3">';
        //     jsPopupDiv += '</div>';
        
        jsPopupDiv += '</div>';
        jsPopupDiv += '<div class="jspFullscreenDark" id="black' + guid + '"></div>';
        $('body').append(jsPopupDiv);
        this.closePopupListenet(guid);
    },
    closePopupListenet: function (guid) {
        $('#popUpClose' + guid + ', #black' + guid).on('click', function () {
            $('.jspf' + guid).remove();
            $('#black' + guid).remove();
        });
    },
    guid: function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
}