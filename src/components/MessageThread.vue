<template>
    <div class="message-wrapper" :class="message.parent_id ? '' : 'first-level'">
        <Message
            :id="message.id"
            :name="message.name"
            :picture="message.picture"
            :text="message.text"
            :time="message.time"
            :color="message.color"
            :messages="messages"
        />
        <div v-if="children.length" class="replies">
            <MessageThread
                v-for="child in children"
                :key="child.id"
                :message="child"
                :messages="messages"
            />
        </div>
    </div>
</template>

<script setup>
    import { computed } from 'vue'
    import Message from './Message.vue'
    import MessageThread from './MessageThread.vue'
    
    const props = defineProps({
        message: Object,
        messages: Array
    })
    
    const children = computed(() =>
        props.messages.filter(m => m.parent_id == props.message.id)
    )
</script>
  
<style lang="sass" scoped>
.message-wrapper
    position: relative
    display: flex
    flex-direction: column
    gap: 0px
    padding-top: 10px
    padding-left: 10px

    &.first-level
        margin-bottom: 10px
        padding-top: 0px
        padding-left: 0px

.replies
    display: flex
    flex-direction: column
    margin-left: 8px
    padding-left: 20px

    > .message-wrapper
        position: relative
        padding-left: 13px

        &::before
            content: ''
            position: absolute
            top: 0
            left: 0
            width: 1px
            height: 100%
            background-color: $text-light

        &::after
            content: ''
            position: absolute
            top: 43px
            left: 0
            width: 13px
            height: 1px
            background-color: $text-light

        &:last-child::before
            height: 43px
</style>
  