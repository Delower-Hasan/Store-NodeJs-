//  catId
// subCatId
$('#catId').change(function() {
    let catId = $(this).val();
    if (catId) {
        $.ajax({
            type: "GET",
            url: "/product/ajaxSubCat/" + catId,
            success: function(res) {
                if (res) {
                    $("#subCatId").empty();
                    $("#subCatId").append('<option>Select</option>');
                    $.each(res, function(key, value) {
                        $("#subCatId").append(`<option value='${value._id}'> ${value.subCat}</option>`);
                    });
                } else {
                    $("#subCatId").empty();
                }
            }
        });
    } else {
        $("#catId").empty();
        $("#subCatId").empty();
    }
});