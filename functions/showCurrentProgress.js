const showCurrentProgress = (numOfPages = 3, fullLengthOfData) => { //default is 3
    if (+numOfPages < 1) {
        throw new Error('No Of Pages Should be equal or greater Than 1')
    }

    if (fullLengthOfData == 0) {
        return null;
    }
    // let sectionsOfData = numOfPages; 
    const noOfDataPerDisplay = fullLengthOfData / numOfPages;

    let isShowStartLabel = true;

    if (Math.floor(noOfDataPerDisplay) < 1) {//it's mean data length is smaller than no Of Pages;
        numOfPages = 1;
    }
    if (fullLengthOfData < 6) {
        isShowStartLabel = false;
    }

    const endDisplayData = []; //[{id: number, endData: number}]
    const startDisplayData = []; //[{id: number, startData: number}]
    const floorData = Math.floor(noOfDataPerDisplay);
    const ceilData = Math.ceil(noOfDataPerDisplay)
    if (floorData !== ceilData || floorData === ceilData) { //It's mean data is not equally distributed Among numOfPages
        let number = 0;

        for (let i = 0; i < numOfPages; i++) {
            let isCeilWasAdded = false;
            if ((numOfPages - 1) != i) { //It's mean it's not the last Loop
                number += floorData;
                endDisplayData.push({ id: i, endData: number });
            } else { //here it's the last loop
                number += ceilData;
                endDisplayData.push({ id: i, endData: number });
                isCeilWasAdded = true;
            }
            if (isShowStartLabel && !isCeilWasAdded) { //all loops
                startDisplayData.push({ id: i, startData: (number - floorData) + 1 })
            } else if (isShowStartLabel && isCeilWasAdded) { //last loop
                startDisplayData.push({ id: i, startData: (number - ceilData) + 1 })
            }
        }


    }
    // else {
    //     for (let i = 0; i < numOfPages; i++) {//Here It's mean data is equally distributed Among numOfPages
    //         endDisplayData.push({ id: i, endData: ceilData });//Here ceilData = floorData
    //     }
    // }
    return {
        end: endDisplayData,
        start: startDisplayData
    }
}

export default showCurrentProgress;
