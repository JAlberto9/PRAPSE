$(document).ready(function () {
    $("#table").hide();

    function exportTableToCSV($table, filename) {
        var $rows = $table.find('tr:has(td)'),

        // Temporary delimiter characters unlikely to be typed by keyboard
        // This is to avoid accidentally splitting the actual contents
        tmpColDelim = String.fromCharCode(11), // vertical tab character
        tmpRowDelim = String.fromCharCode(0), // null character

        // actual delimiter characters for CSV format
        colDelim = '","',
        rowDelim = '"\r\n"',

        // Grab text from table into CSV formatted string
        csv = '"' + $rows.map(function (i, row) {
            var $row = $(row),
                $cols = $row.find('td');

            return $cols.map(function (j, col) {
                var $col = $(col),
                    text = $col.text();

                return text.replace(/"/g, '""'); // escape double quotes

            }).get().join(tmpColDelim);

        }).get().join(tmpRowDelim)
            .split(tmpRowDelim).join(rowDelim)
            .split(tmpColDelim).join(colDelim) + '"',

        // Data URI
        csvData = 'data:application/csv;charset=utf-8,%EF%BB%BF' + encodeURIComponent(csv);

        $(this)
            .attr({
            'download': filename,
                'href': csvData,
                'target': '_blank'
        });
    }

    // This must be a hyperlink
    $("#csvPob").on('click', function (event) {
        exportTableToCSV.apply(this, [$('#table-container>table'), 'poblacion.csv']);
    });
    $(".close").on('click', function(event){
        $("#table").hide();
    });
    $(".showTable").on('click', function(event){
        generaTablaPo(pobTotalXEstado);
        $("#table").show();
    });
    $(".showTable2").on('click', function(event){
        generaTablaPo2(pobTotalXEstado);
        $("#table").show();
    });
});

function generaTablaPo(arr){

        var html = "";
        var columnNames = ["Estado", "Población total", "Viviendas totales", "P. Masculina","P. Econo A", "P. Femenina", "P < 12 años", "P < 12 años masculina", "P < 12 años femenina", "P > 60 años", "P > 60 años masculina", "P > 60 años femenina"];

        html += "<table><thead><tr>";
        columnNames.forEach(function(value, idx){
            html += "<td>" + value + "</td>";
        })

        html += "</tr></thead>";
        html += "<tbody>"
        for(var objIdx in arr){
            html += "<tr>";
            Object.keys(arr[objIdx]).forEach(function(value, idx){
            html += "<td>" + agregasComas(arr[objIdx][value]) + "</td>";
            })
            html += "</tr>";
        }

        html += "<tr><td><b>Total</b></td>";
        html += "<td><b>" + agregasComas(TotalPobFinal) + "</b></td>";
        html += "<td><b>" + agregasComas(TotalVivFinal) + "</b></td>";
        html += "<td><b>" + agregasComas(TotalPobMas) + "</b></td>";
        html += "<td><b>" + agregasComas(TotalPEA) + "</b></td>";
        html += "<td><b>" + agregasComas(TotalPobFem) + "</b></td>";
        html += "<td><b>" + agregasComas(TotalMenor12) + "</b></td>";
        html += "<td><b>" + agregasComas(TotalMenor12M) + "</b></td>";
        html += "<td><b>" + agregasComas(TotalMenor12F) + "</b></td>";
        html += "<td><b>" + agregasComas(TotalMayor60) + "</b></td>";
        html += "<td><b>" + agregasComas(TotalMayor60M) + "</b></td>";
        html += "<td><b>" + agregasComas(TotalMayor60F) + "</b></td>";

        html += "</tr></tbody><table>";

        $("#table-container")[0].innerHTML = html;
    }
