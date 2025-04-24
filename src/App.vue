<template>
	<div class="app">
		<MessagesContainer />
	</div>
</template>

<script setup>
	import MessagesContainer from './components/MessagesContainer.vue'
</script>

<style lang="sass">
.app
	height: 100vh
	display: flex
	justify-content: center
	align-items: center
</style>
