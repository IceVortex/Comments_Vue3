import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useMessageStore = defineStore('messageStore', () => {
	const messages = ref([])
	const activeReplyTo = ref(null)

	const activeReplyToMessage = computed(() =>
		messages.value.find(msg => msg.id == activeReplyTo.value)
	)

    const loadMessages = async () => {
		try {
			const response = await fetch(`${import.meta.env.BASE_URL}/example.json`)
			const json = await response.json()

			messages.value = json.data.comments.map(msg => ({
				id: msg.id,
				parent_id: msg.parent_id,
				name: msg.author.name,
                picture: msg.author.picture,
				text: msg.text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>'),
				time: new Date(msg.timestamp).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
				color: getRandomColor(),
			}))

		} catch (e) {
			console.error('Error loading messages:', e)
		}
	}

	const setReplyTarget = (id) => {
		activeReplyTo.value = id
	}

	const clearReplyTarget = () => {
		activeReplyTo.value = null
	}

	const addMessage = (text, id) => {
		const now = new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })

		messages.value.push({
			id: id,
			parent_id: activeReplyTo.value,
			name: 'User',
            picture: 'user_image',
			text: text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>'),
			time: now,
			color: getRandomColor(),
		})
	}

	const getRandomColor = () => {
		const colors = ['red', 'green', 'yellow', 'blue']
		const randomColor = colors[Math.floor(Math.random() * colors.length)]

		return randomColor
	}

	return {
		messages,
		activeReplyTo,
		activeReplyToMessage,
		setReplyTarget,
		clearReplyTarget,
		addMessage,
		loadMessages
	}
})
