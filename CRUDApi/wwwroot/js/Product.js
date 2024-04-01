$(document).ready(function () {
    ProductData();
});

function ProductData() {
    $.ajax({
        url: '/Ajax/ProductList',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8;',
        success: function (result, status, xhr) {
            var tableData = [];

            $.each(result, function (index, item) {
                tableData.push({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    active: item.active
                });
            });

            var table = new Tabulator("#tblBody", {
                data: tableData,
                height: "400px",
                layout: "fitColumns",
                movableRows: true,
                addRowPos: "bottom",
                placeholder: "No Data Set",
                columns: [
                    { title: "Id", field: "id", sorter: "number" },
                    { title: "Name", field: "name", sorter: "string" },
                    { title: "Price", field: "price", sorter: "number", hozAlign: "left", formatter: "progress" },
                    { title: "Quantity", field: "quantity", hozAlign: "center", width: 100, editor: true },
                    { title: "Active", field: "active", width: 90, hozAlign: "center", formatter: "tickCross", sorter: "boolean" },
                    {
                        title: "Actions",
                        formatter: function (cell) {
                            var pid = cell.getRow().getData().id;
                            return "<button class='edit-btn btn btn-primary btn-sm' data-id='" + pid + "'>Edit</button>" +
                                "<button class='delete-btn btn btn-danger btn-sm' data-id='" + pid + "'>Delete</button>";
                        },
                        cellClick: function (e, cell) {
                            // Handle click events for edit and delete buttons
                            var id = cell.getRow().getData().id;
                            if ($(e.target).hasClass('edit-btn')) {
                                Edit(id);
                            } else if ($(e.target).hasClass('delete-btn')) {
                                Delete(id);
                            }
                        }
                    }
                ]
            });
        },
        error: function () {
            alert("Error fetching data.");
        }
    });
}



$('#btnAdd').click(function () {
    clear();
    $('#ProductMadal').modal('show');
    $('#pid').hide();
    $('#Add').css('display', 'block');
    $('#Update').css('display', 'none');
    $('#phead').text('Add');
})

function AddProduct() {
    var objData = {
        Name: $('#Name').val(),
        Price: $('#Price').val(),
        Quantity: $('#Quantity').val(),
        Active: $('#Active').val(),

    }
    $.ajax({
        url: '/Ajax/AddProduct',
        type: 'Post',
        data: objData,
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        success: function () {
            alert('saved');
            clear();
            ProductData();
            Hide();
        },
        error: function () {
            alert("not found");
        }
    });


}

function Hide() {
    $('#ProductMadal').modal('hide');
}

function clear() {
    $('#Name').val('');
    $('#Price').val('');
    $('#Quantity').val('');
    $('#Active').val('');
}

function Delete(id) {
    if (confirm('confirm?')) { 
        $.ajax({
            url: '/Ajax/Delete?id=' + id,
            success: function () {
                alert('deleted');
                ProductData();
            },
            error: function () {
                alert("error");
            }
        })
    }
}

function Edit(id) {
    $.ajax({
        url: '/Ajax/Edit?id=' + id,
        type: 'Get',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function (response) {
            $('#ProductMadal').modal('show');
            $('#ProductId').val(response.id);
            $('#Name').val(response.name);
            $('#Price').val(response.price);
            $('#Quantity').val(response.quantity);
            $('#Active').val(response.active);
            $('#Add').css('display','none');
            $('#Update').css('display', 'block');
            $('#phead').text('Update');
        },
        error: function () {
            alert('error');
        }
    })
    
}

function Update() {
    debugger

    var objData = {
        Id: $('#ProductId').val(),
        Name: $('#Name').val(),
        Price: $('#Price').val(),
        Quantity: $('#Quantity').val(),
        Active: $('#Active').val(),

    }
    $.ajax({
        url: '/Ajax/Update',
        type: 'Post',
        data: objData,
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        success: function () {
            alert('saved');
            clear();
            ProductData();
            Hide();
        },
        error: function () {
            alert("not found");
        }
    });

}

$('#txtSearch').keyup(function () {
    var typeValue = $(this).val();
    $('tbody tr').each(function () {
        if ($(this).text().search(new RegExp(typeValue, "i")) < 0) {
            $(this).hide();
        }
        else {
            $(this).show();
        }
    })
});

