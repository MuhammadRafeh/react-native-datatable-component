//data is list of Objects i.e rows
//isColSortedAssending: bool
//colName which we want to Sort
//SortAssending if true it's mean last time we sorted another column so it should be sorted Assendically

const sortData = (data, isColSortedAssending, colName, sortAssending = false) => {
    let setIsSortedAsc = false;
    if (sortAssending || !isColSortedAssending) { //here sorting Asc
        data.sort(function (a, b) {
            if (a[colName] > b[colName]) {
                return 1;
            }
            if (b[colName] > a[colName]) {
                return -1;
            }
            return 0;
        });
        setIsSortedAsc = true;
    } else if (isColSortedAssending) { //here sorting Desc
        data.sort(function (a, b) {
            if (a[colName] > b[colName]) {
                return -1;
            }
            if (b[colName] > a[colName]) {
                return 1;
            }
            return 0;
        });
    }
    return {
        setIsSortedAsc
    }
}

export default sortData;
