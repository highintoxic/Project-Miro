module.exports = (channel, text, duration = 10, del1 = true) => {

    if (del1 == true){
        channel.bulkDelete(1, true)
    }

    channel.send(text).then((message) => {
        if (duration === -1) {
            return;
        }else{
            setTimeout(() => {
                message.delete()
            }, 1000 * duration);
            return;
        }
    })
}

//Usage:   sendMessage(<message channel>, 'message text', <secs till deletion>, <deletion of the users message (true/false)>) yo