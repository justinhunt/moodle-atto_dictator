YUI.add('moodle-atto_dictator-button', function (Y, NAME) {

// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/*
 * @package    atto_dictator
 * @copyright  2018 Justin Hunt <justin@poodll.com,>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * @module moodle-atto_dictator-button
 */

/**
 * Atto text editor dictator plugin.
 *
 * @namespace M.atto_dictator
 * @class button
 * @extends M.editor_atto.EditorPlugin
 */
var COMPONENTNAME = 'atto_dictator';
var LANGUAGE = {ENUS: 'en-US',ENUK: 'en-UK',ENAU: 'en-AU',FRCA: 'fr-CA', ESUS: 'es-US',FRFR: 'fr-FR',ITIT: 'it-IT', PTBR: 'pt-BR'};
var DICTATOR = {};
var SKIN = {PLAIN: 'standard',
            BMR: 'bmr',
            ONETWOTHREE: 'onetwothree',
            FRESH: 'fresh',
            ONCE: 'once'};
var CSS = {
        AUDIO: 'atto_dictator_audio',
        LANG_SELECT: 'atto_dictator_languageselect',
        CP_AUDIO: 'atto_dictator_audio_cont',
        CP_SWAP: 'atto_dictator_swapmeout'
};
var STATE ={
    started: false,
    currentrecorder: false,
    elementid: false,

};

var TEMPLATES = {
        ROOT: '' +
            '<form class="mform atto_form atto_dictator_form" id="{{elementid}}_atto_dictator_form">' +
                    '<div data-medium-type="{{CSS.AUDIO}}" class="tab-pane active" id="{{elementid}}_{{CSS.AUDIO}}">' +
        '<div id="{{elementid}}_{{CSS.CP_AUDIO}}" class="{{CSS.CP_SWAP}}" data-id="{{elementid}}_{{CSS.CP_AUDIO}}" data-parent="{{CP.parent}}"' +
        ' data-appid="{{CP.appid}}" data-media="audio" data-type="{{CP.audioskin}}" data-localloader="/lib/editor/atto/plugins/dictator/poodllloader.html"' +
        ' data-localloading="auto" data-width="{{CP.sizes.audiowidth}}" data-height="{{CP.sizes.audioheight}}"' +
        ' data-transcode="0" data-speechevents="1" data-transcribe="0" data-subtitle="0" data-language="{{CP.language}}"' +
        ' data-expiredays="1" data-region="{{CP.region}}" data-token="{{CP.token}}" data-fallback="none"></div>' +
                    '</div>' +
                        '<br><label>{{get_string "speakerlanguage" component}}&nbsp;' +
                        '<select id="{{elementid}}_{{CSS.LANG_SELECT}}" class="{{CSS.LANG_SELECT}}">' +
                            '<option value="{{LANG.ENUS}}" {{#if useENUS}}selected="selected"{{/if}}>{{get_string "en-us" component}}</option>' +
                            '<option value="{{LANG.ENUK}}" {{#if useENUK}}selected="selected"{{/if}}>{{get_string "en-uk" component}}</option>' +
                            '<option value="{{LANG.ENAU}}" {{#if useENAU}}selected="selected"{{/if}}>{{get_string "en-au" component}}</option>' +
                            '<option value="{{LANG.FRCA}}" {{#if useFRCA}}selected="selected"{{/if}}>{{get_string "fr-ca" component}}</option>' +
                            '<option value="{{LANG.ESUS}}" {{#if useESUS}}selected="selected"{{/if}}>{{get_string "es-us" component}}</option>' +
                            '<option value="{{LANG.FRFR}}" {{#if useFRFR}}selected="selected"{{/if}}>{{get_string "fr-fr" component}}</option>' +
                            '<option value="{{LANG.ITIT}}" {{#if useITIT}}selected="selected"{{/if}}>{{get_string "it-it" component}}</option>' +
                            '<option value="{{LANG.PTBR}}" {{#if usePTBR}}selected="selected"{{/if}}>{{get_string "pt-br" component}}</option>' +
                        '</select>' +
                        '</label>' +
                    '</div>' +
                '</div>' +
            '</form>'
};

Y.namespace('M.atto_dictator').Button = Y.Base.create('button', Y.M.editor_atto.EditorPlugin, [], {
    initializer: function(config) {

            // Add the dictator button
            this.addButton({
                icon: 'audio',
                iconComponent: 'atto_dictator',
                title: 'audio_desc',
                buttonName: 'audio',
                callback: this._displayDialogue,
                callbackArgs: 'audio'
            });

        //set up the dictator div
        DICTATOR.parent = M.cfg.wwwroot;
        DICTATOR.appid = 'atto_dictator';
        DICTATOR.token = config.cp_token;
        DICTATOR.region = config.cp_region;
        DICTATOR.expiredays = 1;
        DICTATOR.language = config.cp_language;
        DICTATOR.audioskin = config.cp_audioskin;
        DICTATOR.sizes = this._fetchRecorderDimensions();
    },

    /**
     * Gets the root context for all templates, with extra supplied context.
     *
     * @method _getContext
     * @param  {Object} extra The extra context to add
     * @return {Object}
     * @private
     */
    _getContext:
        function(extra) {
        return Y.merge({
            elementid: this.get('host').get('elementid'),
            component: COMPONENTNAME,
            helpStrings: this.get('help'),
            useENUS: DICTATOR.language == LANGUAGE.ENUS,
            useENUK: DICTATOR.language == LANGUAGE.ENUK,
            useENAU: DICTATOR.language == LANGUAGE.ENAU,
            useFRCA: DICTATOR.language == LANGUAGE.FRCA,
            useESUS: DICTATOR.language == LANGUAGE.ESUS,
            useFRFR: DICTATOR.language == LANGUAGE.FRFR,
            useITIT: DICTATOR.language == LANGUAGE.ITIT,
            usePTBR: DICTATOR.language == LANGUAGE.PTBR,
            CSS: CSS,
            CP: DICTATOR,
            LANG: LANGUAGE
        }, extra);
    },

    _fetchRecorderDimensions: function() {
        // Get return object
        var sizes = {};
        switch (DICTATOR.audioskin) {
            default:
                sizes.audiowidth = 450;
                sizes.audioheight = 350;
                break;
        }
        return sizes;
    },



    /**
     * Display the media editing tool.
     *
     * @method _displayDialogue
     * @private
     */
    _displayDialogue: function(e,recorder) {

        //whats this?
        if (this.get('host').getSelection() === false) {
            return;
        }else{
            this._currentSelection = this.get('host').getSelection();
        }
        STATE.currentrecorder = recorder;

        //get audio recorder title and sizes
        var title = M.util.get_string('createaudio', COMPONENTNAME);
        var width = '501';
        var height = false;

        var d_conf = {};
        d_conf.center =true;
        d_conf.headerContent =title;
        d_conf.focusAfterHide = recorder;
        d_conf.width = width + 'px';
        if(height) {
            d_conf.height = height + 'px';
        }

        var dialogue = this.getDialogue(d_conf);

        //if this dialog had a different size and title (it was popped up before as diff media recorder type)
        if(dialogue.get('width') != width + 'px'){
            dialogue.set('headerContent',title);
            //sadly the width and height won't change .. whatever
            dialogue.set('width',width + 'px');
            dialogue.set('height',height + 'px');
        }


        // Set the dialogue content, and then show the dialogue.
        dialogue.set('bodyContent', this._getDialogueContent()).show();


        //store some common elements we will refer to later
        STATE.elementid = this.get('host').get('elementid');
        STATE.languageselect = Y.one('#' + STATE.elementid + '_' + CSS.LANG_SELECT);
        var topnode = Y.one('#' + STATE.elementid + '_' + CSS.ATTO_DICTATOR_FORM);
        var that=this;



        //language selectopr
        if(STATE.languageselect != null) {
            STATE.languageselect.on('change', function (e) {
                var element = e.currentTarget;
                if(element) {
                    DICTATOR.language = element.selectedOptionValue();
                    topnode.all('.' + CSS.CP_SWAP).setAttribute('data-language', DICTATOR.language);
                    topnode.all('.' + CSS.CP_SWAP).setAttribute('data-alreadyparsed', 'false');
                    //reload the recorders
                    topnode.all('.' + CSS.CP_SWAP).empty();
                    that._loadRecorders();
                }
            });
        }

        //so finally load those recorders
        this._loadRecorders();
    },


    /**
     * Loads or reloads the recorders
     *
     * @method _loadRecorders
     * @private
     */
    _loadRecorders: function(){
        var that = this;
        that.inserted=false;
        that.ap_count=0;
        require(['atto_dictator/cloudpoodllloader'], function(loader) {
            var gspeech = "";
            var recorder_callback = function(evt){
                switch(evt.type){
                    case "speech":
                        gspeech += "  " + evt.capturedspeech;
                        break;

                    case 'recording':
                        if(evt.action==='stopped'){
                            setTimeout(function(){
                                that._doInsert(gspeech);
                            },1000);
                            that.inserted = true;
                        }
                        break;

                    case 'awaitingprocessing':
                        //we delay  a second to allow the sourcefile to be copied to correct location


                    case 'filesubmitted':
                        //we will probably never get here because awaiting processing will fire first
                        //we do not use this event, but it arrives when the final file is ready. (much earlier in case of non-transcode)

                        break;
                    case 'error':
                        alert('PROBLEM:' + evt.message);
                        break;
                }
            };
            loader.init(CSS.CP_SWAP,recorder_callback);
        });
    },

    /**
     * Returns the dialogue content for the tool.
     *
     * @method _getDialogueContent
     * @param  {WrappedRange[]} selection Current editor selection
     * @return {Y.Node}
     * @private
     */
    _getDialogueContent: function(selection) {
        var content = Y.Node.create(
            Y.Handlebars.compile(TEMPLATES.ROOT)(this._getContext())
        );
        return content;
    },


    /**
     * Inserts the link or media element onto the page
     * @method _doInsert
     * @private
     */
    _doInsert : function(speechcontent){
        this.getDialogue({
            focusAfterHide: null
        }).hide();

        var host =this.get('host');
        host.focus();
        host.setSelection(this._currentSelection);
        host.insertContentAtFocusPoint(speechcontent);
        this.markUpdated();

    }
}, { ATTRS: {
    disabled: {
        value: false
    }
}
});

}, '@VERSION@');
