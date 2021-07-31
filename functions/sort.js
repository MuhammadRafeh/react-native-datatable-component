//data is list of Objects i.e rows
//isColSortedAssending: bool
//colName which we want to Sort
//SortAssending if true it's mean last time we sorted another column so it should be sorted Assendically

const sortData = (data, isColSortedAssending, colName, sortAssending = false) => {
    let setIsSortedAsc = false;
    if (sortAssending || !isColSortedAssending) { //here sorting Asc
        data.sort(function (a, b) {
            let aa = a[colName];
            let bb = b[colName];
            if (typeof (aa) == 'string' && typeof (bb) == 'string') {
                aa = a[colName].toLowerCase();
                bb = b[colName].toLowerCase();
            }
            if (aa > bb) {
                return 1;
            }
            if (bb > aa) {
                return -1;
            }
            return 0;
        });
        setIsSortedAsc = true;
    } else if (isColSortedAssending) { //here sorting Desc
        data.sort(function (a, b) {
            let aa = a[colName];
            let bb = b[colName];
            if (typeof (aa) == 'string' && typeof (bb) == 'string') {
                aa = a[colName].toLowerCase();
                bb = b[colName].toLowerCase();
            }
            if (aa > bb) {
                return -1;
            }
            if (bb > aa) {
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
