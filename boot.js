'use strict';
const BootBot = require('bootbot');

const bot = new BootBot({
  accessToken: 'EAABvKd6SnwYBADo84T1IOV7dURtT3L5ZChGTj9cdvDIY8d9ZBxSbKLmnLjryfRdfoGxYJ1FTf99ZCZArKzXGpXsE3UOWnAP9ti7n9OX4dluLvzP9yskKkOJ0M8IBT0VKNv8UPadGH52giPXo4Xq3zNBZAGDDhTXPX0ZBMZCr9P3taWEKbVHuBln',
  verifyToken: 'my_token',
  appSecret: '150ea43ca0dce9c3071fb8f4d900b0f5'
});

bot.on('message', (payload, chat) => {
	console.log(payload,'payload')
  const text = payload.message.text;
  chat.say(`Echo: ${text}`);
});

bot.start();
