var socket = io()

/* 접속 되었을 때 실행 */
socket.on('connect', function() {
  /* 이름을 입력받고 */
  var name = prompt('반갑습니다!', '')

  /* 이름이 빈칸인 경우 */
  if(!name) {
    name = '익명'
  }

  /* 서버에 새로운 유저가 왔다고 알림 */
  socket.emit('newUser', name)
})



/* 서버로부터 데이터 받은 경우 */
socket.on('update', function(data) {
  console.log(`${data.name}: ${data.message}`)
  var chat = document.getElementById('chat-box')
  var message = document.createElement('li')
  var mSpan1 = document.createElement('span')
  var mSpan2 = document.createElement('span')
  var uName = document.createTextNode(`${data.name}`)
  var uChat = document.createTextNode(`${data.message}`)
  var className = ''

  // 타입에 따라 적용할 클래스를 다르게 지정
  switch(data.type) {
    case 'message':
      className = 'other'
      break

    case 'connect':
      className = 'connect'
      break

    case 'disconnect':
      className = 'disconnect'
      break
  }

  message.classList.add(className)
  mSpan1.classList.add('user-name')
  mSpan2.classList.add('user-chat')
  message.appendChild(mSpan1).appendChild(uName)
  message.appendChild(mSpan2).appendChild(uChat)
  chat.appendChild(message)
})

/* 메시지 전송 함수 */
function send() {
  // 입력되어 있는 데이터 가져오기
  var message = document.getElementById('text').value
  
  // 가져왔으니 데이터 빈칸으로 변경
  document.getElementById('text').value = ''

  // 내가 전송할 메시지 클라이언트에게 표시
  var chat = document.getElementById('chat-box')
  var msg = document.createElement('li')
  var mSpan = document.createElement('span')
  var uChat = document.createTextNode(message)
  mSpan.classList.add('user-me')
  msg.appendChild(mSpan).appendChild(uChat)
  chat.appendChild(msg)

  // 서버로 send 이벤트 전달 + 데이터와 함께
  socket.emit('message', {type: 'message', message: message})
}

/* 엔터키 전송 추가 */
function keyevent() {
  var keycode = event.keyCode
  if(keycode == '13') {
    send()
  }
}