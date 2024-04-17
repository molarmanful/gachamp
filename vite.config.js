import { enhancedImages } from '@sveltejs/enhanced-img'
import { sveltekit } from '@sveltejs/kit/vite'
import unocss from 'unocss/vite'

export default {
  plugins: [enhancedImages(), unocss(), sveltekit()],
}
