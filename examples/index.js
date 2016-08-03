import Vue from 'vue'
import {vcPagination} from '../src/index.js'

import './index.less'

new Vue({
	el: '#app',
	data () {
		return {
			total: 180,
			perPage: 12,
			currentPage: 3
		}
	},
	components: {
		vcPagination
	},
	methods: {
		onPageChange (page) {

		}
	}
})