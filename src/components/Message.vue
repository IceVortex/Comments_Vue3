<template>
    <div class="message-wrapper">
        <div class="message" :data-message-id="id">
            <div :class="['avatar', color]"></div>
            <!-- <img  class="avatar" :src="picture" /> -->

            <div class="main">
                <div class="content">
                    <p class="name">{{ name }}</p>
                    <p class="text" v-html="text"></p>
                </div>
                <div class="footer">
                    {{ time }}
                    <span class="reply" @click="reply">
                        Reply{{ replyCount > 0 ? ` (${replyCount})` : '' }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { computed } from 'vue'
    import { useMessageStore } from '../stores/messageStore'

    const store = useMessageStore()

    const props = defineProps({
        name: String,
        picture: String,
        text: String,
        time: String,
        color: String,
        id: String,
        messages: Array
    })
    
    const replyCount = computed(() =>
        props.messages.filter(m => m.parent_id == props.id).length
    )

    const reply = () => {
        store.setReplyTarget(props.id)
        document.querySelector(`input`).focus()
    }
</script>
  
  
<style lang="sass" scoped>
.message-wrapper
    display: flex
    flex-direction: column
    gap: 10px

.message
    display: flex
    align-items: flex-start
    gap: 15px

    .avatar
        width: 35px
        height: 35px
        margin-top: 5px
        border-radius: 50%
        flex-shrink: 0

        &.red
            background-color: $icon-red
        &.green
            background-color: $icon-green
        &.yellow
            background-color: $icon-yellow
        &.blue
            background-color: $icon-blue

    .main
        display: flex
        flex-direction: column
        width: 100%
        gap: 5px

    .content
        max-width: 448px
        padding: 18px 23px
        border-radius: 5px
        font-size: 12px
        background-color: white

        .name
            margin-bottom: 10px
            font-weight: bold
            color: $text-dark

        .text
            margin-bottom: 0
            color: $text-light

    .footer
        margin-top: 4px
        font-size: 10px
        color: $text-light

        .reply
            margin-left: 10px
            font-weight: 600
            color: $text-blue
            cursor: pointer
</style>
  