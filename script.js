const darshSelectorBtn = document.querySelector("#darsh_selector");
const parthSelectorBtn = document.querySelector("#parth_selector");
const chatHeader = document.querySelector(".chat_header");
const chatMessages = document.querySelector(".chat_messages");
const chatInputForm = document.querySelector(".chat_input_form");
const chatInput = document.querySelector(".chat_input");
const clearBtn = document.querySelector(".clear_button");

const messages = JSON.parse(localStorage.getItem("messages")) || [];

const chatMessages_e = (message) => `
    <div class="message ${message.sender === "Parth" ? "green-bg" : "grey-bg"}">
        <div class="message_sender ${
					message.sender === "Parth" ? "GR" : "GE"
				}">${message.sender}</div>
        <div class="message_text ${message.sender === "Parth" ? "GR" : "GE"}">${
	message.text
}</div>
        <div class="message_time ${message.sender === "Parth" ? "GE" : "GR"}">${
	message.time
}</div>
    </div>
`;

window.onload = () => {
	messages.forEach((message) => {
		chatMessages.innerHTML += chatMessages_e(message);
	});
};

let messageSender = "Darsh";

const updateMessageSender = (name) => {
	messageSender = name;
	chatHeader.innerText = `${messageSender} Chatting...`;
	chatInput.placeholder = `Message ${messageSender} ...`;

	if (name === "Parth") {
		parthSelectorBtn.classList.add("active_person");
		darshSelectorBtn.classList.remove("active_person");
	}

	if (name === "Darsh") {
		darshSelectorBtn.classList.add("active_person");
		parthSelectorBtn.classList.remove("active_person");
	}

	chatInput.focus();
};

darshSelectorBtn.onclick = () => updateMessageSender("Darsh");
parthSelectorBtn.onclick = () => updateMessageSender("Parth");

const sendMessage = (e) => {
	e.preventDefault();

	const time = new Date().toLocaleString("en-US", {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	});

	const message = {
		sender: messageSender,
		text: chatInput.value,
		time,
	};

	messages.push(message);
	localStorage.setItem("messages", JSON.stringify(messages));

	chatMessages.innerHTML += chatMessages_e(message);

	chatInputForm.reset();
	chatMessages.scrollTop = chatMessages.scrollHeight;
};

chatInputForm.addEventListener("submit", sendMessage);

clearBtn.addEventListener("click", () => {
	localStorage.clear();
	chatMessages.innerHTML = "";
});
