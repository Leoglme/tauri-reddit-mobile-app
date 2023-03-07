import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ExempleVitest from '@/components/ExempleVitest.vue'

describe('ExempleVitest.vue', () => {
  it('renders properly', () => {
    const wrapper = mount(ExempleVitest, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
