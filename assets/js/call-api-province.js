const host = "https://provinces.open-api.vn/api/";
var callAPI = (api) => {
    return axios.get(api)
        .then((response) => {
            renderData(response.data, "province");
        });
}

callAPI("https://provinces.open-api.vn/api/?depth=1")

var callApiDistrict = (api) => {
    return axios.get(api)
        .then((response) => {
            renderData(response.data.districts, "district");
        });
}

var callApiWard = (api) => {
    return axios.get(api)
        .then((response) => {
            renderData(response.data.wards, "ward");
        });
}

var renderData = (array, select) => {
    var value;
    if (select == "provinces") {
        value = 'Chọn tỉnh/thành phố';
    } else if (select == "district") {
        value = 'Chọn quận/huyện';
    }
    else {
        value = 'Chọn phường/xã';
    }
    let row = '<option disable value="">' + value + '</option>';
    array.forEach(element => {
        row += `<option value="${element.code}">${element.name}</option>`
    });
    document.querySelector("#" + select).innerHTML = row
}

$("#province").change(() => {
    callApiDistrict(host + "p/" + $("#province").val() + "?depth=2");
});


$("#district").change(() => {
    callApiWard(host + "d/" + $("#district").val() + "?depth=2");
});
