const tweetForm = document.querySelector('form');
const textArea = document.querySelector('#tweet');

tweetForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const res = await fetch(`/tweet/save?tweet=${encodeURIComponent(tweet.value)}`);
        const data = await res.json()
        if (data.error) {
            Swal.fire({
                icon: 'error',
                title: 'wtf...',
                text: data.error,
                footer: 'you suck man..'
            });
            console.log(data.error)
            textArea.value = '';
        } else {
            Swal.fire({
                icon: 'success',
                title: 'SENT',
                text: data.message.message,
                footer: 'nice job man'
            })
            console.log(data.message);
            textArea.value = '';

        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: "ERROR ERROR",
            text: 'we messed something up..'})
        console.log("ERROR ERROR");
        console.log(error);
    };
});