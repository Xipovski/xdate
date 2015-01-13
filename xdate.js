/*! Copyright (c) 2015 Tsoy Andrey
* Licensed under the MIT License (license.txt).
*
* Version: 1.0.0
*
* Requires: jQuery
*/


//(function(){Date.shortMonths=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Date.longMonths=["January","February","March","April","May","June","July","August","September","October","November","December"],Date.shortDays=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],Date.longDays=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];var t={d:function(){return(this.getDate()<10?"0":"")+this.getDate()},D:function(){return Date.shortDays[this.getDay()]},j:function(){return this.getDate()},l:function(){return Date.longDays[this.getDay()]},N:function(){return this.getDay()+1},S:function(){return this.getDate()%10==1&&11!=this.getDate()?"st":this.getDate()%10==2&&12!=this.getDate()?"nd":this.getDate()%10==3&&13!=this.getDate()?"rd":"th"},w:function(){return this.getDay()},z:function(){var t=new Date(this.getFullYear(),0,1);return Math.ceil((this-t)/864e5)},W:function(){var t=new Date(this.getFullYear(),0,1);return Math.ceil(((this-t)/864e5+t.getDay()+1)/7)},F:function(){return Date.longMonths[this.getMonth()]},m:function(){return(this.getMonth()<9?"0":"")+(this.getMonth()+1)},M:function(){return Date.shortMonths[this.getMonth()]},n:function(){return this.getMonth()+1},t:function(){var t=new Date;return new Date(t.getFullYear(),t.getMonth(),0).getDate()},L:function(){var t=this.getFullYear();return t%400==0||t%100!=0&&t%4==0},o:function(){var t=new Date(this.valueOf());return t.setDate(t.getDate()-(this.getDay()+6)%7+3),t.getFullYear()},Y:function(){return this.getFullYear()},y:function(){return(""+this.getFullYear()).substr(2)},a:function(){return this.getHours()<12?"am":"pm"},A:function(){return this.getHours()<12?"AM":"PM"},B:function(){return Math.floor(1e3*((this.getUTCHours()+1)%24+this.getUTCMinutes()/60+this.getUTCSeconds()/3600)/24)},g:function(){return this.getHours()%12||12},G:function(){return this.getHours()},h:function(){return((this.getHours()%12||12)<10?"0":"")+(this.getHours()%12||12)},H:function(){return(this.getHours()<10?"0":"")+this.getHours()},i:function(){return(this.getMinutes()<10?"0":"")+this.getMinutes()},s:function(){return(this.getSeconds()<10?"0":"")+this.getSeconds()},u:function(){var t=this.getMilliseconds();return(10>t?"00":100>t?"0":"")+t},e:function(){return"Not Yet Supported"},I:function(){for(var t=null,e=0;12>e;++e){var n=new Date(this.getFullYear(),e,1),r=n.getTimezoneOffset();if(null===t)t=r;else{if(t>r){t=r;break}if(r>t)break}}return this.getTimezoneOffset()==t|0},O:function(){return(-this.getTimezoneOffset()<0?"-":"+")+(Math.abs(this.getTimezoneOffset()/60)<10?"0":"")+Math.abs(this.getTimezoneOffset()/60)+"00"},P:function(){return(-this.getTimezoneOffset()<0?"-":"+")+(Math.abs(this.getTimezoneOffset()/60)<10?"0":"")+Math.abs(this.getTimezoneOffset()/60)+":00"},T:function(){var t=this.getMonth();this.setMonth(0);var e=this.toTimeString().replace(/^.+ \(?([^\)]+)\)?$/,"$1");return this.setMonth(t),e},Z:function(){return 60*-this.getTimezoneOffset()},c:function(){return this.format("Y-m-d\\TH:i:sP")},r:function(){return this.toString()},U:function(){return this.getTime()/1e3}};Date.prototype.format=function(e){var n=this;return e.replace(/(\\?)(.)/g,function(e,r,i){return""===r&&t[i]?t[i].call(n):i})}}).call(this);

(function($) {            
        
    var _options = $.extend({}, _options);
    
    var methods = {
        
        init : function( options ) {

            this.unbind('win');

            return this.each(function(){                                                                                
                var $this = $(this),
                    xdateHtml = $('<div class="xdate"></div>'),
                    xdateTable = $('<table></table>');
                    
                var xDate = new Date(),
                    xDateDay = xDate.getDate(), //Day
                    xDateMonth = xDate.getMonth(), //Month                    
                    _xDate = new Date(xDate),
                    xDateWeekTitles = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
                    
                    _xDate.setDate(1);
                var xDateWeekday = _xDate.getDay() == 0 ? 7 : _xDate.getDay();
                                                                                                
                _xDate.setDate(_xDate.getDate() - xDateWeekday + 1);
                
                console.log(_xDate);
                console.log(xDate);
                
                xdateTableTr = $('<tr />').appendTo(xdateTable);
                for (var $i = 0; $i < 7; $i++ ) {
                    xdateTableTd = $('<td />').addClass('xdate__week').appendTo(xdateTableTr);
                    xdateTableTd.html(xDateWeekTitles[$i]);
                }
                    
                for (var $i = 0; $i < 6; $i++ ) {
                    xdateTableTr = $('<tr />').appendTo(xdateTable);
                    for (var $j = 0; $j < 7; $j++ ) {
                        xdateTableTd = $('<td />').appendTo(xdateTableTr);
                        xdateTableTd.html($('<a href="#"><span>' + _xDate.getDate() + '</span></a>'));
                        if (xDateMonth !== _xDate.getMonth()) {
                            xdateTableTd.addClass('xdate__disable');
                        }
                        else if (xDateDay === _xDate.getDate()) {
                            xdateTableTd.addClass('xdate__selected');
                        }
                        if (_xDate.getDay() === 0 || _xDate.getDay() === 6) {xdateTableTd.addClass('xdate__weekday');}
                        _xDate.setDate(_xDate.getDate() + 1);
                                                 
                    }                    
                }
                       
                xdateHtml.append(xdateTable);
                $this.append(xdateHtml);            
            });
        }
    };
    
    
    $.fn.xDate = function( method ) {
        if (methods[method]) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Метод ' +  method + ' не существует в jQuery.xDate' );
        }
    };    
})(jQuery);

$(document).ready(function(){
    $('.date').xDate();
});
