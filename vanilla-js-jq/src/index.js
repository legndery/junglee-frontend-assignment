
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
            this.domCache.$app.find('.search-component .button').click((e)=>{
                this.state.modal = true;
                this.renderSearch();
            });
            this.domCache.$modal.find('.crossBtn').click((e)=>{
                this.domCache.$modal.hide();
            })
            
        },
        renderSearch: function(){
            this.render(0);
        },
        render: function(page){
            if(page == 0){
                //search page
                if(this.state.modal){
                    this.domCache.$modal.show();
                }
            }else if(page==1){
                // list page
            }
        }

    }
    App.init();
});
