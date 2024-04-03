//////$(document).ready(function () {
//////    //alert('ok');
//////    ProductData();
//////});

//////var table = new Tabulator("#tblBody", {

//////    placeholder: "No Data Set",
//////    columns: [
//////        { title: "ID", field: "id" },
//////        { title: "Name", field: "name" },
//////        { title: "Price", field: "price" },
//////        { title: "Active", field: "active" }
//////    ],
//////    pagination: true,
//////    paginationMode: "remote",
//////    ajaxConfig: "GET",
//////    ajaxURL: "/Ajax/ProductList",
//////    contentType: "json",
//////    paginationSize: 10,
//////    layout: "fitColumns",
//////    responsiveLayout: true,
//////    //data: tableData,

//////    ajaxResponse: function (url, params, response) {

//////        return {
//////            last_page: response.last_page,
//////            data: response.data
//////        }
//////        // table.setData = response;

//////                }
//////});

//////function ProductData() {



//////    var table = new Tabulator("#tblBody", {
//////        height: "311px",
//////        layout: "fitColumns",
//////        placeholder: "No Data Set",
//////        columns: [
//////            { title: "ID", field: "id" },
//////            { title: "Name", field: "name" },
//////            { title: "Price", field: "price" },
//////            { title: "Active", field: "active" }
//////        ],
//////        pagination: true,
//////        paginationMode: "remote",
//////        ajaxConfig: "GET",
//////        ajaxURL: "/Ajax/ProductList",
//////        contentType: "json",
//////        paginationSize: 10,
//////        layout: "fitColumns",
//////        responsiveLayout: true,
//////        //data: tableData,

//////        ajaxResponse: function (url, params, response) {

//////            table.setData = response.data;
//////        }
//////    });
//////};



//////function ProductData() {
//////    $.ajax({
//////        url: '/Ajax/ProductList',
//////        type: 'Get',
//////        dataType: 'json',
//////        contentType: 'application/json;charset=utf-8;',
//////        success: function (result, status, xhr) {
//////            var tableData = [];

//////            $.each(result.data, function (index, item) {
//////                tableData.push({
//////                    id: item.id,
//////                    name: item.name,
//////                    price: item.price,
//////                    quantity: item.quantity,
//////                    active: item.active
//////                });
//////            });

//////            var table = new Tabulator("#tblBody", {
//////                data: tableData,

//////                pagination: true, //enable pagination
//////                paginationMode: "remote", //enable remote pagination
//////                //ajaxURL: '/Ajax/ProductList', //set url for ajax request
//////                // ajaxParams: { token: "ABC123" }, //set any standard parameters to pass with the request
//////                paginationSize: 10, //optional parameter to request a certain number of rows per page
//////                //paginationInitialPage: 1, //optional parameter to set the initial page to load
//////               // paginationSizeSelector: [10, 20, true],
//////                paginationCounter: "rows",
//////                minHeight: 400,
//////                //ajaxConfig: "get",
//////                //ajaxContentType: "json",

//////                height: "400px",
//////                layout: "fitColumns",
//////                movableRows: true,
//////                addRowPos: "bottom",
//////                placeholder: "No Data Set",
//////                columns: [
//////                    { title: "Id", field: "id", sorter: "number" },
//////                    { title: "Name", field: "name", sorter: "string" },
//////                    { title: "Price", field: "price", sorter: "number", hozAlign: "left" },
//////                    { title: "Quantity", field: "quantity", hozAlign: "center", width: 100, editor: true },
//////                    { title: "Active", field: "active", width: 90, hozAlign: "center", formatter: "tickCross", sorter: "boolean" },
//////                    {
//////                        title: "Actions",
//////                        formatter: function (cell) {
//////                            var pid = cell.getRow().getData().id;
//////                            return "<button class='edit-btn btn btn-primary btn-sm' data-id='" + pid + "'>Edit</button>" +
//////                                "<button class='delete-btn btn btn-danger btn-sm' data-id='" + pid + "'>Delete</button>";
//////                        },
//////                        cellClick: function (e, cell) {
//////                            // Handle click events for edit and delete buttons
//////                            var id = cell.getRow().getData().id;
//////                            if ($(e.target).hasClass('edit-btn')) {
//////                                Edit(id);
//////                            } else if ($(e.target).hasClass('delete-btn')) {
//////                                Delete(id);
//////                            }
//////                        }
//////                    }
//////                ]
//////            });
//////        },
//////        error: function () {
//////            alert("Error fetching data.");
//////        }
//////    });
//////}



////$('#btnAdd').click(function () {
////    clear();
////    $('#ProductMadal').modal('show');
////    $('#pid').hide();
////    $('#Add').css('display', 'block');
////    $('#Update').css('display', 'none');
////    $('#phead').text('Add');
////})

////function AddProduct() {
////    var objData = {
////        Name: $('#Name').val(),
////        Price: $('#Price').val(),
////        Quantity: $('#Quantity').val(),
////        Active: $('#Active').val(),

////    }
////    $.ajax({
////        url: '/Ajax/AddProduct',
////        type: 'Post',
////        data: objData,
////        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
////        dataType: 'json',
////        success: function () {
////            alert('saved');
////            clear();
////            ProductData();
////            Hide();
////        },
////        error: function () {
////            alert("not found");
////        }
////    });


////}

////function Hide() {
////    $('#ProductMadal').modal('hide');
////}

////function clear() {
////    $('#Name').val('');
////    $('#Price').val('');
////    $('#Quantity').val('');
////    $('#Active').val('');
////}

////function Delete(id) {
////    if (confirm('confirm?')) {
////        $.ajax({
////            url: '/Ajax/Delete?id=' + id,
////            success: function () {
////                alert('deleted');
////                ProductData();
////            },
////            error: function () {
////                alert("error");
////            }
////        })
////    }
////}

////function Edit(id) {
////    $.ajax({
////        url: '/Ajax/Edit?id=' + id,
////        type: 'Get',
////        contentType: 'application/json;charset=utf-8',
////        dataType: 'json',
////        success: function (response) {
////            $('#ProductMadal').modal('show');
////            $('#ProductId').val(response.id);
////            $('#Name').val(response.name);
////            $('#Price').val(response.price);
////            $('#Quantity').val(response.quantity);
////            $('#Active').val(response.active);
////            $('#Add').css('display', 'none');
////            $('#Update').css('display', 'block');
////            $('#phead').text('Update');
////        },
////        error: function () {
////            alert('error');
////        }
////    })

////}

////function Update() {

////    var objData = {
////        Id: $('#ProductId').val(),
////        Name: $('#Name').val(),
////        Price: $('#Price').val(),
////        Quantity: $('#Quantity').val(),
////        Active: $('#Active').val(),

////    }
////    $.ajax({
////        url: '/Ajax/Update',
////        type: 'Post',
////        data: objData,
////        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
////        dataType: 'json',
////        success: function () {
////            alert('saved');
////            clear();
////            ProductData();
////            Hide();
////        },
////        error: function () {
////            alert("not found");
////        }
////    });

////}

////$('#txtSearch').keyup(function () {
////    var typeValue = $(this).val();
////    $('tbody tr').each(function () {
////        if ($(this).text().search(new RegExp(typeValue, "i")) < 0) {
////            $(this).hide();
////        }
////        else {
////            $(this).show();
////        }
////    })
////});











//function initTabulator() {
//    var statusValue = $("#Status").val();
//    var durationValue = $("#Duration").val();
//    var customerId = $("#Customers").val();

//    function fetchDataFromServer() {
//        var MyAppUrlSettings = {
//            MyUsefulUrl: '@Url.Action("GetInvoiceList", "Sales")'
//        };
//        return $.ajax({
//            url: MyAppUrlSettings.MyUsefulUrl,
//            data: {
//                status: statusValue,
//                duration: durationValue,
//                customerId: customerId
//            },
//            dataType: "json",
//        });
//    }

//    fetchDataFromServer().done(function (response) {

//        console.log("notrmal response:", response.data);
//        var dataTable = response.data;
//        console.log("data table:", dataTable);// Define columns to be excluded
//        var columnsToExclude = ["MonthCaption", "FontSignal"]; // Define columns to be excluded


//        salesApiUrl = '@Url.Action("GetInvoiceList", "Sales")' + '?duration=' + durationValue + '&customerId=' + customerId + '&status=' + statusValue,
//            salesTable = new Tabulator("#example-table", {
//                //data: dataTable,

//                layout: "fitColumns",
//                minHeight: 400,
//                pagination: true,
//                movableColumns: true,
//                ajaxURL: salesApiUrl,
//                paginationMode: "remote",
//                paginationSize: 10,
//                paginationInitialPage: 1,
//                paginationSizeSelector: [10, 25, 50, 100, true],
//                paginationCounter: "rows",
//                dataTree: true,
//                dataTreeStartExpanded: false,
//                ajaxConfig: "get",
//                ajaxContentType: "json",

//                ajaxResponse: function (url, params, response) {
//                    salesTable.setMaxPage(response.last_page);
//                    console.log("response.last_page", response.last_page);

//                    dataLoadExpense = response.data;
//                    /* console.log("dataLoadExpense:", dataLoadExpense);*/

//                    return {

//                        data: dataLoadExpense,
//                        last_page: response.last_page,

//                    };
//                },


//                columns: globalFields1,

//                rowFormatter: function (row) {
//                    // Create and style holder elements for nested table
//                    var holderEl = document.createElement("div");
//                    var tableEl = document.createElement("div");

//                    holderEl.style.boxSizing = "border-box";

//                    holderEl.appendChild(tableEl);

//                    row.getElement().appendChild(holderEl);

//                    var childData = row.getData().SalesItems; // Get the child data array for the current row

//                    childTable = new Tabulator(tableEl, {

//                        data: childData, // Pass the child data array to the child table
//                        columns: [
//                            { title: "Category", field: "CategoryName", headerHozAlign: "left", hozAlign: "left", width: 200, resizable: false },
//                            { title: "Name", field: "ProductName", headerHozAlign: "left", hozAlign: "left", width: 200, resizable: false },
//                            { title: "Code", field: "ProductCode", headerHozAlign: "left", hozAlign: "left", width: 200, resizable: false },
//                            { title: "Quantity", field: "Quantity", headerHozAlign: "right", hozAlign: "right", width: 100, bottomCalc: "sum", resizable: false },
//                            {
//                                title: "Price", field: "Price", headerHozAlign: "right", hozAlign: "right", width: 200, bottomCalc: "sum", resizable: false,
//                                bottomCalcFormatter: "money",
//                                formatter: "money",
//                                formatterParams: {
//                                    decimal: ".",
//                                    thousand: ",",
//                                    precision: 2,
//                                },
//                            },
//                            {
//                                title: "CostPrice", field: "CostPrice", headerHozAlign: "right", hozAlign: "right", width: 200, bottomCalc: "sum", resizable: false,
//                                bottomCalcFormatter: "money",
//                                formatter: "money",
//                                formatterParams: {
//                                    decimal: ".",
//                                    thousand: ",",
//                                    precision: 2,
//                                },
//                            },
//                            {
//                                title: "Avg. CostPrice", field: "AvgCostPrice", headerHozAlign: "right", hozAlign: "right", width: 200, bottomCalc: "sum", resizable: false,
//                                bottomCalcFormatter: "money",
//                                formatter: "money",
//                                formatterParams: {
//                                    decimal: ".",
//                                    thousand: ",",
//                                    precision: 2,
//                                },
//                            },

//                        ],
//                    });

//                    var detailsIconEl = row.getElement().querySelector(".btn-details-icon");

//                    detailsIconEl.addEventListener("click", function (event) {
//                        event.stopPropagation();

//                        if (childTable.getRows().length === 0) {
//                            childTable.setData(childData);
//                        }

//                        holderEl.classList.toggle("child-table-hidden");
//                        holderEl.classList.toggle("child-table-visible");



//                        if (holderEl.classList.contains("child-table-visible")) {
//                            detailsIconEl.className = "fas fa-chevron-down btn-details-icon"; // Use collapse icon
//                        } else {
//                            detailsIconEl.className = "fas fa-plus btn-details-icon"; // Use expand icon
//                        }
//                    });

//                    // Hide the child table initially
//                    holderEl.classList.add("child-table-hidden");

//                },

//            });
//        document.getElementById("salesPrint-pdf").addEventListener("click", function () {
//            salesTable.print(false, true);
//        });
//        document.getElementById("salesPrint-excel").addEventListener("click", function () {
//            salesTable.download("xlsx", "data.xlsx", { sheetName: "Table Data" });
//        });
//    });


//}