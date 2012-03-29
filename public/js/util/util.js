util = {
    fm: {
        zeroPad: function( number, width )
        {
            width -= number.toString().length;
            if ( width > 0 )
            {
                return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
            }
            return number;
        },
        formatStrings: {
            shortDate: "d MM, yy",
            month: "MM, yy"
        },
        getDefaultFormat: function() {
            return util.fm.formatStrings["shortDate"];
        },
        formatDate: function(date, format) {
            if (date) {
                if (!format) {
                    format = this.getDefaultFormat();
                }
                return $.datepicker.formatDate(format, date);
            }
        },
        formatTime: function(date) {
            if (date) {
                var hours = date.getHours() % 12,
                    mins = date.getMinutes(),
                    period = Math.floor(date.getHours());
    
                return hours.toString()
                    + ":"
                    + this.zeroPad(mins, 2)
                    + (period ? "pm" : "am");
            }
        }
    }
};