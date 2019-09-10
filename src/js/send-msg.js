(function() {

    const ESC_KEYCODE = 27;
    const body = document.querySelector('body');
    const overlay = document.querySelector('.overlay');
    const sendMsgSuccess = document.querySelector('.send-msg-success');
    const sendMsgFailure = document.querySelector('.send-msg-failure');

    function showSuccessMsg() {
        body.classList.add('no-scroll');
        const SEND_MSG_CLOSE = sendMsgSuccess.querySelector('.send-msg__close');
        sendMsgSuccess.classList.add('send-msg--open');
        overlay.classList.add('overlay--open');
        SEND_MSG_CLOSE.addEventListener('click', closeSendMsg);
        overlay.addEventListener('click', closeSendMsg);
    }

    function showFailureMsg() {
        body.classList.add('no-scroll');
        const SEND_MSG_CLOSE = sendMsgFailure.querySelector('.send-msg__close');
        sendMsgFailure.classList.add('send-msg--open');
        overlay.classList.add('overlay--open');
        SEND_MSG_CLOSE.addEventListener('click', closeSendMsg);
        overlay.addEventListener('click', closeSendMsg);
    }

    function closeSendMsg() {
        body.classList.remove('no-scroll');
        const SEND_MSG_CURRENT = document.querySelector('.send-msg--open');
        SEND_MSG_CURRENT.classList.remove('send-msg--open');
        overlay.classList.remove('overlay--open');
        overlay.removeEventListener('click', closeSendMsg);
    }

    function onEscPress (e) {
        if(e.keyCode === ESC_KEYCODE) {
            closeSendMsg();
        }
    }

    document.addEventListener('keydown', onEscPress);

    window.sendMsg = {
        'showSuccessMsg': showSuccessMsg,
        'showFailureMsg': showFailureMsg
    }

}());
