'use strict';
const BootBot = require('bootbot');

const bot = new BootBot({
  accessToken: 'EAABvKd6SnwYBALjDBz8aAatOQs2D4iVbQRcncoYnOP1fp7rRgt4vmaMyS9kR7YasLrQISiRV32RDxJYaXdcmPTKuSgXmHwUcVX6Qz2nQ2ZBSZCK3XZCZBDon7lW57Gf33FFaZAUeAZAru6I6p6QF1lXiu1Ty4qkepQVMMvOgjilVRhB6YZAE9ao',
  verifyToken: 'my_token',
  appSecret: '150ea43ca0dce9c3071fb8f4d900b0f5'
});

bot.on('message', (payload, chat) => {
  const text = payload.message.text;
  chat.say(`Echo: ${text}`);
});


bot.hear(['hello', 'hi', /hey( there)?/i], (payload, chat) => {
	chat.say('Hello, human friend!').then(() => {
		chat.say('How are you today?', { typing: true });
	});
});

bot.hear(['food', 'hungry'], (payload, chat) => {
	chat.say({
		text: 'What do you want to eat today?',
		quickReplies: ['Mexican', 'Italian', 'American', 'Argentine']
	});
});

bot.hear(['help'], (payload, chat) => {
	chat.say({
		text: 'What do you need help with?',
		buttons: [
			{ type: 'postback', title: 'Settings', payload: 'HELP_SETTINGS' },
			{ type: 'postback', title: 'FAQ', payload: 'HELP_FAQ' },
			{ type: 'postback', title: 'Talk to a human', payload: 'HELP_HUMAN' }
		]
	});
});

bot.hear('image', (payload, chat) => {
	chat.say({
		attachment: 'image',
		url: 'http://example.com/image.png'
	});
});

bot.hear('ask me something', (payload, chat) => {
	chat.conversation((convo) => {
		askName(convo);
	});

	const askName = (convo) => {
		convo.ask(`What's your name?`, (payload, convo) => {
			const text = payload.message.text;
			convo.set('name', text);
			convo.say(`Oh, your name is ${text}`).then(() => askFavoriteFood(convo));
		});
	};

	const askFavoriteFood = (convo) => {
		convo.ask(`What's your favorite food?`, (payload, convo) => {
			const text = payload.message.text;
			convo.set('food', text);
			convo.say(`Got it, your favorite food is ${text}`).then(() => sendSummary(convo));
		});
	};

	const sendSummary = (convo) => {
		convo.say(`Ok, here's what you told me about you:
	      - Name: ${convo.get('name')}
	      - Favorite Food: ${convo.get('food')}`);
      convo.end();
	};
});

bot.start();
