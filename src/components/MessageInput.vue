<template>
    <div class="input-area">
        <div v-if="store.activeReplyToMessage" class="reply-indicator">
            Replying to: <strong>{{ store.activeReplyToMessage.name }}</strong>
            <span class="cancel" @click="store.clearReplyTarget">✕</span>
		</div>

		<div class="input-row">
			<input type="text" placeholder="...type something" v-model="message" ref="inputRef" @keyup.enter="send" />
			<button @click="send">Send</button>
		</div>
	</div>
</template>

<script setup>
    import { ref, nextTick } from 'vue'
    import { useMessageStore } from '../stores/messageStore'

    const emit = defineEmits(['send-message'])

    const message = ref('')
    const inputRef = ref(null)
    const store = useMessageStore()

    const send = () => {
        if (message.value.trim()) {
            const messageId = Date.now().toString()

            store.addMessage(message.value, messageId)

            emit('send-message', messageId)

            message.value = ''

            nextTick(() => {
                inputRef.value?.focus()
            })
        }
    }
</script>

<style lang="sass" scoped>
.input-area
	display: flex
	flex-direction: column
	padding: 7px 18px
	border-radius: 5px
	background-color: white
	box-shadow: 0px 4px 4px 0px #00000040

	.reply-indicator
		margin-bottom: 7px
		+font-normal
		font-weight: 700
		background-color: $bg-gray
		padding: 5px 10px
		border-left: 3px solid $bg-blue
		border-right: 3px solid $bg-blue
		display: flex
		justify-content: space-between
		align-items: center
		border-radius: 5px

	.cancel
		color: $text-light
		cursor: pointer
		margin-left: 10px
		font-weight: bold

		&:hover
			color: $bg-blue

	.input-row
		display: flex
		gap: 10px

		input
			width: 100%
			padding: 8px
			border: none
			outline: none
			+font-small
			font-weight: 700
			color: $text-light

		button
			padding: 11px 27px
			border: none
			border-radius: 5px
			cursor: pointer
			font-weight: 700
			font-size: 10px
			background-color: $button-gray
</style>
