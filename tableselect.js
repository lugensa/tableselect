(function($) {
    $.fn.tableselect = function() {
        return this.each(function(index) {
            var original = $(this);
            original.hide();
            init_widget(original);
        });
    };

    var init_widget = function(original, tableselect) {
        var table = $('<table id=""></table>');
        table.insertBefore(original);
        // We expect an item with initialized tableselect-data containing data,
        // columns, language and ordering
        var options = {
            "data": original.data('tableselect-data')['data'],
            "columns": original.data('tableselect-data')['columns'],
            "language": original.data('tableselect-data')['language'],
            "ordering": original.data('tableselect-data')['ordering'],
            "searching": true,
            "autoWidth": false,
            "scrollY": "300px",
            "paging": false,
            "dom": 'ft',
            "scrollCollapse": true
        };
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
    };

})(jQuery);
