
import './style/style.scss'

import $ from 'jquery'
// import "jquery-ui-bundle";

$(function(){
    const App = {
        init: function(){
            this.domCache.$modal= this.domCache.$app.find('#dialog');
            
            this.attachUIEvents();
        },

        domCache: {
            $app: $('#app'),
        },

        state: {
            modal:false,
            page:0
        },
        attachUIEvents: function(){
            this.attachSearchPageEvents();    
        },
        render: function(page,event){
            if(page == 0){
                switch(event){
                    case 'showModal':
                    if(this.state.modal){
                        this.domCache.$modal.show();
                    }
                    break;
                    case 'formValidate':
                    this.domCache.$modal.find('.button').attr('disabled',this.searchPageVars.formInvalid);
                    break;
                }
                
            }else if(page==1){
                // list page
            }
        },
        ////////////////////////////////////////
        searchPageVars: {
            limit: 0,
            artistName: "",
            formInvalid: true,
            limitInvalid: true,
            artistNameInvalid: true
        },
        attachSearchPageEvents: function(){
            this.domCache.$app.find('.search-component .button').click((e)=>{
                this.state.modal = true;
                this.renderSearch('showModal');
            });
            this.domCache.$modal.find('.crossBtn').click((e)=>{
                this.domCache.$modal.hide();
            });
            this.domCache.$modal.find('#artistName').on('input',(e)=>{
                this.handleUserInput(e);
            });
            this.domCache.$modal.find('#limit').on('input',(e)=>{
                this.handleUserInput(e);
            });
        },
        renderSearch: function(event){
            this.render(0,event);
        },
        handleUserInput:function(e) {
            const name = e.target.name;
            const value = e.target.value;
            this.searchPageVars[name]= value;
            this.validateForm(name, value);
        },
        validateForm: function(name, value){
            if (name == 'artistName') {
                if (value !== '' && value.length > 2) {
                        this.searchPageVars.artistNameInvalid=false;
                }
                else {
                    this.searchPageVars.artistNameInvalid=true;
                }
            } else if (name == 'limit') {
                if (!isNaN(value) && value > 0) {
                        this.searchPageVars.limitInvalid= false;
                } else {
                    this.searchPageVars.limitInvalid= true;
                }
    
            }
            this.searchPageVars.formInvalid = this.searchPageVars.artistNameInvalid || this.searchPageVars.limitInvalid;
            this.renderSearch('formValidate')
        }
        /////////////////////////////////////

    }
    App.init();
});
