<template>
    <div class="chat-box">
        <div class="date">Tuesday, 13.12.2020</div>
    
        <div class="chat-scroll" ref="scrollContainer">
            <MessageThread
                v-for="msg in topLevelMessages"
                :key="msg.id"
                :message="msg"
                :messages="store.messages"
            />
        </div>
    
        <MessageInput @send-message="scrollToMessage" />
    </div>
</template>

<script setup>
    import { ref, onMounted, computed, nextTick } from 'vue'
    import { useMessageStore } from '../stores/messageStore'
    import MessageThread from './MessageThread.vue'
    import MessageInput from './MessageInput.vue'
    
    const store = useMessageStore()
    const scrollContainer = ref(null)
    
    const topLevelMessages = computed(() =>
        store.messages.filter(msg => !msg.parent_id)
    )
    
    onMounted(() => {
        store.loadMessages()
    })
    
    const scrollToMessage = (id) => {
        nextTick(() => {
            if (store.activeReplyTo) {
                const el = document.querySelector(`[data-message-id="${id}"]`)

                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'end' })
                }

            } else {
                scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight
            }

            store.clearReplyTarget()
        })
    }
</script>
  
<style lang="sass" scoped>
.chat-box
	display: flex
	flex-direction: column
	width: 100%
	max-width: 798px
	padding: 38px
	padding-bottom: 15px
	border-radius: 10px
	box-sizing: border-box
	background-color: $bg-gray

	.date
		padding-bottom: 28px
		+font-info
		text-align: center
		color: $text-dark

	.chat-scroll
		max-height: 497px
		padding-bottom: 12px
		overflow-y: auto
		scrollbar-color: $scrollbar-gray transparent
</style>
  