var tableselect = {};

(function($) {
    $.fn.tableselect = function() {
        return this.each(function(index) {
            var original = $(this);
            original.hide();
            init_widget(original);
        });
    };

    var init_widget = function(original) {
        var table = $('<table id=""></table>');
        table.insertBefore(original);
        var options = {
            "aaData": tableselect[original.attr('id')]['aaData'],
            "aoColumns": tableselect[original.attr('id')]['aoColumns'],
            "oLanguage": tableselect[original.attr('id')]['oLanguage'],
            "aaSorting": tableselect[original.attr('id')]['aaSorting'],
            "bFilter": true,
            "bAutoWidth": false,
            "sScrollY": "300px",
            "bPaginate": false,
            "sDom": 'ft',
            "bScrollCollapse": true
        }
        table.dataTable(options);
        var rows_data = table._('tr');
        var rows = table.$('tr');
        for (x=0; x<rows.length; x++) {
            var checkvalue = rows_data[x][0];
            if (original.find('option[value='+checkvalue+']').attr('selected') == 'selected') {
                $(rows[x]).addClass('row_selected');
            }
        }
        table.$('tr').click(function(ev) {
            var value = table.fnGetData(this)[0];
            var option = original.find('option[value='+value+']');
            if ($(this).toggleClass('row_selected').hasClass('row_selected')) {
                option.attr('selected', 'selected');
            } else {
                option.removeAttr('selected');
            }

        });
    }

})(jQuery);
