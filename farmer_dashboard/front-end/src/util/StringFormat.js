export const formatTime = (time) => {
    //hh:mm:ss
    let time_split = time.split(':')
    let suffix = " am"
    if(time_split[0] > 12)
        time_split[0] -= 12
        suffix = " pm"

    return time_split[0] + ":" + time_split[1] + suffix
}